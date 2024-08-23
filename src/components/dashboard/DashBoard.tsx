"use client";
import React from "react";
import styles from "@/styles/dashboard.module.css";
import { useRouter } from "next/navigation";

const DashBoard = () => {
    const router = useRouter();
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
            </div>
        </section>
    );
};

export default DashBoard;
