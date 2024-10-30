import React, { useEffect, useState } from "react";
import styles from "./settings.module.css"; // Votre fichier CSS spécifique
import styles_App from "../../App.module.css";
import useTheme from "../set_theme";
import { Navbar } from "../Navbar/Navbar";
import { Join_Us } from "../Joinus/join_us";
import { MyProfile } from "../Settings/MyProfile/MyProfile";
import { MyMovies } from "../Settings/MyMovies/MyMovies";
import { MySeries } from "../Settings/MySeries/MySeries";
import { MyCollections } from "../Settings/MyCollections/MyCollections";
import { MyPreferences } from "../Settings/MyPreferences/MyPreferences";
import { RatedMovies } from "../Settings/RatedMovies/RatedMovies";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faFilm, faTv, faFolder, faCog, faStar } from "@fortawesome/free-solid-svg-icons";


export const SettingsPage = () => {
    const [selectedNav, setSelectedNav] = useState('MyProfile');
    const [isDark] = useTheme();

    useEffect(() => {
        const body = document.body;
        if (isDark) {
            body.setAttribute('data-theme', 'dark');
        } else {
            body.setAttribute('data-theme', 'light');
        }
    }, [isDark]);
    const handleNavClick = (nav) => {
        setSelectedNav(nav);
    };

    const renderContent = () => {
        switch (selectedNav) {
            case 'Profile':
                return <MyProfile />;
            case 'MyMovies':
                return <MyMovies />;
            case 'MySeries':
                return <MySeries />;
            case 'MyCollections':
                return <MyCollections />;
            case 'MyPreferences':
                return <MyPreferences />;
            case 'RatedMovies':
                return <RatedMovies />;
            default:
                return <MyProfile />;
        }
    };

    return (
        <div className={styles_App.App} data-theme={isDark ? "dark" : "light"}>
            <Navbar />
            <div className={styles.settingsPage}>
                <Navbar />
                <div className={styles.settings}>
                    <nav className={styles.navs_settings}>
                        <ul className={styles.categories_settings}>
                            <li onClick={() => handleNavClick('MyProfile')}>
                                <FontAwesomeIcon icon={faUser} className={styles.icon} />
                                <span>MY PROFILE</span> {/* Changez h1 en span */}
                            </li>
                            <li onClick={() => handleNavClick('MyMovies')}>
                                <FontAwesomeIcon icon={faFilm} className={styles.icon} />
                                <span>MY MOVIES</span>
                            </li>
                            <li onClick={() => handleNavClick('MySeries')}>
                                <FontAwesomeIcon icon={faTv} className={styles.icon} />
                                <span>MY SERIES</span>
                            </li>
                            <li onClick={() => handleNavClick('MyCollections')}>
                                <FontAwesomeIcon icon={faFolder} className={styles.icon} />
                                <span>MY COLLECTIONS</span>
                            </li>
                            <li onClick={() => handleNavClick('MyPreferences')}>
                                <FontAwesomeIcon icon={faCog} className={styles.icon} />
                                <span>MY PREFERENCES</span>
                            </li>
                            <li onClick={() => handleNavClick('RatedMovies')}>
                                <FontAwesomeIcon icon={faStar} className={styles.icon} />
                                <span>RATED MOVIES</span>
                            </li>
                        </ul>
                    </nav>
                    <div className={styles.content_area}>
                        {renderContent()} {/* Affiche le contenu correspondant à la sélection */}
                    </div>
                </div>
            </div>
            <Join_Us />
        </div>
    );
};