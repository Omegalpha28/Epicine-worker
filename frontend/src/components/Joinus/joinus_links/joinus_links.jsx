import { useState } from "react";
import styles from "./joinus_links.module.css";

export const Joinus_links = () => {
    const [isModalOpen, setModalOpen] = useState(false); // Pour la modal Contact

    const authors = [
        { name: "Mathieu", icon: "bxl-linkedin", link: "https://www.linkedin.com/in/mathieu-rea-a1b4092b5/" },
        { name: "Marin", icon: "bxl-linkedin", link: "https://www.linkedin.com/in/marin" },
        { name: "Raphaël", icon: "bxl-linkedin", link: "https://www.linkedin.com/in/rapha%C3%ABl-ostier-99923a2b0/" },
        { name: "Ossan", icon: "bxl-linkedin", link: "https://www.linkedin.com/in/ossan-msoili/" },
        { name: "Mathis", icon: "bxl-linkedin", link: "https://www.linkedin.com/in/mathis-quenardel/" },
    ];

    const usefulLinks = [
        { name: "Contact", action: () => setModalOpen(true) }, // Ouvre la modal
        { name: "Terms and Conditions", link: "#terms" },
        { name: "Privacy Policy", link: "#privacy" },
        { name: "Security", link: "#security" }
    ];

    return (
        <div className={styles.footer_section_padding}>
            <div className={styles.footer_links}>
                <div className={styles.footer_links_div}>
                    <h4>Useful Links</h4>
                    <ul>
                        {usefulLinks.map((link, index) => (
                            <li key={index} onClick={link.action || null}>
                                {link.link ? (
                                    <a href={link.link}>{link.name}</a>
                                ) : (
                                    <p>{link.name}</p>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {isModalOpen && (
                <div className={styles.modalOverlay} onClick={() => setModalOpen(false)}>
                    <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                        <h4>Select Contact</h4>
                        <ul>
                            {authors.map((author, index) => (
                                <li key={index}>
                                    <a href={author.link} target="_blank" rel="noopener noreferrer">
                                        {author.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                        <button onClick={() => setModalOpen(false)}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};
