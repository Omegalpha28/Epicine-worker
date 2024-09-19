import React, { useState } from "react";

import styles from "./Navbar.module.css";
import { getImageUrl } from "../../utils";

export const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    return <nav className={styles.navbar}>
        <a href="/">
            <img className={styles.logo} src={getImageUrl("logo.svg")} alt="logo" />
        </a>
        <div className={styles.menu}>
            <img
                className={styles.menuBtn}
                src={
                    menuOpen
                        ? getImageUrl("nav/closeIcon.png")
                        : getImageUrl("nav/menuIcon.png")
                }
                alt="menu-button"
                onClick={() => setMenuOpen(!menuOpen)}
            />
            <ul className={`${styles.menuItems} ${menuOpen && styles.menuOpen}`}
                onClick={() => setMenuOpen(false)}>
                <li>
                    <a href="#Nouveau">Nouveau</a>
                </li>
                <li>
                    <a href="#Cinema">Cinema</a>
                </li>
                <li>
                    <a href="#Series">Series</a>
                </li>
                <li>
                    <a href="#Streaming">Streaming</a>
                </li>
                <li>
                    <a href="#Trailers">Trailers</a>
                </li>
            </ul>
        </div>
    </nav>;
}
