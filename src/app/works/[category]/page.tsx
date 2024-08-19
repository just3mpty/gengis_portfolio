"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";

interface DataType {
    category: string;
    projects: [
        {
            title: string;
            images: string[];
            date: string;
        }
    ];
}

const Category = ({ params }: { params: { category: string } }) => {
    const { category } = params;
    const [data, setData] = useState<DataType[]>([]);

    useEffect(() => {
        const fetchProjects = async () => {
            const projects = await fetch("/projects.json");
            const data = await projects.json();
            setData(data);
        };
        fetchProjects();
    }, []);

    return (
        <section>
            <h1>{category} projects</h1>
            <div>
                {data
                    .filter((cat) => cat.category === category)
                    .map((projects) =>
                        projects.projects.map((project, idx) => (
                            <div key={idx}>
                                <h1>{project.title}</h1>
                                <p>{project.date}</p>
                                {project.images.map((image, idx) => (
                                    <figure key={idx}>
                                        <Image
                                            src={image}
                                            alt={`Project image n°${idx + 1}`}
                                            width={50}
                                            height={50}
                                        />
                                    </figure>
                                ))}
                            </div>
                        ))
                    )}
            </div>
        </section>
    );
};

export default Category;
