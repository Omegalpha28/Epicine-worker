import React, { useState, useEffect } from "react";
import styles from "./NewRelease.module.css";
import useLocalStorage from "use-local-storage";
import { Navbar } from "../Navbar/Navbar";
import { Toggle } from "../Toggle/Toggle";

export const NewReleasePage = () => {
  const preference = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [isDark, setIsDark] = useLocalStorage("isDark", preference);
  const [firstTime, setFirstTime] = useState(0);

  useEffect(() => {
    if (preference && firstTime === 0) {
      setIsDark(true);
      setFirstTime(1);
    }
  }, [preference, firstTime, setIsDark]);

  return (
    <div className={styles.New_Release_nav} data-theme={isDark ? "dark" : "light"}>
      <Toggle isChecked={isDark} handleChange={() => setIsDark(!isDark)} />
      <Navbar />
      <div className={styles.New_Release_page} data-theme={isDark ? "dark" : "light"}>
        <h1>ok boomer</h1>
      </div>
    </div>
  );
};
