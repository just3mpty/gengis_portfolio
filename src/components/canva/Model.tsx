import { MeshTransmissionMaterial, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Mesh } from "three";
import { useRef } from "react";

const Model = () => {
    const mesh = useRef<Mesh>(null);
    const { nodes } = useGLTF("/model/rose.glb");

    useFrame(() => {
        if (mesh.current) {
            mesh.current.rotation.x -= 0.0025;
            mesh.current.rotation.y -= 0.0025;
            mesh.current.rotation.z -= 0.0025;
        }
    });

    return (
        <group scale={15} position={[0, -0.2, -4]}>
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
