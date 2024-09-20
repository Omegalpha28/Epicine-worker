import React, { useState } from "react";
import styles from "./Popular.module.css";

export const Popular = () => {

    return <div className={styles.box}>
        <div className={styles.main_box}>
            <div className={styles.header}>
                <h1 className={styles.title_box}>Popular</h1>
                <div className={styles.categories}>
                    <button className={styles.streaming}>Streaming</button>
                    <button className={styles.television}>Television</button>
                    <button className={styles.to_rent}>To rent</button>
                    <button className={styles.cinema}>Cinema</button>
                </div>
            </div>
            <div className={styles.inside_box}>
                <h1>Elements</h1>
            </div>
        </div>
    </div>
}