"use client";
import React, { useEffect, useState } from "react";
import styles from "@/styles/dashboard.module.css";
import ProjectCard from "@/components/selectedWorks/ProjectCard";
import Link from "next/link";
import DeletePopup from "@/components/dashboard/DeletePopup";

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

const DeleteProjectPage = () => {
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

    const handleDeleteProject = async () => {
        if (!selectedProject) return;

        // Logique pour supprimer le projet de la BDD ici
        // Par exemple, via un appel API DELETE
        try {
            await fetch(`/api/deleteProject/${selectedProject.title}`, {
                method: "DELETE",
            });

            // Mise à jour de l'état pour retirer le projet supprimé
            setAllProjects((prevProjects) =>
                prevProjects.map((cat) => ({
                    ...cat,
                    projects: cat.projects.filter(
                        (proj) => proj.title !== selectedProject.title
                    ),
                }))
            );
        } catch (error) {
            console.error("Failed to delete project", error);
        } finally {
            handleClosePopup(); // Fermer le popup après la suppression
        }
    };

    return (
        <div className={styles.addProject}>
            <h1>Supprimer un projet</h1>
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
                                    url={"#"}
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
                <DeletePopup
                    project={selectedProject}
                    onClose={handleClosePopup}
                    onDelete={handleDeleteProject}
                />
            )}
        </div>
    );
};

export default DeleteProjectPage;
