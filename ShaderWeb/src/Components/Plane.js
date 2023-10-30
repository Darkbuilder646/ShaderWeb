import * as THREE from "three";

const createPlane = () => {
  const planeGeometry = new THREE.PlaneGeometry(6, 6);
  const planeMaterial = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    side: THREE.DoubleSide,
  });
  const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);

  planeMesh.rotation.x = -Math.PI / 2;
  planeMesh.position.y = -1;

//   scene.add(planeMesh);
  return planeMesh;

};

export default createPlane;