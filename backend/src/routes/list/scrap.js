const fetch = require('node-fetch');
const { Movies } = require('../../core/data/models');

module.exports = async (client, app, bcrypt) => {
    const API_KEY = process.env.TOKEN;

    // Fonction pour récupérer les films populaires
    const getPopularMovies = async () => {
        try {
            const response = await fetch(`https://api.themoviedb.org/3/tv/popular?language=en-US&page=1`, {
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
            const _movies = movies.results;

            console.log(_movies[0]);
            // await tv
            // await Movies.save({
            //     adult: _movies[0].adult,
            //     backdrop_path: _movies[0].backdrop_path,
            //     genre_ids: _movies[0].genre_ids,
            //     id: _movies[0].id,
            //     original_language: _movies[0].original_language,
            //     original_title: _movies[0].original_title,
            //     overview: _movies[0].overview,
            //     popularity: _movies[0].popularity,
            //     poster_path: _movies[0].poster_path,
            //     release_date: _movies[0].release_date,
            //     title: _movies[0].title,
            //     video: _movies[0].video,
            //     vote_average: _movies[0].vote_average,
            //     vote_count: _movies[0].vote_count
            // });
            // for (const movie of _movies) {
            //     // await Movie.create({
            //     //     title: movie.title,
            //     //     overview: movie.overview,
            //     //     release_date: movie.release_date,
            //     //     // Ajoutez d'autres champs nécessaires
            //     // });
            // }
            console.log('Films ajoutés à la base de données avec succès');
        } catch (error) {
            console.error('Erreur lors de l\'ajout des films à la base de données:', error);
        }
    };
    // Appel de la fonction et traitement des données
    const movies = await getPopularMovies();
    await addMoviesToDatabase(movies);
};