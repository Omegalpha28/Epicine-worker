import React from "react";
import styles from "../../App.module.css";
import Home_style from "./HomePage.module.css";
import useLocalStorage from "use-local-storage";
import { Toggle } from "../Toggle/Toggle";
import { Navbar } from "../Navbar/Navbar";
import { Home } from "./Home";
import { Join_Us } from "../Joinus/join_us";
import { Wallpaper } from "./Wallpaper/Wallpaper";

export const HomePage = () => {
  const preference = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [isDark, setIsDark] = useLocalStorage("isDark", preference);

  return (
    <div className={Home_style.page} data-theme={isDark ? "dark" : "light"}>
      <Navbar isDark={isDark} setIsDark={setIsDark} />
      <div className={styles.App}>
        <Wallpaper />
        <Home />
      </div>
      <Join_Us />
    </div>
  );
};
