import { useEffect, useState } from 'react';
import styles from './GetTrailer.module.css';
import useTheme from '../../../set_theme';
import { useNavigate } from "react-router-dom";
import { GetTitle } from './GetTitle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons'; // Import de l'icône

export const GetTrailer = ({ movieId }) => {
    const [isDark, setIsDark] = useTheme();
    const [trailerKey, setTrailerKey] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleViewMoreClick = () => {
        navigate(`/movies/${movieId}`);
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
                    setError("No trailer available.");
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
        }
    }, [movieId]);

    return (
        <div className={styles.box} data-theme={isDark ? "dark" : "light"}>
            {loading ? (
                <div>Loading...</div>
            ) : error ? (
                <div className={styles.error}>{error}</div>
            ) : trailerKey ? (
                <iframe src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&mute=1&controls=0&disablekb=1&fs=0&loop=1&playlist=${trailerKey}`} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
            ) : (
                <div className={styles.no_trailer}>No trailer available</div>
            )}
            <div className={styles.Title}><GetTitle movieId={movieId} /></div>
            <button className={styles.more_button} onClick={handleViewMoreClick}>
                <FontAwesomeIcon icon={faPlay} className={styles.icon} />
                <span className={styles.button_text}>View more</span> {/* Enveloppement du texte dans un span */}
            </button>
        </div>
    );
};
