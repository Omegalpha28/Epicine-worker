const { Schema, Model } = require("../../bdd/sql-connector");
// const { String, Number } = Model.sqlTypeMap;

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
    token: {
        type: String,
        default: null
    }
});

module.exports = new Model("User", userSchema);