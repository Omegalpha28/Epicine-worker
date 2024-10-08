const { Schema, sqlType, Model } = require("../../bdd/sql-connector");

const filschema = new Schema({
    id: {
        type: Number,
        auto_increment: true,
        customize: "PRIMARY KEY"
    },
    film_id: {
        type: Number,
        required: true
    },
    title: {
        type: String,
        required: true,
    },
    open: {
        type: Boolean,
        required: true,
        default: 1
    },
    description: {
        type: sqlType.Text,
        required: true
    },
    date: {
        type: sqlType.DateTime,
        required: true
    },
    auteur: {
        type: String,
        length: 36,
        foreignKey: "User(uuid)"
    }
})

module.exports = new Model("Fil", filschema);