import React from "react";
import styles from "@/styles/selectedWorks.module.css";
import Image from "next/image";
import Link from "next/link";

interface ProjectProps {
    title: string;
    date: string;
    cover: string;
    url: string;
}

const ProjectCard = ({ title, date, cover, url }: ProjectProps) => {
    return (
        <Link href={url} className={styles.card}>
            <figure style={{ position: "relative" }}>
                <Image src={cover} alt={`${title}'s illustration`} fill />
                <figcaption>
                    <p>{title}</p>
                    <p>{date}</p>
                </figcaption>
            </figure>
        </Link>
    );
};

export default ProjectCard;
