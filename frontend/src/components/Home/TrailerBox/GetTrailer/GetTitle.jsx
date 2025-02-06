import { useEffect, useState } from 'react';

export const GetTitle = ({ movieId }) => {
    const [title, setTitle] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMovieTitle = async () => {
            try {
                const response = await fetch(`http://localhost:5555/api/movie/${movieId}`);
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                const data = await response.json();
                setTitle(data.title);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (movieId) {
            fetchMovieTitle();
        }
    }, [movieId]);

    if (loading) return <div>Loading title...</div>;
    if (error) return <div>Error: {error}</div>;
    return <div>{title}</div>;
};
