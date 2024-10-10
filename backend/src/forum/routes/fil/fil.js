const { updateFil } = require("../../../../core/data/config.function");
const { Fil } = require("../../../../core/data/models");
const auth = require("../../../epicine/middleware/auth");

module.exports = async function(client, app, bcrypt) {
    app.get("get/fil/popular", async (req, res) => {
        FilData = await Fil.customRequest("SELECT Fil.id,Fil.titre,Fil.description,SUM(IFNULL(Likes.type,0)) AS somme FROM Message LEFT Join Likes ON Likes.id_message=Message.id JOIN Fil ON Fil.id=Message.id_fil GROUP BY Fil.id ORDER BY somme DESC LIMIT 10");

        if (FilData) res.status(200).json(FilData);
        else res.status(404).json({ "msg": "No popular movies found" });
    });

    app.post("/add/fil", auth, async (req, res) => {
        const { title, film_id, description } = req.body;
        const filData = (await Fil.findOne({title: title})).data;

        if (title == filData.title) res.status(409).json({"msg": "Ce titre de fil existe déjà"});
        if (filData == undefined && await Fil.save({ film_id: film_id, title: title, description: description, auteur: req.uuiduser }))
            res.status(200).json({"msg": "Fil créé"});
        else res.status(500).json({"msg": "Internal server error"});
    });

    app.put("/update/fil", auth, async (req, res) => {
        const {fil_id, auteur} = req.body;
        if (await updateFil(client, fil_id, auteur)) res.status(200).json({"msg": "Fil mis à jour"});
        else res.status(500).json({"msg": "Internal server error"});
    })

    app.delete("/remove/fil", auth, async (req, res) => {
        const { fil_id } = req.body;

        if (await Fil.deleteOne({ id: fil_id })) res.status(200).json({"msg": "Fil supprimé"});
        else res.status(500).json({"msg": "Internal server error"});
    })
}
