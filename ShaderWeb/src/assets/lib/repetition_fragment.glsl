varying vec2 _uv;
uniform float u_time;
uniform vec2 iResolution;

float opRepetitionRoundBox(vec3 p, vec3 s, vec3 b) {
    vec3 q = p - s * round(p / s);
    return sdRoundBox(q, b, 0.05);
}

float opLimitedRepetitionRoundBox(vec3 p, float s, vec3 l, vec3 b) {
    vec3 q = p - s * clamp(round(p / s), -l, l);
    return sdRoundBox(q, b, 0.05);
}

vec3 integerSin(float time, float frequency, float amplitude) {
    float value = amplitude * sin(frequency * time);
    
    // Interpolation entre des valeurs entières pour un effet smooth
    float t = smoothstep(0.0, 1.0, fract(abs(value))); // Smooth transition based on the fractional part of value
    float lower = floor(abs(value));  // Lower bound integer
    float upper = ceil(abs(value));   // Upper bound integer

    return vec3(mix(lower, upper, t));
}


float map(vec3 pos) {

    vec3 pos1 = rotationY(1.57 * u_time * 0.25) * (pos - vec3(0.0, 0.0, 0.0));
    // float d1 = opRepetitionRoundBox(pos1, vec3(1.0), vec3(0.3));
    vec3 repetitionFactor = integerSin(u_time, .5, 2.0);
    float d1 = opLimitedRepetitionRoundBox(pos1, 1.5, repetitionFactor, vec3(0.5));

    return d1;

}

//* Compute normal
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

  //* Position de la caméra
  float distance = 8.0;
  float height = 3.5;
  vec3 camPos = vec3(distance * sin(angle), height, distance * cos(angle));
  vec3 camTarget = vec3(0.0, 0.0, 0.0);
  
  //* Calcul de la matrice de vue
  vec3 camForward = normalize(camTarget - camPos);                                     //? forward vector of cam (z)
  vec3 camRight = normalize(cross(vec3(0.0, 1.0, 0.0), camForward));   //? right vector of cam (x)
  vec3 camUp = cross(camForward, camRight);                                         //? up vector of cam (y)

  vec2 uv = (fragCoord.xy - 0.5 * iResolution.xy) / iResolution.y;
  vec3 rayDirection = normalize(uv.x * camRight + uv.y * camUp + 1.0 * camForward);
  
  //* Raymarching
  const float tmax = 50.0; //? Max distance of ray
  float travelDistance = 0.0;
  for (int i = 0; i < 256; i++) {
      vec3 pos = camPos + travelDistance * rayDirection;
      float hit = map(pos);
      if (hit < 0.0001 || travelDistance > tmax) break;
      travelDistance += hit;
  }

  //* Couleur de la surface
  vec3 color = vec3(0.0);
  if (travelDistance < tmax) {
      vec3 pos = camPos + travelDistance * rayDirection;
      vec3 normal = calcNormal(pos);
      float diff = max(dot(normal, vec3(0.57703)), 0.0);
      float ambient = 0.5 + 0.5 * dot(normal, vec3(0.0, 1.0, 0.0));
  
      //* Calculer la couleur en fonction de la position
      float posFactor = length(pos);  // Distance du point à l'origine
      vec3 baseColor = vec3(0.2, 0.3, 0.4); // Couleur de base
      vec3 highlightColor = vec3(0.85, 0.75, 0.65); // Couleur de surbrillance
      color = mix(baseColor, highlightColor, posFactor / 5.0); // Interpolation en fonction de la position
  
      //* Ajout de l'éclairage
      color *= ambient + diff;
  
  }

  gl_FragColor = vec4(color, 1.);

}