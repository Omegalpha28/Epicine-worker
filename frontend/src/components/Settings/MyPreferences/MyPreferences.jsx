import React, { useState, useEffect } from "react";
import styles from "./MyPreferences.module.css";
import useLocalStorage from "use-local-storage";
import { Toggle } from "../../Toggle/Toggle";

export const MyPreferences = () => {
    const [pseudo, setPseudo] = useState("");
    const [email, setEmail] = useState("");
    const [gender, setGender] = useState("");
    const [day, setDay] = useState("");
    const [month, setMonth] = useState("");
    const [year, setYear] = useState("");
    const [password, setPassword] = useState("");
    const [isDark, setIsDark] = useLocalStorage("isDark", false);

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

    const handleSave = () => {
        const updatedUser = {
            name: pseudo,
            gender,
            birthday: `${year}-${month}-${day}`,
            ...(password && { password }),
        };

        fetch("http://localhost:5555/update/user", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify(updatedUser),
        })
            .then(response => {
                if (response.ok) {
                    alert("Mise à jour réussie");
                } else {
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
        <div className={styles.PreferencesContainer}>
            <h1>PREFERENCES</h1>
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
                    <label>Iam</label>
                    <select
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                    >
                        <option value="">Select gender</option>
                        <option value="male">Men</option>
                        <option value="female">Women</option>
                    </select>
                </div>

                <div className={styles.inputGroup}>
                    <label>Birthdate</label>
                    <div className={styles.birthDate}>
                        <select value={day} onChange={(e) => setDay(e.target.value)}>
                            <option value="">Day</option>
                            {generateOptions(1, 31)}
                        </select>
                        <select value={month} onChange={(e) => setMonth(e.target.value)}>
                            <option value="">Month</option>
                            {generateOptions(1, 12)}
                        </select>
                        <select value={year} onChange={(e) => setYear(e.target.value)}>
                            <option value="">Year</option>
                            {generateOptions(new Date().getFullYear() - 100, new Date().getFullYear())}
                        </select>
                    </div>
                </div>

                <div className={styles.inputGroup}>
                    <label>New password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Let empty if you don't want to change"
                    />
                </div>

                <button type="button" className={styles.saveButton} onClick={handleSave}>
                    Save
                </button>
                <div className={styles.toggleContainer}>
                    <Toggle isChecked={isDark} handleChange={() => setIsDark(!isDark)} />
                    <div className={styles.deactivateAccount}>
                        <a href="#deactivate">Deactivate my account</a>
                    </div>
                </div>
            </form>
        </div>
    );
};
