varying vec3 vPosition;
varying vec2 _uv;
uniform float u_time;

void main() {
    vPosition = position;
    _uv = uv;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, .75);

}