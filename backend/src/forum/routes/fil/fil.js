const { updateFil } = require("../../../../core/data/config.function");
const { Fil } = require("../../../../core/data/models");
const auth = require("../../../epicine/middleware/auth");
const { error } = require("../../../utils/Logger");

module.exports = async function (client, app, bcrypt) {
    // Route pour ajouter un nouveau fil
    app.put("/add/fil", auth, async (req, res) => {
        const { title, film_id, description } = req.body;
        try {
            const filData = await Fil.findOne({ title: title });

            // Vérifiez si le fil existe déjà
            if (filData && title === filData.title) {
                return res.status(409).json({ msg: "Ce titre de fil existe déjà" });
            }

            // Ajoutez le nouveau fil
            const newFil = await Fil.save({ film_id: film_id, title: title, description: description, auteur: req.uuiduser });
            if (newFil) {
                return res.status(200).json({ msg: "Fil créé" });
            } else {
                return res.status(500).json({ msg: "Internal server error" });
            }
        } catch (err) {
            error(err);
            return res.status(500).json({ msg: `Error adding fil: ${err.message}` });
        }
    });

    // Route pour mettre à jour un fil existant par ID
    app.put("/update/fil/:id", auth, async (req, res) => {
        const { id } = req.params; // Récupérer l'ID du fil depuis les paramètres de l'URL
        const { title, description } = req.body;
        try {
            const filData = await Fil.findOne({ id: id });

            // Vérifiez si le fil est ouvert avant de le mettre à jour
            if (!filData || !filData.open) {
                return res.status(400).json({ msg: "Le fil est fermé" });
            }

            const updated = await updateFil(client, req.uuiduser, { id: id, title: title, description: description });
            if (updated) {
                return res.status(200).json({ msg: "Fil mis à jour" });
            } else {
                return res.status(500).json({ msg: "Internal server error" });
            }
        } catch (err) {
            error(err);
            return res.status(500).json({ msg: `Error updating fil: ${err.message}` });
        }
    });

    // Route pour supprimer un fil par ID
    app.delete("/remove/fil/:id", auth, async (req, res) => {
        const { id } = req.params; // Récupérer l'ID du fil depuis les paramètres de l'URL
        try {
            const filData = await Fil.findOne({ id: id });

            // Vérifiez si le fil existe et s'il est fermé avant de le supprimer
            if (!filData) {
                return res.status(404).json({ msg: "Fil non trouvé" });
            }
            if (filData.open === 1) {
                return res.status(400).json({ msg: "Il faut fermer le fil" });
            }

            const deleted = await Fil.delete({ id: id });
            if (deleted) {
                return res.status(200).json({ msg: "Fil supprimé" });
            } else {
                return res.status(500).json({ msg: "Internal server error" });
            }
        } catch (err) {
            error(err);
            return res.status(500).json({ msg: `Error removing fil: ${err.message}` });
        }
    });

    // Route pour obtenir un fil par ID
    app.get("/api/fil/:id", async (req, res) => {
        const { id } = req.params; // Récupérer l'ID du fil depuis les paramètres de l'URL
        try {
            const filData = await Fil.findOne({ id: id }); // Remplacez par votre méthode de récupération d'un fil par ID
            if (!filData) {
                return res.status(404).json({ msg: "Fil non trouvé" });
            }
            res.status(200).json(filData);
        } catch (err) {
            error(err);
            return res.status(500).json({ msg: `Error fetching fil: ${err.message}` });
        }
    });

    // Route pour obtenir le nombre total de fils
    app.get("/get/fil/nb", async (req, res) => {
        try {
            const count = await Fil.count();
            res.status(200).json(count.data);
        } catch (err) {
            error(err);
            return res.status(500).json({ msg: `Error getting fil count: ${err.message}` });
        }
    });

    // Route pour obtenir des fils avec pagination
    app.get("/get/fil", async (req, res) => {
        const { page, limit } = req.body;
        try {
            const filData = await Fil.customRequest(`SELECT Fil.id, Fil.film_id, Fil.title, Fil.description FROM Fil LIMIT ${limit} OFFSET ${limit * (page - 1)}`);
            res.status(200).json(filData.data);
        } catch (err) {
            error(err);
            return res.status(500).json({ msg: `Error getting fil: ${err.message}` });
        }
    });

    // Route pour la recherche de fils
    app.get("/get/search/fil", async (req, res) => {
        const { recherche } = req.query;  // Utilisation de req.query au lieu de req.body
        try {
            const filData = await Fil.customRequest(`
                SELECT A.id AS id, A.title AS title, A.description AS description, SUM(IFNULL(LikesMessage.type, 0)) AS somme
                FROM (
                  SELECT DISTINCT Fil.id, Fil.title, Fil.description
                  FROM Message
                  RIGHT JOIN Fil ON Fil.id = Message.id_fil
                  WHERE INSTR(Fil.title, '${recherche}') != 0
                    OR INSTR(Fil.description, '${recherche}') != 0
                    OR INSTR(Message.text, '${recherche}') != 0
                ) AS A
                LEFT JOIN Message ON A.id = Message.id_fil
                LEFT JOIN LikesMessage ON LikesMessage.id_message = Message.id
                GROUP BY A.id
                ORDER BY somme DESC
            `);
            res.status(200).json(filData.data);
        } catch (err) {
            console.error("Erreur lors de la récupération des fils :", err);
            return res.status(500).json({ msg: "Erreur serveur" });
        }
    });
};
