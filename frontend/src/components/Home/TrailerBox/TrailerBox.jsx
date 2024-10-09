import { useEffect, useState } from 'react';
import { GetTrailer } from "./GetTrailer/GetTrailer";
import styles from './TrailerBox.module.css';
import useTheme from "../../set_theme";

export const TrailerBox = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [movieId, setMovieId] = useState(null);

    const [isDark, setIsDark] = useTheme();
    useEffect(() => {
        fetchContent('movie', 'popular');
    }, []);

    const fetchContent = async (type, subType) => {
        setError(null);
        setLoading(true);

        try {
            const response = await fetch(`http://localhost:5555/api/movies/popular?subType=${subType}`);
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
            }
            const data = await response.json();
            setMovies(data.results);
            if (data.results.length > 0) {
                const randomIndex = Math.floor(Math.random() * data.results.length);
                setMovieId(data.results[randomIndex].id);
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.Box} data-theme={isDark ? "dark" : "light"}>
            {loading ? (
                <div>Loading...</div>
            ) : error ? (
                <div>{error}</div>
            ) : (
                movieId && <GetTrailer movieId={movieId} />
            )}
        </div>
    );
};
