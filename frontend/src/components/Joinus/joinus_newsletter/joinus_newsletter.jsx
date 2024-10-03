import styles from "./joinus_newsletter.module.css";

export const Joinus_newsletter = () => {
    return (
        <div className={styles.newsletterContainer}>
            <h4 className={styles.newsletterTitle}>Newsletter</h4>
            <p className={styles.newsletterDesc}>Sign up to our newsletter</p>
            <form className={styles.newsletterForm}>
                <input type="email" placeholder="Email address" />
                <input type="text" placeholder="First name" />
                <input type="text" placeholder="Surname" />
                <button type="submit">Subscribe</button>
            </form>
        </div>
    );
};
