import * as THREE from "three";

const createCube = () => {
  const cubeGeometry = new THREE.BoxGeometry(2, 2, 2);
  const cubeMaterial = new THREE.MeshToonMaterial({
    color: 0x00ff00,
    emissive: 0xff0000,
    flatShading: true,
  });
  const cubeMesh = new THREE.Mesh(cubeGeometry, cubeMaterial);

  return cubeMesh;
};

export default createCube;
