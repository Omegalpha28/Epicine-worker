import styles from "../../App.module.css";
import React, { useState } from "react";
import useLocalStorage from "use-local-storage";

import { Toggle } from "../Toggle/Toggle";
import { Navbar } from "../Navbar/Navbar";
import { Header } from "../Header/Header";
import { Home } from "./Home";

export const HomePage = () => {
  const preference = window.matchMedia("prefers-color-scheme: dark)").matches;
  const [isDark, setisDark] = useLocalStorage("isDark", preference);

  return (
    <div className={styles.App} data-theme={isDark ? "dark" : "light"}>
      <Toggle style={{ visibility: 'hidden' }} isChecked={isDark} handleChange={() => setisDark(!isDark)} />
      <Navbar className={styles.navbar}/>
      <Header />
      <Home />
    </div>
  )
}