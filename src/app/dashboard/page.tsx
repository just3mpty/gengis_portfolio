"use client";
import { useRouter } from "next/navigation";
import React from "react";
import styles from "@/styles/dashboard.module.css";

const Dashboard = () => {
    const router = useRouter();
    return (
        <section className={styles.dashboardContainer}>
            {/* Vérifier la connexion admin avant d'afficher le formulaire */}
            {/* Création d'une popup "password" ? */}
            {/* Si pas admin -> rediriger vers "/". Sinon -> afficher le formulaire. */}
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
                <button>Modifier un projet</button>
                <button>Supprimer un projet</button>
            </div>
        </section>
    );
};

export default Dashboard;
