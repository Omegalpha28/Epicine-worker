import { useEffect, useState } from 'react';
import styles from './Recommendation.module.css';
import useTheme from '../../set_theme';
import { Link } from 'react-router-dom';

export const Recommendation = ({ movieId }) => {
    const [isDark, setIsDark] = useTheme();
    const [recommendations, setRecommendations] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [failedMovies, setFailedMovies] = useState(new Set());

    useEffect(() => {
        const fetchMovieRecommendations = async () => {
            try {
                const response = await fetch(`http://localhost:5555/api/movie/${movieId}/recommendations`);
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                const data = await response.json();
                setRecommendations(data.results);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (movieId) {
            fetchMovieRecommendations();
        }
    }, [movieId]);

    const handleImageError = (movieId) => {
        setFailedMovies((prevFailedMovies) => new Set(prevFailedMovies).add(movieId));
    };

    return (
        <div className={styles.inside_box} data-theme={isDark ? "dark" : "light"}>
            {loading ? (
                <h1>Loading...</h1>
            ) : error ? (
                <h1>{error}</h1>
            ) : recommendations && recommendations.length > 0 ? (
                <div className={styles.movie_list}>
                    {recommendations
                        .filter(movie => !failedMovies.has(movie.id)) // Skip failed movies
                        .map((movie) => (
                            <div key={movie.id} className={styles.movie_item}>
                                <Link to={`/movies/${movie.id}`}>
                                    <img src={`https://image.tmdb.org/t/p/w400${movie.backdrop_path}`} alt={movie.title} onError={() => handleImageError(movie.id)} />
                                </Link>
                                {movie.title}
                            </div>
                        ))}
                </div>
            ) : (
                <h1>No Recommendations Available</h1>
            )}
        </div>
    );
};

