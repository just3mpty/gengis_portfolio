/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import React, { useEffect, useState } from "react";
import styles from "@/styles/dashboard.module.css";
import ProjectCard from "@/components/selectedWorks/ProjectCard";
import Link from "next/link";
import DeletePopup from "@/components/dashboard/DeletePopup";
import { collection, getDocs } from "firebase/firestore";
import { DB } from "@/utils/firebaseConfig";
import { useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";

interface Project {
    id: string;
    title: string;
    description: string;
    images: string[];
    highlight: boolean;
    category: string;
}

const DeleteProjectPage = () => {
    const [allProjects, setAllProjects] = useState<Project[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [selectedProject, setSelectedProject] = useState<Project | null>(
        null
    );
    const router = useRouter();
    const [loading, user] = useAuth();

    useEffect(() => {
        const fetchProjects = async () => {
            setIsLoading(true);
            try {
                const projectsCollection = collection(DB, "projects");
                const querySnapshot = await getDocs(projectsCollection);

                const projects = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                })) as Project[];

                setAllProjects(projects);
            } catch (error) {
                console.error(
                    "Erreur lors de la récupération des projets :",
                    error
                );
            }
            setIsLoading(false);
        };

        fetchProjects();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (!user) {
        router.push("/home");
        return null;
    }

    const handleProjectClick = (project: Project) => {
        setSelectedProject(project);
    };

    const handleClosePopup = () => {
        setSelectedProject(null);
    };

    const handleDeleteProject = async () => {
        if (!selectedProject) return;

        try {
            const response = await fetch(
                `/api/delete-project/${selectedProject.id}`,
                {
                    method: "DELETE",
                }
            );

            if (!response.ok) {
                throw new Error("Erreur lors de la suppression du projet");
            }

            setAllProjects((prevProjects) =>
                prevProjects.filter((proj) => proj.id !== selectedProject.id)
            );
        } catch (error) {
            console.error("Échec de la suppression du projet", error);
        } finally {
            handleClosePopup();
        }
    };

    const freelanceProjects = allProjects.filter(
        (project) => project.category === "freelance"
    );
    const personalProjects = allProjects.filter(
        (project) => project.category === "personnal"
    );

    return (
        <div className={styles.addProject}>
            <h1>Supprimer un projet</h1>
            <div className={styles.updateProject}>
                <h2>Freelance Projects</h2>
                {freelanceProjects.length < 1 && (
                    <h3>Aucun projet dans cette catégorie chef !</h3>
                )}
                <div className={styles.project}>
                    {freelanceProjects.map((project) => (
                        <div
                            key={project.id}
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

                <h2>Personal Projects</h2>
                {personalProjects.length < 1 && (
                    <h3>Aucun projet dans cette catégorie chef !</h3>
                )}
                <div className={styles.project}>
                    {personalProjects.map((project) => (
                        <div
                            key={project.id}
                            onClick={() => handleProjectClick(project)}>
                            <ProjectCard
                                title={project.title}
                                cover={project.images[0]}
                                url={""}
                            />
                        </div>
                    ))}
                </div>
            </div>
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
