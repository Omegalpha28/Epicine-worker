import React, { useState } from "react";
import styles from "./NewRelease.module.css";
import useLocalStorage from "use-local-storage";

import { Navbar } from "../Navbar/Navbar";
import { Toggle } from "../Toggle/Toggle";

export const NewReleasePage = () => {
  const preference = window.matchMedia("prefers-color-scheme: dark)").matches;
  const [isDark, setisDark] = useLocalStorage("isDark", preference);

  return (

    <div className={styles.New_Release} data-theme={isDark ? "dark" : "light"}>
      <Toggle isChecked={isDark} handleChange={() => setisDark(!isDark)} />
      <Navbar />
    </div>
  );
};