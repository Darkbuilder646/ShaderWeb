import { useEffect } from "react";
import * as THREE from "three";

import SceneInit from "../assets/lib/SceneInit";
import vertexShaderCode from "../assets/lib/base_vertex.glsl";
import fragmentShaderCode from "../assets/lib/base_fragment.glsl";

const Glsl = () => {
  useEffect(() => {
    const test = new SceneInit("Glsl_Canva");
    test.initialize();
    test.animate();

    const axisHelper = new THREE.AxesHelper(32);
    test.scene.add(axisHelper);

    const uniformData = {
      u_time: {
        type: "f",
        value: test.clock.getElapsedTime(),
      },
    };
    const render = () => {
      uniformData.u_time.value = test.clock.getElapsedTime();
      window.requestAnimationFrame(render);
    };
    render();

    const boxGeometry = new THREE.BoxGeometry(28, 4, 28, 28, 4, 28);
    const boxMaterial = new THREE.ShaderMaterial({
      wireframe: true,
      uniforms: uniformData,
      vertexShader: vertexShaderCode,
      fragmentShader: fragmentShaderCode,
    });
    const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);

    test.scene.add(boxMesh);
  }, []);

  return (
    <div>
      <canvas id="Glsl_Canva" />
    </div>
  );
};

export default Glsl;
