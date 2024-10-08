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
        type: String,  // Format date (YYYY-MM-DD)
        default: null
    },
    gender: {
        type: String,  // "male", "female", "other"
        default: null
    },
    avatar: {
        type: String,
        default: null,
        unique: true
    },
    banner: {
        type: String, // URL ou identifiant de la bannière
        default: null
    },
    bio: {
        type: String,
        default: null
    },
    status: {
        type: Number,
        default: 0
    }
});

module.exports = new Model("User", userSchema);
