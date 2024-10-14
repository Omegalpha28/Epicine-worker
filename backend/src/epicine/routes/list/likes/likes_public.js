const { LikesMovies } = require("../../../../../core/data/models");

module.exports = async function (client, app, bcrypt) {
    app.get("/get/public/like", async (req, res) => {
        const film_id = req.body.film_id;
        LikesMovies.count({film_id: film_id}).then((data) => {
            data["film_id"] = film_id;
            if (data) res.status(200).json(data);
            else res.status(404).json({"msg": "Internal server error"});
        })
    })
}