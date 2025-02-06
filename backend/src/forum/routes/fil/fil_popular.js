const { Fil } = require("../../../core/data/models");

module.exports = async function (client, app, bcrypt) {
    app.get("/get/fil/popular", async (req, res) => {
        try {
            // Récupérer les posts populaires avec leurs scores de likes
            let filData = (await Fil.customRequest(`
                SELECT Fil.id, Fil.film_id, Fil.title, Fil.description, SUM(IFNULL(LikesMessage.type, 0)) AS somme
                FROM Message
                LEFT JOIN LikesMessage ON LikesMessage.id_message = Message.id
                JOIN Fil ON Fil.id = Message.id_fil
                GROUP BY Fil.id
                ORDER BY somme DESC
                LIMIT 10
            `)).data;

            // Vérifier si le nombre de posts est inférieur à 10
            if (filData.length < 10) {
                // Récupérer des posts supplémentaires pour compléter jusqu'à 10, en évitant les doublons
                const additionalData = (await Fil.customRequest(`
                    SELECT Fil.id, Fil.film_id, Fil.title, Fil.description
                    FROM Fil
                    WHERE Fil.id NOT IN (${filData.map(f => f.id).join(",")})
                    LIMIT ${10 - filData.length}
                `)).data;

                // Ajouter les posts supplémentaires à filData
                filData = [...filData, ...additionalData];
            }

            // Si des posts sont trouvés, les retourner
            if (filData.length > 0) {
                res.status(200).json(filData);
            } else {
                // Aucun post trouvé
                res.status(404).json({ msg: "No popular movies found" });
            }
        } catch (error) {
            console.error("Error fetching popular posts:", error);
            res.status(500).json({ msg: "An error occurred while fetching popular posts" });
        }
    });

}