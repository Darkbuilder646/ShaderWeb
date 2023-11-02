import { useEffect } from "react";
import * as THREE from "three";

import SceneInit from "../assets/lib/SceneInit";

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
      vertexShader: `
        uniform float u_time;

        void main()	{
          vec4 result;

          // Change only this
          // result = vec4(position.x, sin((position.z/2.0) + u_time) + sin((position.x/2.0) - u_time) + 2.0, position.z, 0.5);

          //? Wave
          // result = vec4(
          //   position.x, 
          //   sin(position.z/1.5 + u_time * 1.5) / .75*sin(u_time), 
          //   position.z, 
          //   0.5
          // );

          //?Noeud papillon
          // vec2 center = vec2(0., 0.);
          // vec2 offset = position.xy - center;
          // float distance = length(offset);

          // float amplitude = 0.5 * sin(u_time * 1.5 - distance * 0.5);

          // result = vec4(
          //   position.x * amplitude, 
          //   position.y + offset.y * amplitude, 
          //   position.z * amplitude, 
          //   0.5
          // );

          result = vec4(
            position.x, 
            0.0, 
            position.z, 
            0.5
          );

            gl_Position = projectionMatrix
              * modelViewMatrix
              * result; 
          }
          `,
      fragmentShader: `
          void main() {
            gl_FragColor = vec4(0.0, 1.0, 1.0, 1.0);
          }
        `,
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
