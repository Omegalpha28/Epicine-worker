const { getUser } = require("../../../../../core/data/config.function");
const { Publication } = require("../../../../../core/data/models");
const auth = require("../../../middleware/auth");

module.exports = async function(client, app, bcrypt) {
    app.put("/add/publication", auth, async (req, res) => {
        const {title, text} = req.body;
        const uuid = req.uuiduser;
        const userData = (await getUser(client, {uuid: uuid})).data;

        if (userData.status != 1) {
            res.status(401).json({"msg": "Unauthorized"});
            return;
        }
        if (title == undefined || text == undefined) {
            res.status(400).json({"msg": "title and text is required"});
            return;
        }
        if (title.length == 0 || text.length == 0) {
            res.status(400).json({"msg": "title and text is required"});
            return;
        }
        if (await Publication.save({title: title, text: text, auteur: uuid}))
            res.status(200).json({"msg": "Publication added"});
        else
            res.status(500).json({"msg": "Internal server error"});
    });
    app.get("/get/publication", auth, async (req, res) => {
        const uuid = req.uuiduser;
        const {id} = req.body;
        const userData = (await getUser(client, {uuid: uuid})).data;

        if (userData.status != 1) {
            res.status(401).json({"msg": "Unauthorized"});
            return;
        }
        const publications = (await Publication.findOne({id: id, auteur: uuid})).data;
        if (publications == undefined)
            res.status(404).json({"msg": "Publication not found"});
        else
            res.status(200).json(publications);
    });
    app.post("/update/publication", auth, async (req, res) => {
        const uuid = req.uuiduser;
        const {id, title, text} = req.body;
        const userData = (await getUser(client, {uuid: uuid})).data;

        if (userData.status != 1) {
            res.status(401).json({"msg": "Unauthorized"});
            return;
        }
        if (title == undefined || text == undefined) {
            res.status(400).json({"msg": "title and text is required"});
            return;
        }
        if (title.length == 0 || text.length == 0) {
            res.status(400).json({"msg": "title and text is required"});
            return;
        }
        const pubData = (await Publication.findOne({id: id, auteur: uuid}));
        if (pubData.data != undefined)
            delete pubData.data.date;
        if (await pubData.updateOne({title: title, text: text}))
            res.status(200).json({"msg": "Publication updated"});
        else
            res.status(500).json({"msg": "Internal server error"});
    })
}
