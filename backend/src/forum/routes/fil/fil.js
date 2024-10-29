const { updateFil } = require("../../../../core/data/config.function");
const { Fil } = require("../../../../core/data/models");
const auth = require("../../../epicine/middleware/auth");
const { error } = require("../../../utils/Logger");

module.exports = async function(client, app, bcrypt) {
    app.put("/add/fil", auth, async (req, res) => {
        const { title, film_id, description } = req.body;
        const filData = (await Fil.findOne({title: title})).data;
        
        try {
            if (filData != undefined && title == filData.title) res.status(409).json({"msg": "Ce titre de fil existe déjà"});
            else {
                if (filData == undefined && await Fil.save({ film_id: film_id, title: title, description: description, auteur: req.uuiduser }))
                    res.status(200).json({"msg": "Fil créé"});
                else
                    res.status(500).json({"msg": "Internal server error"});
            }
        }
        catch (err) {
            error(err);
            throw new Error(`Error add fil: ${err}`);
        }
    });

    app.post("/update/fil", auth, async (req, res) => {
        const {fil_id, title, description} = req.body;
        
        if (!(await Fil.findOne({title: title})).data.open) res.status(400).json({"msg": "Le fil est fermé"});
        else {
            if (await updateFil(client, req.uuiduser, {id: fil_id, title: title, description: description})) res.status(200).json({"msg": "Fil mis à jour"});
            else res.status(500).json({"msg": "Internal server error"});
        }
    })

    app.post("/close/fil", auth, async (req, res) => {
        const {fil_id} = req.body;
        if ((await Fil.count({id: fil_id})).data[0].count && await updateFil(client, req.uuiduser, {id: fil_id, open: 0})) res.status(200).json({"msg": "Fil fermé"});
        else res.status(500).json({"msg": "Internal server error"});
    });
    app.delete("/remove/fil", auth, async (req, res) => {
        const { fil_id } = req.body;
        const filData = (await Fil.findOne({ id: fil_id })).data
        
        if (filData != undefined) {
            if (filData.open == 1) res.status(400).json({"msg": "Il faut fermer le fil"});
            else {
                if (await Fil.delete({ id: fil_id })) res.status(200).json({"msg": "Fil supprimé"});
                else res.status(500).json({"msg": "Internal server error"});
            }
        }
        else res.status(500).json({"msg": "Internal server error"});
    });
    app.get("/get/fil/nb", async (req, res) => {
        try {
            res.status(200).json((await Fil.count()).data);
        } catch (error) {
            error(err);
            throw new Error(`Error get fil nb: ${err}`);
        }
    });
    app.get("/get/fil", async (req, res) => {
        const { page, limit } = req.body;
        try {
            var filData = (await Fil.customRequest(`SELECT Fil.id, Fil.film_id,Fil.title,Fil.description FROM Fil LIMIT ${limit} OFFSET ${limit * (page - 1)}`)).data;
            res.status(200).json(filData);
        } catch (err) {
            error(err);
            throw new Error(`Error get fil: ${err}`);
        }
    })
    app.get("/get/search/fil", async (req, res) => {
        const { recherche } = req.body;
        var filData = (await Fil.customRequest(`SELECT A.id_fil,A.titre_fil,A.description_fil,SUM(IFNULL(LikesMessage.type,0)) AS somme FROM (SELECT DISTINCT Fil.id AS id_fil, Fil.title AS titre_fil, Fil.description AS description_fil FROM Message RIGHT JOIN Fil ON Fil.id=Message.id_fil WHERE INSTR(Fil.title, '${recherche}')!=0 OR INSTR(Fil.description, '${recherche}')!=0 OR INSTR(Message.text, '${recherche}')!=0 ) AS A LEFT JOIN Message ON A.id_fil=Message.id_fil LEFT JOIN LikesMessage ON LikesMessage.id_message=Message.id GROUP BY A.id_fil ORDER BY somme DESC`));

        res.status(200).json(filData.data);
    });
}
