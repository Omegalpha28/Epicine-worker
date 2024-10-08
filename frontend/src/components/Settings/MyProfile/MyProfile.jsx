import React, { useEffect, useState } from "react";
import styles from "./MyProfile.module.css";

export const MyProfile = () => {
    const [user, setUser] = useState({
        pseudo: "",
        email: "",
        telephone: "",
        birthday: "",
        biography: "",
        avatar: "",
        banner: ""
    });

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch("http://localhost:5555/user", {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });

                if (!response.ok) {
                    throw new Error("Erreur lors de la récupération des informations utilisateur");
                }

                const data = await response.json();
                setUser({
                    pseudo: data.name,
                    email: data.email,
                    telephone: data.telephone || "Non renseigné",
                    birthday: data.birthday || "",
                    biography: data.biography || "Pas de biographie disponible",
                    avatar: data.avatar || "1c9b0ad4-89ac-4324-94ad-a9a60ab77b9a",
                    banner: data.banner || "",
                });
            } catch (error) {
                console.error("Erreur :", error);
            }
        };

        fetchUserData();
    }, []);

    const handleInputChange = (field, value) => {
        setUser((prevUser) => ({ ...prevUser, [field]: value }));
    };

    const handleSubmit = async (field) => {
        try {
            const response = await fetch("http://localhost:5555/user", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify({
                    [field]: user[field],
                }),
            });

            if (!response.ok) {
                throw new Error(`Erreur lors de la mise à jour de ${field}`);
            }

            const data = await response.json();
            console.log("Mise à jour réussie :", data);
        } catch (error) {
            console.error("Erreur :", error);
        }
    };

    return (
        <div className={styles.ProfileContainer}>
            <div
                className={styles.Banner}
                style={{ backgroundImage: user.banner ? `url(${user.banner})` : "var(--nav-bar)" }}
            >
                <img src={user.avatar} alt="Avatar" className={styles.Avatar} />
                <h1>{user.pseudo}</h1>
            </div>

            <div className={styles.InputContainer}>
                <div className={styles.inputGroup}>
                    <label>Email</label>
                    <input type="email" value={user.email} disabled />
                </div>
                <div className={styles.inputGroup}>
                    <label>Téléphone</label>
                    <div className={styles.inputWithButton}>
                        <input
                            type="text"
                            value={user.telephone}
                            onChange={(e) => handleInputChange('telephone', e.target.value)}
                        />
                        <button
                            type="button"
                            onClick={() => handleSubmit('telephone')}
                            className={styles.SaveButton}
                        >
                            Enregistrer
                        </button>
                    </div>
                </div>
                <div className={styles.inputGroup}>
                    <label>Date de naissance</label>
                    <input
                        type="date"
                        value={user.birthday}
                        onChange={(e) => handleInputChange('birthday', e.target.value)}
                    />
                </div>
                <div className={styles.inputGroup}>
                    <label>Biographie</label>
                    <div className={styles.inputWithButton}>
                        <textarea
                            value={user.biography}
                            onChange={(e) => handleInputChange('biography', e.target.value)}
                        />
                        <button
                            type="button"
                            onClick={() => handleSubmit('biography')}
                            className={styles.SaveButton}
                        >
                            Enregistrer
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
