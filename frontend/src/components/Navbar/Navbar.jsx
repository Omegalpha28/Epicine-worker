import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import de Link
import styles from "./Navbar.module.css";
import { getImageUrl } from "../../utils";

export const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <nav className={styles.navbar}>
            <Link to="/">
                <img className={styles.logo} src={getImageUrl("logo.png")} alt="logo" />
            </Link>
            <div className={styles.menu}>
                <ul className={`${styles.menuItems} ${menuOpen && styles.menuOpen}`} onClick={() => setMenuOpen(false)}>
                    <li>
                        <Link to="/New_Release">New Release</Link>
                    </li>
                    <li>
                        <Link to="/Movies">Movies</Link>
                    </li>
                    <li>
                        <Link to="/TV_Shows">TV Shows</Link>
                    </li>
                    <li>
                        <Link to="/Streaming">Streaming</Link>
                    </li>
                    <li>
                        <Link to="/Trailers">Trailers</Link>
                    </li>
                    <li>
                        <p className={styles.account_MB}>―――――――</p>
                    </li>
                    <li>
                        <Link className={styles.account_MB} to="/login">My Account</Link>
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
            <Link className={styles.account_PC} to="/login">My Account</Link>
        </nav>
    );
};
