const { Schema, sqlType, Model } = require("../../bdd/sql-connector");

const tvSchema = new Schema({
    adult: {
        type: Boolean,
        required: true,
    },
    backdrop_path: {
        type: sqlType.Text,
        required: true,
    },
    genre_ids: {
        type: sqlType.Array,
        required: true,
    },
    id: {
        type: Number,
        required: true,
    },
    origin_country: {
        type: sqlType.Array,
        required: true,
    },
    original_language: {
        type: sqlType.Text,
        required: true,
    },
    original_name: {
        type: sqlType.Text,
        required: true,
    },
    overview: {
        type: sqlType.Text,
        required: true,
    },
    popularity: {
        type: sqlType.Float,
        required: true,
    },
    poster_path: {
        type: sqlType.Text,
        required: true,
    },
    first_air_date: {
        type: sqlType.Text,
        required: true,
    },
    name: {
        type: sqlType.Text,
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