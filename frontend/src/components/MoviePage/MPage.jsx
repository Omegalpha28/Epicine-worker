import { useEffect, useState } from "react";
import useTheme from "../set_theme";
import styles from "./MPage.module.css";
import { Navbar } from "../Navbar/Navbar";
import { Toggle } from "../Toggle/Toggle";
import app_styles from "../../App.module.css";
import { Join_Us } from "../Joinus/join_us";
import { Movie_Profile } from "./Profile/movie_profile";
import { useParams } from "react-router-dom";
import { WallpaperMovie } from "./Wallpaper/WallpaperMovie";
import { Search_Content } from "../Home/Search_Content/Search_Content";

export const MPage = () => {
  const [isDark, setIsDark] = useTheme();
  const { id } = useParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <div className={styles.page} data-theme={isDark ? "dark" : "light"}>
      <div className={app_styles.App}>
        <Navbar setSearchQuery={setSearchQuery} searchOpen={searchOpen} setSearchOpen={setSearchOpen} />
        {searchOpen && searchQuery && <Search_Content query={searchQuery} />}

        <WallpaperMovie movieId={id} />
        <div className={styles.box}>
          <Movie_Profile movieId={id} />
        </div>
      </div>
      <Join_Us />
    </div>
  );
};
