import React from "react";
import styles from "./Wallpaper.module.css";
import { getImageUrl } from "../../../utils";
import { TrailerBox } from "../TrailerBox/TrailerBox";

export const Wallpaper = ({ isDark }) => {

    return (
        <div className={styles.wallpaper}>
            <TrailerBox />
            <div className={styles.blurblock} />
        </div>
    );
};
