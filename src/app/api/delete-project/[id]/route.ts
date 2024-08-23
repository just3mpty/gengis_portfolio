import { NextResponse } from "next/server";
import { DB, STORAGE } from "@/utils/firebaseConfig";
import { doc, getDoc, deleteDoc } from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";

export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    const { id } = params;

    if (!id) {
        return NextResponse.json(
            { message: "Invalid project ID" },
            { status: 400 }
        );
    }

    try {
        const projectRef = doc(DB, "projects", id);
        const projectSnapshot = await getDoc(projectRef);

        if (!projectSnapshot.exists()) {
            return NextResponse.json(
                { message: "Project not found" },
                { status: 404 }
            );
        }

        const projectData = projectSnapshot.data();

        if (projectData?.images && Array.isArray(projectData.images)) {
            await Promise.all(
                projectData.images.map(async (imageUrl: string) => {
                    try {
                        const imagePath = imageUrl
                            .split("/o/")[1]
                            .split("?")[0];

                        const imageRef = ref(
                            STORAGE,
                            decodeURIComponent(imagePath)
                        );
                        await deleteObject(imageRef);
                    } catch (error) {
                        console.error(
                            `Erreur lors de la suppression de l'image ${imageUrl}:`,
                            error
                        );
                    }
                })
            );
        }

        // Supprimer le document du projet
        await deleteDoc(projectRef);

        return NextResponse.json(
            { message: "Project deleted successfully" },
            { status: 200 }
        );
    } catch (error) {
        console.error("Erreur lors de la suppression du projet :", error);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}
