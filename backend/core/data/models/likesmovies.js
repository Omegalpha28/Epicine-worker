const { Schema, Model } = require("../../bdd/sql-connector");

const likesMoviesSchema = new Schema({
    userUUID: {
        type: String,
        length: 36,
        required: true,
        foreignKey: "User(uuid)",
    },
    item_id: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        required: true
    },
})

module.exports = new Model("LikesMovies", likesMoviesSchema);