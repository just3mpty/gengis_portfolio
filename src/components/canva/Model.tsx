import { MeshTransmissionMaterial, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Mesh } from "three";
import { useRef } from "react";

const Model = () => {
    const mesh = useRef<Mesh>(null);
    const { nodes } = useGLTF("/model/rose.glb");

    useFrame(() => {
        if (mesh.current) {
            mesh.current.rotation.z -= 0.005;
        }
    });

    return (
        <group scale={15} position={[1, 0, 0]}>
            <primitive object={nodes.rose} ref={mesh}>
                <MeshTransmissionMaterial
                    roughness={0.15}
                    metalness={1}
                    color={0xfbff4f}
                />
            </primitive>
        </group>
    );
};

export default Model;
