const { getFavorite, removeFavorite, addFavorite, getFavoriteUnique } = require("../../../../core/data/config.function");
const auth = require("../../middleware/auth");

module.exports = async function(client, app, bcrypt) {
    app.get("/get/favorite", auth, async (req, res) => {
        const uuid = req.uuiduser
        const favData = (await getFavorite(client, {userUUID: uuid})).data;

        if (favData) res.status(200).json(favData);
        else res.status(404).json({"msg": "Internal server erro"});
    })
    app.post("/add/favorite", auth, async (req, res) => {
        const uuid = req.uuiduser
        const film_id = req.body["film_id"];
        const favData = (await getFavoriteUnique(client, {userUUID: uuid, film_id: film_id})).data;

        if (!favData) {
            if (!(await addFavorite(client, uuid, film_id)))
                res.status(404).json({"msg": "Internal server error"});
            else
                res.status(200).json({"msg": "added"});
        }
        else res.status(404).json({"msg": "Internal server error"});
    });

    app.delete("/remove/favorite", auth, async (req, res) => {
        const uuid = req.uuiduser
        const film_id = req.body["film_id"];
        const favData = (await getFavoriteUnique(client, {userUUID: uuid, film_id: film_id})).data;

        if (favData) {
            if (!(await removeFavorite(client, uuid, film_id)))
                res.status(404).json({"msg": "Internal server error"});
            else
                res.status(200).json({"msg": "removed"});
        }
        else res.status(404).json({"msg": "Internal server error"});
    })
}