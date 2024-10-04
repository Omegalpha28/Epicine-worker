const { Schema, Model } = require("../../bdd/sql-connector");

const favoriteSchema = new Schema({
    userUUID: {
        type: String,
        unique: true,
        length: 36,
        required: true,
        foreignKey: "User(uuid)",
    },
    film_id: {
        type: Number,
        required: true
    }
});

module.exports = new Model("Favorite", favoriteSchema);