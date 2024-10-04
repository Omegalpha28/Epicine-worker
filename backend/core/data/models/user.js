const { Schema, Model, sqlType } = require("../../bdd/sql-connector");

const userSchema = new Schema({
    uuid: {
        type: String,
        unique: true,
        length: 36
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
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
        default: null
    },
    avatar:{
        type: String,
        default: "1c9b0ad4-89ac-4324-94ad-a9a60ab77b9a",
    },
    status: {
        type: Number,
        default: 0
    }
});

module.exports = new Model("User", userSchema);