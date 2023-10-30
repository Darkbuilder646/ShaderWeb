import React, { useEffect } from "react";
import * as THREE from "three";
import * as dat from "dat.gui";
import { setupMouseNavigation } from "../Components/SetupMouseNavigation";

const ShaderPage = () => {
  const width = window.innerWidth;
  const height = window.innerHeight;

  useEffect(() => {
    //* GUI Panel
    const gui = new dat.GUI();
    const rotationControl = { rotationSpeed: 0.01};
    gui.add(rotationControl, "rotationSpeed", 0, 0.1).name("Rotation Speed");
    // const mouseControl = { mouseSpeed: 2};
    // gui.add(mouseControl, "mouseSpeed", 2, 5).name("Mouse Speed");

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x555555);
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);
    const container = document.getElementById("root");
    container.appendChild(renderer.domElement);

    const planeGeometry = new THREE.PlaneGeometry(6, 6);
    const planeMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      side: THREE.DoubleSide,
    });
    const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);

    planeMesh.rotation.x = -Math.PI / 2;
    planeMesh.position.y = -1;

    scene.add(planeMesh);

    //#region //* Wireframe Cube
    const lineGeometry = new THREE.BoxGeometry(2.01, 2.01, 2.01);
    const lineWirefram = new THREE.WireframeGeometry(lineGeometry);
    const lineMaterial = new THREE.LineBasicMaterial({ color: 0x00ffff });
    const line = new THREE.LineSegments(lineWirefram, lineMaterial);

    scene.add(line);
    //#endregion

    //? Cube material 
    const cubeGeometry = new THREE.BoxGeometry(2, 2, 2);
    const cubeMaterial = new THREE.MeshToonMaterial({
      color: 0x00ff00,
      emissive: 0xff0000,
      flatShading: true,
    });
    const cubeMesh = new THREE.Mesh(cubeGeometry, cubeMaterial);

    scene.add(cubeMesh);


    camera.position.set(0, 2, 5); // Start Cam Position
    camera.lookAt(cubeMesh.position); // Look at the center of the cube
    // camera.rotation.set(0, 0, 0); // Reset Cam rotation

    

    const cleanMouseNav = setupMouseNavigation(camera, renderer, cubeMesh);

    function animate() {
      requestAnimationFrame(animate);

      line.rotation.y += rotationControl.rotationSpeed;
      cubeMesh.rotation.y += rotationControl.rotationSpeed;

      renderer.render(scene, camera);
    }

    animate();

    return () => {
      container.removeChild(renderer.domElement);
      renderer.dispose();
      gui.destroy();
      cleanMouseNav();
    };
  }, []);

  return null;
};

export default ShaderPage;
