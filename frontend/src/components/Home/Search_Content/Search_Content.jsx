import React, { useState, useEffect } from "react";
import styles from "./Search_Content.module.css";
import { Link } from "react-router-dom";

export const Search_Content = ({ query }) => {
    const [movies, setMovies] = useState([]);
    const [series, setSeries] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                // Fetch Movies and Series
                const movieResponse = await fetch(`http://localhost:5555/api/movies/search?query=${query}`);
                const seriesResponse = await fetch(`http://localhost:5555/api/series/search?query=${query}`);

                if (!movieResponse.ok || !seriesResponse.ok) {
                    throw new Error("Failed to fetch data");
                }

                const movieData = await movieResponse.json();
                const seriesData = await seriesResponse.json();

                // Sort movies by release date (most recent first)
                const sortedMovies = movieData.sort((a, b) => new Date(b.release_date) - new Date(a.release_date));
                setMovies(sortedMovies);

                // Sort series by first air date (most recent first)
                const sortedSeries = seriesData.sort((a, b) => new Date(b.first_air_date) - new Date(a.first_air_date));
                setSeries(sortedSeries);
            } catch (error) {
                console.error("Error fetching movies/series:", error);
            } finally {
                setLoading(false);
            }
        };

        if (query) {
            fetchData();
        }
    }, [query]);

    const getYear = (date) => {
        const year = new Date(date).getFullYear();
        return isNaN(year) ? "N/A" : year; // Return 'N/A' if year is NaN
    };

    return (
        <div className={styles.container}>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className={styles.results}>
                    <div className={styles.movies_column}>
                        <h2 className={styles.column_title}>Movies</h2>
                        <hr className={styles.column_separator} />
                        {movies.length > 0 ? (
                            movies.map((movie, index) => (
                                movie.poster_path && ( // Check if poster_path is defined
                                    <div key={index} className={styles.movie_item}>
                                        <Link to={{ pathname: `/Movie/${movie.id}`, state: { isMovie: true } }}>
                                            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} className={styles.movie_poster} />
                                        </Link>
                                        <div className={styles.movie_details}>
                                            <h3 className={styles.movie_title}>
                                                {movie.title}
                                            </h3>
                                            <p className={styles.movie_year}>
                                                {getYear(movie.release_date)}
                                            </p>
                                        </div>
                                    </div>
                                )
                            ))
                        ) : (
                            <p>No movies found</p>
                        )}
                    </div>
                    <div className={styles.series_column}>
                        <h2 className={styles.column_title}>Series</h2>
                        <hr className={styles.column_separator} />
                        {series.length > 0 ? (
                            series.map((serie, index) => (
                                serie.poster_path && ( // Check if poster_path is defined
                                    <div key={index} className={styles.series_item}>
                                        <Link to={{ pathname: `/Movie/${serie.id}`, state: { isMovie: false } }}>
                                            <img src={`https://image.tmdb.org/t/p/w500${serie.poster_path}`}  alt={serie.name}  className={styles.series_poster}  />
                                        </Link>
                                        <div className={styles.series_details}>
                                            <h3 className={styles.series_title}>
                                                {serie.name}
                                            </h3>
                                            <p className={styles.series_year}>
                                                {getYear(serie.first_air_date)}
                                            </p>
                                        </div>
                                    </div>
                                )
                            ))
                        ) : (
                            <p>No series found</p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};
