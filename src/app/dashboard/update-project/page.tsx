"use client";
import React, { useEffect, useState } from "react";
import styles from "@/styles/dashboard.module.css";
import ProjectCard from "@/components/selectedWorks/ProjectCard";
import EditPopup from "@/components/dashboard/EditPopup";
import Link from "next/link";

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
    const [allProjects, setAllProjects] = useState<Projects[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [selectedProject, setSelectedProject] = useState<Project | null>(
        null
    );

    useEffect(() => {
        const fetchProjects = async () => {
            setIsLoading(true);
            const res = await fetch("/projects.json");
            const data: Projects[] = await res.json();
            setAllProjects(data);
            setIsLoading(false);
        };
        fetchProjects();
    }, []);

    const handleProjectClick = (project: Project) => {
        setSelectedProject(project);
    };

    const handleClosePopup = () => {
        setSelectedProject(null);
    };

    const handleUpdateProject = (updatedProject: Project) => {
        // Logique pour mettre à jour le projet dans la BDD ici
        // Par exemple, via un appel API PATCH ou PUT
    };

    return (
        <div className={styles.addProject}>
            <h1>Modifier un projet</h1>
            {allProjects.map((cat, idx) => (
                <div className={styles.updateProject} key={idx}>
                    <h2>{cat.category} projects</h2>
                    <div className={styles.project}>
                        {cat.projects.map((project, idx) => (
                            <div
                                key={idx}
                                onClick={() => handleProjectClick(project)}>
                                <ProjectCard
                                    title={project.title}
                                    cover={project.images[0]}
                                    url={""}
                                />
                            </div>
                        ))}
                    </div>
                    <div className={styles.divider} />
                </div>
            ))}
            <Link className={styles.goBack} href={"/dashboard"}>
                Go back
            </Link>
            {selectedProject && (
                <EditPopup
                    project={selectedProject}
                    onClose={handleClosePopup}
                    onSave={handleUpdateProject}
                />
            )}
        </div>
    );
};

export default UpdateProjectPage;
