import * as THREE from "three";
import { scene } from "./scene/Scene";
import { camera } from "./scene/PerspectiveCamera";
import { cube } from "./scene/TutorialCube";
import { windowHeight, windowWidth } from "./utils/Window";
import { MutableRefObject, useEffect, useRef } from "react";
import { CameraControls } from "./utils/CameraControls";
import { Room } from "./scene/Room";

const CAMERA_POSITION = 20;

export const Game = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const roomRef = useRef<Room | null>(null);

  useEffect(() => {
    const mount = mountRef.current;

    // render the scene
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(windowWidth, windowHeight);
    if (mount) {
      mount.appendChild(renderer.domElement);
    }
    // add room to scene
    const room = new Room(scene);
    roomRef.current = room;
    const roomWalls: THREE.Mesh[] = room.getWalls();

    // add objects to scene
    scene.add(cube); // by default added to (0,0,0).
    camera.position.z = CAMERA_POSITION; // Camera would then be inside the cube, so we move the camera.

    // use Camera controls
    const controls = new CameraControls(camera, document.body, roomWalls);

    // Render/Animation loop
    const animation = animate(controls, roomRef, renderer);
    renderer.setAnimationLoop(animation); // draws the scene every time the screen is refreshed (normally 60x per second)

    // Cleanup function
    return () => {
      renderer.dispose();
      if (mount) {
        mount.removeChild(renderer.domElement);
      }
      scene.remove(cube);
      roomWalls.forEach((wall) => scene.remove(wall));
    };
  }, []);
  return <div ref={mountRef}></div>;
}

const animate = (
  controls: CameraControls,
  roomRef: MutableRefObject<Room | null>,
  renderer: THREE.WebGLRenderer
) => {
  return () => {
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    controls.update();
    if (roomRef.current) {
      if (roomRef.current.checkCollision(camera)) {
        // TODO: collision detection
      }
    }
    renderer.render(scene, camera);
  };
};
