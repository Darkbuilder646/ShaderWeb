import React, { useEffect } from "react";

import createCam from "../Components/Camera.js";
import createScene from "../Components/Scene.js";
import createCube from "../Components/Cube.js";
import createPlane from "../Components/Plane.js";

import createRenderer from "../Systems/Renderer.js";
import createGUI from "../Systems/GUI.js";
import createCubeWirefram from "../Components/Wireframe.js";


const ShaderPage = () => {
  useEffect(() => {
    const scene = createScene();
    const camera = createCam();
    const renderer = createRenderer();
    const container = document.getElementById("root");
    container.appendChild(renderer.domElement);

    const { gui, rotationControl } = createGUI();

    const cube = createCube();
    const wireframe = createCubeWirefram();
    const plane = createPlane();

    scene.add(plane);
    scene.add(cube);
    scene.add(wireframe);

    camera.lookAt(cube.position);

    function animate() {
      requestAnimationFrame(animate);
  
      wireframe.rotation.y += rotationControl.rotationSpeed / 100;
      cube.rotation.y += rotationControl.rotationSpeed / 100;
  
      renderer.render(scene, camera);
    }
  
    animate();

    return () => {
      container.removeChild(renderer.domElement);
      renderer.dispose();
      gui.destroy()
    };
  }, []);

  return null;
};

export default ShaderPage;
