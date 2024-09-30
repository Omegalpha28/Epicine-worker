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
            // console.log(`Fetching ${type} from TMDB...`); // Commenté ou supprimé
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: `Bearer ${TMDB_API_KEY}`,
                },
            });

            // console.log(`Response status: ${response.status}`); // Commenté ou supprimé

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            // console.log("Data received:", data); // Commenté ou supprimé
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


    async function getLatestReleases() {
        const discoverUrl = `https://api.themoviedb.org/3/discover/movie?language=en-FR`;
        const releaseDatesMap = {};

        console.log(`____________________________________________________`);
        console.log(`Début de la récupération des films...`);
        console.log(`URL de découverte : ${discoverUrl}`);
        console.log(`____________________________________________________`);

        try {
            const response = await fetch(discoverUrl, {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: `Bearer ${TMDB_API_KEY}`,
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const { results } = await response.json();
            console.log(`Nombre de films récupérés : ${results.length}`);
            console.log(`____________________________________________________`);

            // Obtenir la date limite pour les 30 derniers jours
            const thirtyDaysAgo = new Date();
            thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
            console.log(`Date limite pour les 30 derniers jours : ${thirtyDaysAgo.toISOString().split('T')[0]}`);
            console.log(`____________________________________________________`);

            // Parcourir tous les films et récupérer leurs dates de sortie
            for (const movie of results) {
                console.log(`Récupération des dates de sortie pour le film : ${movie.title} (ID : ${movie.id})`);
                const releaseUrl = `https://api.themoviedb.org/3/movie/${movie.id}/release_dates?language=en-FR`;
                console.log(`URL des dates de sortie : ${releaseUrl}`);

                const releaseResponse = await fetch(releaseUrl, {
                    method: 'GET',
                    headers: {
                        accept: 'application/json',
                        Authorization: `Bearer ${TMDB_API_KEY}`,
                    },
                });

                if (!releaseResponse.ok) {
                    console.error(`Erreur lors de la récupération des dates de sortie pour ${movie.title}: HTTP error! status: ${releaseResponse.status}`);
                    continue; // Continuer avec le prochain film
                }

                const releaseData = await releaseResponse.json();
                console.log(`Réponse reçue pour ${movie.title}:`, releaseData);
                console.log(`____________________________________________________`);

                if (releaseData && releaseData.results) {
                    let foundReleaseDate = false;

                    // Afficher les pays disponibles et leurs dates de sortie
                    console.log(`Analyse des dates de sortie pour ${movie.title}:`);
                    releaseData.results.forEach((entry) => {
                        console.log(`  - Pays : ${entry.iso_3166_1}, Dates de sortie disponibles : ${entry.release_dates.length}`);

                        entry.release_dates.forEach(releaseDateEntry => {
                            const releaseDateStr = releaseDateEntry.release_date;
                            console.log(`    - Date de sortie trouvée : ${releaseDateStr}`);

                            // Vérifier que la date est valide
                            const releaseDateObj = new Date(releaseDateStr);
                            if (!isNaN(releaseDateObj.getTime())) {
                                // Format de la date en YYYY-MM-DD
                                const formattedReleaseDate = releaseDateObj.toISOString().split('T')[0];

                                // Vérifier si la date de sortie est dans les 30 derniers jours ou dans le futur
                                if (releaseDateObj >= thirtyDaysAgo && !foundReleaseDate) {
                                    // Prendre seulement la première date trouvée pour éviter les doublons
                                    releaseDatesMap[movie.id] = {
                                        movieId: movie.id,
                                        title: movie.title,
                                        releaseDate: formattedReleaseDate, // Utiliser le format YYYY-MM-DD
                                        poster_path: movie.poster_path,
                                    };
                                    foundReleaseDate = true; // On a trouvé une date valide

                                    // Print des informations sur le film et sa date de sortie
                                    console.log(`    - Film : ${movie.title}`);
                                    console.log(`      Date de sortie : ${formattedReleaseDate}`);
                                    console.log(`      Affiche : https://image.tmdb.org/t/p/w500${movie.poster_path}`);
                                    console.log(`____________________________________________________`);
                                } else {
                                    console.log(`    - Date ${formattedReleaseDate} ne correspond pas aux critères.`);
                                }
                            } else {
                                console.warn(`    - Date invalide pour ${movie.title} : ${releaseDateStr}`);
                            }
                        });
                    });
                } else {
                    console.warn(`Aucune date de sortie trouvée pour ${movie.title}`);
                }
            }

            // Trier par date de sortie la plus récente
            const releaseDatesArray = Object.values(releaseDatesMap);
            console.log(`____________________________________________________`);
            console.log(`Total des dates de sortie récupérées : ${releaseDatesArray.length}`);
            console.log(`____________________________________________________`);

            // Trier par date de sortie de la plus récente à la plus ancienne
            releaseDatesArray.sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate));

            // Sélectionner uniquement les 50 films les plus récents
            const latestReleases = releaseDatesArray.slice(0, 50);
            console.log(`Films sélectionnés (les 50 plus récents) :`);
            latestReleases.forEach((movie) => {
                console.log(`Titre : ${movie.title}, Date de sortie : ${movie.releaseDate}, ID : ${movie.movieId}`);
            });
            console.log(`____________________________________________________`);

            return latestReleases;

        } catch (error) {
            console.error('Erreur lors de la récupération des données :', error);
            throw new Error('Erreur lors de la récupération des données.');
        }
    }

    // Route pour appeler la fonction via le frontend
    app.get('/api/latest-releases', async (req, res) => {
        try {
            const releases = await getLatestReleases();
            res.json(releases);
        } catch (error) {
            res.status(500).json({ message: 'Erreur lors de la récupération des dernières sorties.' });
        }
    });

};

