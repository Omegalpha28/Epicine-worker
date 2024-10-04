import React, { useState, useEffect } from "react";
import styles from "./UpComing_Mobile.module.css";
import { Link } from "react-router-dom";

export const UpComing_Mobile = () => {
    const [upcoming, setUpcoming] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [contentType, setContentType] = useState("movies"); // movies or series
    const [dropdownActive, setDropdownActive] = useState(false); // état pour gérer le menu déroulant

    // Fonction pour récupérer le contenu selon le type
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

    // Gérer l'affichage du dropdown
    const toggleDropdown = () => {
        setDropdownActive((prev) => !prev);
    };

    useEffect(() => {
        fetchContent(contentType); // Chargement initial des films ou séries à venir
    }, [contentType]);

    const getYear = (date) => {
        const year = new Date(date).getFullYear();
        return isNaN(year) ? "N/A" : year; // Return 'N/A' if year is NaN
    };

    return (
        <div className={styles.box}>
            <div className={styles.main_box}>
                <div className={styles.header}>
                    <h1 className={styles.title_box}>Upcoming</h1>
                    <div className={styles.categories}>
                        <button className={styles.movies} onClick={() => { setContentType('movies'); toggleDropdown(); }}>Movies</button>
                        <button className={styles.series} onClick={() => { setContentType('series'); toggleDropdown(); }}>Series</button>
                        <button className={styles.category_button} onClick={toggleDropdown}>Categories</button>
                        <div className={`${styles.dropdown} ${dropdownActive ? styles.active : ''}`}>
                            <div className={styles.dropdown_item} onClick={() => { setContentType('movies'); setDropdownActive(false); }}>Movies</div>
                            <div className={styles.dropdown_item} onClick={() => { setContentType('series'); setDropdownActive(false); }}>Series</div>
                        </div>
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
                                    <Link to={{ pathname: `/${item.media_type}/${item.id}` }}>
                                        <img
                                            src={`https://image.tmdb.org/t/p/w200${item.poster_path}`}
                                            alt={item.title || item.name}
                                        />
                                    </Link>
                                    {/* <h3 className={styles.movie_title}>{item.title || item.name}</h3>
                                    <p className={styles.movie_year}>{getYear(item.release_date || item.first_air_date)}</p> */}
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
