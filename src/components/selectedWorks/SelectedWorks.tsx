/* eslint-disable react/no-unescaped-entities */
"use client";
import React, { useEffect, useState } from "react";
import styles from "@/styles/selectedWorks.module.css";
import ProjectCard from "./ProjectCard";
import { DB } from "@/utils/firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";

interface ProjectType {
    title: string;
    images: string[];
    date: string;
    description: string;
    tools: string[];
    highlight: boolean;
    category: string;
}

const SelectedWorks = () => {
    const [projects, setProjects] = useState<ProjectType[]>([]);

    useEffect(() => {
        const fetchHighlightedProjects = async () => {
            try {
                const q = query(
                    collection(DB, "projects"),
                    where("highlight", "==", true)
                );
                const querySnapshot = await getDocs(q);
                const highlightedProjects = querySnapshot.docs
                    .slice(0, 2)
                    .map((doc) => doc.data() as ProjectType);
                setProjects(highlightedProjects);
            } catch (error) {
                console.error("Error fetching highlighted projects:", error);
            }
        };

        fetchHighlightedProjects();
    }, []);

    return (
        <div className={styles.container}>
            {projects.length < 1 && <h3>Aucun projet n'est mis en avant</h3>}
            {projects.map((project) => (
                <ProjectCard
                    key={project.title}
                    title={project.title}
                    date={project.date}
                    url={`/works/${project.category}`}
                    cover={project.images[0]}
                />
            ))}
        </div>
    );
};

export default SelectedWorks;
