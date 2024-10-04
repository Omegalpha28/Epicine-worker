const express = require('express');
const fetch = require('node-fetch');
const app = express();

module.exports = (client, app, bcrypt) => {
    const TMDB_API_KEY = process.env.TOKEN;

    app.get('/api/genres', async (req, res) => {
        const url = `https://api.themoviedb.org/3/genre/tv/list?language=en-US`;

        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${TMDB_API_KEY}`,
            },
        };

        try {
            const response = await fetch(url, options);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const data = await response.json();
            res.json(data.genres);
        } catch (error) {
            console.error('Erreur lors de la récupération des genres :', error);
            res.status(500).json({ message: 'Erreur lors de la récupération des genres.' });
        }
    });

    // Route pour récupérer les séries par genre et par page
    app.get('/api/tv/:genreId/:page', async (req, res) => {
        const { genreId, page } = req.params;
        const url = `https://api.themoviedb.org/3/discover/tv?with_genres=${genreId}&language=en-US&page=${page}`;

        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${TMDB_API_KEY}`,
            },
        };

        try {
            const response = await fetch(url, options);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const data = await response.json();
            res.json(data);
        } catch (error) {
            console.error('Erreur lors de la récupération des séries :', error);
            res.status(500).json({ message: 'Erreur lors de la récupération des séries.' });
        }
    });

    // Route pour récupérer toutes les séries par page
    app.get('/api/tv', async (req, res) => {
        const { page = 1 } = req.query;
        const url = `https://api.themoviedb.org/3/discover/tv?language=en-US&page=${page}`;

        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${TMDB_API_KEY}`,
            },
        };

        try {
            const response = await fetch(url, options);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const data = await response.json();
            res.json(data);
        } catch (error) {
            console.error('Erreur lors de la récupération des séries :', error);
            res.status(500).json({ message: 'Erreur lors de la récupération des séries.' });
        }
    });
};