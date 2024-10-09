import { useEffect, useState } from 'react';
import styles from './trailer_video.module.css';
import useTheme from '../../set_theme';

export const Trailer_Video = ({ serieId }) => {
    const [isDark, setIsDark] = useTheme();
    const [trailerKey, setTrailerKey] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTrailerKey = async () => {
            try {
                const response = await fetch(`http://localhost:5555/api/movies/${serieId}/videos`);
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                const data = await response.json();
                const trailer = data.results.find(video => video.type === "Trailer");
                setTrailerKey(trailer ? trailer.key : null);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (serieId) {
            fetchTrailerKey();
        }
    }, [serieId]);

    return (
        <div className={styles.box} data-theme={isDark ? "dark" : "light"}>
            {loading ? (
                <div>Loading...</div>
            ) : error ? (
                <div className={styles.error}>{error}</div>
            ) : trailerKey ? (
                <iframe
                    src={`https://www.youtube.com/embed/${trailerKey}`}
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                />
            ) : (
                <div className={styles.no_trailer}>No trailer available</div>
            )}
        </div>
    );
};
