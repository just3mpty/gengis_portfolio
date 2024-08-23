import { useState } from "react";
import {
    reauthenticateWithCredential,
    updatePassword,
    EmailAuthProvider,
} from "firebase/auth";
import { AUTH } from "@/utils/firebaseConfig";
import styles from "@/styles/updatePassword.module.css";

const UpdatePassword = ({ onClose }: { onClose: () => void }) => {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const handleUpdatePassword = async () => {
        const user = AUTH.currentUser;
        if (!user) {
            setError("User is not logged in.");
            return;
        }

        if (newPassword !== confirmPassword) {
            setError("New passwords do not match.");
            return;
        }

        try {
            const credential = EmailAuthProvider.credential(
                user.email || "",
                oldPassword
            );
            await reauthenticateWithCredential(user, credential);
            await updatePassword(user, newPassword);
            setSuccess("Mot de passe mis à jour bg !");
            setError(null);
            setOldPassword("");
            setNewPassword("");
            setConfirmPassword("");
        } catch (error) {
            setError("Y'a un truc qui marche pas là ...");
        }
    };

    return (
        <div className={styles.popup}>
            <div className={styles.popupContent}>
                <h3>Update Password</h3>
                <div className={styles.input}>
                    <label htmlFor="oldPassword">Mot de passe actuel</label>
                    <input
                        id="oldPassword"
                        type="password"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                    />
                </div>
                <div className={styles.input}>
                    <label htmlFor="newPassword">Nouveau mot de passe</label>
                    <input
                        id="newPassword"
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                </div>
                <div className={styles.input}>
                    <label htmlFor="confirmPassword">
                        Confirmer le mot de passe
                    </label>
                    <input
                        id="confirmPassword"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>
                <button onClick={handleUpdatePassword}>Mettre à jour</button>
                <button onClick={onClose}>Annuler</button>
                {error && <p className={styles.error}>{error}</p>}
                {success && <p className={styles.success}>{success}</p>}
            </div>
        </div>
    );
};

export default UpdatePassword;
