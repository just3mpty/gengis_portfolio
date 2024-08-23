"use client";
import React, { useEffect, useState } from "react";
import styles from "@/styles/dashboard.module.css";
import ProjectCard from "@/components/selectedWorks/ProjectCard";
import EditPopup from "@/components/dashboard/EditPopup";
import Link from "next/link";
import { DB } from "@/utils/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";

interface Project {
    id: string;
    title: string;
    description: string;
    images: string[];
    highlight: boolean;
    category: string;
    tools: string[];
}

const UpdateProjectPage = () => {
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

    const handleUpdateProject = (updatedProject: Project) => {
        setAllProjects((prevProjects) =>
            prevProjects.map((proj) =>
                proj.id === updatedProject.id ? updatedProject : proj
            )
        );
    };

    // Séparer les projets par catégories
    const freelanceProjects = allProjects.filter(
        (project) => project.category === "freelance"
    );
    const personalProjects = allProjects.filter(
        (project) => project.category === "personnal"
    );

    if (isLoading) {
        return <div>Chargement...</div>;
    }

    return (
        <div className={styles.addProject}>
            <h1>Modifier un projet</h1>

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
