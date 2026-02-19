uniform float uTime;
uniform float uWindStrength;
uniform vec3 uPlayerPosition;

attribute vec3 offset;
attribute float bladeHeight;
attribute float phase;

varying float vHeight;
varying vec3 vWorldPos;

void main() {
  vec3 pos = position;

  // Wind animation - stronger at top of blade
  float windFactor = pos.y / bladeHeight;
  float wind = sin(uTime * 1.5 + offset.x * 0.5 + offset.z * 0.3 + phase) * uWindStrength;
  wind += sin(uTime * 0.8 + offset.x * 0.2 - offset.z * 0.4) * uWindStrength * 0.5;
  pos.x += wind * windFactor * windFactor;
  pos.z += wind * windFactor * windFactor * 0.5;

  // Player push-away
  vec3 worldPos = pos + offset;
  vec2 toPlayer = worldPos.xz - uPlayerPosition.xz;
  float playerDist = length(toPlayer);
  float pushRadius = 2.0;
  if (playerDist < pushRadius) {
    float push = (1.0 - playerDist / pushRadius) * windFactor;
    vec2 pushDir = normalize(toPlayer);
    pos.x += pushDir.x * push * 1.5;
    pos.z += pushDir.y * push * 1.5;
    pos.y -= push * 0.3;
  }

  // Final world position
  vec4 mvPosition = modelViewMatrix * vec4(pos + offset, 1.0);
  gl_Position = projectionMatrix * mvPosition;

  vHeight = windFactor;
  vWorldPos = pos + offset;
}
