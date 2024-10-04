import styles from "./joinus_logo.module.css";
import { Link } from "react-router-dom";

export const Joinus_logo = () => {
    return (
        <div className={styles.logoContainer}>
            <Link to="/">
                <img className={styles.logo} src="http://localhost:5173/assets/full_logo.png" alt="logo" />
            </Link>
        </div>
    );
};
