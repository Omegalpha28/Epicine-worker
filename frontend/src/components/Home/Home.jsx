import styles from "./Home.module.css";
import { UpComing } from "./UpComing/UpComing";
import { UpComing_Mobile } from "./UpComing_Mobile/UpComing_Mobile";
import { Trends } from "./Trends/Trends";
import { Popular } from "./Popular/Popular";
import { Latest_Release } from "./Latest_Release/Latest_Release";
import useTheme from "../set_theme";

export const Home = () => {
    const [isDark, setIsDark] = useTheme();

    return <div className={styles.home} data-theme={isDark ? "dark" : "light"}>
        <div className={styles.wrap_box}>
            <div className={styles.mobile}>
                <UpComing_Mobile />
            </div>
            <div className={styles.left_box}>
                <UpComing />
            </div>
            <div className={styles.right_box}>
                <Trends />
                <div className={styles.popular_box}>
                    <Popular />
                </div>
            </div>
        </div>
        <div className={styles.Latest_Release_box}>
            <Latest_Release />
        </div>
    </div>
}
