import styles from "./joinus_link.module.css";
import { getImageUrl } from "../../../utils";
import { Link } from "react-router-dom";
import { useState } from "react";

export const Joinus_link = () => {
    const [activeAuthor, setActiveAuthor] = useState(null); // Garde en mémoire l'auteur cliqué

    const authors = [
        { name: "Mathieu", icon: "bxl-linkedin", link: "https://www.linkedin.com/in/mathieu-rea-a1b4092b5/" },
        { name: "Marin", icon: "bxl-linkedin", link: "https://www.linkedin.com/in/marin" },
        { name: "Raphaël", icon: "bxl-linkedin", link: "https://www.linkedin.com/in/rapha%C3%ABl-ostier-99923a2b0/" },
        { name: "Ossan", icon: "bxl-linkedin", link: "https://www.linkedin.com/in/ossan-msoili/" },
    ];

    const handleClick = (index) => {
        setActiveAuthor(activeAuthor === index ? null : index); // Active ou désactive l'auteur cliqué
    };

    return (
        <div className={styles.footer_section_padding}>
            <div className={styles.footer_links}>
                <div className={styles.footer_links_div}>
                    <h4>Authors</h4>
                    <ul>
                        {authors.map((author, index) => (
                            <li 
                                key={index} 
                                className={styles.authorItem}
                                onClick={() => handleClick(index)} // Gère le clic pour afficher l'icône
                            >
                                <p>{author.name}</p>
                                {activeAuthor === index && ( // Affiche l'icône si l'auteur est sélectionné
                                    <div className={styles.iconBox}>
                                        <a href={author.link} target="_blank" rel="noopener noreferrer">
                                            <i className={`bx ${author.icon}`}></i>
                                        </a>
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};