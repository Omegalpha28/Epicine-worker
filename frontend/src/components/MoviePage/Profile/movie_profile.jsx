import styles from './movie_profile.module.css';
import useTheme from '../../set_theme';

export const Movie_Profile = () => {

    const [isDark, setIsDark] = useTheme();

    return (
        <div className={styles.box} data-theme={isDark ? "dark" : "light"}>
            <div className={styles.picture}>Picture</div>
            <div className={styles.column_profile}>
                <div className={styles.row_profile}>
                    <div className={styles.Title}>Title</div>
                </div>
                <div className={styles.Resume}>Resume: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</div>
            </div>
        </div>
    );
}