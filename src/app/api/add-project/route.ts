import { NextResponse } from "next/server";
import { DB, STORAGE } from "@/utils/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import sharp from "sharp";

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const title = formData.get("title")?.toString();
        const description = formData.get("description")?.toString();
        const date = formData.get("date")?.toString();
        const highlight = formData.get("highlight") === "true";
        const category = formData.get("category")?.toString();
        const images = formData.getAll("images") as File[];
        const tools = formData.getAll("tools[]").map((tool) => tool.toString());

        if (
            !title ||
            !description ||
            !date ||
            !category ||
            !images.length ||
            !tools.length
        ) {
            return NextResponse.json(
                { message: "Missing required fields" },
                { status: 400 }
            );
        }

        const imageUrls = await Promise.all(
            images.map(async (image) => {
                try {
                    const buffer = await image.arrayBuffer();

                    const optimizedBuffer = await sharp(Buffer.from(buffer))
                        .resize(800, 800, {
                            fit: sharp.fit.inside,
                            withoutEnlargement: true,
                        })
                        .webp({ quality: 80 })
                        .toBuffer();

                    const storageRef = ref(
                        STORAGE,
                        `projects/${image.name}.webp`
                    );
                    await uploadBytes(storageRef, optimizedBuffer);
                    const downloadURL = await getDownloadURL(storageRef);
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
            tools,
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
