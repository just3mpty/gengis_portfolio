"use client";

import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import Model from "./Model";

const Scene = () => {
    return (
        <Canvas>
            <OrbitControls />
            <directionalLight intensity={3} position={[0, 3, 2]} />
            <Environment preset="city" />
            <Model />
        </Canvas>
    );
};

export default Scene;
