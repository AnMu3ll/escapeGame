import * as THREE from 'three'

const SPEED = 5
const ROTATION_SPEED = 0.002
const TIME_DELTA = 0.1

export class CameraControls {
    move: { left: boolean; right: boolean, forward: boolean, backward: boolean }
    velocity: THREE.Vector3;
    direction: THREE.Vector3;
    speed: number;
    camera: any;
    domElement: any;
    rotationSpeed: number;
    constructor(camera: any, domElement: any) {
        this.camera = camera
        this.domElement = domElement;
        this.move = { left: false, right: false, forward: false, backward: false }
        this.velocity = new THREE.Vector3()
        this.direction = new THREE.Vector3()
        this.speed = SPEED
        this.rotationSpeed = ROTATION_SPEED
        this.initEventListeners()
    }

    private initEventListeners() {
        document.addEventListener('keydown', this.onKeyDown.bind(this), false);
        document.addEventListener('keyup', this.onKeyUp.bind(this), false);
        this.domElement.addEventListener('mousemove', this.onMouseMove.bind(this), false);
    }

    private onKeyDown(event: KeyboardEvent) {
        switch (event.code) {
            case 'ArrowUp':
            case 'KeyW':
                this.move.forward = true;
                break;
            case 'ArrowLeft':
            case 'KeyA':
                this.move.left = true;
                break;
            case 'ArrowDown':
            case 'KeyS':
                this.move.backward = true;
                break;
            case 'ArrowRight':
            case 'KeyD':
                this.move.right = true;
                break;
        }
    }

    private onKeyUp(event: KeyboardEvent) {
        switch (event.code) {
            case 'ArrowUp':
            case 'KeyW':
                this.move.forward = false;
                break;
            case 'ArrowLeft':
            case 'KeyA':
                this.move.left = false;
                break;
            case 'ArrowDown':
            case 'KeyS':
                this.move.backward = false;
                break;
            case 'ArrowRight':
            case 'KeyD':
                this.move.right = false;
                break;
        }
    }
    private onMouseMove(event: MouseEvent) {
        const movementX = event.movementX || 0;
        const movementY = event.movementY || 0;

        this.camera.rotation.y -= movementX * this.rotationSpeed;
        this.camera.rotation.x -= movementY * this.rotationSpeed;
        this.camera.rotation.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, this.camera.rotation.x));
    }

    public update() {
        this.velocity.x -= this.velocity.x * 10.0 * TIME_DELTA;
        this.velocity.z -= this.velocity.z * 10.0 * TIME_DELTA;

        this.direction.z = Number(this.move.forward) - Number(this.move.backward);
        this.direction.x = Number(this.move.left) - Number(this.move.right);
        this.direction.normalize();

        if (this.move.forward || this.move.backward) this.velocity.z -= this.direction.z * this.speed * TIME_DELTA;
        if (this.move.left || this.move.right) this.velocity.x -= this.direction.x * this.speed * TIME_DELTA;

        this.camera.translateX(this.velocity.x * TIME_DELTA);
        this.camera.translateZ(this.velocity.z * TIME_DELTA);
    }
}
