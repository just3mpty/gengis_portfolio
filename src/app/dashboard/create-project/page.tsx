import Form from "@/components/dashboard/Form";
import Link from "next/link";
import React from "react";
import styles from "@/styles/dashboard.module.css";

const CreateProjectPage = () => {
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
