"use client";
import { useState } from "react";
import styles from "@/styles/dashboard.module.css";

interface Project {
    title: string;
    description: string;
    images: string[];
    highlight: boolean;
}
interface ProjectEditPopupProps {
    project: Project;
    onClose: () => void;
    onSave: (updatedProject: Project) => void;
}

const EditPopup: React.FC<ProjectEditPopupProps> = ({
    project,
    onClose,
    onSave,
}) => {
    const [updatedProject, setUpdatedProject] = useState<Project>({
        ...project,
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { id, value } = e.target;
        setUpdatedProject((prev) => ({ ...prev, [id]: value }));
    };

    const handleHighlightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUpdatedProject((prev) => ({ ...prev, highlight: e.target.checked }));
    };

    const handleSave = () => {
        onSave(updatedProject); // Sauvegarder les modifications
        onClose(); // Fermer le popup
    };

    return (
        <div className={styles.popup}>
            <div className={styles.popupContent}>
                <h3>Edit Project</h3>
                <div className={styles.input}>
                    <label htmlFor="title">Nouveau titre</label>
                    <input
                        id="title"
                        type="text"
                        value={updatedProject.title}
                        onChange={handleChange}
                    />
                </div>
                <div className={styles.input}>
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        value={updatedProject.description}
                        onChange={handleChange}
                    />
                </div>
                <div className={styles.input}>
                    <label htmlFor="highlight">Mettre en avant</label>
                    <input
                        id="highlight"
                        type="checkbox"
                        checked={updatedProject.highlight}
                        onChange={handleHighlightChange}
                    />
                </div>
                <div className={styles.input}>
                    <label htmlFor="images">Images</label>
                    <input
                        id="images"
                        type="file"
                        accept="image/png, image/jpeg, image/webp"
                        multiple
                        onChange={() => {
                            /* Gestion du téléchargement des images */
                        }}
                    />
                </div>
                <button onClick={handleSave}>Save</button>
                <button onClick={onClose}>Cancel</button>
            </div>
        </div>
    );
};

export default EditPopup;
