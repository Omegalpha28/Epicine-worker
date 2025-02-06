import React, { useState } from "react";
import styles from "./Header.module.css";

export const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [searchInput, setSearchInput] = useState("");

    return (
        <nav className={styles.header}>
            <h1 className={styles.Title}>
                Bienvenue Epicineux
            </h1>
        </nav>
    );
};
