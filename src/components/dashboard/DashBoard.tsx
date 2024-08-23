"use client";
import React, { useState } from "react";
import styles from "@/styles/dashboard.module.css";
import { useRouter } from "next/navigation";
import UpdatePassword from "@/components/dashboard/UpdatePassword";
import { signOut } from "firebase/auth";
import { AUTH } from "@/utils/firebaseConfig";

const DashBoard = () => {
    const router = useRouter();
    const [showUpdatePassword, setShowUpdatePassword] = useState(false);

    const handleLogout = async () => {
        try {
            await signOut(AUTH);
            router.push("/dashboard");
        } catch (error) {
            console.error("Erreur lors de la déconnexion :", error);
        }
    };

    return (
        <section className={styles.dashboardContainer}>
            <div className={styles.title}>
                <h1>
                    Welcome back <span>Gengis</span> !
                </h1>
                <h2>Alors, on fait quoi ?</h2>
            </div>

            <div className={styles.buttons}>
                <button
                    onClick={() => router.push("/dashboard/create-project")}>
                    Ajouter un projet
                </button>
                <button
                    onClick={() => router.push("/dashboard/update-project")}>
                    Modifier un projet
                </button>
                <button
                    onClick={() => router.push("/dashboard/delete-project")}>
                    Supprimer un projet
                </button>
                <div className={styles.logButtons}>
                    <button
                        className={styles.passwordButton}
                        onClick={() => setShowUpdatePassword(true)}>
                        Update Password
                    </button>
                    <button
                        className={styles.logoutButton}
                        onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            </div>

            {showUpdatePassword && (
                <UpdatePassword onClose={() => setShowUpdatePassword(false)} />
            )}
        </section>
    );
};

export default DashBoard;
