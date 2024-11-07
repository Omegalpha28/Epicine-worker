const { Schema, Model, sqlType } = require("../../bdd/sql-connector");

const reactionsSchema = new Schema({
    reaction_uuid: {
        type: String,
        length: 36,
        required: true
    },
    id_event: {
        type: String,
        required: true
    },
    type_event: {
        type: String,
        required: true
    },
    reaction: {
        type: sqlType.Array,
        required: true
    },
    nb_interactions: Number,
    auteurs: {
        type: sqlType.Array,
        required: true
    }
})

module.exports = new Model("Reactions", reactionsSchema);