varying float vAlpha;

void main() {
  vec2 uv = gl_PointCoord - vec2(0.5);
  float dist = length(uv);
  if (dist > 0.5) discard;

  float alpha = (1.0 - dist * 2.0) * vAlpha * 0.8;
  gl_FragColor = vec4(0.95, 0.95, 1.0, alpha);
}
