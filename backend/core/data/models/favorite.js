const { Schema, Model } = require("../../bdd/sql-connector");

const favoriteSchema = new Schema({
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
    is_view: {
        type: Boolean,
        required: true,
        default: 0
    },
});

module.exports = new Model("Favorite", favoriteSchema);