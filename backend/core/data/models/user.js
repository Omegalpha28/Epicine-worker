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
        type: String,  // Assurez-vous que le format date soit respecté (YYYY-MM-DD)
        default: null
    },
    gender: {
        type: String,  // Vous pouvez utiliser un ENUM ou simplement des strings comme "male", "female", "other"
        default: null
    },
    status: {
        type: Number,
        default: 0
    }
});

module.exports = new Model("User", userSchema);
