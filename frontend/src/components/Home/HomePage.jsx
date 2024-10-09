import React, { useState } from "react";
import styles from "../../App.module.css";
import Home_style from "./HomePage.module.css";
import useLocalStorage from "use-local-storage";
import { Toggle } from "../Toggle/Toggle";
import { Navbar } from "../Navbar/Navbar";
import { Header } from "../Header/Header";
import { Home } from "./Home";
import { Join_Us } from "../Joinus/join_us";
import { Wallpaper } from "./Wallpaper/Wallpaper";
import { Search_Content } from "./Search_Content/Search_Content";
import { TrailerBox } from "./TrailerBox/TrailerBox";

export const HomePage = () => {
  const preference = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [isDark, setIsDark] = useLocalStorage("isDark", preference);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <div className={Home_style.page} data-theme={isDark ? "dark" : "light"}>
      <Navbar isDark={isDark} setSearchQuery={setSearchQuery} searchOpen={searchOpen} setSearchOpen={setSearchOpen} />
      {searchOpen && searchQuery && <Search_Content query={searchQuery} />}
      <div className={styles.App}>
        <Toggle style={{ visibility: 'hidden' }} isChecked={isDark}handleChange={() => setIsDark(!isDark)}
        />
        <TrailerBox />
        <Home />
      </div>
      <Join_Us />
    </div>
  );
};
