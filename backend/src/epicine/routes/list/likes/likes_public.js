const { Likes } = require("../../../../../core/data/models");

module.exports = async function (client, app, bcrypt) {
    app.get("/get/public/like", async (req, res) => {
        const item_id = req.body.item_id;
        Likes.count({item_id: item_id}).then((data) => {
            data["item_id"] = item_id;
            if (data) res.status(200).json(data);
            else res.status(404).json({"msg": "Internal server error"});
        })
    })
}