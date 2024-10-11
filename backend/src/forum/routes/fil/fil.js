const { updateFil } = require("../../../../core/data/config.function");
const { Fil } = require("../../../../core/data/models");
const auth = require("../../../epicine/middleware/auth");
const { error } = require("../../../utils/Logger");

module.exports = async function(client, app, bcrypt) {
    app.post("/add/fil", auth, async (req, res) => {
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

    app.put("/update/fil", auth, async (req, res) => {
        const {fil_id, auteur, title, description} = req.body;
        
        if (!(await Fil.findOne({title: title})).data.open) res.status(400).json({"msg": "Le fil est fermé"});
        else {
            if (await updateFil(client, {id: fil_id, auteur: auteur, title: title, description: description})) res.status(200).json({"msg": "Fil mis à jour"});
            else res.status(500).json({"msg": "Internal server error"});
        }
    })

    app.post("/close/fil", auth, async (req, res) => {
        const {fil_id, auteur} = req.body;

        if (await updateFil(client, {id: fil_id, auteur: auteur, open: 0})) res.status(200).json({"msg": "Fil fermé"});
        else res.status(500).json({"msg": "Internal server error"});
    });
    app.delete("/remove/fil", auth, async (req, res) => {
        const { fil_id } = req.body;

        if ((await Fil.deleteOne({ id: fil_id })).data) res.status(200).json({"msg": "Fil supprimé"});
        else res.status(500).json({"msg": "Internal server error"});
    })
}
