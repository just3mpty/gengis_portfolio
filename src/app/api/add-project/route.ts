import { NextResponse } from "next/server";
import { DB, STORAGE } from "@/utils/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const title = formData.get("title")?.toString();
        const description = formData.get("description")?.toString();
        const date = formData.get("date")?.toString();
        const highlight = formData.get("highlight") === "true";
        const category = formData.get("category")?.toString();
        const images = formData.getAll("images") as File[];

        if (!title || !description || !date || !category || !images.length) {
            return NextResponse.json(
                { message: "Missing required fields" },
                { status: 400 }
            );
        }

        const imageUrls = await Promise.all(
            images.map(async (image) => {
                try {
                    const storageRef = ref(STORAGE, `projects/${image.name}`);
                    await uploadBytes(storageRef, image);
                    const downloadURL = await getDownloadURL(storageRef);
                    console.log(
                        `Uploaded image ${image.name}, URL: ${downloadURL}`
                    );
                    return downloadURL;
                } catch (uploadError) {
                    console.error(
                        `Error uploading image ${image.name}:`,
                        uploadError
                    );
                    throw uploadError;
                }
            })
        );

        const docRef = await addDoc(collection(DB, "projects"), {
            title,
            description,
            date: new Date(date).toISOString(),
            images: imageUrls,
            highlight,
            category,
        });

        return NextResponse.json(
            { message: "Project added successfully", id: docRef.id },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error adding project:", error);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}
