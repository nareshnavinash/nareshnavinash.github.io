uniform vec3 uSkyTopColor;
uniform vec3 uSkyBottomColor;
uniform vec3 uSunPosition;
uniform float uSunIntensity;
uniform float uCloudCover;
uniform float uTime;

varying vec3 vWorldPosition;

// Simple noise for clouds
float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 4; i++) {
    v += a * noise(p);
    p *= 2.0;
    a *= 0.5;
  }
  return v;
}

void main() {
  vec3 dir = normalize(vWorldPosition);

  // Height-based gradient
  float heightFactor = clamp(dir.y * 0.5 + 0.5, 0.0, 1.0);
  vec3 skyColor = mix(uSkyBottomColor, uSkyTopColor, heightFactor);

  // Sun glow
  vec3 sunDir = normalize(uSunPosition);
  float sunDot = max(dot(dir, sunDir), 0.0);
  float sunGlow = pow(sunDot, 64.0) * uSunIntensity;
  float sunHalo = pow(sunDot, 8.0) * uSunIntensity * 0.3;
  skyColor += vec3(1.0, 0.9, 0.7) * sunGlow;
  skyColor += vec3(1.0, 0.7, 0.4) * sunHalo;

  // Cloud layer (only above horizon)
  if (dir.y > 0.0 && uCloudCover > 0.01) {
    vec2 cloudUV = dir.xz / (dir.y + 0.1) * 3.0;
    cloudUV += uTime * 0.02;
    float cloudNoise = fbm(cloudUV);
    float clouds = smoothstep(1.0 - uCloudCover, 1.0, cloudNoise);
    skyColor = mix(skyColor, vec3(0.85, 0.85, 0.9), clouds * uCloudCover * 0.6);
  }

  gl_FragColor = vec4(skyColor, 1.0);
}
