const { Fil } = require("../../../../core/data/models");
const auth = require("../../../epicine/middleware/auth");

module.exports = async function(client, app, bcrypt) {
    app.get("/fil/popular", async (req, res) => {
        FilData = await Fil.customRequest("SELECT Fil.id,Fil.titre,Fil.description,SUM(IFNULL(Likes.type,0)) AS somme FROM Message LEFT Join Likes ON Likes.id_message=Message.id JOIN Fil ON Fil.id=Message.id_fil GROUP BY Fil.id ORDER BY somme DESC LIMIT 10");

        if (FilData) res.status(200).json(FilData);
        else res.status(404).json({ "msg": "No popular movies found" });
    });

    app.post("/add/fil", auth, async (req, res) => {
        const { title, description, auteur } = req.body;

        Fil.save({ title: title, description: description, auteur: auteur });
    });

    app.delete("/remove/fil", auth, async (req, res) => {
        const { id } = req.body;

        Fil.deleteOne({ id: id });
    })
}
