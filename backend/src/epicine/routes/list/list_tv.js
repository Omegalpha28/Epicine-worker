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

    async function getLatestReleases(type) {
        const discoverUrl = type === 'movie'
            ? `https://api.themoviedb.org/3/discover/movie?language=en-US`
            : `https://api.themoviedb.org/3/discover/tv?language=en-US`;
    
        const releaseDatesMap = {};
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 365);
    
        try {
            const response = await fetch(discoverUrl, {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: `Bearer ${TMDB_API_KEY}`,
                },
            });
    
            if (!response.ok) {
                throw new Error(`Erreur lors de la récupération des ${type === 'movie' ? 'films' : 'séries'} : ${response.status}`);
            }
    
            const results = await response.json();
    
            const getReleaseDates = async (results) => {
                for (const item of results) {
                    if (type === 'movie') {
                        const releaseUrl = `https://api.themoviedb.org/3/movie/${item.id}/release_dates?language=en-US`;
                        const releaseResponse = await fetch(releaseUrl, {
                            method: 'GET',
                            headers: {
                                accept: 'application/json',
                                Authorization: `Bearer ${TMDB_API_KEY}`,
                            },
                        });
    
                        if (!releaseResponse.ok) continue;
    
                        const releaseData = await releaseResponse.json();
    
                        if (releaseData && releaseData.results) {
                            let foundReleaseDate = false;
                            for (const entry of releaseData.results) {
                                if (entry.iso_3166_1 === "FR") {
                                    for (const releaseDateEntry of entry.release_dates) {
                                        if (releaseDateEntry.note === "") {
                                            const releaseDateStr = releaseDateEntry.release_date;
                                            const releaseDateObj = new Date(releaseDateStr);
                                            if (!isNaN(releaseDateObj.getTime()) && releaseDateObj < new Date()) {
                                                if (releaseDateObj >= thirtyDaysAgo && !foundReleaseDate) {
                                                    releaseDatesMap[item.id] = {
                                                        id: item.id,
                                                        title: item.title || item.name,
                                                        releaseDate: releaseDateObj.toISOString().split('T')[0],
                                                        poster_path: item.poster_path,
                                                    };
                                                    foundReleaseDate = true;
                                                    break;
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    } else {
                        // Traitement pour les séries
                        const releaseUrl = `https://api.themoviedb.org/3/tv/${item.id}?language=en-US`;
                        const releaseResponse = await fetch(releaseUrl, {
                            method: 'GET',
                            headers: {
                                accept: 'application/json',
                                Authorization: `Bearer ${TMDB_API_KEY}`,
                            },
                        });
    
                        if (!releaseResponse.ok) continue;
    
                        const releaseData = await releaseResponse.json();
                        if (releaseData && releaseData.first_air_date) {
                            const releaseDateObj = new Date(releaseData.first_air_date);
                            if (!isNaN(releaseDateObj.getTime()) && releaseDateObj >= thirtyDaysAgo) {
                                releaseDatesMap[item.id] = {
                                    id: item.id,
                                    title: releaseData.name,
                                    releaseDate: releaseDateObj.toISOString().split('T')[0],
                                    poster_path: releaseData.poster_path,
                                };
                            }
                        }
                    }
                }
            };
    
            await getReleaseDates(results.results);
    
            const releaseDatesArray = Object.values(releaseDatesMap);
            releaseDatesArray.sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate));
    
            const latestReleases = releaseDatesArray.slice(0, 100);
            return latestReleases;
    
        } catch (error) {
            throw new Error('Erreur lors de la récupération des données.');
        }
    }
    


    app.get('/api/latest-releases/:type', async (req, res) => {
        const type = req.params.type === 'movies' ? 'movie' : 'tv'; // 'movies' devient 'movie' et 'series' devient 'tv'
        try {
            const releases = await getLatestReleases(type);
            res.json(releases);
        } catch (error) {
            res.status(500).json({ message: 'Erreur lors de la récupération des dernières sorties.' });
        }
    });

    app.get('/api/:type/upcoming', async (req, res) => {
        const { type } = req.params;
        let url;

        if (type === "movies") {
            url = `https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1`;
        } else if (type === "series") {
            url = `https://api.themoviedb.org/3/tv/on_the_air?language=en-US&page=1`;
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

            // S'assurer d'afficher au moins 10 films ou séries à venir
            const upcomingItems = data.results.slice(0, 10);

            res.json(upcomingItems);
        } catch (error) {
            console.error('Erreur lors de la récupération des données :', error);
            res.status(500).json({ message: 'Erreur lors de la récupération des données.' });
        }
    });

    app.get('/api/:type/search', async (req, res) => {
        const { type } = req.params;
        const { query } = req.query;
        let url;

        if (!query) {
            return res.status(400).json({ message: 'Query is required for search.' });
        }

        if (type === "movies") {
            url = `https://api.themoviedb.org/3/search/movie?query=${query}&language=en-US&page=1`;
        } else if (type === "series") {
            url = `https://api.themoviedb.org/3/search/tv?query=${query}&language=en-US&page=1`;
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
            const searchResults = data.results.slice(0, 30);

            res.json(searchResults);
        } catch (error) {
            console.error('Erreur lors de la récupération des données :', error);
            res.status(500).json({ message: 'Erreur lors de la récupération des données.' });
        }
    });

};

