const { Schema, Model } = require("../../bdd/sql-connector");

const userSchema = new Schema({
    id: {
        type: Number,
        unique: true,
        auto_increment: true
    },
    name: String,
    email: String,
    telephone: {
        type: String,
        unique: true,
        default: ""
    },
    birthday: String
});

module.exports = new Model("User", userSchema);