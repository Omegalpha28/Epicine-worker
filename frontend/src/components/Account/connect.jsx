import { useGoogleLogin } from "@react-oauth/google";
import Login_styles from "./Login.module.css";

export const ConnectGoogle = () => {
    const login = useGoogleLogin({ onSuccess: (tokenResponse) => console.log(tokenResponse), });
        return  <img src="./logo/google.png" style={{ cursor: 'pointer' }} class={Login_styles.GoogleLogo} onClick={() => login()} />
};