const { getLikeUnique, addLike, getLike, removeLike } = require("../../../../core/data/config.function");
const auth = require("../../../middleware/auth");

module.exports = async function(client, app, bcrypt) {
    app.put("/add/like", auth, async (req, res) => {
        const uuid = req.uuiduser;
        const {item_id, type, value} = req.body;
        const likeData = (await getLikeUnique(client, {userUUID: uuid, item_id: item_id, type: type})).data;

        if (!likeData) {
            if (!(await addLike(client, {userUUID: uuid, item_id: item_id, type: type, value: value})))
                res.status(404).json({"msg": "Internal server error"});
            else
                res.status(201).json({"msg": "added"});
        }
        else res.status(404).json({"msg": "Internal server error"});
    });
    app.get("/get/like", auth, async (req, res) => {
        const uuid = req.uuiduser;
        const item_id = req.query.item_id;
        let likesData;

        if (!item_id) likesData = (await getLike(client, {userUUID: uuid})).data;
        else likesData = (await getLikeUnique(client, {userUUID: uuid, item_id: item_id})).data;

        if (likesData) res.status(200).json(likesData);
        else res.status(404).json({"msg": "Internal server error"});
    });
    app.delete("/delete/like", auth, async (req, res) => {
        const uuid = req.uuiduser;
        const item_id = req.body.item_id;
        const likeData = (await getLikeUnique(client, {userUUID: uuid, item_id: item_id})).data;

        if (likeData) {
            if (!(await removeLike(client, {userUUID: uuid, item_id: item_id})))
                res.status(404).json({"msg": "Internal server error"});
            else
                res.status(200).json({"msg": "removed"});
        }
        else res.status(404).json({"msg": "Internal server error"});
    })
}