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

    // Fonction pour gérer les changements dans les champs de texte, select, et checkbox
    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        const { id, value, type } = e.target;
        if (type === "checkbox") {
            const isChecked = (e.target as HTMLInputElement).checked; // Type narrowing pour les checkbox
            setFormData({
                ...formData,
                [id]: isChecked,
            });
        } else {
            setFormData({
                ...formData,
                [id]: value,
            });
        }
    };

    // Fonction pour gérer l'ajout d'une nouvelle image
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        setFormData((prev) => ({ ...prev, images: files }));
    };

    // Fonction pour ajouter un nouvel outil
    const addTool = () => {
        setFormData((prev) => ({ ...prev, tools: [...prev.tools, ""] }));
    };

    // Fonction pour mettre à jour un outil existant
    const handleToolChange = (index: number, value: string) => {
        const updatedTools = formData.tools.map((tool, i) =>
            i === index ? value : tool
        );
        setFormData((prev) => ({ ...prev, tools: updatedTools }));
    };

    // Fonction pour gérer la soumission du formulaire (à implémenter avec une API ou autre)
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Ici, tu pourras ajouter ta logique pour envoyer les données via une API
        console.log(formData);
    };

    return (
        <form onSubmit={handleSubmit}>
            {/* Menu pour choisir la catégorie du projet (freelance ou personnal) */}
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
                    <label htmlFor="description">Description du projet</label>
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
                        Bon à savoir : Pour ajouter plusieurs outils, ajouter un
                        nouveau champ de saisie avec le bouton "Ajouter un
                        outil"
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
    );
};

export default Form;
