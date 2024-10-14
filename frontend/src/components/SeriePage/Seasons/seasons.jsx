import { useEffect, useState } from 'react';
import styles from './seasons.module.css';
import useTheme from '../../set_theme';

export const Seasons = ({ serieId, serieDetails }) => {
    const [isDark, setIsDark] = useTheme();
    const [serieCredits, setSerieCredits] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSerieCredits = async () => {
            try {
                const response = await fetch(`http://localhost:5555/api/serie/${serieId}/credits`);
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                const data = await response.json();
                setSerieCredits(data.cast);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (serieId) {
            fetchSerieCredits();
        }
    }, [serieId]);

    return (
        <div className={styles.inside_box} data-theme={isDark ? "dark" : "light"}>
            {loading ? (
            <h1>Loading...</h1>
            ) : error ? (
                <h1>{error}</h1>
            ) : serieCredits && serieCredits.length > 0 ? (
                <div className={styles.movie_list}>
                    {serieCredits.map((castMember) => (
                        <div key={castMember.cast_id} className={styles.movie_item}>
                            <img src={`https://media.themoviedb.org/t/p/w138_and_h175_face${castMember.profile_path}`} onError={(e) => (e.target.src = unknown)}alt={castMember.name} /> {castMember.name} <span className={styles.character_name}> <div className={styles.as}> as </div> {castMember.character ? castMember.character : "(Not Listed)"} </span>
                        </div>
                    ))}
                </div>
            ) : (
            <h1>No Roles Available</h1>
            )}
        </div>
    );
};
