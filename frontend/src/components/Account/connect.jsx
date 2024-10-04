import { useGoogleLogin } from "@react-oauth/google";
import Login_styles from "./Login.module.css";
import axios from "axios";

export const ConnectGoogle = () => {
    const login = useGoogleLogin({ onSuccess: async (tokenResponse) => {
            try { const userInfo = await axios.get( "https://www.googleapis.com/oauth2/v3/userinfo", {
                headers: {
                    Authorization: `Bearer ${tokenResponse.access_token}`,
                },
            }
            );
        } catch (error) {
            console.error("Failed to fetch user info", error);
        }
    },
    onError: (errorResponse) => {
        console.error("Login Failed:", errorResponse);
        },
    });
        return  <img src="./logo/google.png" style={{ cursor: 'pointer' }} className={Login_styles.GoogleLogo} onClick={() => login()} />
};
