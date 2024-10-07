import React, { useState, useEffect } from "react";
import styles from "./MyFavourites.module.css";

export const MyFavourites = () => {
    const [pseudo, setPseudo] = useState("");
    const [email, setEmail] = useState("");
    const [gender, setGender] = useState("");
    const [day, setDay] = useState("");
    const [month, setMonth] = useState("");
    const [year, setYear] = useState("");

    // Fonction pour récupérer les informations utilisateur
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch("http://localhost:5555/user", {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });

                // Vérifier si la réponse est OK
                if (!response.ok) {
                    throw new Error("Erreur lors de la récupération des informations utilisateur");
                }

                const data = await response.json();
                // Assigner les valeurs récupérées aux états
                setPseudo(data.name);
                setEmail(data.email);
                setGender(data.gender);

                if (data.birthday) {
                    const [year, month, day] = data.birthday.split("-");
                    setDay(day);
                    setMonth(month);
                    setYear(year);
                }
            } catch (error) {
                console.error("Erreur :", error);
            }
        };

        fetchUserData();
    }, []);

    // Fonction pour sauvegarder les changements
    const handleSave = () => {
        const updatedUser = {
            name: pseudo,
            gender, // Ajout du genre
            birthday: `${year}-${month}-${day}`, // Ajout de la date de naissance
        };

        fetch("http://localhost:5555/user/update", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify(updatedUser),
        })
            .then(response => {
                if (response.ok) {
                    console.log("Mise à jour réussie");
                    alert("Mise à jour réussie");
                } else {
                    console.error("Erreur lors de la mise à jour");
                    alert("Erreur lors de la mise à jour");
                }
            })
            .catch(error => console.error("Erreur lors de la mise à jour :", error));
    };

    const generateOptions = (start, end) => {
        return Array.from({ length: end - start + 1 }, (_, i) => (
            <option key={i} value={start + i}>
                {start + i}
            </option>
        ));
    };

    return (
        <div className={styles.FavouritesContainer}>
            <h1>PRÉFÉRENCES</h1>
            <div className={styles.tabMenu}>
                <button className={styles.activeTab}>PROFIL</button>
                <button>NEWSLETTER</button>
            </div>

            <form className={styles.form}>
                <div className={styles.inputGroup}>
                    <label>Pseudo</label>
                    <input
                        type="text"
                        value={pseudo}
                        onChange={(e) => setPseudo(e.target.value)}
                    />
                </div>

                <div className={styles.inputGroup}>
                    <label>Email</label>
                    <input
                        type="email"
                        value={email}
                        disabled
                    />
                </div>

                <div className={styles.inputGroup}>
                    <label>Je suis</label>
                    <select
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                    >
                        <option value="">Sélectionner un genre</option>
                        <option value="male">Homme</option>
                        <option value="female">Femme</option>
                    </select>
                </div>

                <div className={styles.inputGroup}>
                    <label>Date de naissance</label>
                    <div className={styles.birthDate}>
                        <select value={day} onChange={(e) => setDay(e.target.value)}>
                            <option value="">Jour</option>
                            {generateOptions(1, 31)}
                        </select>
                        <select value={month} onChange={(e) => setMonth(e.target.value)}>
                            <option value="">Mois</option>
                            {generateOptions(1, 12)}
                        </select>
                        <select value={year} onChange={(e) => setYear(e.target.value)}>
                            <option value="">Année</option>
                            {generateOptions(new Date().getFullYear() - 100, new Date().getFullYear())}
                        </select>
                    </div>
                </div>

                <button type="button" className={styles.saveButton} onClick={handleSave}>
                    ENREGISTRER
                </button>
                <div className={styles.deactivateAccount}>
                    <a href="#deactivate">Désactiver mon compte</a>
                </div>
            </form>
        </div>
    );
};
