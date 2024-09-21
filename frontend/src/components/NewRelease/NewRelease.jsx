import React, { useState } from "react";
import "./NewRelease.module.css";
import { Navbar } from "../Navbar/Navbar";
import styles from "../../App.module.css";
import useLocalStorage from "use-local-storage";

export const NewReleasePage = () => {
    const [isDark, setisDark] = useLocalStorage("isDark", preference);

    return (

    <div className={styles.App}>
      <Toggle style={{ visibility: 'hidden' }} isChecked={isDark} handleChange={() => setisDark(!isDark)} />
      <Navbar />
    </div>
    );
};