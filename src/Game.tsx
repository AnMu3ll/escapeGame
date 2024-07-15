import * as THREE from 'three';
import { scene } from './scene/Scene';
import { camera } from './scene/PerspectiveCamera'
import { cube } from './scene/TutorialCube';
import { windowHeight, windowWidth } from './utils/Window';
import { useEffect, useRef } from 'react';
import { CameraControls } from './utils/CameraControls';


export const Game = () => {
    const mountRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const mount = mountRef.current;

        // render the scene
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(windowWidth, windowHeight);
        if (mount) {
            mount.appendChild(renderer.domElement);
        }

        // add objects to scene
        scene.add(cube); // by default added to (0,0,0). 
        camera.position.z = 5; // Camera would then be inside the cube, so we move the camera.

        // use Camera controls
        const controls = new CameraControls(camera, document.body);

        // Render/Animation loop
        const animate = () => {
            cube.rotation.x += 0.01;
            cube.rotation.y += 0.01;
            controls.update();
            renderer.render(scene, camera)
        }
        renderer.setAnimationLoop(animate) // draws the scene every time the screen is refreshed (normally 60x per second)

        // Cleanup function 
        return () => {
            renderer.dispose();
            if (mount) {
                mount.removeChild(renderer.domElement);
            }
            scene.remove(cube);
        };
    }, [])
    return <div ref={mountRef}></div>;
}
