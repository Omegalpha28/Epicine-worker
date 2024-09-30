import { useEffect, useState } from 'react';
import styles from './movie_profile.module.css';
import useTheme from '../../set_theme';

export const Movie_Profile = ({ movieId }) => {
    const [isDark, setIsDark] = useTheme();
    const [movieDetails, setMovieDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                const response = await fetch(`http://localhost:5555/api/movie/${movieId}`);
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                const data = await response.json();
                setMovieDetails(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        if (movieId) {
            fetchMovieDetails();
        }
    }, [movieId]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className={styles.box} data-theme={isDark ? "dark" : "light"}>
            {movieDetails && (
                <>
                    <div className={styles.picture}>
                        <img src={`https://image.tmdb.org/t/p/w200${movieDetails.poster_path}`} alt={movieDetails.title} />
                    </div>
                    <div className={styles.column_profile}>
                        <div className={styles.row_profile}>
                            <div className={styles.Title}>{movieDetails.title}</div>
                        </div>
                        <div className={styles.Resume}>
                            <strong>Resume:</strong> {movieDetails.overview}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

