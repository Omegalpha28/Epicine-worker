import { useGoogleOneTapLogin } from '@react-oauth/google';
import SignUp_styles from "./SignUp.module.css";
import { Navbar } from "../Navbar/Navbar";
import styles from "../../App.module.css";
import { Link } from 'react-router-dom';
import { SignupValidation } from "./SignupValidation";
import { useState } from "react";
import { ConnectGoogle } from './connect';

export const SignUpPage = () => {
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: ''
    });
    const [issues, setErrors] = useState({});

    const handleInput = (event) => {
        setValues(prevValues => ({ ...prevValues, [event.target.name]: event.target.value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setErrors(SignupValidation(values));
    };

    return (
        <div className={styles.App}>
            <Navbar />
            <div className={SignUp_styles.Connect}>
                <div className={SignUp_styles.Login}>
                    <form className={SignUp_styles.Form} action="" onSubmit={handleSubmit}>
                        <div className={SignUp_styles.Title}>EpiCiné</div>
                        <div className={SignUp_styles.TitleLog}>Sign Up</div>
                        <div className={SignUp_styles.OneClick}>On one click with:</div>
                        <ConnectGoogle />
                        <p className={SignUp_styles.or}>-------------------------or-------------------------</p>
                        <div className={SignUp_styles.mb3}>
                            <p className="name"><strong>New username</strong></p>
                            <input type="text" placeholder="Username" name="name" onChange={handleInput} />
                            {issues.name && <span className={SignUp_styles.TextDanger}> {issues.name} </span>}
                        </div>
                        <div className={SignUp_styles.mb3}>
                            <p className="name"><strong>Email</strong></p>
                            <input type="email" placeholder="Email" name="email" onChange={handleInput} />
                            {issues.email && <span className={SignUp_styles.TextDanger}> {issues.email} </span>}
                        </div>
                        <div className={SignUp_styles.mb3}>
                            <p className="name"><strong>New password</strong></p>
                            <input type="password" placeholder="Password" name="password" onChange={handleInput} />
                            {issues.password && <span className={SignUp_styles.TextDanger}> {issues.password} </span>}
                            <p className={SignUp_styles.comment}>Password must be at least 8 characters long, with uppercase, lowercase, numbers, and symbols.</p>
                        </div>
                        <button className={SignUp_styles.btnLogInSuccess}>Sign Up</button>
                        <p>If you have already an account:</p>
                        <Link className={SignUp_styles.btnDefault} to="/LogIn"><button className={SignUp_styles.btnDefault}>Log In</button></Link>
                    </form>
                </div>
            </div>
        </div>
    );
};
