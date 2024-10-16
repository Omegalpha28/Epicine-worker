const { addMessage, getMessageUnique, updateMessage, removeMessage } = require("../../../../core/data/config.function");
const auth = require("../../../epicine/middleware/auth")

module.exports = async function(client, app, bcrypt) {
    app.post("/add/message", auth, async (req, res) => {
        const {text, id_fil} = req.body

        if (await addMessage(client, {auteur: req.uuiduser, text:text, id_fil:id_fil}))
            res.status(201).json({"msg": "added"});
        else res.status(500).json({"msg": "Internal server error"});
    })
    app.get("/get/message", auth, async (req, res) => {
        const {id, id_fil} = req.body

        const msgData = await getMessageUnique(client, {id:id, id_fil:id_fil, auteur: req.uuiduser});
        res.status(200).json(msgData.data);
    })
    app.post("/update/message", auth, async (req, res) => {
        const {id, text} = req.body

        if (await updateMessage(client, req.uuiduser, {id:id, text:text}))
            res.status(200).json({"msg": "updated"});
        else res.status(500).json({"msg": "Internal server error"});
    })
    app.delete("/remove/message", auth, async (req, res) => {
        const {id, id_fil} = req.body

        if (await removeMessage(client, {id:id, id_fil:id_fil, auteur: req.uuiduser}))
            res.status(200).json({"msg": "deleted"});
        else res.status(500).json({"msg": "Internal server error"});
    })
}