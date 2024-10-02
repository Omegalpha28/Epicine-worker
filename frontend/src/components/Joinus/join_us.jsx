import styles from "./join_us.module.css";
import { getImageUrl } from "../../utils";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Joinus_chartes } from "./joinus_chartes/joinus_chartes.jsx"
import { Joinus_logo } from "./joinus_logo/joinus_logo.jsx"
import { Joinus_link } from "./joinus_link/joinus_link.jsx"

export const Join_Us = () => {
    return (
        <div className={styles.page}>
            <div className={styles.box}>
                <Link to="/">
                    <Joinus_logo/>
                </Link>
                <Joinus_chartes/>
                <Joinus_link/>
            </div>
        </div>
    )
}
