import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { AUTH } from "@/utils/firebaseConfig";
import styles from "@/styles/login.module.css";

const Login = ({ onLoginSuccess }: { onLoginSuccess: () => void }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);

    const handleLogin = async () => {
        try {
            await signInWithEmailAndPassword(AUTH, email, password);
            onLoginSuccess();
        } catch (error) {
            setError("Invalid email or password.");
        }
    };

    return (
        <div className={styles.loginContainer}>
            <h2>Login</h2>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleLogin}>Login</button>
            {error && <p className={styles.error}>{error}</p>}
        </div>
    );
};

export default Login;
