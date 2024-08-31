import { useEffect } from "react";
import * as THREE from "three";

import ArtSceneInit from "../assets/lib/ArtSceneInit";
//GLSL Utils
import rotationFunctions from "../assets/lib/utils/rotationFunctions.glsl"
import sdfFunctions from "../assets/lib/utils/sdfFunctions.glsl"

//Main GLSL
import mainVertexShaderCode from "../assets/lib/vertex.glsl";
import mainfragmentShaderCode from "../assets/lib/repetition_fragment.glsl";

const GlslDomainRepetition = () => {
  useEffect(() => {
    const canvas = new ArtSceneInit("Glsl_Canva");
    canvas.initialize();
    canvas.animate();

    //Axis gizmo
    // const axisHelper = new THREE.AxesHelper(32);
    // canvas.scene.add(axisHelper);

    const fragmentShaderCode = `
      ${sdfFunctions}
      ${rotationFunctions}
      ${mainfragmentShaderCode}
    `;

    const uniformData = {
      u_time: { type: "f", value: 0.0 },
      iResolution: {
        type: "v2",
        value: new THREE.Vector2(window.innerWidth, window.innerHeight),
      },
    };

    const planeGeometry = new THREE.PlaneGeometry(75, 75, 1, 1);
    const planeMaterial = new THREE.ShaderMaterial({
      side: THREE.DoubleSide,
      uniforms: uniformData,
      vertexShader: mainVertexShaderCode,
      fragmentShader: fragmentShaderCode,
    });
    const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
    canvas.scene.add(planeMesh);

    const render = () => {
      uniformData.u_time.value = canvas.clock.getElapsedTime();
      window.requestAnimationFrame(render);
    };
    render();
  }, []);

  return (
    <div>
      <canvas id="Glsl_Canva" />
    </div>
  );
};

export default GlslDomainRepetition;
