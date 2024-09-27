const { Schema, Model, sqlType } = require("../../bdd/sql-connector");

const moviesSchema = new Schema({
    adult: Boolean,
    backdrop_path: String,
    genre_ids: Array,
    id: Number,
    original_language: String,
    original_title: String,
    overview: String,
    popularity: sqlType.Float,
    poster_path: String,
    release_date: String,
    title: String,
    video: Boolean,
    vote_average: sqlType.Float,
    vote_count: Number
});

module.exports = new Model("Movies", moviesSchema);