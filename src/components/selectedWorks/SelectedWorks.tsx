import React from "react";
import styles from "@/styles/selectedWorks.module.css";
import ProjectCard from "./ProjectCard";

const works = [
    {
        title: "Project title",
        date: "08.18.2024",
        cover: "/images/205.png",
        url: "/",
    },
    {
        title: "Project title",
        date: "08.18.2024",
        cover: "/images/morflax-studio.png",
        url: "/",
    },
];

const SelectedWorks = () => {
    return (
        <div className={styles.container}>
            {works.map((project, idx) => (
                <ProjectCard key={idx} {...project} />
            ))}
        </div>
    );
};

export default SelectedWorks;
