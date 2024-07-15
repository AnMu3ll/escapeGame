import * as THREE from 'three';
import { windowHeight, windowWidth } from '../utils/Window';

// @param fov — Camera frustum vertical field of view. Default 50 degrees. 
// > Extent of the scene that is seen on the display at any given moment
const FOV = 75

// @param aspect — Camera frustum aspect ratio. Default 1.
// > You almost always want to use the width of the element divided by the height, 
//   or you'll get the same result as when you play old movies on a widescreen TV - the image looks squished.
const ASPECT_RATIO = windowWidth/ windowHeight

// @param near — Camera frustum near plane. Default 0.1.
// > Objects nearer to the camera than the value are not rendered.
const NEAR_PLANE_FRUSTRUM = 0.1

// @param far — Camera frustum far plane. Default 2000.
// > Objects farther from the camera than the value are not rendered.
const FAR_PLANE_FRUSTRUM = 1000

// Creates a new PerspectiveCamera.
export const camera = new THREE.PerspectiveCamera(FOV, ASPECT_RATIO, NEAR_PLANE_FRUSTRUM, FAR_PLANE_FRUSTRUM)