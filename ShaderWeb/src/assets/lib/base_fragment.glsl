varying vec3 pos;
uniform float u_time;
void main() {
    float r = abs(sin(u_time * 2.));
    float g = abs(sin(u_time * .5));
    float b = abs(sin(u_time) + 1.);

    if(pos.x >= 0.0) {
        gl_FragColor = vec4(0.25, 0.87, 0.93, 1.0);
    } else {
        gl_FragColor = vec4(0.97, 0.49, 0.28, 1.0);
    }
    // gl_FragColor = vec4(r, g, 1.0, 1.0);
}