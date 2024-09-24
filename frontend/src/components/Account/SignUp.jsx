import React, { useState } from 'react';
import { useGoogleOneTapLogin } from '@react-oauth/google';
import { Link, useNavigate } from 'react-router-dom';
import SignUp_styles from './SignUp.module.css';
import { Navbar } from '../Navbar/Navbar';
import styles from '../../App.module.css';
import { ConnectGoogle } from './connect';

export const SignUpPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [issues, setIssues] = useState({ name: '', email: '', password: '' });

    const handleInput = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    function navigateTo(path) {
        navigate(path);
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, email, password } = formData;

        if (!name || !email || !password) {
            setIssues({
                name: !name ? 'Username is required' : '',
                email: !email ? 'Email is required' : '',
                password: !password ? 'Password is required' : ''
            });
            return;
        }

        try {
            const response = await fetch('http://localhost:5555/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                console.log('Inscription réussie:', data);
                navigateTo('/LogIn');

            } else {
                console.error('Erreur d’inscription:', data.msg);
                setIssues(prev => ({ ...prev, email: data.msg }));
            }
        } catch (error) {
            console.error('Erreur lors de l’envoi de la requête:', error);
        }
    };

    return (
        <div className={styles.App}>
            <Navbar />
            <div className={SignUp_styles.Connect}>
                <div className={SignUp_styles.Login}>
                    <form className={SignUp_styles.Form} onSubmit={handleSubmit}>
                        <div className={SignUp_styles.Title}>EpiCine</div>
                        <div className={SignUp_styles.TitleLog}>Sign Up</div>
                        <div className={SignUp_styles.OneClick}>On one click with:</div>
                        <ConnectGoogle />
                        <p className={SignUp_styles.or}>________________________________________</p>
                        <div className={SignUp_styles.mb3}>
                            <p className="name"><strong>Username</strong></p>
                            <input type="text" placeholder="Username" name="name" onChange={handleInput} />
                            {issues.name && <span className={SignUp_styles.TextDanger}>{issues.name}</span>}
                        </div>
                        <div className={SignUp_styles.mb3}>
                            <p className="name"><strong>Email</strong></p>
                            <input type="email" placeholder="Email" name="email" onChange={handleInput} />
                            {issues.email && <span className={SignUp_styles.TextDanger}>{issues.email}</span>}
                        </div>
                        <div className={SignUp_styles.mb3}>
                            <p className="name"><strong>Password</strong></p>
                            <input type="password" placeholder="Password" name="password" onChange={handleInput} />
                            {issues.password && <span className={SignUp_styles.TextDanger}>{issues.password}</span>}
                            <p className={SignUp_styles.comment}>Password must be at least 8 characters long, with uppercase, lowercase, numbers, and symbols.</p>
                        </div>
                        <button type="submit" className={SignUp_styles.btnLogInSuccess}>Sign Up</button>
                        <p>If you have already an account:</p>
                        <Link className={SignUp_styles.btnDefault} to="/LogIn">
                            <button className={SignUp_styles.btnDefault}>Log In</button>
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    );
};
