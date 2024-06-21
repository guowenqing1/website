import React, { useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { Stage, PresentationControls } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"; // Asegúrate de importar GLTFLoader desde esta ruta

function Model({ props }) {
  const { scene } = useGLTF("./3d.2303003.STEP");
  return <primitive object={scene} {...props} />;
}
import { useLoader } from "@react-three/fiber"; // Importa useLoader para cargar el modelo 3D
// import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"; // Importa GLTFLoader

export function ModelView({ url }) {
  const gltf = useLoader(GLTFLoader, url); // Carga el modelo 3D utilizando GLTFLoader

  return (
    <primitive object={gltf.scene} /> // Renderiza el modelo 3D en la escena
  );
}
// export function ModelView() {
//   return (
//     <Canvas
//       dpr={[1, 2]}
//       shadows
//       camera={{ fov: 45 }}
//       style={{ position: "absolute" }}
//     >
//       <color attach="background" args={["#101010"]} />
//       <PresentationControls
//         speed={[1.5]}
//         global
//         zoom={0.5}
//         polar={[-0.5, Math.PI / 4]}
//       >
//         <Stage environment={null}>
//           <Model scale={0.01} />
//         </Stage>
//       </PresentationControls>
//     </Canvas>
//   );
// }
