import React, { useState, useEffect } from "react";
import styles from "./UpComing.module.css";

export const UpComing = () => {
    const [contentType, setContentType] = useState("movies");
    const [upcoming, setUpcoming] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchContent(contentType);
    }, [contentType]);

    const fetchContent = async (type) => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`http://localhost:5555/api/${type}/upcoming`);
            if (!response.ok) throw new Error("Failed to fetch data");
            const data = await response.json();
            setUpcoming(data);
            setCurrentIndex(0); // Réinitialise l'index du carrousel
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % upcoming.length);
    };

    const handlePrevious = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + upcoming.length) % upcoming.length);
    };

    const renderIndicators = () => {
        return (
            <div className={styles.indicators}>
                {upcoming.map((_, index) => (
                    <div
                        key={index}
                        className={`${styles.indicator} ${index === currentIndex ? styles.active : ''}`}
                    />
                ))}
            </div>
        );
    };

    if (loading) {
        return <div className={styles.box}><div>Loading...</div></div>;
    }

    if (error) {
        return <div className={styles.box}><div>Error: {error}</div></div>;
    }

    if (upcoming.length === 0) {
        return <div className={styles.box}><div>No Upcoming Content Available</div></div>;
    }

    const currentMovie = upcoming[currentIndex];

    return (
        <div className={styles.box}>
            <div className={styles.main_box}>
                <h1 className={styles.title_box}>UpComing</h1>
                <div className={styles.categories}>
                    <button className={styles.movies} onClick={() => setContentType('movies')}>Movies</button>
                    <button className={styles.series} onClick={() => setContentType('series')}>Series</button>
                </div>
                <div className={styles.inside_box}>
                    <div className={styles.carousel_controls}>
                        <button className={styles.carousel_button} onClick={handlePrevious}>❮</button>
                        <button className={styles.carousel_button} onClick={handleNext}>❯</button>
                    </div>
                    <div className={styles.movie_item}>
                        <img
                            src={`https://image.tmdb.org/t/p/w500${currentMovie.poster_path}`}
                            alt={currentMovie.title || currentMovie.name}
                        />
                        <h3 className={styles.movie_title}>{currentMovie.title || currentMovie.name}</h3>
                        <button className={styles.more_button}>View more</button>
                        {renderIndicators()} {/* Indicateurs placés ici */}
                    </div>
                </div>
            </div>
        </div>
    );
};
