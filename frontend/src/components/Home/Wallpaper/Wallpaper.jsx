import React from "react";
import styles from "./Wallpaper.module.css";
import { getImageUrl } from "../../../utils";

export const Wallpaper = ({ isDark }) => {
    const wallpaperImage = isDark
        ? getImageUrl("home_wallpaper_dark.jpg")
        : getImageUrl("home_wallpaper_light.png");

    return (
        <div className={styles.wallpaper}>
            <img className={styles.image} src={wallpaperImage} alt="wallpaper" />
            <div className={styles.blurblock} />
        </div>
    );
};
