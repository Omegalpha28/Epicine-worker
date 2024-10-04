const { Schema, Model } = require("../../bdd/sql-connector");

const watchlistSchema = new Schema({
    userUUID: {
        type: String,
        unique: true,
        length: 36
    },
    film_id: Number
})

module.exports = new Model("WatchList", watchlistSchema);