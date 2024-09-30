import React, { useState, useEffect, useRef } from "react";
import styles from "./Latest_Release.module.css";

export const Latest_Release = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const movieListRef = useRef(null);

    const fetchContent = async (type) => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`http://localhost:5555/api/latest-releases`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setMovies(data);
        } catch (err) {
            setError("Erreur lors de la récupération des données.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchContent('movies');
    }, []);

    const scrollLeft = () => {
        movieListRef.current.scrollBy({ left: -200, behavior: "smooth" });
    };

    const scrollRight = () => {
        movieListRef.current.scrollBy({ left: 200, behavior: "smooth" });
    };

    return (
        <div className={styles.box}>
            <div className={styles.main_box}>
                <div className={styles.header}>
                    <h1 className={styles.title_box}>Latest Release</h1>
                    <div className={styles.categories}>
                        <button
                            className={styles.movies}
                            onClick={() => fetchContent('movies')}
                        >
                            Movies
                        </button>
                        <button
                            className={styles.series}
                            onClick={() => fetchContent('series')}
                        >
                            Series
                        </button>
                    </div>
                </div>
                <div className={styles.inside_box}>
                    <div className={styles.carousel_controls}>
                        <button className={styles.carousel_button} onClick={scrollLeft}>❮</button>
                        <button className={styles.carousel_button} onClick={scrollRight}>❯</button>
                    </div>
                    {loading ? (
                        <h1>Loading...</h1>
                    ) : error ? (
                        <h1>{error}</h1>
                    ) : movies.length > 0 ? (
                        <div className={styles.movie_list} ref={movieListRef}>
                            {movies.map((movie) => (
                                <div key={movie.movieId} className={styles.movie_item}>
                                    <img
                                        src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                                        alt={movie.title || "No Title"}
                                    />
                                    <h3 className={styles.movie_title}>{movie.title}</h3>
                                    <p className={styles.release_date}>{movie.releaseDate}</p>
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
