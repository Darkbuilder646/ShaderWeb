import * as THREE from "three";

const createCubeWirefram = () => {
  const wireframeGeometry = new THREE.BoxGeometry(2.01, 2.01, 2.01);
  const wireframeWirefram = new THREE.WireframeGeometry(wireframeGeometry);
  const wireframeMaterial = new THREE.LineBasicMaterial({ color: 0x00ffff });
  const wireframe = new THREE.LineSegments( wireframeWirefram, wireframeMaterial);

  return wireframe;
};

export default createCubeWirefram;