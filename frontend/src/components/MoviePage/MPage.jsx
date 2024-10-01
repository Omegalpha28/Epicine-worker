import useTheme from "../set_theme";
import styles from "./MPage.module.css";
import { Navbar } from "../Navbar/Navbar";
import { Toggle } from "../Toggle/Toggle";
import app_styles from "../../App.module.css";
import { Join_Us } from "../Joinus/join_us";
import { Movie_Profile } from "./Profile/movie_profile";
import { Trailer_Video } from "./Trailers/trailer_video";
import { useParams } from "react-router-dom";

export const MPage = () => {

  const [isDark, setIsDark] = useTheme();
  const { id } = useParams();

  return (
    <div className={styles.page} data-theme={isDark ? "dark" : "light"}>
      <div className={app_styles.App}>
        <Toggle isChecked={isDark} handleChange={() => setIsDark(!isDark)} />
        <Navbar />
        <div className={styles.box}>
          <Movie_Profile movieId={id} />
        </div>
      </div>
      <Join_Us />
    </div>
  );
};
