import React, { useState, useEffect } from "react";
import styles from "./Latest_Release.module.css";

export const Latest_Release = () => {
    const [releases, setReleases] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isMovies, setIsMovies] = useState(true); // State to track if the user wants movies or series

    useEffect(() => {
        fetchLatestReleases(isMovies ? 'movies' : 'series');
    }, [isMovies]); // Fetch whenever the type changes

    const fetchLatestReleases = async (type) => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`http://localhost:5555/api/latest-releases/${type}`);
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
            }
            const data = await response.json();
            setReleases(data);
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
                    <h1 className={styles.title_box}>Latest Releases</h1>
                    <div className={styles.categories}>
                        <button
                            className={styles.movies}
                            onClick={() => setIsMovies(true)}
                        >
                            Movies
                        </button>
                        <button
                            className={styles.television_programme}
                            onClick={() => setIsMovies(false)}
                        >
                            Series
                        </button>
                    </div>
                </div>
                <div className={styles.inside_box}>
                    {loading ? (
                        <h1>Loading...</h1>
                    ) : error ? (
                        <h1>{error}</h1>
                    ) : releases.length > 0 ? (
                        <div className={styles.movie_list}>
                            {releases.map((release) => (
                                <div key={release.id} className={styles.movie_item}>
                                    <img
                                        src={`https://image.tmdb.org/t/p/w200${release.poster_path}`}
                                        alt={release.title || release.name}
                                    />
                                    <h3 className={styles.movie_title}>{release.title || release.name}</h3>
                                    {/* <p>{release.releaseDate}</p> Show the release date */}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <h1>No Releases Available</h1>
                    )}
                </div>
            </div>
        </div>
    );
};
