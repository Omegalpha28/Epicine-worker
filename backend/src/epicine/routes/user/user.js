const { getUser } = require("../../../../core/data/config.function");
const auth = require("../../middleware/auth");

module.exports = async function(client, app) {

    // Récupération des informations utilisateur
    app.get("/user", auth, async (req, res) => {
        try {
            // Appel à la fonction pour récupérer les informations de l'utilisateur par UUID
            const userData = (await getUser(client, { uuid: req.uuiduser })).data;

            if (userData != undefined) {
                delete(userData.password);  // Suppression du mot de passe avant de renvoyer les informations
                res.status(200).json(userData);  // Envoi des données utilisateur sans mot de passe
            } else {
                res.status(404).json({ "msg": "Utilisateur non trouvé" });
            }
        } catch (error) {
            console.error("Erreur lors de la récupération des informations utilisateur :", error);
            res.status(500).json({ "msg": "Erreur serveur" });
        }
    });

    // Mise à jour des informations utilisateur
    app.post("/user/update", auth, async (req, res) => {
        const { name, gender, birthday, telephone, avatar, banner, bio } = req.body;

        try {
            // Requête pour mettre à jour les informations de l'utilisateur (nom, genre, date de naissance, téléphone, avatar, bannière et bio)
            const result = await client.query(
                "UPDATE User SET name = $1, gender = $2, birthday = $3, telephone = $4, avatar = $5, banner = $6, bio = $7 WHERE uuid = $8",
                [name, gender, birthday, telephone, avatar, banner, bio, req.uuiduser]
            );

            if (result.rowCount === 1) {
                res.status(200).json({ message: "Mise à jour réussie" });
            } else {
                res.status(404).json({ message: "Utilisateur non trouvé" });
            }
        } catch (error) {
            console.error("Erreur lors de la mise à jour :", error);
            res.status(500).json({ message: "Erreur serveur" });
        }
    });
};
