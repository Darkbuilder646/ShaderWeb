varying vec3 pos;
uniform float u_time;

void main() {
    vec4 result;
    pos = position;

    //? Base
    // result = vec4(position.x, position.z, position.z, 0.5);

    //? Wave
    result = vec4(
        position.x, 
        sin(position.z / 2. + u_time * 1.5) + position.y, 
        position.z, 0.5
    );

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

    // result = vec4(
    //   position.x, 
    //   0.0, 
    //   position.z, 
    //   0.5
    // );

    gl_Position = projectionMatrix * modelViewMatrix * result;
}