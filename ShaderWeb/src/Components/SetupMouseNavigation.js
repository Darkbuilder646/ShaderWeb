import * as THREE from "three";

export function setupMouseNavigation(camera, renderer, object, mouseSpeed = 1) {
  let isDragging = false;
  let previousX = 0;

  const handleMouseDown = (event) => {
    if (event.button === 0) {
      isDragging = true;
      previousX = event.clientX;
    }
  };

  const handleMouseMove = (event) => {
    if (isDragging) {
      const delta = event.clientX - previousX;
      previousX = event.clientX;

      const center = object.position;
      camera.position.sub(center);
      camera.position.applyAxisAngle(
        new THREE.Vector3(0, -1, 0),
        (delta * Math.PI) / (180 * 5)
      ); 
      camera.position.add(center); 
      camera.lookAt(center); 
    }
  };

  const handleMouseUp = () => {
    isDragging = false;
  };

  const handleMouseWheel = (event) => {
    // camera.position.y += event.deltaY * 0.01;

  };

  window.addEventListener("mousedown", handleMouseDown);
  window.addEventListener("mousemove", handleMouseMove);
  window.addEventListener("mouseup", handleMouseUp);
  window.addEventListener("wheel", handleMouseWheel);

  return () => {
    window.removeEventListener("mousedown", handleMouseDown);
    window.removeEventListener("mousemove", handleMouseMove);
    window.removeEventListener("mouseup", handleMouseUp);
    window.removeEventListener("wheel", handleMouseWheel);
  };
}
