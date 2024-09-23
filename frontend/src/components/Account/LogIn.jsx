import { useGoogleLogin } from "@react-oauth/google";
import Login_styles from "./Login.module.css";
import { Navbar } from "../Navbar/Navbar";
import styles from "../../App.module.css";
import { createClient } from "@supabase/supabase-js";
import { useNavigate } from "react-router-dom";
import { Auth } from "@supabase/auth-ui-react";
import { Link } from 'react-router-dom';
import { useState } from "react";
import { Validation } from "./LoginValidation";

export const ConnectGoogle = () => {
    const login = useGoogleLogin({ onSuccess: (tokenResponse) => console.log(tokenResponse), });
    return login
};

export const LoginPage = () => {
    /*const navigate = useNavigate();

    const supabase = createClient("https://pxppokfmmwdibnopbnjf.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB4cHBva2ZtbXdkaWJub3BibmpmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjY4MzI4NjgsImV4cCI6MjA0MjQwODg2OH0.bdjDCmq9Ovq58nZUn_w42lT_kX4JPL3hBWTCMJkchzU");

    supabase.auth.onAuthStateChange(async (event) => {
        if (event !== "SIGNED_OUT") {
            navigate("/Account");
        } else {
            navigate("/");
        }
    });*/

    const ConnectGoogle = () => {
        const login = useGoogleLogin({ onSuccess: (tokenResponse) => console.log(tokenResponse), });
        return  <img src="./logo/google.png" style={{ cursor: 'pointer' }} class={Login_styles.GoogleLogo} onClick={() => login()}
    />
    };
    const [values, setValues] = useState({
        email: '',
        password: ''
    })
    const [issues, setErrors] = useState({})
    const handleInput = () => {
        setValues((prevValues) => ({...prevValues, [event.target.name]: event.target.value}));
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        setErrors(Validation(values));
    }

    return (
        <div className={styles.App}>
            <Navbar />
            <div className={Login_styles.Connect}>
                <div className={Login_styles.Login}>
                <form className={Login_styles.Form} action="" onSubmit={handleSubmit}>
                    <div className={Login_styles.Title}>EpiCiné</div>
                    <div className={Login_styles.TitleLog}>Log In</div>
                    <div className={Login_styles.OneClick}>one click with:</div>
                    <ConnectGoogle />
                    <p>--------------------or--------------------</p>
                    <div className={Login_styles.mb3}>
                        <p className="name"><strong>User Name</strong></p>
                        <input type="email" required name='email' placeholder="Email or Name" onChange={handleInput} value={values.email}/>
                        {issues.email && <span className={Login_styles.TextDanger}> {issues.email} </span>}
                    </div>;
                    <div className={Login_styles.mb3}>
                        <p className="name"><strong>Password</strong></p>
                        <input type="password" required name='password' placeholder="Password" onChange={handleInput} value={values.password}/>
                        {issues.password && <span className={Login_styles.TextDanger}> {issues.password} </span>}
                    </div>
                    <button className={Login_styles.btnLogInSuccess}>Log in</button>
                    <p>If you don't have an account yet:</p>
                    <Link className={Login_styles.btnDefault} to="/SignUp"><button className={Login_styles.btnDefault}>Create account</button></Link>
                </form>
                </div>
            </div>
        </div>
    );
};
