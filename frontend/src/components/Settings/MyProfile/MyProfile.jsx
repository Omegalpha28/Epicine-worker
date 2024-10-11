import React, { useEffect, useState } from "react";
import styles from "./MyProfile.module.css";

export const MyProfile = () => {
    const [user, setUser] = useState({
        username: "",
        email: "",
        phone: "",
        birthday: "",
        biography: "",
        avatar: "1c9b0ad4-89ac-4324-94ad-a9a60ab77b9a",
        banner: "",
        password: "",
    });

    const reformatDate = (date) => {
        if (!date) return "";
        const [day, month, year] = date.split("-");
        return `${day}/${month}/${year}`;
    };

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch("http://localhost:5555/user", {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });

                if (!response.ok)
                    throw new Error("Error fetching user information");

                const data = await response.json();

                setUser({
                    username: data.name,
                    email: data.email,
                    phone: data.telephone,
                    birthday: reformatDate(data.birthday),
                    avatar: data.avatar,
                    banner: data.banner,
                });
            } catch (error) {
                console.error("Error:", error);
            }
        };

        fetchUserData();
    }, []);

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

    return (
        <div className={styles.ProfileContainer}>
            <div
                className={styles.Banner}
                style={{ backgroundImage: user.banner ? `url(${user.banner})` : "var(--nav-bar)" }}
            >
                <img src={`/user/${user.avatar}`} alt="Avatar" className={styles.Avatar} />
                <h1 className={styles.username}>{user.username}</h1>
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
                        value={user.phone || ""}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
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
                        value={user.biography || ""}
                        onChange={(e) => handleInputChange("biography", e.target.value)}
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
            </div>
        </div>
    );
};
