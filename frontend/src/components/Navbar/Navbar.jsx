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
            <ul className={`${styles.menuItems} ${menuOpen && styles.menuOpen}`}
                onClick={() => setMenuOpen(false)}>
                <li>
                    <a href="#Releases">New Releases</a>
                </li>
                <li>
                    <a href="#Movies">Movies</a>
                </li>
                <li>
                    <a href="#Shows">TV Shows</a>
                </li>
                <li>
                    <a href="#Streaming">Streaming</a>
                </li>
                <li>
                    <a href="#Trailers">Trailers</a>
                </li>
                <li>
                    <p className={styles.account_MB}>―――――――</p>
                </li>
                <li>
                    <a className={styles.account_MB} href="#Account">My Account</a>
                </li>
            </ul>
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
        </div>
        <a className={styles.account_PC} href="#Account">My Account</a>
    </nav>;
}
