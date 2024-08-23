import { MeshTransmissionMaterial, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Mesh } from "three";
import { useRef } from "react";

const Model = ({ scale }: any) => {
    const mesh = useRef<Mesh>(null);
    const { nodes } = useGLTF("/model/Gengis.glb");

    useFrame(() => {
        if (mesh.current) {
            mesh.current.rotation.z += 0.005;
        }
    });

    return (
        <group scale={scale} position={[0, 0, 0]}>
            <primitive object={nodes.Gengis} ref={mesh}>
                <MeshTransmissionMaterial
                    backside
                    backsideThickness={0.25}
                    thickness={5}
                    distortion={2}
                    color={0xf8f9fa}
                    metalness={0.25}
                />
            </primitive>
        </group>
    );
};

export default Model;
