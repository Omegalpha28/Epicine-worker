import { useEffect, useState } from 'react';
import styles from './seasons.module.css';
import useTheme from '../../set_theme';
import not_found from '../../../../assets/camera.png'

export const Seasons = ({ serieId,  seasonID}) => {
    const [isDark] = useTheme();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [serieSeason, setSerieSeason] = useState(null);

    useEffect(() => {
        const fetchSerieSeason = async () => {
            setLoading(true);
            try {
                const response = await fetch(`http://localhost:5555/api/serie/${serieId}/${seasonID}/seasons`);
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                const data = await response.json();
                setSerieSeason(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (serieId) {
            fetchSerieSeason();
        }
    }, [serieId, seasonID]);


    return (
        <div className={styles.inside_box} data-theme={isDark ? "dark" : "light"}>
            {loading ? (
                <h1>Loading...</h1>
            ) : error ? (
                <h1>{error}</h1>
            ) : serieSeason && serieSeason.episodes && serieSeason.episodes.length > 0 ? (
                <div className={styles.episode_list}>
                    <h2>Season {serieSeason.season_number}</h2>
                    <div className={styles.episode_grid}>
                        {serieSeason.episodes.map((episode, index) => (
                            <div key={index} className={styles.episode_item}>
                                <img src={`https://media.themoviedb.org/t/p/w138_and_h175_face${episode.still_path}`} onError={(e) => (e.target.src = not_found)} alt={episode.name} />
                                <strong>Episode {episode.episode_number}</strong>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <h1>No Episodes Available</h1>
            )}
        </div>
    );
};
