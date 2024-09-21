import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import de Link
import styles from "./Header.module.css";
import { getImageUrl } from "../../utils";

export const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [searchInput, setSearchInput] = useState("");

    return (
        <nav className={styles.header}>
            <h1 className={styles.Title}>
                Bienvenue Epicineux
            </h1>
            <div className={styles.searchContainer}>
                <input type="text"
                    placeholder="Type to search..."
                    className={styles.searchInput}
                />
                <button className={styles.searchButton}>
                    Search
                </button>
            </div>
        </nav>
    );
};
