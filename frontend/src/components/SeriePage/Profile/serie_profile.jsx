import { useEffect, useState } from 'react';
import styles from './serie_profile.module.css';
import useTheme from '../../set_theme';
import { Roles } from '../Roles/Roles';
import { Recommendation } from '../Recommendation/Recommendation';

const getRatingBackground = (rating) => {
    const percentage = (rating / 10) * 100;
    return `linear-gradient(360deg, var(--color-radiant1) ${percentage}%, var(--color-radiant2) ${100 - percentage}%)`;
};

const formatRuntime = (runtime) => {
    if (!runtime) return 'N/A';
    const hours = Math.floor(runtime / 60);
    const minutes = runtime % 60;
    return ` ${hours}h ${minutes}m `;
};

export const Serie_Profile = ({ serieId }) => {
    const [isDark, setIsDark] = useTheme();
    const [serieDetails, setSerieDetails] = useState(null);
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

    console.log(serieDetails);
    const rating = serieDetails ? serieDetails.vote_average : 0;
    const ratingPercentage = rating ? Math.round(rating * 10) : 0;
    const formattedRuntime = serieDetails && serieDetails.episode_run_time.length > 0
        ? formatRuntime(serieDetails.episode_run_time[0])
        : 'N/A';

    return (
        <div className={styles.box} data-theme={isDark ? "dark" : "light"}>
            <div className={styles.divleft}>
                {serieDetails && (
                    <>
                        <div className={styles.TitleMobile}>{serieDetails.name}</div>
                        <div className={styles.picture}>
                            <a href={serieDetails.homepage} target="_blank" rel="noopener noreferrer">
                                <img src={`https://image.tmdb.org/t/p/w200${serieDetails.poster_path}`} alt={serieDetails.name} />
                            </a>
                        </div>
                        <div className={styles.myrow}>
                            <div className={styles.mycolumn}>
                                <div className={styles.RatingTitle}><strong>Rating</strong></div>
                                <div className={styles.Ratings}
                                    style={{ background: getRatingBackground(rating) }}
                                >
                                    <div
                                        className={styles.RatingValue}
                                        style={{ width: `${ratingPercentage}%`, animation: 'load 0.5s forwards' }}
                                    >
                                        {ratingPercentage}%
                                    </div>
                                </div>
                            </div>
                        </div>

                        <hr className={styles.sectionDivider} />

                        <div className={styles.ReleaseDate}>
                            <strong>First Air Date</strong> <br />
                            {serieDetails.first_air_date}
                        </div>

                        {serieDetails.episode_run_time != 0 && (
                            <>
                                <hr className={styles.sectionDivider} />

                                <div className={styles.runtime}>
                                    <strong>Episode Runtime</strong> <br /> {serieDetails.episode_run_time} min
                                </div>
                            </>
                        )}

                        <hr className={styles.sectionDivider} />

                        <div className={styles.original_title}>
                            <strong>Original Name</strong> <br />{serieDetails.original_name}
                        </div>

                        <hr className={styles.sectionDivider} />

                        <div className={styles.Number_episode}>
                            <strong>Number of episodes</strong> <br />{serieDetails.number_of_episodes} episodes
                        </div>

                        <hr className={styles.sectionDivider} />

                        <div className={styles.Number_Season}>
                            <strong>Number of seasons</strong> <br />{serieDetails.number_of_seasons} seasons
                        </div>

                        <hr className={styles.sectionDivider} />

                        <div className={styles.released}>
                            <strong>Status</strong> <br />{serieDetails.status}
                        </div>

                        <hr className={styles.sectionDivider} />

                        <div className={styles.Genres}>
                            <strong>Genres</strong> <br />
                            {serieDetails.genres.map((genre, index) => (
                                <span key={genre.id}>
                                    {genre.name}
                                    {index < serieDetails.genres.length - 1 && ', '}
                                </span>
                            ))}
                        </div>
                    </>
                )}
            </div>
            {serieDetails && (
                <>
                    <div className={styles.divright}>
                        <div className={styles.Title}>
                            {serieDetails.name}
                        </div>
                        <div className={styles.RoleTitle}>Overview</div>
                        <div className={styles.Resume}>
                            {serieDetails.overview}
                        </div>
                        <div className={styles.Roles}>
                            <div className={styles.RoleTitle}>Cast</div>
                            <Roles serieId={serieId} />
                        </div>
                        <div className={styles.Recommendation}>
                            <div className={styles.RoleTitle}>Recommendations</div>
                            <Recommendation serieId={serieId} />
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};
