const { Schema, Model } = require("../../bdd/sql-connector");

const likesMessageSchema = new Schema({
    id: {
        type: Number,
        auto_increment: true,
        customize: "PRIMARY KEY"
    },
    id_message: {
        type: Number,
        foreignKey: "Message(id)"
    },
    auteur: {
        type: String,
        length: 36,
        foreignKey: "User(uuid)"
    },
    type: {
        type: Number,
        required: true
    }
});

module.exports = new Model("LikesMessage", likesMessageSchema);