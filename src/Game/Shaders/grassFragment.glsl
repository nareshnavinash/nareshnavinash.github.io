varying float vHeight;
varying vec3 vWorldPos;

uniform vec3 uColorBase;
uniform vec3 uColorTip;

void main() {
  // Gradient from base to tip
  vec3 color = mix(uColorBase, uColorTip, vHeight);

  // Subtle darkening near ground
  color *= 0.88 + 0.12 * vHeight;

  gl_FragColor = vec4(color, 1.0);
}
