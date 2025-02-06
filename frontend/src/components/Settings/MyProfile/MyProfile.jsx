import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Importer le hook useNavigate
import styles from "./MyProfile.module.css";

export const MyProfile = () => {
    const [user, setUser] = useState({
        name: "",
        email: "",
        telephone: "",
        birthday: "",
        bio: "",
        avatar: "1c9b0ad4-89ac-4324-94ad-a9a60ab77b9a",
        banner: "",
        password: "",
    });

    const navigate = useNavigate(); // Utiliser le hook useNavigate pour la redirection

    const reformatDate = (date) => {
        if (!date) return "";
        const [day, month, year] = date.split("-");
        return `${day}/${month}/${year}`;
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login", { replace: true }); // Redirige si pas de token
            return;
        }

        // Fetch des données utilisateur si un token est trouvé
        const fetchUserData = async () => {
            try {
                const response = await fetch("http://localhost:5555/user", {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!response.ok) throw new Error("Error fetching user information");

                const data = await response.json();

                setUser({
                    name: data.name,
                    email: data.email,
                    telephone: data.telephone,
                    birthday: reformatDate(data.birthday),
                    avatar: data.avatar,
                    banner: data.banner,
                });
            } catch (error) {
                console.error("Error:", error);
            }
        };

        fetchUserData();
    }, [navigate]);

    const handleInputChange = (field, value) => {
        setUser((prevUser) => ({ ...prevUser, [field]: value }));
    };

    const handleSubmitAll = async () => {
        try {
            const response = await fetch("http://localhost:5555/update/user", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify(user),
            });

            if (!response.ok) {
                throw new Error("Error updating user information");
            }

            const data = await response.json();
            console.log("Update successful:", data);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const handleLogout = () => {
        // Supprimer le token du localStorage pour déconnecter l'utilisateur
        localStorage.removeItem("token");
        console.log("User logged out");

        // Rediriger immédiatement vers la page de login
        navigate("/login", { replace: true });
    };

    return (
        <div className={styles.ProfileContainer}>
            <div
                className={styles.Banner}
                style={{ backgroundImage: user.banner ? `url(${user.banner})` : "var(--nav-bar)" }}
            >
                <img src={`/user/${user.avatar}`} alt="Avatar" className={styles.Avatar} />
                <h1 className={styles.name}>{user.name}</h1>
            </div>

            <div className={styles.InputContainer}>
                <div className={styles.inputGroup}>
                    <label>Email</label>
                    <input type="email" value={user.email} disabled />
                </div>

                <div className={styles.inputGroup}>
                    <label>Phone</label>
                    <input
                        type="text"
                        value={user.telephone || ""}
                        onChange={(e) => handleInputChange("telephone", e.target.value)}
                        placeholder="Not provided"
                    />
                </div>

                <div className={styles.inputGroup}>
                    <label>Birthday</label>
                    <input
                        type="text"
                        value={user.birthday || ""}
                        onChange={(e) => handleInputChange("birthday", e.target.value)}
                        placeholder="Not provided"
                    />
                </div>

                <div className={styles.inputGroup}>
                    <label>Biography</label>
                    <textarea
                        value={user.bio || ""}
                        onChange={(e) => handleInputChange("bio", e.target.value)}
                    />
                </div>

                {/* Single Save button for all fields */}
                <button
                    type="button"
                    onClick={handleSubmitAll}
                    className={styles.SaveButtonAll}
                >
                    Save
                </button>

                {/* Logout button */}
                <button
                    type="button"
                    onClick={handleLogout}
                    className={styles.LogoutButton}
                >
                    Logout
                </button>
            </div>
        </div>
    );
};
