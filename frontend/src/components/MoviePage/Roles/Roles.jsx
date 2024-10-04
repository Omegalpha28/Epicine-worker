import { useEffect, useState } from 'react';
import styles from './Roles.module.css';
import useTheme from '../../set_theme';
import unknown from '../../../../assets/anonymous-user-icon.svg';

export const Roles = ({ movieId }) => {
    const [isDark, setIsDark] = useTheme();
    const [movieCredits, setMovieCredits] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMovieCredits = async () => {
            try {
                const response = await fetch(`http://localhost:5555/api/movie/${movieId}/credits`);
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                const data = await response.json();
                setMovieCredits(data.cast);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (movieId) {
            fetchMovieCredits();
        }
    }, [movieId]);

    return (
        <div className={styles.inside_box} data-theme={isDark ? "dark" : "light"}>
            {loading ? (
                <h1>Loading...</h1>
            ) : error ? (
                <h1>{error}</h1>
            ) : movieCredits && movieCredits.length > 0 ? (
                <div className={styles.movie_list}>
                    {movieCredits.map((castMember) => (
                        <div key={castMember.cast_id} className={styles.movie_item}>
                            <img src={`https://media.themoviedb.org/t/p/w138_and_h175_face${castMember.profile_path}`} onError={(e) => e.target.src = unknown} alt={castMember.name} />
                            {castMember.name} <br />
                            <span className={styles.character_name}>as {castMember.character}</span>
                        </div>
                    ))}
                </div>
            ) : (
                <h1>No Roles Available</h1>
            )}
        </div>
    );
};
