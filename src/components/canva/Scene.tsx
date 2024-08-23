"use client";

import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import Model from "./Model";
import { useEffect, useState } from "react";

const Scene = () => {
    const [scale, setScale] = useState(8);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setScale(6);
            } else if (window.innerWidth < 1200) {
                setScale(6);
            } else {
                setScale(8);
            }
        };

        handleResize();
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <Canvas>
            <OrbitControls dampingFactor={0.02} enableZoom={false} />
            <Environment preset="studio" />
            <Model scale={scale} />
        </Canvas>
    );
};

export default Scene;
