const { Fil } = require("../../../../core/data/models");

module.exports = async function(client, app, bcrypt) {
    app.get("/get/fil/popular", async (req, res) => {
        var filData = (await Fil.customRequest("SELECT Fil.id,Fil.title,Fil.description,SUM(IFNULL(Likes.type,0)) AS somme FROM Message LEFT Join Likes ON Likes.id_message=Message.id JOIN Fil ON Fil.id=Message.id_fil GROUP BY Fil.id ORDER BY somme DESC LIMIT 10")).data;

        if (filData.length != 0) res.status(200).json(filData);
        else {
            filData = (await Fil.customRequest("SELECT Fil.id,Fil.title,Fil.description FROM Fil LIMIT 10")).data;

            if (filData.length != 0) res.status(200).json(filData);
            else res.status(404).json({ "msg": "No popular movies found" });
        }
    });
}