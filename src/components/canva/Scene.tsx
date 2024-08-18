"use client";

import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import Model from "./Model";

const Scene = () => {
    return (
        <Canvas>
            <directionalLight intensity={3} position={[0, 3, 2]} />
            <Environment preset="studio" />
            <Model />
        </Canvas>
    );
};

export default Scene;
