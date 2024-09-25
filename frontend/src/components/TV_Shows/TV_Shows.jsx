import "./TV_Shows.module.css";
import { Navbar } from "../Navbar/Navbar";
import styles from "../../App.module.css";
import useTheme from "../set_theme";

export const TV_Shows = () => {
    const [isDark, setIsDark] = useTheme();
    return (
        <div className={styles.App} data-theme={isDark ? "dark" : "light"}>
            <Navbar />
        </div>
    );
};