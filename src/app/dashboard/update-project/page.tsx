"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import styles from "@/styles/dashboard.module.css";
import ProjectCard from "@/components/selectedWorks/ProjectCard";

interface Projects {
    category: string;
    projects: Project[];
}
interface Project {
    title: string;
    description: string;
    images: string[];
    highlight: boolean;
}

const UpdateProjectPage = () => {
    const [allProjects, setAllProject] = useState<Projects[]>([]);

    useEffect(() => {
        const fetchProjects = async () => {
            const res = await fetch("/projects.json");
            const data: Projects[] = await res.json();
            setAllProject(data);
        };
        fetchProjects();
    });

    return (
        <div className={styles.addProject}>
            <h1>Modifier un projet</h1>
            {allProjects.map((cat, idx) => (
                <div className={styles.updateProject} key={idx}>
                    <h2>{cat.category}</h2>
                    <div className={styles.project}>
                        {cat.projects.map((project, idx) => (
                            <ProjectCard
                                key={idx}
                                title={project.title}
                                cover={project.images[0]}
                                url={""}
                            />
                        ))}
                    </div>
                </div>
            ))}
            <Link className={styles.goBack} href={"/dashboard"}>
                Go back
            </Link>
        </div>
    );
};

export default UpdateProjectPage;
