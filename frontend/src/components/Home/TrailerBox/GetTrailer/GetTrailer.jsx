import { useEffect, useState } from 'react';
import styles from './GetTrailer.module.css';
import useTheme from '../../../set_theme';
import { useNavigate } from "react-router-dom";
import { GetTitle } from './GetTitle';

export const GetTrailer = ({ movieId, movies, setMovieId }) => {
    const [isDark, setIsDark] = useTheme();
    const [trailerKey, setTrailerKey] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleViewMoreClick = () => {
        navigate(`/movies/${movieId}`);
    };

    const fetchAnotherTrailer = () => {
        if (movies.length > 1) {
            const otherMovies = movies.filter(movie => movie.id !== movieId);
            const randomIndex = Math.floor(Math.random() * otherMovies.length);
            setMovieId(otherMovies[randomIndex].id);
        }
    };

    useEffect(() => {
        const fetchTrailerKey = async () => {
            try {
                const response = await fetch(`http://localhost:5555/api/movies/${movieId}/videos`);
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                const data = await response.json();
                const trailer = data.results.find(video => video.type === "Trailer");
                if (trailer) {
                    setTrailerKey(trailer.key);
                } else {
                    fetchAnotherTrailer();
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (movieId) {
            setLoading(true);
            fetchTrailerKey();

            const trailerTimeout = setTimeout(fetchAnotherTrailer, 120000);

            return () => clearTimeout(trailerTimeout);
        }
    }, [movieId]);

    return (
        <div className={styles.box} data-theme={isDark ? "dark" : "light"}>
            {loading ? (
                <div>Loading...</div>
            ) : error ? (
                <div className={styles.error}>{error}</div>
            ) : trailerKey ? (
                <iframe src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&mute=1&controls=0&disablekb=1&fs=0`} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
            ) : (
                <div className={styles.no_trailer}>No trailer available</div>
            )}
            <div className={styles.Title}><GetTitle movieId={movieId} /></div>
            <button className={styles.more_button} onClick={handleViewMoreClick}>View more</button>
        </div>
    );
};
