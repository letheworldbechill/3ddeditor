export class World {
  constructor(renderer, camera) {
    this.renderer = renderer;
    this.camera = camera;

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x88ccff);

    this.player = {
      velocity: new THREE.Vector3(),
      speed: 5
    };

    // Boden
    const groundGeo = new THREE.PlaneGeometry(200, 200);
    const groundMat = new THREE.MeshStandardMaterial({ color:0xdddddd });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    this.scene.add(ground);

    // Licht
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(10,10,10);
    this.scene.add(light);

    // Controls
    this.controls = new THREE.PointerLockControls(camera, document.body);
    document.body.addEventListener("click", () => this.controls.lock());
    this.scene.add(this.controls.getObject());
  }

  update(delta) {
    // simple Bewegung
    const vel = this.player.velocity;

    vel.x *= 0.9;
    vel.z *= 0.9;

    // Beispiel WASD Steuerung
    if (this.controls.isLocked) {
      vel.z -= 0.1;
    }

    this.controls.moveRight(vel.x * delta);
    this.controls.moveForward(vel.z * delta);
  }

  resume() {
    console.log("Zurück in der Welt");
  }
}

export const AppArea = () => {
    console.log("AppArea: Initialized and Loaded Successfully.");
};