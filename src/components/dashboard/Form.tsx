/* eslint-disable react/no-unescaped-entities */
"use client";
import React, { useState } from "react";
import styles from "@/styles/dashboard.module.css";

type Project = {
    title: string;
    description: string;
    date: string;
    images: File[];
    highlight: boolean;
    tools: string[];
    category: string;
};

const Form = () => {
    const [formData, setFormData] = useState<Project>({
        title: "",
        description: "",
        date: "",
        images: [],
        highlight: false,
        tools: [""],
        category: "",
    });
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        const { id, value, type } = e.target;
        if (type === "checkbox") {
            const isChecked = (e.target as HTMLInputElement).checked;
            setFormData((prev) => ({
                ...prev,
                [id]: isChecked,
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                [id]: value,
            }));
        }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        setFormData((prev) => ({ ...prev, images: files }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        const data = new FormData();
        data.append("title", formData.title);
        data.append("description", formData.description);
        data.append("date", formData.date);
        data.append("highlight", String(formData.highlight));
        data.append("category", formData.category);

        formData.images.forEach((file: File) => {
            data.append("images", file);
        });

        formData.tools.forEach((tool) => {
            data.append("tools[]", tool);
        });

        try {
            const response = await fetch("/api/add-project", {
                method: "POST",
                body: data,
            });

            if (!response.ok) {
                throw new Error("Error submitting form");
            }

            // Réinitialiser le formulaire
            setFormData({
                title: "",
                description: "",
                date: "",
                images: [],
                highlight: false,
                tools: [""],
                category: "",
            });
        } catch (error) {
            console.error("Error submitting form:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const addTool = () => {
        setFormData((prev) => ({
            ...prev,
            tools: [...prev.tools, ""],
        }));
    };

    const handleToolChange = (index: number, value: string) => {
        const updatedTools = formData.tools.map((tool, i) =>
            i === index ? value : tool
        );
        setFormData((prev) => ({ ...prev, tools: updatedTools }));
    };

    return (
        <div className={styles.formContainer}>
            <form onSubmit={handleSubmit}>
                <div className={styles.input}>
                    <label htmlFor="category">Catégorie</label>
                    <select
                        className={styles.select}
                        id="category"
                        value={formData.category}
                        onChange={handleChange}>
                        <option value="">Sélectionner une catégorie</option>
                        <option value="freelance">Freelance</option>
                        <option value="personnal">Personnel</option>
                    </select>
                </div>

                <div className={styles.divider} />

                <div className={styles.inputsContainer}>
                    <div className={styles.input}>
                        <label htmlFor="title">Titre du projet</label>
                        <input
                            id="title"
                            type="text"
                            placeholder="Titre du projet"
                            value={formData.title}
                            onChange={handleChange}
                        />
                    </div>

                    <div className={styles.input}>
                        <label htmlFor="description">
                            Description du projet
                        </label>
                        <textarea
                            id="description"
                            placeholder="Description du projet"
                            value={formData.description}
                            onChange={handleChange}
                        />
                    </div>

                    <div className={styles.input}>
                        <label htmlFor="date">Date de création du projet</label>
                        <input
                            id="date"
                            type="datetime-local"
                            value={formData.date}
                            onChange={handleChange}
                        />
                    </div>

                    <div className={styles.input}>
                        <label htmlFor="images">
                            Images de présentation du projet
                        </label>
                        <input
                            id="images"
                            type="file"
                            max={3}
                            accept=".png,.webp,.jpg,.jpeg"
                            multiple
                            onChange={handleImageChange}
                        />
                    </div>

                    <div className={styles.input}>
                        <label htmlFor="highlight">
                            Mettre en avant ce projet ?
                        </label>
                        <input
                            id="highlight"
                            type="checkbox"
                            checked={formData.highlight}
                            onChange={handleChange}
                        />
                    </div>

                    <div className={styles.input}>
                        <label htmlFor="tools">
                            Outils utilisés dans la réalisation du projet
                        </label>
                        <p>
                            Bon à savoir : Pour ajouter plusieurs outils,
                            ajouter un nouveau champ de saisie avec le bouton
                            "Ajouter un outil"
                        </p>
                        {formData.tools.map((tool, index) => (
                            <div key={index}>
                                <input
                                    placeholder="Exemple: Blender"
                                    type="text"
                                    value={tool}
                                    onChange={(e) =>
                                        handleToolChange(index, e.target.value)
                                    }
                                />
                            </div>
                        ))}
                        <button type="button" onClick={addTool}>
                            Ajouter un outil
                        </button>
                    </div>
                </div>

                <button type="submit">Ajouter le projet</button>
            </form>

            {isLoading && (
                <div className={styles.overlay}>
                    <h2>Envoi du projet en cours...</h2>
                </div>
            )}
        </div>
    );
};

export default Form;
