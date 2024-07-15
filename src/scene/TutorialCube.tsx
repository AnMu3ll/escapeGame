import * as THREE from 'three'

const color:THREE.ColorRepresentation = 0x00ff00 // green => hex colors in css

const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color });
export const cube = new THREE.Mesh(geometry, material);