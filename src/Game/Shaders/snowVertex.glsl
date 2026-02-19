uniform float uTime;
uniform float uIntensity;
uniform vec3 uPlayerPosition;
uniform vec2 uWindDirection;
uniform float uWindStrength;

attribute float aSize;
attribute float aSpeed;
attribute float aOffset;
attribute vec3 aStartPosition;

varying float vAlpha;

void main() {
  float dropHeight = 20.0;
  float y = mod(aStartPosition.y - uTime * aSpeed * 3.0 + aOffset * dropHeight, dropHeight);

  vec3 pos = aStartPosition;
  pos.x += uPlayerPosition.x + sin(uTime * 0.5 + aOffset * 6.28) * 2.0;
  pos.x += uWindDirection.x * uWindStrength * (dropHeight - y) * 0.5;
  pos.z += uPlayerPosition.z + cos(uTime * 0.4 + aOffset * 6.28) * 2.0;
  pos.z += uWindDirection.y * uWindStrength * (dropHeight - y) * 0.5;
  pos.y = y;

  vAlpha = smoothstep(0.0, 2.0, y) * smoothstep(dropHeight, dropHeight - 2.0, y) * uIntensity;

  vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
  gl_PointSize = max(1.5, aSize * (1.0 / -mvPosition.z) * 150.0);
  gl_Position = projectionMatrix * mvPosition;
}
