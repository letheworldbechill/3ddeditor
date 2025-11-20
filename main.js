import { World } from "./world.js";
import { AppArea } from "./app.js";
import { PortalSystem } from "./portals.js";

export function main() {
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  document.body.appendChild(renderer.domElement);

  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 500);

  const world = new World(renderer, camera);
  const portals = new PortalSystem(world);

  function onResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }
  window.addEventListener("resize", onResize);

  function loop(time) {
    const delta = time * 0.001;

    world.update(delta);
    const hit = portals.update(delta);
    if (hit === "ENTER_APP") {
      window.location.href = "bagger.html";
      return;
    }

    renderer.render(world.scene, camera);
    requestAnimationFrame(loop);
  }

  requestAnimationFrame(loop);
}
