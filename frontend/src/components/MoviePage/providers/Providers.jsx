import { useEffect, useState } from 'react';
import styles from './Providers.module.css';
import useTheme from '../../set_theme';

export const Providers = ({ movieId }) => {
    const [isDark, setIsDark] = useTheme();
    const [movieProviders, setMovieProviders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMovieProviders = async () => {
            try {
                const response = await fetch(`http://localhost:5555/api/movie/${movieId}/providers`);
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                const data = await response.json();

                setMovieProviders(data.results?.FR?.buy || []);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (movieId) {
            fetchMovieProviders();
        }
    }, [movieId]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className={styles.providers} data-theme={isDark ? "dark" : "light"}>
            <div className={styles.providerContainer}>
                {movieProviders.length > 0 ? (
                    movieProviders.map((provider, index) => (
                        provider.logo_path && (
                            <div key={index} className={styles.provider}>
                                <img src={`https://image.tmdb.org/t/p/w45${provider.logo_path}`} alt={provider.provider_name} />
                            </div>
                        )
                    ))
                ) : (
                    <p>No providers available.</p>
                )}
            </div>
        </div>
    );
};
