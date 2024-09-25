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
        <h1>ok boomer</h1>
      </div>
    </div>
  );
};
