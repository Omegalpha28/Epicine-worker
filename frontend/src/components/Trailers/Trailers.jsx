import useTheme from "../set_theme";
import styles from "./Trailers.module.css";
import { Navbar } from "../Navbar/Navbar";
import { Toggle } from "../Toggle/Toggle";
import app_styles from "../../App.module.css";
import { Join_Us } from "../Joinus/join_us";

export const TrailersPage = () => {

  const [isDark, setIsDark] = useTheme();

  return (
    <div className={styles.page} data-theme={isDark ? "dark" : "light"}>
      <div className={app_styles.App} >
        <Toggle isChecked={isDark} handleChange={() => setIsDark(!isDark)} />
        <Navbar />
        <div className={styles.New_Release_page}>
          <nav className={styles.header}>
            <div className={styles.searchContainer}>
                <input type="text" placeholder="Type to search..." className={styles.searchInput} />
                <button className={styles.searchButton}>
                  Search
                </button>
            </div>
          </nav>
        </div>
      <div className={styles.inside_box}>
          <h1>Trailers</h1>
      </div>
    </div>
    <Join_Us />
    </div>
  );
}