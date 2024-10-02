import React, { useState, useEffect } from "react";
import styles from "./Navbar.module.css";
import { Link } from "react-router-dom";
import { getImageUrl } from "../../utils";

export const Navbar = ({ isDark, setSearchQuery }) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [searchText, setSearchText] = useState("");

    const handleSearch = () => {
        setSearchQuery(searchText);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest(`.${styles.box}`)) {
                setSearchOpen(false);
            }
        };
        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    return (
        <nav className={styles.navbar}>
            <Link to="/">
                <img
                    className={styles.logo}
                    src={getImageUrl("full_logo.png")}
                    alt="logo"
                />
            </Link>
            <div className={styles.menu}>
                <ul className={`${styles.menuItems} ${menuOpen && styles.menuOpen}`}>
                    <li><Link to="/New_Release">Events</Link></li>
                    <li><Link to="/Movies">Movies</Link></li>
                    <li><Link to="/TV_Shows">Series</Link></li>
                    <li><Link to="/Streaming">Forums</Link></li>
                    <li className={styles.account_MB}><Link to="/login">My Account</Link></li>
                </ul>
                <img
                    className={styles.menuBtn}
                    src={getImageUrl(menuOpen ? "nav/closeIcon.png" : "nav/menuIcon.png")}
                    alt="menu-button"
                    onClick={() => setMenuOpen(!menuOpen)}
                />
            </div>
            <div className={`${styles.box} ${searchOpen ? styles.open : ''}`}>
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                />
                <a href="#" onClick={handleSearch}>
                    <img
                        className={styles.fas}
                        src={getImageUrl("glass.svg")}
                        alt="search-icon"
                        onClick={() => setSearchOpen(!searchOpen)}
                    />
                </a>
            </div>
            <Link className={styles.account_PC} to="/login">My Account</Link>
        </nav>
    );
};
