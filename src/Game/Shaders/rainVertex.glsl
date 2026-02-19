uniform float uTime;
uniform float uIntensity;
uniform vec3 uPlayerPosition;
uniform vec2 uWindDirection;
uniform float uWindStrength;

attribute float aSpeed;
attribute float aOffset;
attribute vec3 aStartPosition;

varying float vAlpha;

void main() {
  // Animate drop falling
  float dropHeight = 25.0;
  float y = mod(aStartPosition.y - uTime * aSpeed * 15.0 + aOffset * dropHeight, dropHeight);

  // Position relative to player (rain follows camera)
  vec3 pos = aStartPosition;
  pos.x += uPlayerPosition.x + uWindDirection.x * uWindStrength * (dropHeight - y) * 0.3;
  pos.z += uPlayerPosition.z + uWindDirection.y * uWindStrength * (dropHeight - y) * 0.3;
  pos.y = y;

  // Fade at top and bottom
  vAlpha = smoothstep(0.0, 2.0, y) * smoothstep(dropHeight, dropHeight - 3.0, y) * uIntensity;

  vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
  gl_PointSize = max(1.0, 2.0 * (1.0 / -mvPosition.z) * 100.0);
  gl_Position = projectionMatrix * mvPosition;
}
