import React, { useEffect } from "react";
//Components
import createCam from "../Components/Camera.js";
import createScene from "../Components/Scene.js";
import createCube from "../Components/Cube.js";
import createPlane from "../Components/Plane.js";
import createCubeWirefram from "../Components/Wireframe.js";
//System
import createRenderer from "../Systems/Renderer.js";
import createGUI from "../Systems/GUI.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
// import createControls from "../Systems/Controls.js"; //todo Fix later


const ShaderPage = () => {
  useEffect(() => {
    const scene = createScene();
    const camera = createCam();
    const renderer = createRenderer();
    const container = document.getElementById("root");
    container.appendChild(renderer.domElement);
    // const controls = createControls(camera, renderer);

    //#region //*Control Cam
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.enablePan = false;
    //#endregion

    const { gui, rotationControl } = createGUI();

    const wireframe = createCubeWirefram();
    wireframe.position.y = 1;
    const plane = createPlane(10, 10);

    scene.add(plane);
    scene.add(wireframe);

    controls.target.copy(plane.position);
    controls.update();

    function animate() {
      requestAnimationFrame(animate);
  
      wireframe.rotation.y += rotationControl.rotationSpeed / 100;
      wireframe.rotation.x += rotationControl.rotationSpeed / 100;
      controls.update();
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
