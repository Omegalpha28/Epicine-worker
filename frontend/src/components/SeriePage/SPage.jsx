import useTheme from "../set_theme";
import styles from "./SPage.module.css";
import { Navbar } from "../Navbar/Navbar";
import { Toggle } from "../Toggle/Toggle";
import app_styles from "../../App.module.css";
import { Join_Us } from "../Joinus/join_us";
import { Serie_Profile } from "./Profile/serie_profile";
import { useParams } from "react-router-dom";
import { WallpaperSerie } from "./Wallpaper/WallpaperSerie";

export const SPage = () => {

  const [isDark, setIsDark] = useTheme();
  const { id } = useParams();

  return (
    <div className={styles.page} data-theme={isDark ? "dark" : "light"}>
      <div className={app_styles.App}>
        <Toggle isChecked={isDark} handleChange={() => setIsDark(!isDark)} />
        <Navbar />
        <WallpaperSerie serieId={id} />
        <div className={styles.box}>
          <Serie_Profile serieId={id} />
        </div>
      </div>
      <Join_Us />
    </div>
  );
};

