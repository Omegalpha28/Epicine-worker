const express = require('express');
const fetch = require('node-fetch');
const app = express();

module.exports = (client, app, bcrypt) => {
    const TMDB_API_KEY = process.env.TOKEN;

    // Dans movie_tv.js (ou le fichier approprié)
    app.get('/api/movie/:movieId', async (req, res) => {
        const { movieId } = req.params;
        const url = `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`;

        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${TMDB_API_KEY}`, // Utilisez la clé d'API du serveur
            },
        };

        try {
            const response = await fetch(url, options);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const data = await response.json();
            res.json(data);
        } catch (error) {
            console.error('Erreur lors de la récupération des données :', error);
            res.status(500).json({ message: 'Erreur lors de la récupération des données.' });
        }
    });
};
