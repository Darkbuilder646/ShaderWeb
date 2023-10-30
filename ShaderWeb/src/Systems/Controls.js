import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const createControls = ({camera, renderer}) => {
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = false;
}

export default createControls;