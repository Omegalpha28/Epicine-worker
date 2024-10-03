import styles from "./joinus_logo.module.css";

export const Joinus_logo = () => {
    return (
        <div className={styles.logoContainer}>
            <img className={styles.logo} src="http://localhost:5173/assets/full_logo.png" alt="logo" />
        </div>
    );
};
