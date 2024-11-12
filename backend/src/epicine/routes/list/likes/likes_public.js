const { Likes } = require("../../../../core/data/models");

module.exports = async function (client, app, bcrypt) {
    app.get("/get/public/like", async (req, res) => {
        const item_id = req.body.item_id;
        await Likes.count({item_id: item_id}).then(async (data) => {

            data["item_id"] = item_id;
            data.data[0]["dislike"] = (await Likes.count({item_id: item_id, value: -1})).data[0].count;
            data.data[0]["like"] = (await Likes.count({item_id: item_id, value: 1})).data[0].count;
            if (data) res.status(200).json(data);
            else res.status(404).json({"msg": "Internal server error"});
        })
    })
}