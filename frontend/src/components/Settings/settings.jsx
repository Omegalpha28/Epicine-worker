import React, { useEffect, useState } from "react";
import styles from "./settings.module.css"; // Votre fichier CSS spécifique
import styles_App from "../../App.module.css";
import useTheme from "../set_theme";
import { Navbar } from "../Navbar/Navbar"; // Barre de navigation
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
                                <h1>MY PROFILE</h1>
                            </li>
                            <li onClick={() => handleNavClick('MyMovies')}>
                                <FontAwesomeIcon icon={faFilm} className={styles.icon} />
                                <h1>MY MOVIES</h1>
                            </li>
                            <li onClick={() => handleNavClick('MySeries')}>
                                <FontAwesomeIcon icon={faTv} className={styles.icon} />
                                <h1>MY SERIES</h1>
                            </li>
                            <li onClick={() => handleNavClick('MyCollections')}>
                                <FontAwesomeIcon icon={faFolder} className={styles.icon} />
                                <h1>MY COLLECTIONS</h1>
                            </li>
                            <li onClick={() => handleNavClick('MyPreferences')}>
                                <FontAwesomeIcon icon={faCog} className={styles.icon} />
                                <h1>MY PREFERENCES</h1>
                            </li>
                            <li onClick={() => handleNavClick('RatedMovies')}>
                                <FontAwesomeIcon icon={faStar} className={styles.icon} />
                                <h1>RATED MOVIES</h1>
                            </li>
                        </ul>
                    </nav>
                    <div className={styles.content_area}>
                        {renderContent()} {/* Affiche le contenu correspondant à la sélection */}
                    </div>
                </div>
            </div>
        </div>
    );
};
