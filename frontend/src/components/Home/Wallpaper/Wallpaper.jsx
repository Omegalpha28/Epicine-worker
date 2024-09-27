import React, { useState, useEffect } from "react";
import styles from "./Wallpaper.module.css";
import { getImageUrl } from "../../../utils";

export const Wallpaper = () => {
    return (
        <div className={styles.wallpaper}>
          <img className={styles.image} src={getImageUrl("home_wallpaper.jpg")} alt="wallpaper image" />
          <div className={styles.blurblock}/>
        </div>
    );
};
