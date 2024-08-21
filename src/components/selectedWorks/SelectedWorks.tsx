"use client";
import React, { useEffect, useState } from "react";
import styles from "@/styles/selectedWorks.module.css";
import ProjectCard from "./ProjectCard";

interface ProjectType {
    title: string;
    images: string[];
    date: string;
    description: string;
    tools: string[];
    highlight: boolean;
}

interface DataType {
    category: string;
    projects: ProjectType[];
}

const SelectedWorks = () => {
    const [data, setData] = useState<DataType[]>([]);

    useEffect(() => {
        const fetchProjects = async () => {
            const response = await fetch("/projects.json");
            const data = await response.json();
            setData(data);
        };

        fetchProjects();
    }, []);

    return (
        <div className={styles.container}>
            {data.map((category) => {
                const highlightedProjects = category.projects.filter(
                    (project) => project.highlight
                );

                const projectToShow = highlightedProjects[0];

                if (!projectToShow) return null;

                return (
                    <ProjectCard
                        key={category.category}
                        title={projectToShow.title}
                        date={projectToShow.date}
                        url={`/works/${category.category}`}
                        cover={projectToShow.images[0]}
                    />
                );
            })}
        </div>
    );
};

export default SelectedWorks;
