/* eslint-disable react/no-unescaped-entities */
import styles from "@/styles/dashboard.module.css";
import Image from "next/image";

interface Project {
    title: string;
    description: string;
    images: string[];
    highlight: boolean;
}
interface DeletePopupProps {
    project: Project;
    onClose: () => void;
    onDelete: () => void;
}

const DeletePopup: React.FC<DeletePopupProps> = ({
    project,
    onClose,
    onDelete,
}) => {
    return (
        <div className={styles.popup}>
            <div className={styles.popupContent}>
                <h3>T'es sûr de vouloir supprimer ce projet ?</h3>
                <p>{project.title}</p>
                <figure>
                    <Image src={project.images[0]} alt={project.title} fill />
                </figure>
                <button onClick={onDelete} className={styles.deleteButton}>
                    Delete
                </button>
                <button onClick={onClose} className={styles.cancelButton}>
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default DeletePopup;
