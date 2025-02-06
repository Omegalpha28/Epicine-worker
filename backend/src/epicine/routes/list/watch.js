const { getWatchList, addWatchList, removeWatchList, getWatchListUnique } = require("../../../core/data/config.function");
const auth = require("../../middleware/auth")

module.exports = async function(client, app, bcrypt) {
    app.get("/get/watchlist", auth, async (req, res)=> {
        const uuid = req.uuiduser;
        const watchData = (await getWatchList(client, {userUUID: uuid})).data;

        if (watchData) res.status(200).json(watchData);
        else res.status(404).json({"msg": "Internal server erro"});
    })
    app.put("/add/watchlist", auth, async (req, res) => {
        const uuid = req.uuiduser;
        const film_id = req.body["film_id"];
        const watchData = (await getWatchListUnique(client, {userUUID: uuid, film_id: film_id})).data;

        if (!watchData) {
            if (!(await addWatchList(client, uuid, film_id)))
                res.status(404).json({"msg": "Internal server error"});
            else
                res.status(200).json({"msg": "added"});
        }
        else res.status(404).json({"msg": "Internal server error"});
    });

    app.delete("/remove/watchlist", auth, async (req, res) => {
        const uuid = req.uuiduser;
        const film_id = req.body["film_id"];
        const watchData = (await getWatchListUnique(client, {userUUID: uuid, film_id: film_id})).data;

        if (watchData) {
            if (!(await removeWatchList(client, uuid, film_id)))
                res.status(404).json({"msg": "Internal server error"});
            else
                res.status(200).json({"msg": "removed"});
        }
        else res.status(404).json({"msg": "Internal server error"});
    })
}