import styles from "./joinus_logo.module.css";
import { getImageUrl } from "../../../utils";
import { Link } from "react-router-dom";
import { useState } from "react";

export const Joinus_logo = () => {
    return (
        <div>
            <img class={styles.logo} src="http://localhost:5173/assets/full_logo.png" alt="logo"/>
        </div>
    );
};
