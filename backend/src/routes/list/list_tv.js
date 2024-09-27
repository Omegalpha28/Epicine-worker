const express = require('express');
const fetch = require('node-fetch');
const app = express();

module.exports = (client, app, bcrypt) => {
    const TMDB_API_KEY = process.env.TOKEN;

    app.get('/api/:type/popular', async (req, res) => {
        const { type } = req.params;
        let url;

        if (type === "movies") {
            const subType = req.query.subType || "popular";
            url = `https://api.themoviedb.org/3/movie/${subType}?language=en-US&page=1`;
        } else if (type === "series") {
            url = `https://api.themoviedb.org/3/tv/popular?language=en-US&page=1`;
        } else {
            return res.status(400).json({ message: 'Invalid type. Use "movies" or "series".' });
        }

        try {
            console.log(`Fetching ${type} from TMDB...`);
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: `Bearer ${TMDB_API_KEY}`,
                },
            });

            console.log(`Response status: ${response.status}`);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log("Data received:", data);
            res.json(data);
        } catch (error) {
            console.error('Erreur lors de la récupération des données :', error);
            res.status(500).json({ message: 'Erreur lors de la récupération des données.' });
        }
    });

    app.get('/api/:type/trending', async (req, res) => {
        const { type } = req.params;
        const { period } = req.query;
        let url;

        if (type === "movies") {
            url = `https://api.themoviedb.org/3/trending/movie/${period}?language=en-US`;
        } else if (type === "series") {
            url = `https://api.themoviedb.org/3/trending/tv/${period}?language=en-US`;
        } else {
            return res.status(400).json({ message: 'Invalid type. Use "movies" or "series".' });
        }

        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: `Bearer ${TMDB_API_KEY}`,
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            res.json(data);
        } catch (error) {
            console.error('Erreur lors de la récupération des données :', error);
            res.status(500).json({ message: 'Erreur lors de la récupération des données.' });
        }
    });

};

