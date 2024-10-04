const { Schema, Model, sqlType } = require("../../bdd/sql-connector");

const moviesSchema = new Schema({
    adult: {
        type: Boolean,
        required: true
    },
    backdrop_path: {
        type: String,
        required: true
    },
    genre_ids: {
        type: Array,
        required: true
    },
    id: {
        type: Number,
        required: true
    },
    original_language: {
        type: String,
        required: true
    },
    original_title: {
        type: String,
        required: true
    },
    overview: {
        type: String,
        required: true
    },
    popularity: sqlType.Float,
    poster_path: String,
    release_date: String,
    title: String,
    video: Boolean,
    vote_average: sqlType.Float,
    vote_count: Number
});

module.exports = new Model("Movies", moviesSchema);