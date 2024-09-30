import React, { useState, useEffect } from "react";
import styles from "./Trends.module.css";
import { useMoviePage } from "../../MovePage/MovePage";
import { Link } from "react-router-dom";


export const Trends = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { activeMovieId, handleMovieClick } = useMoviePage();


    useEffect(() => {
        fetchContent('movies', 'day');
    }, []);

    const fetchContent = async (type, period) => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`http://localhost:5555/api/${type}/trending?period=${period}`);
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
            }
            const data = await response.json();
            setMovies(data.results);
        } catch (err) {
            console.error(err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.box}>
            <div className={styles.main_box}>
                <div className={styles.header}>
                    <h1 className={styles.title_box}>Trends</h1>
                    <div className={styles.categories}>
                        <button className={styles.today} onClick={() => fetchContent('movies', 'day')}>Today</button>
                        <button className={styles.this_week} onClick={() => fetchContent('movies', 'week')}>This week</button>
                    </div>
                </div>
                <div className={styles.inside_box}>
                    {loading ? (
                        <h1>Loading...</h1>
                    ) : error ? (
                        <h1>{error}</h1>
                    ) : movies.length > 0 ? (
                        <div className={styles.movie_list}>
                            {movies.map((movie) => (
                                <div key={movie.id} className={styles.movie_item} onClick={() => handleMovieClick(movie.id)}>
                                    <Link to={`/Movie/${movie.id}`}>
                                        <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title || movie.name} />
                                    </Link>
                                    <h3 className={styles.movie_title}>{movie.title || movie.name}</h3>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <h1>No Movies Available</h1>
                    )}
                </div>
            </div>
        </div>
    );
};
