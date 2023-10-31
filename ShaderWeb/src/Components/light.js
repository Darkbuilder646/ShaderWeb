import { DirectionalLight } from 'three';

const createLight = () => {
    const light = new DirectionalLight('white', 5);
    light.position.set(0, 10, 0);
    return light;
}

export default createLight;