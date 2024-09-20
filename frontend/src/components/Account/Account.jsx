import { useGoogleLogin } from "@react-oauth/google";
import "./Account.module.css";
import { Navbar } from "../Navbar/Navbar";
import styles from "../../App.module.css";
import { createClient } from "@supabase/supabase-js";
import { useNavigate } from "react-router-dom";
import { Auth } from "@supabase/auth-ui-react";

export const ConnectGoogle = () => {
    const login = useGoogleLogin({ onSuccess: (tokenResponse) => console.log(tokenResponse), });
    return <button onClick={() => login()}>Sign in with Google</button>
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

    return (
        <div className={styles.App}>
            <Navbar />
            
        </div>
    );
};
