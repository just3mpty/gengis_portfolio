"use client";

import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import Model from "./Model";

const Scene = () => {
    return (
        <Canvas>
            <OrbitControls dampingFactor={0.02} enableZoom={false} />
            <Environment preset="studio" />
            <Model />
        </Canvas>
    );
};

export default Scene;
