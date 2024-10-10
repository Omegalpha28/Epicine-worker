const express = require('express');
const fetch = require('node-fetch');
const { logs } = require('../../../utils/Logger');
const app = express();

module.exports = (client, app, bcrypt) => {
    const TMDB_API_KEY = process.env.TOKEN;

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

    app.get('/api/movies', async (req, res) => {
        const { page = 1 } = req.query;
        const url = `https://api.themoviedb.org/3/discover/movie?language=en-US&page=${page}`;

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
            console.error('Erreur lors de la récupération des films :', error);
            res.status(500).json({ message: 'Erreur lors de la récupération des films.' });
        }
    });

    app.get('/api/movies/:movieId/videos', async (req, res) => {

        const { movieId } = req.params;
        const url = `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`;
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

    app.get('/api/genres', async (req, res) => {
        const url = `https://api.themoviedb.org/3/genre/movie/list?language=en-US`;

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

    app.get('/api/movie/:movieId/credits', async (req, res) => {

        const { movieId } = req.params;
        const url = `https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US`;
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

    app.get('/api/movie/:movieId/recommendations', async (req, res) => {

        const { movieId } = req.params;
        const url = `https://api.themoviedb.org/3/movie/${movieId}/recommendations?language=en-US`;
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

    app.get('/api/movies/:genreId/:page', async (req, res) => {
        const { genreId, page } = req.params;
        const url = `https://api.themoviedb.org/3/discover/movie?with_genres=${genreId}&language=en-US&page=${page}`;

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
            console.error('Erreur lors de la récupération des films :', error);
            res.status(500).json({ message: 'Erreur lors de la récupération des films.' });
        }
    });
};
