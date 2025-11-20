export class PortalSystem {
  constructor(world) {
    this.world = world;

    this.portalBox = new THREE.Box3().setFromCenterAndSize(
      new THREE.Vector3(0, 1, -5),
      new THREE.Vector3(2, 2, 2)
    );
  }

  update(delta) {
    const playerPos = this.world.controls.getObject().position;
    if (this.portalBox.containsPoint(playerPos)) {
      return "ENTER_APP";
    }
    return null;
  }
}
