import useTheme from "../set_theme";
import styles from "./NewRelease.module.css";
import { Navbar } from "../Navbar/Navbar";
import { Toggle } from "../Toggle/Toggle";

export const NewReleasePage = () => {

  const [isDark, setIsDark] = useTheme();

  return (
    <div className={styles.New_Release_nav} data-theme={isDark ? "dark" : "light"}>
      <Toggle isChecked={isDark} handleChange={() => setIsDark(!isDark)} />
      <Navbar />
      <div className={styles.New_Release_page}>
      <nav className={styles.header}>
            <div className={styles.searchContainer}>
                <input type="text"
                    placeholder="Type to search..."
                    className={styles.searchInput}
                />
                <button className={styles.searchButton}>
                    Search
                </button>
            </div>
        </nav>
      </div>
    </div>
  );
};
