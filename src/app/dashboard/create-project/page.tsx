import Form from "@/components/dashboard/Form";
import Link from "next/link";
import React from "react";
import styles from "@/styles/dashboard.module.css";

const CreateProjectPage = () => {
    return (
        <div>
            <Form />

            <Link href={"/"}>Go back home</Link>
        </div>
    );
};

export default CreateProjectPage;
