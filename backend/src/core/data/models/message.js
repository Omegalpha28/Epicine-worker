const { Schema, sqlType, Model } = require("../../bdd/sql-connector");

const messageSchema = new Schema({
    id: {
        type: Number,
        auto_increment: true,
        customize: "PRIMARY KEY"
    },
    id_fil: {
        type: Number,
        foreignKey: "Fil(id)"
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

module.exports = new Model("Message", messageSchema);