"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import styles from "@/styles/works.module.css";
import Footer from "@/components/footer/Footer";
import Link from "next/link";

interface DataType {
    category: string;
    projects: [
        {
            title: string;
            images: string[];
            date: string;
            description: string;
            tools: string[];
        }
    ];
}

const Category = ({ params }: { params: { category: string } }) => {
    const { category } = params;
    const [otherCategory, setOtherCategory] = useState<string>("");
    const [data, setData] = useState<DataType[]>([]);

    useEffect(() => {
        const fetchProjects = async () => {
            const projects = await fetch("/projects.json");
            const data = await projects.json();
            const filteredData = data.filter(
                (cat: DataType) => cat.category === category
            );
            setData(filteredData);
        };

        if (category === "freelance") {
            setOtherCategory("personnal");
        } else {
            setOtherCategory("freelance");
        }

        fetchProjects();
    }, [category]);

    return (
        <section className={styles.main}>
            <h1>
                {category} <br /> <span>projects</span>
            </h1>
            {data.map((projects) =>
                projects.projects.map((project, idx) => (
                    <div className={styles.project} key={idx}>
                        <div className={styles.text}>
                            <div className={styles.title}>
                                <h2>{project.title}</h2>
                                <p>{project.date}</p>
                            </div>
                            <div className={styles.details}>
                                <p>
                                    <span>tools :</span>{" "}
                                    {project.tools.map((tool) => tool + " / ")}
                                </p>
                                <p>
                                    <span>description :</span>{" "}
                                    {project.description}
                                </p>
                            </div>
                        </div>
                        <div className={styles.images}>
                            {project.images.map((image, idx) => (
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
                ))
            )}

            <Link className={styles.button} href={`/works/${otherCategory}`}>
                check my {otherCategory} projects
            </Link>

            <Footer />
        </section>
    );
};

export default Category;
