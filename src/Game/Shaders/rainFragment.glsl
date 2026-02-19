varying float vAlpha;

void main() {
  // Elongated raindrop shape
  vec2 uv = gl_PointCoord - vec2(0.5);
  float dist = length(uv * vec2(1.0, 0.3));
  if (dist > 0.5) discard;

  float alpha = (1.0 - dist * 2.0) * vAlpha * 0.6;
  gl_FragColor = vec4(0.7, 0.8, 0.95, alpha);
}
