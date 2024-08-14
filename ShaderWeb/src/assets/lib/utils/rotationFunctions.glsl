/*
  Rotation matrix
  1.57 => 90° angle
*/
mat3 rotationX(float angle) {
    float c = cos(angle);
    float s = sin(angle);
    return mat3(1.0, 0.0, 0.0,
                0.0, c, -s,
                0.0, s, c);
}

mat3 rotationY(float angle) {
    float c = cos(angle);
    float s = sin(angle);
    return mat3(c, 0.0, s,
                0.0, 1, 0.0,
                -s, 0, c);
}

mat3 rotationZ(float angle) {
    float c = cos(angle);
    float s = sin(angle);
    return mat3(c, -s, 0.0,
                s, c, 0.0,
                0.0, 0, 1.0);
}

// mat3 rotationXY(float angle) {
//     float c = cos(angle);
//     float s = sin(angle);
//     return mat3(c, 0.0, s,
//                 s*s, c, -s*c,
//                 -s*c, s, c*c);
// }

mat3 rotationXY(float angle) {
    return rotationY(angle) * rotationX(angle);
}

mat3 rotationXZ(float angle) {
    return rotationZ(angle) * rotationX(angle);
}

mat3 rotationYZ(float angle) {
    return rotationZ(angle) * rotationY(angle);
}
