const { getWatchList, addWatchList } = require("../../../../core/data/config.function");
const auth = require("../../middleware/auth")

module.exports = async function(client, app, bcrypt) {
    app.post("/add/watchlist", auth, async (req, res) => {
        const uuid = req.body["uuid"];
        const film_id = req.body["film_id"];
        const watchData = (await getWatchList(client, {userUUID: uuid, film_id: film_id})).data;

        if (!watchData) {
            if (!(await addWatchList(client, uuid, film_id)))
                res.status(404).json({"msg": "Internal server error"});
            else
                res.status(200).json({"msg": "added"});
        }
        else res.status(404).json({"msg": "Internal server error"});
    })
}