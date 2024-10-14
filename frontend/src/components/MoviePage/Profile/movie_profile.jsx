import { useEffect, useState } from 'react';
import styles from './movie_profile.module.css';
import useTheme from '../../set_theme';
import { Roles } from '../Roles/Roles';
import { Recommendation } from '../Recommendation/Recommendation';
import { Trailer_Video } from '../Trailers/trailer_video';
import { Providers } from '../providers/Providers';

// Fonction pour obtenir le style de fond de la note
const getRatingBackground = (rating) => {
    const percentage = (rating / 10) * 100;
    return `linear-gradient(360deg, var(--color-radiant1) ${percentage}%, var(--color-radiant2) ${100 - percentage}%)`;
};

// Fonction pour formater la durée du film
const formatRuntime = (runtime) => {
    const hours = Math.floor(runtime / 60);
    const minutes = runtime % 60;
    return ` ${hours}h ${minutes}m `;
};

// Composant principal
export const Movie_Profile = ({ movieId }) => {
    const [isDark] = useTheme();
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
                        <div className={styles.TitleMobile}>{movieDetails.title} </div>
                        <div className={styles.picture}>
                            <a href={movieDetails.homepage} target="_blank" rel="noopener noreferrer">
                                <img src={`https://image.tmdb.org/t/p/w300${movieDetails.poster_path}`} alt={movieDetails.title} />
                            </a>
                        </div>

                        <div className={styles.myrow}>
                            <div className={styles.mycolumn}>
                                <div className={styles.RatingTitle}><strong>Rating</strong></div>
                                <div className={styles.Ratings}>
                                    <div className={styles.RatingValue} style={{ width: `${ratingPercentage}%`, animation: 'load 0.5s forwards' }} >
                                        {ratingPercentage}%
                                    </div>
                                </div>
                            </div>
                        </div>

                        <hr className={styles.sectionDivider} />

                        <div className={styles.providers}>
                            <strong>Providers</strong> <br /> <Providers movieId={movieId} />
                        </div>

                        <hr className={styles.sectionDivider} />

                        <div className={styles.ReleaseDate}>
                            <strong>Release Date</strong> <br />
                            {movieDetails.release_date ? movieDetails.release_date : "Not listed"}
                        </div>

                        <hr className={styles.sectionDivider} />

                        <div className={styles.budget}>
                            <strong>Budget</strong> <br />
                            {movieDetails.budget ? movieDetails.budget.toLocaleString('fr-FR') : "Unknown"}
                        </div>

                        <hr className={styles.sectionDivider} />

                        <div className={styles.revenue}>
                            <strong>Revenue</strong> <br />
                            {movieDetails.revenue ? movieDetails.revenue.toLocaleString('fr-FR') : "Unknown"}
                        </div>

                        <hr className={styles.sectionDivider} />

                        <div className={styles.runtime}>
                            <strong>Runtime</strong> <br />
                            {formattedRuntime ? formattedRuntime : "Not listed"}
                        </div>

                        <hr className={styles.sectionDivider} />

                        <div className={styles.original_title}>
                            <strong>Title Original</strong> <br />
                            {movieDetails.original_title ? movieDetails.original_title : "Not listed"}
                        </div>

                        <hr className={styles.sectionDivider} />

                        <div className={styles.released}>
                            <strong>Status</strong> <br />  {movieDetails.status ? movieDetails.status : "Nothing to view"}
                        </div>

                        <hr className={styles.sectionDivider} />

                        <div className={styles.Genres}>
                            <strong>Genres</strong> <br /> {movieDetails.genres && movieDetails.genres.length > 0 ? (
                                movieDetails.genres.map((genre, index) => (
                                    <span key={genre.id}> {genre.name} {index < movieDetails.genres.length - 1 && ', '} </span>
                                ))
                            ) : ( "Nothing to view" )}
                        </div>

                        <hr className={styles.sectionDivider} />

                        <div className={styles.Productions}>
                            <strong>Production Companies</strong> <br />
                            {movieDetails.production_companies && movieDetails.production_companies.length > 0 ? (
                                <ul className={styles.production_list}>
                                    {movieDetails.production_companies.map((production) => (
                                    <li key={production.id}>{production.name}</li>
                                    ))}
                                </ul>
                            ) : ("Unknown")}
                        </div>
                    </>
                )}
            </div>
            {movieDetails && (
                <div className={styles.divright}>
                    <div className={styles.Title}>{movieDetails.title}</div>
                    <div className={styles.RoleTitle}>Overview</div>
                        {movieDetails.tagline && (
                            <div className={styles.Catchphrase}> ({movieDetails.tagline}) </div>
                        )}
                        <div className={styles.Resume}>
                            {movieDetails.overview ? movieDetails.overview : "Nothing to view"}
                        </div>
                    <div className={styles.Trailers}>
                        <Trailer_Video movieId={movieId} />
                    </div>
                    <div className={styles.Roles}>
                        <div className={styles.RoleTitle}> Role </div>
                        <Roles movieId={movieId} />
                    </div>
                    <div className={styles.Recommendation}>
                        <div className={styles.RoleTitle}> Recommandations </div>
                        <Recommendation movieId={movieId} />
                    </div>
                </div>
            )}
        </div>
    );
};
