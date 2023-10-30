import { Color, Scene } from 'three';

const createScene = () => {
  const scene = new Scene();
  scene.background = new Color(0x555555);

  return scene;
};

export default createScene;
