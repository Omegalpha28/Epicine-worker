import React, { useState, useEffect } from "react";
import styles from "./Navbar.module.css";
import { Link } from "react-router-dom";
import { getImageUrl } from "../../utils";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserTie, faSignOutAlt, faCog } from '@fortawesome/free-solid-svg-icons';
import { Search_Content } from "../Home/Search_Content/Search_Content";

export const Navbar = ({ isDark, setIsDark, isLoggedIn, setIsLoggedIn }) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [searchText, setSearchText] = useState("");
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest(`.${styles.box}`) && searchOpen) {
                setSearchOpen(false);
            }
        };
        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [searchOpen]);

    const handleSearch = () => {
        setSearchQuery(searchText);
        setSearchOpen(true);
    };

    const handleLogout = () => {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('token');
        setIsLoggedIn(false);
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleSearch();
        } else if (e.key === "Escape") {
            setSearchOpen(false);
            setSearchText("");
        }
    };

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
                    <li><Link to="/Forum">Forums</Link></li>
                    {isLoggedIn ? (
                        <>
                            <li><Link to="/settings">Settings</Link></li>
                            <li className={styles.account_MB}>
                                <a onClick={handleLogout}>
                                    <FontAwesomeIcon icon="fa-solid fa-user-plus" />
                                </a>
                            </li>
                        </>
                    ) : (
                        <li className={styles.account_MB}>
                            <Link to="/login">
                                <FontAwesomeIcon icon={faUserTie} />
                            </Link>
                        </li>
                    )}
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
                    onKeyDown={handleKeyDown}
                />
                <a href="#" onClick={(e) => { e.preventDefault(); handleSearch(); }}>
                    <img
                        className={styles.fas}
                        src={getImageUrl("glass.svg")}
                        alt="search-icon"
                    />
                </a>
            </div>
            {searchOpen && searchQuery && (
                <div className={`${styles.searchContent}`}>
                    <Search_Content query={searchQuery} />
                </div>
            )}
            <Link className={styles.account_PC} to={isLoggedIn ? "#" : "/login"}>
                <FontAwesomeIcon icon={isLoggedIn ? faSignOutAlt : faUserTie} />
            </Link>
        </nav>
    );
};
