import React, { useState, useEffect } from "react";
import styles from "./Popular.module.css";
import { Link } from "react-router-dom";
import { useMoviePage } from "../../MovePage/MovePage";

export const Popular = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [myType, setMyType] = useState('movie');
    const { activeMovieId, handleMovieClick } = useMoviePage();

    useEffect(() => {
        fetchContent('movies', 'popular');
        setMyType('movies');
    }, []);

    const fetchContent = async (type, subType) => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`http://localhost:5555/api/${type}/popular?subType=${subType}`);
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
            }
            const data = await response.json();
            setMovies(data.results);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.box}>
            <div className={styles.main_box}>
                <div className={styles.header}>
                    <h1 className={styles.title_box}>Popular</h1>
                    <div className={styles.categories}>

                        <button className={styles.streaming} onClick={() => { setMyType('movies'); fetchContent('movies', 'popular'); }} >
                            Streaming
                        </button>
                        <button className={styles.television} onClick={() => { setMyType('series'); fetchContent('series'); }} >
                            Television
                        </button>
                        <button className={styles.to_rent} onClick={() => { setMyType('movies'); fetchContent('movies', 'now_playing'); }} >
                            To rent
                        </button>
                        <button className={styles.cinema} onClick={() => { setMyType('movies'); fetchContent('movies', 'upcoming'); }} >
                            Cinema
                        </button>
                    </div>
                </div>
                <div className={styles.inside_box}>
                    {loading ? (
                        <h1>Loading...</h1>
                    ) : error ? (
                        <h1>{error}</h1>
                    ) : movies.length > 0 ? (
                        <div className={styles.movie_list}>
                            {movies.map((movie) => {
                                return (
                                    <div key={movie.id} className={styles.movie_item} onClick={() => handleMovieClick(movie.id)}>
                                        <Link to={`/${myType}/${movie.id}`}>
                                            <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title || movie.name} />
                                        </Link>
                                        <h3 className={styles.movie_title}>{movie.title || movie.name}</h3>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <h1>No Movies Available</h1>
                    )}
                </div>
            </div>
        </div>
    );
};

