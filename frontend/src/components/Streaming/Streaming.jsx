import "./Streaming.module.css";
import { Navbar } from "../Navbar/Navbar";
import styles from "../../App.module.css";
import useLocalStorage from "use-local-storage";
import React, { useState, useEffect } from "react";
import useTheme from "../set_theme";

export const Streaming = () => {
    const [isDark, setIsDark] = useTheme();

    return (
        <div className={styles.App} data-theme={isDark ? "dark" : "light"}>
            <Navbar />
        </div>
    );
};