import styles from "./join_us.module.css";
import { Joinus_logo } from "./joinus_logo/joinus_logo.jsx";
import { Joinus_links } from "./joinus_links/joinus_links.jsx";
import { Joinus_newsletter } from "./joinus_newsletter/joinus_newsletter.jsx";

export const Join_Us = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.footerContainer}>
                <div className={styles.footerSection}>
                    <Joinus_logo />
                </div>
                <div className={styles.footerSection}>
                    <Joinus_links />
                </div>
                <div className={styles.footerSection}>
                    <Joinus_newsletter />
                </div>
            </div>
            <div className={styles.footerCopyright}>
                <p>Copyright IATI 2024. All rights reserved</p>
            </div>
        </footer>
    );
};
