import { useEffect, useState } from 'react';
import styles from './WallpaperMovie.module.css';
import useTheme from '../../set_theme';
import { Trailer_Video } from '../Trailers/trailer_video';

const getRatingBackground = (rating) => {
    const percentage = (rating / 10) * 100;
    return `linear-gradient(360deg, var(--color-radiant1) ${percentage}%, var(--color-radiant2) ${100 - percentage}%)`;
};

export const WallpaperMovie = ({ movieId }) => {
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

    console.log(movieDetails);
    const rating = movieDetails ? movieDetails.vote_average : 0;
    const ratingPercentage = rating ? Math.round(rating * 10) : 0;

    return (
        <div className={styles.wallpaper}>
            <img className={styles.image} src={`https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/${movieDetails.backdrop_path}`} alt="wallpaper" />
            <div className={styles.blurblock} />
        </div>
    );
};

