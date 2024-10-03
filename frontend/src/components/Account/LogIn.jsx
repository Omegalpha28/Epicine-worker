import React, { useState } from 'react';
import { Navbar } from "../Navbar/Navbar";
import styles from "../../App.module.css";
import Login_styles from "./Login.module.css";
import { ConnectGoogle } from "./connect";
import { Link, useNavigate } from 'react-router-dom';
import useTheme from "../set_theme";
import { Search_Content } from "../Home/Search_Content/Search_Content";

export const LoginPage = () => {
    const [isDark, setIsDark] = useTheme();
    const navigate = useNavigate();
    const [values, setValues] = useState({
        email: "",
        password: ""
    });
    const [issues, setIssues] = useState({ email: '', password: '' });
    // Nouveaux états pour la recherche
    const [searchQuery, setSearchQuery] = useState("");
    const [searchOpen, setSearchOpen] = useState(false); // État pour la visibilité de la recherche

    const handleInput = (event) => {
        const { name, value } = event.target;
        setValues((prevValues) => ({
            ...prevValues,
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const { email, password } = values;
        if (!email || !password) {
            setIssues({
                email: !email ? 'Email is required' : '',
                password: !password ? 'Password is required' : ''
            });
            return;
        }

        try {
            const response = await fetch("http://localhost:5555/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (response.ok) {
                navigate("/");
            } else {
                console.error("Erreur de connexion:", data.msg);
                setIssues(prev => ({ ...prev, email: data.msg }));
            }
        } catch (error) {
            console.error("Erreur lors de l'envoi de la requête:", error);
        }
    };

    return (
        <div className={styles.App} data-theme={isDark ? "dark" : "light"}>
            <Navbar 
                setSearchQuery={setSearchQuery} 
                searchOpen={searchOpen} 
                setSearchOpen={setSearchOpen} 
            />
            {searchOpen && searchQuery && <Search_Content query={searchQuery} />} {/* Affichez les résultats de recherche si ouverts */}
            <div className={Login_styles.Connect}>
                <div className={Login_styles.Login}>
                    <form className={Login_styles.Form} onSubmit={handleSubmit}>
                        <div className={Login_styles.Title}>EpiCine</div>
                        <div className={Login_styles.TitleLog}>Log In</div>
                        <div className={Login_styles.OneClick}>On one click with:</div>
                        <ConnectGoogle />
                        <p className={Login_styles.or}>________________________________________</p>

                        {/* Email Input */}
                        <div className={Login_styles.mb3}>
                            <p className="name"><strong>Email</strong></p>
                            <input
                                type="email"
                                required
                                name="email"
                                placeholder="Email or Username"
                                onChange={handleInput}
                                value={values.email}
                            />
                            {issues.email && (
                                <span className={Login_styles.TextDanger}>
                                    {issues.email}
                                </span>
                            )}
                        </div>

                        {/* Password Input */}
                        <div className={Login_styles.mb3}>
                            <p className="name"><strong>Password</strong></p>
                            <input
                                type="password"
                                required
                                name="password"
                                placeholder="Password"
                                onChange={handleInput}
                                value={values.password}
                            />
                            {issues.password && (
                                <span className={Login_styles.TextDanger}>
                                    {issues.password}
                                </span>
                            )}
                        </div>

                        <button type="submit" className={Login_styles.btnLogInSuccess}>
                            Log in
                        </button>

                        <p>If you don't have an account yet:</p>
                        <Link className={Login_styles.btnDefault} to="/Signup">
                            <button className={Login_styles.btnDefault}>Create account</button>
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    );
};
