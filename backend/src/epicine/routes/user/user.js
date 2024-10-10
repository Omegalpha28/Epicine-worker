const { getUser, updateUser } = require("../../../../core/data/config.function");
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
    app.put("/update/user", auth, async (req, res) => {
        try {
            const result = await updateUser(client, req.uuiduser, req.body);

            if (result) {
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
