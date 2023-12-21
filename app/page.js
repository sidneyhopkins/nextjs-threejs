'use client'
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three/src/loaders/TextureLoader';
import { useEffect, useRef } from 'react';
import { OrbitControls, ScrollControls } from '@react-three/drei';
import { useMotionValue, useSpring } from 'framer-motion' 
import { motion } from 'framer-motion-3d'

export default function Home() {
  return (
    <main className="h-screen">
        <Canvas>
            <ScrollControls>
                <OrbitControls enableZoom={false} enablePan={false}/>
                <ambientLight intensity={2}/>
                <directionalLight position={[2, 1, 1]}/>
                <Cube/>

            </ScrollControls>

        </Canvas>
    </main>
  )
}

function Cube() {
    const mesh = useRef(null)

    const options = {damping: 20}
    const mouse = {
        x: useSpring(useMotionValue(0), options),
        y: useSpring(useMotionValue(0), options)
    }

    const manageMouseMove = (e) => {
        const { innerWidth, innerHeight } = window;
        const { clientX, clientY } = e;
        //these 2 x&y values will be between 0 and 1
        const x = -0.5 + (clientX / innerWidth);
        const y = -0.5 + (clientY / innerHeight);
        // set function below comes from useMotionValue object given to us by framer motion
        mouse.x.set(x);
        mouse.y.set(y);
    }

    useEffect(() => {
        window.addEventListener('mousemove', manageMouseMove);
        return () => window.removeEventListener('mousemove', manageMouseMove);
    }, [])

    //rotates the cube automatically
    // useFrame((state, delta) => {
    //     mesh.current.rotation.x += delta * 0.25;
    //     mesh.current.rotation.y += delta * 0.25;
    //     mesh.current.rotation.z += delta * 0;
    // })

    const texture1 = useLoader(TextureLoader, '/assets/aluminum-foil-6969822_640.jpg')
    const texture2 = useLoader(TextureLoader, '/assets/leaf-3755340_640.jpg')
    const texture3 = useLoader(TextureLoader, '/assets/marble-7728244_640.jpg')
    const texture4 = useLoader(TextureLoader, '/assets/texture-1874580_640.jpg')
    const texture5 = useLoader(TextureLoader, '/assets/wall-3630911_640.jpg')
    const texture6 = useLoader(TextureLoader, '/assets/wood-2045380_640.jpg')

    return (
        <motion.mesh ref={mesh} rotation-x={mouse.y} rotation-y={mouse.x}>
            <boxGeometry args={[2.5, 2.5, 2.5]} />
            <meshStandardMaterial map={texture1} attach="material-0"/>
            <meshStandardMaterial map={texture2} attach="material-1"/>
            <meshStandardMaterial map={texture3} attach="material-2"/>
            <meshStandardMaterial map={texture4} attach="material-3"/>
            <meshStandardMaterial map={texture5} attach="material-4"/>
            <meshStandardMaterial map={texture6} attach="material-5"/>
        </motion.mesh>
    )
}

// if things don't load in dev view, restart the dev preview