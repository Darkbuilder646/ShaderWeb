varying vec2 _uv;
uniform float u_time;
uniform vec2 iResolution;

float map(vec3 pos) {
  // Cube 1
  vec3 pos1 = rotationX(1.57 * u_time/2.0) * (pos - vec3(0.0, 0.0, 0.0));
  float d1 = sdBoxFrame(pos1 - vec3(0.0, 0.0, 0.0), vec3(0.4, 0.4, 0.4), 0.025);

  // Cube 2 
  vec3 pos2 = rotationX(-1.57 * u_time/2.) * (pos - vec3(0.0, 0.0, 0.0)); 
  float d2 = sdBoxFrame(pos2, vec3(0.2, 0.2, 0.2), 0.025);

  // Combine les deux cubes 
  return min(d1, d2);

}

// Compute normal
vec3 calcNormal(vec3 pos) {
    vec2 e = vec2(1.0, -1.0) * 0.5773;
    const float eps = 0.0005;
    return normalize(e.xyy * map(pos + e.xyy * eps) + 
                     e.yyx * map(pos + e.yyx * eps) + 
                     e.yxy * map(pos + e.yxy * eps) + 
                     e.xxx * map(pos + e.xxx * eps));
}

void main() {
  vec2 fragCoord = gl_FragCoord.xy;

  // float angle = u_time * exp(.25 * u_time); 
  float angle = .75; 

  // Position de la caméra
  vec3 ro = vec3(3.0 * sin(angle), 1., 3.0 * cos(angle));
  vec3 ta = vec3(0.0, 0.0, 0.0);
  
  // Calcul de la matrice de vue
  vec3 ww = normalize(ta - ro);
  vec3 uu = normalize(cross(vec3(0.0, 1.0, 0.0), ww));
  vec3 vv = cross(ww, uu);

  vec2 uv = (fragCoord.xy - 0.5 * iResolution.xy) / iResolution.y;
  vec3 rd = normalize(uv.x * uu + uv.y * vv + 1.0 * ww);
  
  // Raymarching
  const float tmax = 5.0;
  float t = 0.0;
  for (int i = 0; i < 256; i++) {
      vec3 pos = ro + t * rd;
      float h = map(pos);
      if (h < 0.0001 || t > tmax) break;
      t += h;
  }

  // Couleur de la surface
  vec3 color = vec3(0.0);
  if (t < tmax) {
      vec3 pos = ro + t * rd;
      vec3 normal = calcNormal(pos);
      float diff = max(dot(normal, vec3(0.57703)), 0.0);
      float ambient = 0.5 + 0.5 * dot(normal, vec3(0.0, 1.0, 0.0));
  
      // Calculer la couleur en fonction de la position
      float posFactor = length(pos);  // Distance du point à l'origine
      vec3 baseColor = vec3(0.2, 0.3, 0.4); // Couleur de base
      vec3 highlightColor = vec3(0.85, 0.75, 0.65); // Couleur de surbrillance
      color = mix(baseColor, highlightColor, posFactor / 5.0); // Interpolation en fonction de la position
  
      // Ajout de l'éclairage
      color *= ambient + diff;
  
  }

  gl_FragColor = vec4(color, 1.);

}