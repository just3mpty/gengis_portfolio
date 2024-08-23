import { useState } from "react";
import styles from "@/styles/dashboard.module.css";
import { doc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { DB, STORAGE } from "@/utils/firebaseConfig";

interface Project {
    id: string;
    title: string;
    description: string;
    images: string[];
    highlight: boolean;
    category: string;
    tools: string[]; // Ajout du champ tools
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
    const [newImages, setNewImages] = useState<FileList | null>(null);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { id, value } = e.target;
        setUpdatedProject((prev) => ({ ...prev, [id]: value }));
    };

    const handleHighlightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUpdatedProject((prev) => ({ ...prev, highlight: e.target.checked }));
    };

    const handleImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setNewImages(e.target.files);
        }
    };

    const handleToolsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const toolsArray = e.target.value.split(",").map((tool) => tool.trim());
        setUpdatedProject((prev) => ({ ...prev, tools: toolsArray }));
    };

    const handleSave = async () => {
        try {
            const updatedImages = [...updatedProject.images];

            if (newImages) {
                const uploadPromises = Array.from(newImages).map(
                    async (file) => {
                        const storageRef = ref(
                            STORAGE,
                            `projects/${file.name}`
                        );
                        await uploadBytes(storageRef, file);
                        const downloadURL = await getDownloadURL(storageRef);
                        return downloadURL;
                    }
                );

                const uploadedImages = await Promise.all(uploadPromises);
                updatedImages.push(...uploadedImages);
            }

            const projectDocRef = doc(DB, "projects", updatedProject.id);
            await updateDoc(projectDocRef, {
                title: updatedProject.title,
                description: updatedProject.description,
                images: updatedImages,
                highlight: updatedProject.highlight,
                category: updatedProject.category,
                tools: updatedProject.tools, // Sauvegarder les outils
            });

            onSave({ ...updatedProject, images: updatedImages });
            onClose();
        } catch (error) {
            console.error("Erreur lors de la mise à jour du projet :", error);
        }
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
                        onChange={handleImagesChange}
                    />
                </div>
                <div className={styles.input}>
                    <label htmlFor="tools">
                        Outils (séparés par des virgules)
                    </label>
                    <textarea
                        id="tools"
                        value={updatedProject.tools.join(", ")}
                        onChange={handleToolsChange}
                    />
                </div>
                <button onClick={handleSave}>Save</button>
                <button onClick={onClose}>Cancel</button>
            </div>
        </div>
    );
};

export default EditPopup;
