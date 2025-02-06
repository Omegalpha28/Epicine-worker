const { getMessage, updateMessage } = require("../../../../core/data/config.function");

module.exports = async function(client, app, bcrypt) {
    app.post("/report/message", async (req, res) => {
        const {id, id_fil} = req.body
        const msgData = await getMessage(client, {id:id, id_fil:id_fil});

        if (msgData.data[0].report == 0) {
            if (await updateMessage(client, msgData.data[0].auteur, {id:id, id_fil:id_fil, report: 1}))
                res.status(200).json({"msg": "reported"});
            else res.status(500).json({"msg": "Internal server error"});
        }
        else res.status(200).json({"msg": "already reported"});
    })
}