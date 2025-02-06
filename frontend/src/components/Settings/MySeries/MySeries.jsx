import React, { useState } from "react";
import styles from "./MySeries.module.css"; 

export const MySeries = () => {
    const userSeries = {
        "user-1": ["Breaking Bad", "Stranger Things"],
        "user-2": [],
    };

    const userWishlist = {
        "user-1": ["The Office", "The Witcher"],
        "user-2": ["Peaky Blinders"],
    };

    const [userUUID, setUserUUID] = useState("user-1");
    const [activeTab, setActiveTab] = useState("wishlist"); // Default tab: wishlist
    const series = userSeries[userUUID]; 
    const wishlist = userWishlist[userUUID]; 

    const handleAddSeries = () => {
        alert("Ajouter des séries à votre liste de souhaits");
    };

    return (
        <div className={styles.seriesPage}>
            <h1>MES SÉRIES</h1>

            {/* Tabs Navigation */}
            <div className={styles.navTabs}>
                <a 
                    className={activeTab === "wishlist" ? "active" : ""} 
                    onClick={() => setActiveTab("wishlist")}
                >
                    Envies de voir
                </a>
                <a 
                    className={activeTab === "series" ? "active" : ""} 
                    onClick={() => setActiveTab("series")}
                >
                    Mes séries
                </a>
            </div>

            {/* Content based on active tab */}
            {activeTab === "wishlist" ? (
                <div className={styles.section}>
                    {wishlist.length === 0 ? (
                        <div className={styles.emptySeries}>
                            <img src="/path-to-ghostbusters-icon.png" alt="No Wishlist" />
                            <h2>Aucune série ne vous donne envie ?</h2>
                            <button className={styles.addButton} onClick={handleAddSeries}>
                                Ajouter des envies de voir
                            </button>
                            <p>Découvrez des séries à regarder</p>
                        </div>
                    ) : (
                        <div className={styles.wishlist}>
                            {wishlist.map((serie, index) => (
                                <div key={index} className={styles.wishlistItem}>
                                    {serie}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            ) : (
                <div className={styles.section}>
                    {series.length === 0 ? (
                        <div className={styles.emptySeries}>
                            <img src="/path-to-ghostbusters-icon.png" alt="No Series" />
                            <h2>Vous n'avez aucune série enregistrée.</h2>
                            <p>Ajoutez des séries à votre collection personnelle</p>
                        </div>
                    ) : (
                        <div className={styles.seriesList}>
                            {series.map((serie, index) => (
                                <div key={index} className={styles.seriesItem}>
                                    {serie}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};
