import { useEffect } from "react";
import * as THREE from "three";

import ArtSceneInit from "../assets/lib/ArtSceneInit";
//GLSL Utils
import sdfFunctions from "../assets/lib/utils/sdfFunctions.glsl"

//Main GLSL
import mainvertexShaderCode from "../assets/lib/art_vertex.glsl";
import mainfragmentShaderCode from "../assets/lib/art_fragment.glsl";

const GlslArtPlane = () => {
  useEffect(() => {
    const canvas = new ArtSceneInit("Glsl_Canva");
    canvas.initialize();
    canvas.animate();

    const fragmentShaderCode = `
      ${sdfFunctions}
      ${mainfragmentShaderCode}
    `;

    const uniformData = {
      u_time: {
        type: "f",
        value: canvas.clock.getElapsedTime(),
      },
    };
    const render = () => {
      uniformData.u_time.value = canvas.clock.getElapsedTime();
      window.requestAnimationFrame(render);
    };
    render();

    const planeGeometry = new THREE.PlaneGeometry(30, 30, 1, 1);
    const planeMaterial = new THREE.ShaderMaterial({
      side: THREE.DoubleSide,
      uniforms: uniformData,
      vertexShader: mainvertexShaderCode,
      fragmentShader: fragmentShaderCode,
    });
    const boxMesh = new THREE.Mesh(planeGeometry, planeMaterial);

    canvas.scene.add(boxMesh);
  }, []);

  return (
    <div>
      <canvas id="Glsl_Canva" />
    </div>
  );
};

export default GlslArtPlane;
