import * as THREE from "three";

const createPlane = (subdivisionX, subdivisionsY) => {

    const planeGeometry = new THREE.PlaneGeometry(6, 6, subdivisionX, subdivisionsY); // Ajoutez les subdivisions
    const planeMaterial = new THREE.MeshBasicMaterial({
      color: 0x00ff00,
      side: THREE.DoubleSide,
      wireframe: true,
    });
    const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);

    planeMesh.rotation.x = -Math.PI / 2;
    planeMesh.position.y = -1;

    return planeMesh;

};

export default createPlane;
