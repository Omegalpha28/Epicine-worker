const auth = require("../../../epicine/middleware/auth")

module.exports = async function(client, app, bcrypt) {
    app.post("/add/message", auth, async (req, res) => {
        const {text, id_fil} = req.body

        if (await addMessage(client, {auteur: req.uuiduser, text:text, id_fil:id_fil}))
            res.status(201).json({"msg": "added"});
        else res.status(500).json({"msg": "Internal server error"});
    })
    app.get("/get/message", auth, async (req, res) => {
        const {id_fil} = req.body

        const msgData = await getMessage(client, {id_fil:id_fil});
        res.status(200).json(msgData);
    })
}