"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import styles from "@/styles/works.module.css";
import Footer from "@/components/footer/Footer";
import Link from "next/link";
import { collection, getDocs, query, where } from "firebase/firestore";
import { DB } from "@/utils/firebaseConfig";

interface ProjectType {
    title: string;
    images: string[];
    date: string;
    description: string;
    tools: string[];
    highlight: boolean;
    category: string;
}

const Category = ({ params }: { params: { category: string } }) => {
    const { category } = params;
    const [otherCategory, setOtherCategory] = useState<string>("");
    const [projects, setProjects] = useState<ProjectType[]>([]);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const q = query(
                    collection(DB, "projects"),
                    where("category", "==", category)
                );
                const querySnapshot = await getDocs(q);
                const filteredProjects = querySnapshot.docs.map(
                    (doc) => doc.data() as ProjectType
                );

                setProjects(filteredProjects);
            } catch (error) {
                console.error(
                    "Erreur lors de la récupération des projets :",
                    error
                );
            }
        };

        if (category === "freelance") {
            setOtherCategory("personnal");
        } else {
            setOtherCategory("freelance");
        }

        fetchProjects();
    }, [category]);

    // Fonction pour formater la date
    const formatDate = (dateString: string) => {
        return new Date(dateString)
            .toISOString()
            .split("T")[0]
            .replace(/-/g, ".");
    };

    return (
        <section className={styles.main}>
            <h1>
                {category} <br /> <span>projects</span>
            </h1>
            {projects.length < 1 && (
                <h2>No projects found in this category.</h2>
            )}
            {projects.map((project, idx) => (
                <div className={styles.project} key={idx}>
                    <div className={styles.text}>
                        <div className={styles.title}>
                            <h2>{project.title}</h2>

                            <p>{formatDate(project.date)}</p>
                        </div>
                        <div className={styles.details}>
                            <p>
                                <span>tools :</span>{" "}
                                {project.tools.map((tool) => `${tool} / `)}
                            </p>
                            <p>
                                <span>description :</span> {project.description}
                            </p>
                        </div>
                    </div>
                    <div className={styles.images}>
                        {project.images.map((image: string, idx: number) => (
                            <figure key={idx}>
                                <Image
                                    src={image}
                                    alt={`Project image n°${idx + 1}`}
                                    fill
                                />
                            </figure>
                        ))}
                    </div>
                </div>
            ))}

            <Link className={styles.button} href={`/works/${otherCategory}`}>
                check my {otherCategory} projects
            </Link>

            <Footer />
        </section>
    );
};

export default Category;
