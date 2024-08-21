import React from "react";
import styles from "@/styles/selectedWorks.module.css";
import Image from "next/image";
import Link from "next/link";

interface ProjectProps {
    title: string;
    date?: string;
    cover: string;
    url: string;
}

const ProjectCard = ({ title, date, cover, url }: ProjectProps) => {
    return (
        <Link href={url} className={styles.card}>
            <figure style={{ position: "relative" }}>
                <Image src={cover} alt={`${title}'s illustration`} fill />
            </figure>
            <div className={styles.text}>
                <p>{title}</p>
                <p className={styles.date}>{date}</p>
            </div>
        </Link>
    );
};

export default ProjectCard;
