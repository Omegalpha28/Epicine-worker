const { getMessage } = require("../../../../core/data/config.function");

module.exports = async function(client, app, bcrypt) {
    app.get("/get/public/message", async (req, res) => {
        const {id_fil} = req.body

        const msgData = await getMessage(client, {id_fil:id_fil});
        res.status(200).json(msgData.data);
    });
}