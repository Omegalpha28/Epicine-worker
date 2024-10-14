import { useEffect, useState } from 'react';
import styles from './WallpaperSerie.module.css'; // Renommé pour refléter le contexte des séries
import useTheme from '../../set_theme';

const getRatingBackground = (rating) => {
    const percentage = (rating / 10) * 100;
    return `linear-gradient(360deg, var(--color-radiant1) ${percentage}%, var(--color-radiant2) ${100 - percentage}%)`;
};

export const WallpaperSerie = ({ serieId }) => {
    const [isDark, setIsDark] = useTheme();
    const [serieDetails, setSerieDetails] = useState(null); // Changement de nom de variable
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSerieDetails = async () => {
            try {
                const response = await fetch(`http://localhost:5555/api/tv/${serieId}`);
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                const data = await response.json();
                setSerieDetails(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        if (serieId) {
            fetchSerieDetails();
        }
    }, [serieId]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    const rating = serieDetails ? serieDetails.vote_average : 0;
    const ratingPercentage = rating ? Math.round(rating * 10) : 0;

    return (
        <div className={styles.wallpaper}>
            <img className={styles.image} src={`https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/${serieDetails.backdrop_path}`} alt="wallpaper" />
            <div className={styles.blurblock} />
        </div>
    );
};

