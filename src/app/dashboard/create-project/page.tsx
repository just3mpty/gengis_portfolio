"use client";
import Form from "@/components/dashboard/Form";
import Link from "next/link";
import React from "react";
import styles from "@/styles/dashboard.module.css";
import { useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";

const CreateProjectPage = () => {
    const router = useRouter();
    const [loading, user] = useAuth();

    if (loading) return <div>Loading...</div>;
    if (!user) {
        router.push("/home");
        return null;
    }

    return (
        <div className={styles.addProject}>
            <h1>Ajouter un nouveau projet</h1>
            <Form />
            <Link className={styles.goBack} href={"/dashboard"}>
                Go back
            </Link>
        </div>
    );
};

export default CreateProjectPage;
