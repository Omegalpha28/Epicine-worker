import styles from "./join_us.module.css";
import { getImageUrl } from "../../utils";
import { Link } from "react-router-dom";


export const Join_Us = () => {

    return (
        <div className={styles.page}>
            <div className={styles.box}>
                <Link to="/">
                    <img className={styles.logo} src={getImageUrl("logo.png")} alt="logo" />
                </Link>
            </div>
        </div>
    )
}