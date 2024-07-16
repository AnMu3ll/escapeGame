import * as THREE from "three";

const ROOM_WIDTH = 20;
const ROOM_HEIGHT = 20;
const color: THREE.ColorRepresentation = 0x808080;
const angle90 = Math.PI / 2  // equals 90 degrees from radiant to angle

export class Room {
  private scene: THREE.Scene;
  private walls: THREE.Mesh[];

  constructor(scene: THREE.Scene) {
    this.scene = scene;
    this.walls = [];
    this.createWalls();
  }

  private createWalls() {
    // walls
    const roomMaterial = new THREE.MeshBasicMaterial({ color, side: 2 });
    const roomGeometry = new THREE.PlaneGeometry(
      ROOM_WIDTH,
      ROOM_HEIGHT,
    );

    // Back wall
    const backWall = new THREE.Mesh(roomGeometry, new THREE.MeshBasicMaterial({ color: "Tomato", side:2 }));
    backWall.position.z = -ROOM_HEIGHT / 2;
    this.scene.add(backWall);
    this.walls.push(backWall);

    // Left wall
    const leftWall = new THREE.Mesh(roomGeometry, new THREE.MeshBasicMaterial({ color: "Brown", side: 2 }));
    leftWall.position.x = -ROOM_WIDTH /2 ;
    leftWall.quaternion.setFromAxisAngle(new THREE.Vector3(0, 1, 0), angle90);
    this.scene.add(leftWall);
    this.walls.push(leftWall);

    // Right wall
    const rightWall = new THREE.Mesh(roomGeometry, new THREE.MeshBasicMaterial({ color: "DodgerBlue", side:2 }));
    rightWall.position.x = ROOM_WIDTH / 2;
    rightWall.quaternion.setFromAxisAngle(new THREE.Vector3(0, -1, 0), angle90);
    this.scene.add(rightWall);
    this.walls.push(rightWall);

    // Ceiling
    const ceiling = new THREE.Mesh(roomGeometry, roomMaterial);
    ceiling.position.y = ROOM_HEIGHT / 2;
    ceiling.quaternion.setFromAxisAngle(new THREE.Vector3(1, 0, 0), angle90);
    this.scene.add(ceiling);
    this.walls.push(ceiling);

    // Floor
    const floor = new THREE.Mesh(roomGeometry, new THREE.MeshBasicMaterial({ color: "Orange", side:2 }));
    floor.position.y = -ROOM_HEIGHT /2;
    floor.quaternion.setFromAxisAngle(new THREE.Vector3(-1,0, 0), angle90);
    this.scene.add(floor);
    this.walls.push(floor);

    // Front wall
    const frontWall = new THREE.Mesh(roomGeometry, new THREE.MeshBasicMaterial({ color: "Green", side:2 }));
    backWall.position.z = ROOM_HEIGHT / 2;
    this.scene.add(frontWall);
    this.walls.push(frontWall);    
  }
  public getWalls = (): THREE.Mesh[] => this.walls;
  public checkCollision(camera: THREE.PerspectiveCamera): boolean {
    const cameraCollider = new THREE.Box3().setFromObject(camera);

    for (let wall of this.walls) {
      wall.geometry.computeBoundingBox();
      const wallBox = wall.geometry
        .boundingBox!.clone()
        .translate(wall.position);

      if (cameraCollider.intersectsBox(wallBox)) {
        return true;
      }
    }

    return false;
  }
}
