import React, { useState } from "react";
import styles from "./Home.module.css";
import { Latest_Release } from "./Latest_Release/Latest_Release";
import { Latest_Release_Mobile } from "./Latest_Release_Mobile/Latest_Release_Mobile";
import { Trends } from "./Trends/Trends";
import { Popular } from "./Popular/Popular";
import { Free } from "./Free/Free";

export const Home = () => {


    return <div className={styles.home}>
        <div className={styles.wrap_box}>
            <div className={styles.mobile}>
                <Latest_Release_Mobile />
            </div>
            <div className={styles.left_box}>
                <Latest_Release />
            </div>
            <div className={styles.right_box}>
                <Trends />
                <div className={styles.popular_box}>
                    <Popular />
                </div>
            </div>
        </div>
        <div className={styles.free_box}>
            <Free />
        </div>
    </div>
}