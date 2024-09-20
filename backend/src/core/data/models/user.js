const { Schema, Model } = require("../../bdd/sql-connector");

const userSchema = new Schema({
    id: {
        type: Number,
        unique: true,
        auto_increment: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String
    },
    telephone: {
        type: String,
        unique: true,
        default: null
    },
    birthday: {
        type: String,
        default: ""
    }
});

module.exports = new Model("User", userSchema);