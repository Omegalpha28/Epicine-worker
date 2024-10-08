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

export const SettingsPage = () => {
    const [selectedNav, setSelectedNav] = useState('MyMovies'); // Par défaut sur "Mes films"
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
                return <MyMovies />;
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
                            <li onClick={() => handleNavClick('MyProfile')}>My profil</li>
                            <li onClick={() => handleNavClick('MyMovies')}>My movies</li>
                            <li onClick={() => handleNavClick('MySeries')}>My series</li>
                            <li onClick={() => handleNavClick('MyCollections')}>My collections</li>
                            <li onClick={() => handleNavClick('MyPreferences')}>My preferences</li>
                            <li onClick={() => handleNavClick('RatedMovies')}>Rated Movies</li>
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
