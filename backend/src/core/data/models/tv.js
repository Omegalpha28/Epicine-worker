const { Schema, sqlType, Model } = require("../../bdd/sql-connector");

const tvSchema = new Schema({
    adult: {
        type: Boolean,
        required: true,
    },
    backdrop_path: {
        type: String,
        required: true,
    },
    genre_ids: {
        type: Array,
        required: true,
    },
    id: {
        type: Number,
        required: true,
    },
    origin_country: {
        type: Array,
        required: true,
    },
    original_language: {
        type: String,
        required: true,
    },
    original_name: {
        type: String,
        required: true,
    },
    overview: {
        type: String,
        required: true,
    },
    popularity: {
        type: sqlType.Float,
        required: true,
    },
    poster_path: {
        type: String,
        required: true,
    },
    first_air_date: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    vote_average: {
        type: sqlType.Float,
        required: true,
    },
    vote_count: {
        type: Number,
        required: true,
    }
});

module.exports = new Model("Tv", tvSchema);