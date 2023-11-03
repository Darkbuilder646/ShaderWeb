varying vec2 _uv;
uniform float u_time;

//function from https://iquilezles.org/articles/distfunctions2d/
float sdCircle(vec2 p, float r) {
    return length(p) - r;
}

float sdHexagram(in vec2 p, in float r) {
    const vec4 k = vec4(-0.5, 0.8660254038, 0.5773502692, 1.7320508076);
    p = abs(p);
    p -= 2.0 * min(dot(k.xy, p), 0.0) * k.xy;
    p -= 2.0 * min(dot(k.yx, p), 0.0) * k.yx;
    p -= vec2(clamp(p.x, r * k.z, r * k.w), r);
    return length(p) * sign(p.y);
}

float sdOctogon(in vec2 p, in float r) {
    const vec3 k = vec3(-0.9238795325, 0.3826834323, 0.4142135623);
    p = abs(p);
    p -= 2.0 * min(dot(vec2(k.x, k.y), p), 0.0) * vec2(k.x, k.y);
    p -= 2.0 * min(dot(vec2(-k.x, k.y), p), 0.0) * vec2(-k.x, k.y);
    p -= vec2(clamp(p.x, -k.z * r, k.z * r), r);
    return length(p) * sign(p.y);
}

void main() {
    float angleForOuter = -u_time;
    float angleForInner = u_time;

    //Octogone outer
    vec2 rotatedOuterUV = mat2(cos(angleForOuter), -sin(angleForOuter), sin(angleForOuter), cos(angleForOuter)) * (_uv * 2.0);
    float distOuter = sdOctogon(rotatedOuterUV, 1.0);

    //Octogone inner
    vec2 rotatedInnerUV = mat2(cos(angleForInner), -sin(angleForInner), sin(angleForInner), cos(angleForInner)) * (_uv * 2.0);
    float distInner = sdOctogon(rotatedInnerUV, 1.25);

    float distCenter = sdCircle(_uv * 3.5, 0.0);

    float dist = min(max(distOuter, -distInner), distCenter);


    // dist -= clamp(abs(sin(u_time)), 0.0, 0.15); // for later
    dist -= 0.5;
    dist = abs(dist);
    dist = smoothstep(0.0, 0.2, dist);

    gl_FragColor = vec4(dist, dist, dist, 1.0);

}