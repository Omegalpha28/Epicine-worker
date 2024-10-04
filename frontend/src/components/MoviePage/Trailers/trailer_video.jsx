import { useEffect, useState } from 'react';
import styles from './trailer_video.module.css';
import useTheme from '../../set_theme';

export const Trailer_Video = ({ movieId }) => {
    const [isDark, setIsDark] = useTheme();
    const [trailerKey, setTrailerKey] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTrailer = async () => {
            const options = {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: `Bearer ${process.env.TOKEN}`,
                },
            };

            try {
                const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`, options);
                const data = await response.json();
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

                const youtubeTrailer = data.results.find(video => video.site === 'YouTube' && video.type === 'Trailer');
                if (youtubeTrailer) {
                    setTrailerKey(youtubeTrailer.key);
                } else {
                    throw new Error('No trailer found.');
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (movieId) {
            fetchTrailer();
        }
    }, [movieId]);

    if (loading) return <div className={styles.loading}>Loading trailer...</div>;
    if (error) return <div className={styles.error}>Error: {error}</div>;

    return (
        <div className={styles.box} data-theme={isDark ? "dark" : "light"}>
            {trailerKey ? (
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
