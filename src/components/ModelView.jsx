import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { LoadStep } from "./StepLoader";
import { OrbitControls } from "@react-three/drei";
import "../App.css";
function Box(props) {
  // This reference gives us direct access to the THREE.Mesh object
  const ref = useRef();
  // Hold state for hovered and clicked events
  const [hovered, hover] = useState(false);
  const [clicked, click] = useState(false);
  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => (ref.current.rotation.x += delta));
  // Return the view, these are regular Threejs elements expressed in JSX
  return (
    <mesh
      {...props}
      ref={ref}
      scale={clicked ? 1.5 : 1}
      onClick={(event) => click(!clicked)}
      onPointerOver={(event) => hover(true)}
      onPointerOut={(event) => hover(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? "hotpink" : "orange"} />
    </mesh>
  );
}

function StepModel({ url, ...props }) {
  const [obj, setObj] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    async function load() {
      // const mainObject = LoadStep('https://github.com/kovacsv/occt-import-js/raw/main/test/testfiles/cax-if/as1_pe_203.stp')
      // const mainObject = await LoadStep('/as1_pe_203.stp')
      try {
        setLoading(true);
        const mainObject = await LoadStep(url);
        console.log("mainObject", mainObject);
        setObj(mainObject);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);
  if (!obj) {
    return null;
  }
  return (
    <>
      <group {...props}>
        <primitive object={obj} />
      </group>
    </>
  );
}

export default function ModelPreview({ url }) {
  const [obj, setObj] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  console.log(url);
  useEffect(() => {
    async function load() {
      // const mainObject = LoadStep('https://github.com/kovacsv/occt-import-js/raw/main/test/testfiles/cax-if/as1_pe_203.stp')
      // const mainObject = await LoadStep('/as1_pe_203.stp')
      try {
        setLoading(true);
        const mainObject = await LoadStep(url);

        // console.log("mainObject", mainObject);
        setObj(mainObject);
        setSuccess(true);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [url]);
  if (!obj) {
    return null;
  }
  return (
    <>
      {success && (
        <>
          {loading && (
            <picture className="flex justify-center items-center w-full h-full absolute bg-slate-100 transition-all duration-200 ease-linear z-50">
              <img src="/images/3d.png" alt="3D IMAGE" />
            </picture>
          )}
          {!obj ? (
            <picture className=" w-full flex justify-center items-center h-full absolute z-50">
              <img src="/images/3d.png" alt="3D IMAGE" />
            </picture>
          ) : (
            <Canvas
              camera={{ position: [10, 10, 10] }}
              onCreated={({ gl }) => {
                // bg color del fondo
                gl.setClearColor(new THREE.Color("#9"));
              }}
            >
              <OrbitControls />

              <ambientLight intensity={0.5} />
              <spotLight position={[10, 10, 20]} angle={0.35} penumbra={1} />
              <pointLight position={[-10, -10, -8]} />

              <group scale={[0.5, 0.5, 0.5]}>
                <primitive object={obj} />
              </group>
            </Canvas>
          )}
        </>
      )}
    </>
  );
}
