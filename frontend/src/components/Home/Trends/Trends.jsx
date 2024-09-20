import React, { useState } from "react";
import styles from "./Trends.module.css";

export const Trends = () => {

    return <div className={styles.box}>
        <div className={styles.main_box}>
            <div className={styles.header}>
                <h1 className={styles.title_box}>Trends</h1>
                <div className={styles.categories}>
                    <button className={styles.today}>Today</button>
                    <button className={styles.this_week}>This week</button>
                </div>
            </div>
            <div className={styles.inside_box}>
                <h1>Elements</h1>
            </div>
        </div>
    </div>
}