const { Schema, Model } = require("../../bdd/sql-connector");

const watchlistSchema = new Schema({
    userUUID: {
        type: String,
        length: 36,
        required: true,
        foreignKey: "User(uuid)",
    },
    film_id: {
        type: Number,
        required: true
    }
})

module.exports = new Model("WatchList", watchlistSchema);