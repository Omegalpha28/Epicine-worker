const { getLikeUnique, addLike, getLike, removeLike } = require("../../../../core/data/config.function");
const auth = require("../../middleware/auth");

module.exports = async function(client, app, bcrypt) {
    app.post("/add/like", auth, async (req, res) => {
        const uuid = req.uuiduser;
        const film_id = req.body["film_id"];
        const likeData = (await getLikeUnique(client, {userUUID: uuid, film_id: film_id})).data;

        if (!likeData) {
            if (!(await addLike(client, {userUUID: uuid, film_id: film_id})))
                res.status(404).json({"msg": "Internal server error"});
            else
                res.status(201).json({"msg": "added"});
        }
        else res.status(404).json({"msg": "Internal server error"});
    });
    app.get("/get/like", auth, async (req, res) => {
        const uuid = req.uuiduser;
        const likesData = (await getLike(client, {userUUID: uuid})).data

        if (likesData) res.status(200).json(likesData);
        else res.status(404).json({"msg": "Internal server error"});
    });
    app.delete("/delete/like", auth, async (req, res) => {
        const uuid = req.uuiduser;
        const film_id = req.body.film_id;
        const likeData = (await getLikeUnique(client, {userUUID: uuid, film_id: film_id})).data;

        if (likeData) {
            if (!(await removeLike(client, {userUUID: uuid, film_id: film_id})))
                res.status(404).json({"msg": "Internal server error"});
            else
                res.status(200).json({"msg": "removed"});
        }
        else res.status(404).json({"msg": "Internal server error"});
    })
}