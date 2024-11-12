const { Publication } = require("../../../../core/data/models");

module.exports = async function(client, app, bcrypt) {
    app.get("/get/public/publication", async (req, res) => {
        const { id } = req.body;
        const pubData = (await Publication.customRequest("SELECT * FROM Publication")).data;
        res.status(200).json(pubData);
    })
}