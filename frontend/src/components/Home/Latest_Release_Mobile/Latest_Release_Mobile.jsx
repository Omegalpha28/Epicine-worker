import React, { useState } from "react";
import styles from "./Latest_Release_Mobile.module.css";

export const Latest_Release_Mobile = () => {

    return <div className={styles.box}>
        <div className={styles.main_box}>
            <div className={styles.header}>
                <h1 className={styles.title_box}>Latest Release</h1>
                <div className={styles.categories}>
                    <button className={styles.movies}>Movies</button>
                    <button className={styles.series}>Series</button>
                </div>
            </div>
            <div className={styles.inside_box}>
                <h1>Elements</h1>
            </div>
        </div>
    </div>
}