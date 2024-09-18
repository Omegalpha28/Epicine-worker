const { Schema, Model } = require("../../bdd/sql-connector");

const userSchema = new Schema({
    id: Number,
    name: String,
    email: String,
    birthday: String
});

module.exports = new Model("User", userSchema);