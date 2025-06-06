const { Schema, sqlType, Model } = require("../../bdd/sql-connector");

const sondageSchema = new Schema({
    id: {
        type: Number,
        auto_increment: true,
        customize: "PRIMARY KEY"
    },
    title: {
        type: sqlType.Text,
        required: true
    },
    text: {
        type: sqlType.Text,
        required: true
    },
    date: {
        type: sqlType.Timestamp,
        required: true,
        customize: "DEFAULT CURRENT_TIMESTAMP"
    },
    reactions: {
        type: sqlType.Object,
        default: null,
    },
    report: {
        type: Boolean,
        required: true,
        default: 0
    },
    auteur: {
        type: String,
        length: 36,
        foreignKey: "User(uuid)"
    }
})

module.exports = new Model("Publication", sondageSchema);