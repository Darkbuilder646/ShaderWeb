import { PerspectiveCamera } from 'three';

const createCam = () => {
    const camera = new PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 2, 5);

    return camera;
}

export default createCam;