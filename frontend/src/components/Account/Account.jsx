import { useGoogleLogin } from "@react-oauth/google";
import "./Account.css";

export const ConnectGoogle = () => {
    const login = useGoogleLogin({ onSuccess: (tokenResponse) => console.log(tokenResponse),});
    /*amuse toi raph c'est ton boutton :)*/
    return <button onClick={() => login()}>Sing in with Google</button>
};
