// Three.js scene behind the home page flight: Earth, a balloon, ALEASAT and Mars.
// Everything is generated in code, so there are no textures or models to download.
import * as THREE from 'three';

const NOISE = `
  float hash(vec3 p) {
    p = fract(p * 0.3183099 + 0.1);
    p *= 17.0;
    return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
  }
  float noise(vec3 x) {
    vec3 i = floor(x);
    vec3 f = fract(x);
    f = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(mix(hash(i), hash(i + vec3(1, 0, 0)), f.x), mix(hash(i + vec3(0, 1, 0)), hash(i + vec3(1, 1, 0)), f.x), f.y),
      mix(mix(hash(i + vec3(0, 0, 1)), hash(i + vec3(1, 0, 1)), f.x), mix(hash(i + vec3(0, 1, 1)), hash(i + vec3(1, 1, 1)), f.x), f.y),
      f.z
    );
  }
  float fbm(vec3 p) {
    float v = 0.0;
    float a = 0.5;
    for (int i = 0; i < 5; i++) {
      v += a * noise(p);
      p = p * 2.03 + vec3(1.7, 9.2, 3.1);
      a *= 0.5;
    }
    return v;
  }
`;

const SPHERE_VERTEX = `
  varying vec3 vObject;
  varying vec3 vNormal;
  varying vec3 vView;
  void main() {
    vObject = normalize(position);
    vec4 world = modelMatrix * vec4(position, 1.0);
    vNormal = normalize(mat3(modelMatrix) * normal);
    vView = normalize(cameraPosition - world.xyz);
    gl_Position = projectionMatrix * viewMatrix * world;
  }
`;

const EARTH_FRAGMENT = `
  uniform vec3 sun;
  uniform vec3 sunGlow;
  uniform float time;
  varying vec3 vObject;
  varying vec3 vNormal;
  varying vec3 vView;
  ${NOISE}
  void main() {
    vec3 normal = normalize(vNormal);
    float continents = fbm(vObject * 9.0 + vec3(4.0, 1.0, 7.0));
    float land = smoothstep(0.48, 0.53, continents);
    float detail = fbm(vObject * 60.0);
    vec3 surface = mix(mix(vec3(0.004, 0.018, 0.05), vec3(0.008, 0.04, 0.09), detail), mix(vec3(0.03, 0.05, 0.03), vec3(0.11, 0.09, 0.06), detail), land);

    float clouds = fbm(vObject * 24.0 + vec3(time * 0.003, 0.0, 0.0));
    clouds = smoothstep(0.52, 0.72, clouds);

    float light = dot(normal, sun);
    float day = smoothstep(-0.08, 0.5, light);
    vec3 color = mix(surface, vec3(0.62, 0.66, 0.72), clouds * 0.7) * day;

    float rim = pow(1.0 - max(dot(normal, vView), 0.0), 8.0);
    float dawn = smoothstep(-0.25, 0.1, light);
    float towardSun = pow(max(dot(-vView, sunGlow), 0.0), 30.0);
    color += mix(vec3(0.1, 0.34, 0.95), vec3(1.0, 0.5, 0.18), towardSun) * rim * dawn * 0.7;
    gl_FragColor = vec4(color, 1.0);
  }
`;

// Glow is based on how close each view ray passes to Earth, so it stays soft from any height
const ATMOSPHERE_FRAGMENT = `
  uniform vec3 sun;
  uniform vec3 sunGlow;
  uniform vec3 center;
  varying vec3 vView;
  void main() {
    vec3 origin = cameraPosition - center;
    vec3 ray = -vView;
    float along = dot(origin, ray);
    vec3 nearest = origin - ray * min(along, 0.0);
    // Only rays heading down toward the horizon pick up the glow
    float downward = smoothstep(0.02, -0.03, along / length(origin));
    float height = (length(nearest) - 60.0) / 1.6;
    float glow = exp(-max(height, 0.0) * 4.5);
    float lit = smoothstep(-0.45, 0.2, dot(normalize(nearest), sun));
    float towardSun = pow(max(dot(ray, sunGlow), 0.0), 40.0);
    vec3 color = mix(vec3(0.16, 0.46, 1.0), vec3(1.0, 0.55, 0.22), towardSun);
    gl_FragColor = vec4(color * glow * lit * downward * 1.5, 1.0);
  }
`;

const MARS_FRAGMENT = `
  uniform vec3 sun;
  varying vec3 vObject;
  varying vec3 vNormal;
  varying vec3 vView;
  ${NOISE}
  void main() {
    vec3 normal = normalize(vNormal);
    float large = fbm(vObject * 2.4 + vec3(2.0, 5.0, 1.0));
    float fine = fbm(vObject * 26.0);
    vec3 color = mix(vec3(0.27, 0.10, 0.05), vec3(0.72, 0.36, 0.18), smoothstep(0.32, 0.68, large));
    color *= 0.82 + fine * 0.36;
    color = mix(color, vec3(0.92, 0.88, 0.84), smoothstep(0.9, 0.97, abs(vObject.y + (fine - 0.5) * 0.08)));
    float light = smoothstep(-0.04, 0.55, dot(normal, sun));
    float rim = pow(1.0 - max(dot(normal, vView), 0.0), 4.0);
    gl_FragColor = vec4(color * light * 1.1 + vec3(0.95, 0.5, 0.28) * rim * light * 0.55, 1.0);
  }
`;

interface Keyframe {
  at: number;
  camera: [number, number, number];
  target: [number, number, number];
}

// Scroll position (0 to 1) mapped to where the camera is and what it looks at
const KEYFRAMES: Keyframe[] = [
  { at: 0, camera: [0, 0.7, 8], target: [0, 1.8, -8] },
  { at: 0.12, camera: [0, 0.85, 8.2], target: [0, 1.9, -8] },
  { at: 0.3, camera: [-0.9, 2.3, 14.4], target: [0.5, 2.2, 9.5] },
  { at: 0.42, camera: [-1.3, 2.45, 13.8], target: [0.5, 2.2, 9.5] },
  { at: 0.62, camera: [-0.6, 3.75, 21.4], target: [0.7, 3.55, 18] },
  { at: 0.74, camera: [-0.2, 3.85, 20.7], target: [0.7, 3.55, 18] },
  { at: 0.92, camera: [-20, 8, 25], target: [-70, 10, 30] },
  { at: 1, camera: [-23, 8.5, 25.6], target: [-70, 10, 30] }
];

const ease = (t: number) => t * t * (3 - 2 * t);

const solarCells = () => {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
  ctx.fillStyle = '#1a1d24';
  ctx.fillRect(0, 0, 256, 256);
  for (let x = 0; x < 2; x++) {
    for (let y = 0; y < 3; y++) {
      ctx.fillStyle = '#0d2147';
      ctx.fillRect(14 + x * 118, 12 + y * 80, 108, 72);
      ctx.strokeStyle = '#38507f';
      ctx.lineWidth = 1;
      for (let i = 1; i < 6; i++) {
        ctx.beginPath();
        ctx.moveTo(14 + x * 118, 12 + y * 80 + i * 12);
        ctx.lineTo(122 + x * 118, 12 + y * 80 + i * 12);
        ctx.stroke();
      }
    }
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
};

const buildCubeSat = () => {
  const group = new THREE.Group();
  const panel = new THREE.MeshStandardMaterial({ map: solarCells(), metalness: 0.2, roughness: 0.42 });
  group.add(new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), panel));

  const rail = new THREE.MeshStandardMaterial({ color: 0xd6dae0, metalness: 0.45, roughness: 0.38 });
  const railGeometry = new THREE.BoxGeometry(0.075, 1.14, 0.075);
  [[-1, -1], [-1, 1], [1, -1], [1, 1]].forEach(([x, z]) => {
    const mesh = new THREE.Mesh(railGeometry, rail);
    mesh.position.set(x * 0.5, 0, z * 0.5);
    group.add(mesh);
  });
  [-0.5, 0.5].forEach((y) => {
    [[0, -0.5, 1.02, 0.05, 0.05], [0, 0.5, 1.02, 0.05, 0.05], [-0.5, 0, 0.05, 0.05, 1.02], [0.5, 0, 0.05, 0.05, 1.02]].forEach(
      ([x, z, w, h, d]) => {
        const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), rail);
        mesh.position.set(x, y, z);
        group.add(mesh);
      }
    );
  });

  const antenna = new THREE.MeshStandardMaterial({ color: 0xe6e8ec, metalness: 0.7, roughness: 0.35 });
  [[1, 0], [-1, 0], [0, 1], [0, -1]].forEach(([x, z]) => {
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(x ? 1.5 : 0.022, 0.012, z ? 1.5 : 0.022), antenna);
    mesh.position.set(x * 1.25, 0.57, z * 1.25);
    group.add(mesh);
  });

  const lens = new THREE.Mesh(
    new THREE.CylinderGeometry(0.15, 0.17, 0.09, 40),
    new THREE.MeshStandardMaterial({ color: 0x0a0c10, metalness: 0.9, roughness: 0.12 })
  );
  lens.position.y = -0.55;
  group.add(lens);
  return group;
};

const buildBalloon = () => {
  const group = new THREE.Group();
  const shape = new THREE.SphereGeometry(0.62, 64, 64);
  const position = shape.attributes.position;
  for (let i = 0; i < position.count; i++) {
    const y = position.getY(i);
    const t = y < 0 ? y / 0.62 : 0;
    const narrow = 1 - 0.42 * t * t;
    position.setXYZ(i, position.getX(i) * narrow, y * (1 + 0.28 * t * t), position.getZ(i) * narrow);
  }
  shape.computeVertexNormals();
  group.add(new THREE.Mesh(shape, new THREE.MeshStandardMaterial({ color: 0xfff8ea, roughness: 0.5, metalness: 0 })));

  const line = new THREE.Line(
    new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, -0.8, 0), new THREE.Vector3(0, -1.75, 0)]),
    new THREE.LineBasicMaterial({ color: 0xd8dade })
  );
  group.add(line);
  const parachute = new THREE.Mesh(
    new THREE.SphereGeometry(0.1, 24, 12, 0, Math.PI * 2, 0, Math.PI / 2),
    new THREE.MeshStandardMaterial({ color: 0xd4552b, roughness: 0.7, side: THREE.DoubleSide })
  );
  parachute.position.y = -1.2;
  group.add(parachute);
  const payload = new THREE.Mesh(
    new THREE.BoxGeometry(0.13, 0.13, 0.13),
    new THREE.MeshStandardMaterial({ color: 0xeaeaea, roughness: 0.6 })
  );
  payload.position.y = -1.82;
  group.add(payload);
  return group;
};

const buildStars = (count: number) => {
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const v = new THREE.Vector3().randomDirection().multiplyScalar(300 + Math.random() * 200);
    positions.set([v.x, v.y, v.z], i * 3);
    const b = 0.35 + Math.pow(Math.random(), 3) * 0.65;
    colors.set([b, b, b * (0.9 + Math.random() * 0.2)], i * 3);
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  return new THREE.Points(
    geometry,
    new THREE.PointsMaterial({ size: 1.1, vertexColors: true, sizeAttenuation: true, transparent: true, depthWrite: false })
  );
};

const buildSunGlow = () => {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
  const glow = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
  glow.addColorStop(0, 'rgba(255,255,255,1)');
  glow.addColorStop(0.035, 'rgba(255,252,240,1)');
  glow.addColorStop(0.09, 'rgba(255,214,150,0.42)');
  glow.addColorStop(0.32, 'rgba(255,160,80,0.07)');
  glow.addColorStop(1, 'rgba(255,120,50,0)');
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, 256, 256);
  return new THREE.Sprite(
    new THREE.SpriteMaterial({ map: new THREE.CanvasTexture(canvas), blending: THREE.AdditiveBlending, depthWrite: false })
  );
};

export interface MissionScene {
  setProgress: (progress: number) => void;
  dispose: () => void;
}

export const createMissionScene = (canvas: HTMLCanvasElement, animate: boolean): MissionScene => {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, window.innerWidth < 800 ? 1.5 : 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x000000);
  const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 1200);

  const sun = new THREE.Vector3(0.3, 0.05, -1).normalize();
  scene.add(new THREE.AmbientLight(0x7c8aa3, 1.25));
  const light = new THREE.DirectionalLight(0xfff0dc, 3.4);
  light.position.copy(sun).multiplyScalar(100);
  scene.add(light);
  // Earthshine and a soft key from the camera side, so hardware is visible against the sun
  const fill = new THREE.DirectionalLight(0xf2f5fa, 2.7);
  fill.position.set(-4, 3, 9);
  scene.add(fill);

  const sunGlow = new THREE.Vector3(0.3, -0.075, -1).normalize();
  const uniforms = {
    sun: { value: sun },
    sunGlow: { value: sunGlow },
    center: { value: new THREE.Vector3(0, -60, 0) },
    time: { value: 0 }
  };

  const earth = new THREE.Mesh(
    new THREE.SphereGeometry(60, 256, 256),
    new THREE.ShaderMaterial({ uniforms, vertexShader: SPHERE_VERTEX, fragmentShader: EARTH_FRAGMENT })
  );
  earth.position.set(0, -60, 0);
  scene.add(earth);

  const atmosphere = new THREE.Mesh(
    new THREE.SphereGeometry(63, 96, 96),
    new THREE.ShaderMaterial({
      uniforms,
      vertexShader: SPHERE_VERTEX,
      fragmentShader: ATMOSPHERE_FRAGMENT,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
      transparent: true,
      depthWrite: false
    })
  );
  atmosphere.position.copy(earth.position);
  scene.add(atmosphere);

  const mars = new THREE.Mesh(
    new THREE.SphereGeometry(16, 128, 128),
    new THREE.ShaderMaterial({ uniforms, vertexShader: SPHERE_VERTEX, fragmentShader: MARS_FRAGMENT })
  );
  mars.position.set(-70, 10, 30);
  scene.add(mars);

  scene.add(buildStars(window.innerWidth < 800 ? 2500 : 5000));

  const glow = buildSunGlow();
  glow.position.copy(sunGlow).multiplyScalar(240);
  glow.scale.set(150, 150, 1);
  scene.add(glow);

  const balloon = buildBalloon();
  balloon.position.set(0.5, 2.55, 9.5);
  scene.add(balloon);

  const cubesat = buildCubeSat();
  cubesat.position.set(0.7, 3.55, 18);
  cubesat.scale.setScalar(0.62);
  cubesat.rotation.set(0.45, 0.6, 0.25);
  scene.add(cubesat);

  const cameraPosition = new THREE.Vector3();
  const cameraTarget = new THREE.Vector3();
  const from = new THREE.Vector3();
  const to = new THREE.Vector3();
  let target = 0;
  let current = 0;
  let frame = 0;
  let visible = true;
  let needsRender = true;
  const clock = new THREE.Clock();

  const place = (progress: number) => {
    let index = 0;
    while (index < KEYFRAMES.length - 2 && progress > KEYFRAMES[index + 1].at) {
      index += 1;
    }
    const a = KEYFRAMES[index];
    const b = KEYFRAMES[index + 1];
    const t = ease(Math.min(Math.max((progress - a.at) / (b.at - a.at), 0), 1));
    cameraPosition.lerpVectors(from.set(...a.camera), to.set(...b.camera), t);
    cameraTarget.lerpVectors(from.set(...a.target), to.set(...b.target), t);
    camera.position.copy(cameraPosition);
    camera.lookAt(cameraTarget);
  };

  const resize = () => {
    const { clientWidth, clientHeight } = canvas;
    renderer.setSize(clientWidth, clientHeight, false);
    camera.aspect = clientWidth / Math.max(clientHeight, 1);
    // Keeps the subject framed on tall phone screens
    const isTall = camera.aspect < 1;
    camera.fov = isTall ? 58 : 42;
    // Shifts the subject away from the text: right on wide screens, up on phones
    camera.setViewOffset(
      clientWidth,
      clientHeight,
      isTall ? 0 : -clientWidth * 0.17,
      isTall ? clientHeight * 0.17 : 0,
      clientWidth,
      clientHeight
    );
    camera.updateProjectionMatrix();
    needsRender = true;
  };
  resize();
  window.addEventListener('resize', resize);

  const observer = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
  });
  observer.observe(canvas);

  // Drops the resolution if this device cannot keep the flight smooth
  let frames = 0;
  let measuredFrom = 0;
  const adaptQuality = (now: number) => {
    if (frames === 0) {
      measuredFrom = now;
    }
    frames += 1;
    if (frames === 45) {
      if ((now - measuredFrom) / 44 > 28 && renderer.getPixelRatio() > 1) {
        renderer.setPixelRatio(1);
        resize();
      }
      frames = 0;
    }
  };

  const render = (now = 0) => {
    frame = requestAnimationFrame(render);
    if (!visible) {
      frames = 0;
      return;
    }
    adaptQuality(now);
    const delta = target - current;
    const moving = Math.abs(delta) > 0.0002;
    current = animate ? current + delta * 0.09 : target;
    if (!animate && !moving && !needsRender) {
      return;
    }
    const elapsed = clock.getElapsedTime();
    if (animate) {
      uniforms.time.value = elapsed;
      cubesat.rotation.y = 0.6 + elapsed * 0.14;
      cubesat.rotation.x = 0.45 + Math.sin(elapsed * 0.2) * 0.1;
      balloon.position.y = 2.55 + Math.sin(elapsed * 0.5) * 0.015;
    }
    balloon.visible = current < 0.56;
    cubesat.visible = current > 0.3;
    place(current);
    renderer.render(scene, camera);
    needsRender = false;
  };
  frame = requestAnimationFrame(render);

  return {
    setProgress: (progress: number) => {
      target = progress;
      needsRender = true;
    },
    dispose: () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener('resize', resize);
      renderer.dispose();
    }
  };
};
