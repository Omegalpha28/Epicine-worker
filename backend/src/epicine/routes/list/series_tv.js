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

    app.get('/api/serie/:movieId/recommendations', async (req, res) => {

        const { movieId } = req.params;
        const url = `https://api.themoviedb.org/3/tv/${movieId}/recommendations?language=en-US`;
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
            console.error('Erreur lors de la récupération des crédits :', error);
            res.status(500).json({ message: 'Erreur lors de la récupération des crédits.' });
        }
    });

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

    app.get('/api/serie/:serieId/providers', async (req, res) => {
        const { serieId } = req.params;
        const url = `https://api.themoviedb.org/3/tv/${serieId}/watch/providers?language=en-US`;
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
            console.error('Erreur lors de la récupération des distributeurs :', error);
            res.status(500).json({ message: 'Erreur lors de la récupération des distributeurs.' });
        }
    });


    app.get('/api/serie/:serieId/:seasonID/:episodeID/episodes/images', async (req, res) => {
        const { serieId, seasonID, episodeID } = req.params;
        const url = `https://api.themoviedb.org/3/tv/${serieId}/season/${seasonID}/episode/${episodeID}/images?language=en-US`;
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
            console.error('Erreur lors de la récupération des distributeurs :', error);
            res.status(500).json({ message: 'Erreur lors de la récupération des distributeurs.' });
        }
    });

    app.get('/api/serie/:serieId/:seasonID/seasons', async (req, res) => {
        const { serieId, seasonID } = req.params;
        const url = `https://api.themoviedb.org/3/tv/${serieId}/season/${seasonID}?language=en-US`;
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
            console.error('Erreur lors de la récupération des distributeurs :', error);
            res.status(500).json({ message: 'Erreur lors de la récupération des distributeurs.' });
        }
    });

    app.get('/api/serie/:serieId/videos', async (req, res) => {

        const { movieId } = req.params;
        const url = `https://api.themoviedb.org/3/tv/${serieId}/videos?language=en-US`;
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
            console.error('Erreur lors de la récupération des vidéos :', error);
            res.status(500).json({ message: 'Erreur lors de la récupération des vidéos.' });
        }
    });

    app.get('/api/serie/:movieId/credits', async (req, res) => {

        const { movieId } = req.params;
        const url = `https://api.themoviedb.org/3/tv/${movieId}/credits?language=en-US`;
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
            console.error('Erreur lors de la récupération des crédits :', error);
            res.status(500).json({ message: 'Erreur lors de la récupération des crédits.' });
        }
    });

    app.get('/api/tv/:serieId', async (req, res) => {
        const { serieId } = req.params;
        const url = `https://api.themoviedb.org/3/tv/${serieId}?language=en-US`;
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