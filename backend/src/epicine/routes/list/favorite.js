const { getFavorite, removeFavorite, addFavorite, getFavoriteUnique } = require("../../../../core/data/config.function");
const auth = require("../../middleware/auth");

module.exports = async function(client, app, bcrypt) {
    app.get("/get/favorite", auth, async (req, res) => {
        const uuid = req.uuiduser
        const favData = (await getFavorite(client, {userUUID: uuid})).data;

        if (favData) {
            const favoritesByType = {};

            favData.forEach(favorite => {
                const type = favorite.type;
                if (!favoritesByType[type]) {
                    favoritesByType[type] = [];
                }
                favoritesByType[type].push(favorite);
            });
            res.status(200).json(favoritesByType);
        }
        else res.status(404).json({"msg": "Internal server erro"});
    })
    app.put("/add/favorite", auth, async (req, res) => {
        const uuid = req.uuiduser
        const {item_id, type, is_view} = req.body;

        const favData = (await getFavoriteUnique(client, {userUUID: uuid, item_id: item_id, type: type, is_view: is_view})).data;

        if (!favData) {
            if (!(await addFavorite(client, uuid, item_id, type, is_view)))
                res.status(404).json({"msg": "Internal server error"});
            else
                res.status(200).json({"msg": "added"});
        }
        else res.status(404).json({"msg": "Internal server error"});
    });

    app.delete("/remove/favorite", auth, async (req, res) => {
        const uuid = req.uuiduser
        const item_id = req.body["item_id"];
        const favData = (await getFavoriteUnique(client, {userUUID: uuid, item_id: item_id})).data;

        if (favData) {
            if (!(await removeFavorite(client, uuid, item_id)))
                res.status(404).json({"msg": "Internal server error"});
            else
                res.status(200).json({"msg": "removed"});
        }
        else res.status(404).json({"msg": "Internal server error"});
    })
}