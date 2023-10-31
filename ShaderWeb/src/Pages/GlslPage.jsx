import { useEffect } from 'react';
import * as THREE from 'three';

import SceneInit from '../assets/lib/SceneInit';

const Glsl = () => {
    useEffect(() => {
      const test = new SceneInit('Glsl_Canva');
      test.initialize();
      test.animate();

      const axisHelper = new THREE.AxesHelper(32)
      test.scene.add(axisHelper);
  
      const boxGeometry = new THREE.BoxGeometry(16, 16, 16, 16, 16, 16);
      const boxMaterial = new THREE.ShaderMaterial({
        wireframe: true,
        vertexShader: `
        void main()	{
            gl_Position = projectionMatrix
              * modelViewMatrix
              * vec4(position.x, sin(position.z/2.0) + sin(position.x/2.0), position.z, 0.5);
          }
          `,
          fragmentShader: `
          void main() {
            gl_FragColor = vec4(0.0, 1.0, 1.0, 1.0);
          }
        `
      });
      const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
  
      test.scene.add(boxMesh);
    }, []);
  
    return (
      <div>
        <canvas id="Glsl_Canva" />
      </div>
    );
  }

export default Glsl;