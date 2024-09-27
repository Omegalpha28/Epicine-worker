import styles from './trailer_video.module.css';
import useTheme from '../../set_theme';

export const Trailer_Video = () => {

    const [isDark, setIsDark] = useTheme();

    return (
        <div className={styles.box} data-theme={isDark ? "dark" : "light"}>
            Trailer
        </div>
    );
}