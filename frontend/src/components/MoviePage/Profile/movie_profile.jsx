import { useEffect, useState } from 'react';
import styles from './movie_profile.module.css';
import useTheme from '../../set_theme';
import { Roles } from '../Roles/Roles';
import { Recommendation } from '../Recommendation/Recommendation';

const getRatingBackground = (rating) => {
    const percentage = (rating / 10) * 100;
    return `linear-gradient(360deg, var(--color-radiant1) ${percentage}%, var(--color-radiant2) ${100 - percentage}%)`;
};

const formatRuntime = (runtime) => {
    const hours = Math.floor(runtime / 60);
    const minutes = runtime % 60;
    return ` ${hours}h ${minutes}m `;
};

export const Movie_Profile = ({ movieId }) => {
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

    const rating = movieDetails ? movieDetails.vote_average : 0;
    const ratingPercentage = rating ? Math.round(rating * 10) : 0;
    const formattedRuntime = movieDetails ? formatRuntime(movieDetails.runtime) : '';

    return (
        <div className={styles.box} data-theme={isDark ? "dark" : "light"}>
            <div className={styles.divleft}>
                {movieDetails && (
                    <>
                        <div className={styles.TitleMobile}>{movieDetails.title} {formattedRuntime}</div>
                        <div className={styles.picture}>
                            <a href={movieDetails.homepage} target="_blank" rel="noopener noreferrer">
                                <img src={`https://image.tmdb.org/t/p/w200${movieDetails.poster_path}`} alt={movieDetails.title} />
                            </a>
                        </div>
                        <div className={styles.myrow}>
                            <div
                                className={styles.Ratings}
                                style={{ background: getRatingBackground(rating) }}
                            >
                                {ratingPercentage}%
                            </div>
                            <div className={styles.ReleaseDate}>
                                <strong>Release:</strong> <br />
                                {movieDetails.release_date}
                            </div>
                        </div>
                        <div className={styles.runtime}>
                            <strong>Runtine:</strong> <br />{formattedRuntime}
                        </div>
                        <div className={styles.original_title}>
                            <strong>Title Original:</strong> <br />{movieDetails.original_title}
                        </div>
                        <div className={styles.Genres}>
                            <strong>Genres: </strong> <br />
                            {movieDetails.genres.map((genre, index) => (
                                <span key={genre.id}>
                                    {genre.name}
                                    {index < movieDetails.genres.length - 1 && ', '}
                                </span>
                            ))}
                        </div>
                    </>
                )}
            </div>
            {movieDetails && (
                <>
                    <div className={styles.divright}>
                        <div className={styles.Title}>
                            {movieDetails.title}
                        </div>
                        <div className={styles.Resume}>
                            <strong>Resume:</strong> <br />
                            {movieDetails.overview}
                        </div>
                        <div className={styles.Roles}>
                            <div className={styles.RoleTitle}> Role </div>
                            <Roles movieId={movieId}/>
                        </div>
                        <div className={styles.Recommendation}>
                            <div className={styles.RoleTitle}> Recommandations </div>
                            <Recommendation movieId={movieId}/>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};
