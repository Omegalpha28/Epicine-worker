const { Schema, Model } = require("../../bdd/sql-connector");

const likesSchema = new Schema({
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

module.exports = new Model("Likes", likesSchema);