const { Schema, Model } = require("../../bdd/sql-connector");

const favoriteSchema = new Schema({
    userUUID: {
        type: String,
        unique: true,
        length: 36
    },
    film_id: Number
});

module.exports = new Model("Favorite", favoriteSchema);