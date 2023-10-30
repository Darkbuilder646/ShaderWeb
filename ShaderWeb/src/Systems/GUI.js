import * as dat from "dat.gui";

const createGUI = () => {
  const gui = new dat.GUI();
  const rotationControl = { rotationSpeed: 1.5 };
  gui.add(rotationControl, "rotationSpeed", 0, 5).name("Rotation Speed");
  return { gui, rotationControl };
};

export default createGUI;
