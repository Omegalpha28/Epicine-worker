import { useEffect, useState } from 'react';
import styles from './Providers.module.css';
import useTheme from '../../set_theme';

export const Providers = ({ serieId }) => {
    const [isDark, setIsDark] = useTheme();
    const [serieProviders, setSerieProviders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSerieProviders = async () => {
            try {
                const response = await fetch(`http://localhost:5555/api/serie/${serieId}/providers`);
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                const data = await response.json();
                setSerieProviders(data.results?.FR?.buy || []);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (serieId) {
            fetchSerieProviders();
        }
    }, [serieId]);

    return (
        <div className={styles.providers} data-theme={isDark ? "dark" : "light"}>
            {serieProviders.length > 0 ? (
                serieProviders.map((provider, index) => (
                    <div key={index} className={styles.provider}>
                        <img src={`https://image.tmdb.org/t/p/w45${provider.logo_path}`} alt={provider.provider_name} />
                    </div>
                ))
            ) : (
                <p>No providers available.</p>
            )}
        </div>
    );
};
