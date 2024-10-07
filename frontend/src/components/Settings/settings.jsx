import React, { useEffect, useState } from "react";
import styles from "./settings.module.css"; // Votre fichier CSS spécifique
import styles_App from "../../App.module.css";
import useTheme from "../set_theme";
import { Navbar } from "../Navbar/Navbar"; // Barre de navigation
import { MyProfile } from "../Settings/MyProfile/MyProfile";
import { MyMovies } from "../Settings/MyMovies/MyMovies";
import { MySeries } from "../Settings/MySeries/MySeries";
import { MyCollections } from "../Settings/MyCollections/MyCollections";
import { MyFavourites } from "../Settings/MyFavourites/MyFavourites";
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
            case 'MyFavourites':
                return <MyFavourites />;
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
                            <li onClick={() => handleNavClick('MyProfile')}>Mon profil</li>
                            <li onClick={() => handleNavClick('MyMovies')}>Mes films</li>
                            <li onClick={() => handleNavClick('MySeries')}>Mes séries</li>
                            <li onClick={() => handleNavClick('MyCollections')}>Mes collections</li>
                            <li onClick={() => handleNavClick('MyFavourites')}>Mes critiques</li>
                            <li onClick={() => handleNavClick('RatedMovies')}>Noter des films</li>
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
