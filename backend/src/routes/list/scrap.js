const fetch = require('node-fetch');
const { Tv } = require('../../core/data/models');
const { logs } = require('../../utils/Logger');

module.exports = async (client, app, bcrypt) => {
    const API_KEY = process.env.TOKEN;

    // Fonction pour récupérer les films populaires
    const getPopularMovies = async (page) => {
        try {
            const response = await fetch(`https://api.themoviedb.org/3/tv/popular?language=en-US&page=${page}`, {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: `Bearer ${API_KEY}`,
                },
            });
            if (!response.ok) {
                throw new Error('Erreur lors de la récupération des films populaires');
            }
            const data = await response.json();
            
            return data;
        } catch (error) {
            console.error('Erreur lors de la récupération des films populaires:', error);
            return [];
        }
    };

    const addMoviesToDatabase = async (movies) => {
        try {
            let _movies = undefined;
            const total = movies.total_pages;

            for (let page = 1; page <= total; page++) {
                _movies = (await getPopularMovies(page)).results;
                
                logs(`Page: ${page}/${total}`);
                for (const movie of _movies) {
                    await Tv.save({
                        adult: movie.adult,
                        backdrop_path: movie.backdrop_path,
                        genre_ids: movie.genre_ids,
                        id: movie.id,
                        origin_country: movie.origin_country,
                        original_language: movie.original_language,
                        original_name: movie.original_name,
                        overview: movie.overview,
                        popularity: movie.popularity,
                        poster_path: movie.poster_path,
                        first_air_date: movie.first_air_date,
                        name: movie.name,
                        vote_average: movie.vote_average,
                        vote_count: movie.vote_count
                    });
                }
            }
            console.log('Films ajoutés à la base de données avec succès');
        } catch (error) {
            console.error('Erreur lors de l\'ajout des films à la base de données:', error);
        }
    };

    // Appel de la fonction et traitement des données
    const movies = await getPopularMovies(1);
    await addMoviesToDatabase(movies);
};