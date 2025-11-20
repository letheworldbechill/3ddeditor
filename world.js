export class World {
  constructor(renderer, camera) {
    this.renderer = renderer;
    this.camera = camera;

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x88ccff);

    this.player = {
      velocity: new THREE.Vector3(),
      speed: 8
    };

    // Boden
    const groundGeo = new THREE.PlaneGeometry(200, 200);
    const groundMat = new THREE.MeshStandardMaterial({ color: 0xdddddd });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    this.scene.add(ground);

    // Licht
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(10, 20, 10);
    light.castShadow = true;
    this.scene.add(light);

    const ambient = new THREE.AmbientLight(0xffffff, 0.4);
    this.scene.add(ambient);

    // Ein sichtbares Portal-Objekt an der Stelle (0, 1, -5)
    const portalGeo = new THREE.BoxGeometry(2, 2, 0.2);
    const portalMat = new THREE.MeshStandardMaterial({ color: 0x2266ff, emissive: 0x4488ff });
    const portalMesh = new THREE.Mesh(portalGeo, portalMat);
    portalMesh.position.set(0, 1, -5);
    this.scene.add(portalMesh);

    // Hilfsraster
    const grid = new THREE.GridHelper(200, 40, 0x444444, 0x888888);
    this.scene.add(grid);

    // Controls
    this.controls = new THREE.PointerLockControls(camera, document.body);

    // Startposition Kamera / Spieler
    camera.position.set(0, 1.7, 8);
    this.controls.getObject().position.copy(camera.position);

    document.body.addEventListener("click", () => {
      if (!this.controls.isLocked) {
        this.controls.lock();
      }
    });

    this.scene.add(this.controls.getObject());

    // einfache WASD-Steuerung
    this.keys = {};
    window.addEventListener("keydown", (e) => this.onKey(e, true));
    window.addEventListener("keyup", (e) => this.onKey(e, false));
  }

  onKey(e, down) {
    this.keys[e.code] = down;
  }

  update(delta) {
    if (!this.controls.isLocked) return;

    const vel = this.player.velocity;
    const speed = this.player.speed;

    let forward = 0;
    let strafe = 0;

    if (this.keys["KeyW"]) forward -= speed;
    if (this.keys["KeyS"]) forward += speed;
    if (this.keys["KeyA"]) strafe -= speed;
    if (this.keys["KeyD"]) strafe += speed;

    vel.x = strafe;
    vel.z = forward;

    this.controls.moveRight(vel.x * delta);
    this.controls.moveForward(vel.z * delta);
  }

  resume() {
    console.log("Zurück in der Welt");
  }
}
