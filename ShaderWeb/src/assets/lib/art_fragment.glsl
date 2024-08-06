varying vec2 _uv;
uniform float u_time;

//function from https://iquilezles.org/articles/distfunctions2d/

// SDF function
float sdBox(vec2 point, vec2 size) {
    vec2 d = abs(point) - size;
    return length(max(d, .0)) + min(max(d.x, d.y), .0);
}

float opBox(in vec2 point, in vec2 size, in float thickness) {
    return abs(sdBox(point, size)) - thickness;
}

void main() {
    
    vec2 boxSize_visior = vec2(.32, .15);
    vec2 boxSize_body = vec2(.5, .8);
    vec2 boxSize_backpack = vec2(.2, .40);
    vec2 boxSize_footLeft = vec2(.14, .18);
    vec2 boxSize_footRight = vec2(.14, .18);

    vec2 translatedUV_1 = _uv - vec2(.25, .4);
    vec2 translatedUV_2 = _uv - vec2(.0, .1);
    vec2 translatedUV_3 = _uv - vec2(-.65, .1);
    vec2 translatedUV_4 = _uv - vec2(-.25, -.75);
    vec2 translatedUV_5 = _uv - vec2(.25, -.75);

    float thickness = .025;
    float dist_visior = sdBox(translatedUV_1, boxSize_visior);
    float dist_body = sdBox(translatedUV_2, boxSize_body);
    float dist_backpack = sdBox(translatedUV_3, boxSize_backpack);
    float dist_footLeft = sdBox(translatedUV_4, boxSize_footLeft);
    float dist_footRight = sdBox(translatedUV_5, boxSize_footRight);

    // Color
    vec3 color_background = vec3(1.0, 1.0, 1.0); // fond
    vec3 color_visior = vec3(0.27, 0.78, 1.0); // box 1
    vec3 color_body = vec3(1.0, 0.21, 0.21); // box 2
    vec3 color_backpack = vec3(1.0, 0.21, 0.21); // box 3
    vec3 color_footLeft = vec3(1.0, 0.21, 0.21); // box 4
    vec3 color_footRight = vec3(1.0, 0.21, 0.21); // box 5

    // Gestion des Mask
    float maskVisior = smoothstep(0.0, 0.01, dist_visior); // Mask box 1
    float maskBody = smoothstep(-0.01, 0.01, -dist_body); // Mask box 2
    float maskBackpack = smoothstep(-0.01, 0.01, -dist_backpack); // Mask box 3
    float maskFootLeft = smoothstep(-0.01, 0.01, -dist_footLeft); // Mask box 4
    float maskFootRight = smoothstep(-0.01, 0.01, -dist_footRight); // Mask box 5

    // Calculer la couleur finale en fonction des mask
    vec3 finalColor = mix(color_background, color_body, maskBody); 
    finalColor = mix(color_visior, finalColor, maskVisior); 
    finalColor = mix(finalColor, color_backpack, maskBackpack);
    finalColor = mix(finalColor, color_footLeft, maskFootLeft);
    finalColor = mix(finalColor, color_footRight, maskFootRight);

    // Rendu final
    gl_FragColor = vec4(finalColor, 1.0);
    // gl_FragColor = vec4(vec3(maskRed, maskBorder, 0.0), 1.0); // Debug

}