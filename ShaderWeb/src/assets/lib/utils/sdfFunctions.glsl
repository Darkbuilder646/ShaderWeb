/*
    SDF Function
*/
float sdBox(vec3 p, vec3 b) {
  vec3 d = abs(p) - b;
  return length(max(d, 0.0)) + min(max(d.x, max(d.y, d.z)), 0.0);
}

float sdBoxFrame(vec3 p, vec3 b, float e) {
    p = abs(p) - b;
    vec3 q = abs(p + e) - e;
    return min(min(
        length(max(vec3(p.x, q.y, q.z), 0.0)) + min(max(p.x, max(q.y, q.z)), 0.0),
        length(max(vec3(q.x, p.y, q.z), 0.0)) + min(max(q.x, max(p.y, q.z)), 0.0)),
        length(max(vec3(q.x, q.y, p.z), 0.0)) + min(max(q.x, max(q.y, p.z)), 0.0)
    );
}



//? Other for later

// float mapLoop(vec3 pos) {
//     float d = 1e6; // Grande valeur initiale pour la distance
//     int numCubes = 6; // Nombre de cubes concentriques
//     float sizeStep = 0.15; // Réduction de taille à chaque étape

//     for (int i = 0; i < numCubes; i++) {
//         float scale = float(numCubes - i) * sizeStep;
//         vec3 size = vec3(scale, scale, scale);
//         vec3 posCube;
//         if(i % 2 == 0) {
//           posCube = rotationXY(1.57 * u_time/8.) * (pos - vec3(0.0, 0.0, 0.0));
//         } else {
//           posCube = rotationXY(-1.57 * u_time/8.) * (pos - vec3(0.0, 0.0, 0.0));
//         }
//         float dist = sdBoxFrame(posCube, size, 0.025);
//         d = min(d, dist);
//     }

//     return d;
// }

// vec3 calcNormalLoop(vec3 pos) {
//     vec2 e = vec2(1.0, -1.0) * 0.5773;
//     const float eps = 0.0005;
//     return normalize(e.xyy * mapLoop(pos + e.xyy * eps) + 
//                      e.yyx * mapLoop(pos + e.yyx * eps) + 
//                      e.yxy * mapLoop(pos + e.yxy * eps) + 
//                      e.xxx * mapLoop(pos + e.xxx * eps));
// }