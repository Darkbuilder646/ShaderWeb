varying vec2 _uv;
uniform float u_time;

void main(){
    vec4 result;

    result = vec4(position.x, position.y, 0., .5);

    gl_Position = projectionMatrix * modelViewMatrix * result;

    // Transformation des coordonnées de texture UV de [0, 1] en [-1, 1]
    _uv = (uv - 0.5) * 2.0;
    
}