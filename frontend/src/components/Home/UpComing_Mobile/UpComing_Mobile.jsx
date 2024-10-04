import React, { useState, useEffect } from "react";
import styles from "./UpComing_Mobile.module.css";

export const UpComing_Mobile = () => {
    const [contentType, setContentType] = useState("movies"); // movies or series
    const [upcoming, setUpcoming] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showDropdown, setShowDropdown] = useState(false); // état pour gérer le menu déroulant

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
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const toggleDropdown = () => {
        setShowDropdown((prev) => !prev);
    };

    return (
        <div className={styles.box}>
            <div className={styles.main_box}>
                <div className={styles.header}>
                    <h1 className={styles.title_box}>Upcoming</h1>
                    <div className={styles.categories}>
                        <button className={styles.category_button} onClick={toggleDropdown}>
                            Categories
                        </button>

                        {/* Menu déroulant pour les catégories */}
                        {showDropdown && (
                            <div className={styles.dropdown}>
                                <button onClick={() => { setContentType("movies"); setShowDropdown(false); }}>
                                    Movies
                                </button>
                                <button onClick={() => { setContentType("series"); setShowDropdown(false); }}>
                                    Series
                                </button>
                            </div>
                        )}
                    </div>
                </div>
                <div className={styles.inside_box}>
                    {loading ? (
                        <h1>Loading...</h1>
                    ) : error ? (
                        <h1>{error}</h1>
                    ) : upcoming.length > 0 ? (
                        <div className={styles.movie_list}>
                            {upcoming.map((item) => (
                                <div key={item.id} className={styles.movie_item}>
                                    <img
                                        src={`https://image.tmdb.org/t/p/w200${item.poster_path}`}
                                        alt={item.title || item.name}
                                    />
                                    <h3 className={styles.movie_title}>{item.title || item.name}</h3>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <h1>No Upcoming Releases</h1>
                    )}
                </div>
            </div>
        </div>
    );
};
