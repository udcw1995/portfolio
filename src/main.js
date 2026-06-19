import './styles.css';
import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  Color,
  Float32BufferAttribute,
  Group,
  IcosahedronGeometry,
  LineBasicMaterial,
  LineSegments,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  Points,
  PointsMaterial,
  Scene,
  TorusKnotGeometry,
  Vector2,
  WebGLRenderer,
} from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const profile = {
  name: 'Chathuranga Wickramarathna',
  email: 'hello@example.com',
  github: 'https://github.com/',
  linkedin: 'https://www.linkedin.com/',
};

const projects = [
  {
    code: '01',
    title: 'Realtime Ops Console',
    type: 'Dashboard / Data product',
    year: '2026',
    accent: '#c8ff4d',
    summary:
      'A dense operational interface for tracking live events, triage queues, and system health without slowing teams down.',
    points: ['Event streaming UI', 'Command palette', 'Latency-first charts'],
  },
  {
    code: '02',
    title: 'AI Design Companion',
    type: 'SaaS / Creative tooling',
    year: '2025',
    accent: '#42e8db',
    summary:
      'A production-ready workspace that turns prompts, assets, and brand rules into editable campaign concepts.',
    points: ['Asset pipeline', 'Prompt workflows', 'Design system sync'],
  },
  {
    code: '03',
    title: 'Commerce Performance Lab',
    type: 'Storefront / Optimization',
    year: '2025',
    accent: '#ff7b66',
    summary:
      'A fast storefront refresh with motion, clean merchandising, and measurable gains across conversion-critical pages.',
    points: ['Core Web Vitals', 'Checkout polish', 'A/B-ready modules'],
  },
];

const skillCategories = [
  {
    title: 'Backend and APIs',
    skills: ['Node.js', 'Express', 'OAuth', 'Microservices', 'RabbitMQ', 'NGINX'],
  },
  {
    title: 'Databases and caching',
    skills: ['PostgreSQL', 'MySQL', 'Redis', 'Sequelize ORM'],
  },
  {
    title: 'PHP ecosystem',
    skills: ['PHP', 'Laravel', 'CodeIgniter', 'Livewire', 'Filament'],
  },
  {
    title: 'Frontend and commerce',
    skills: ['Next.js', 'Shopify'],
  },
  {
    title: 'DevOps and platforms',
    skills: ['Linux', 'Docker', 'Kubernetes', 'GitHub Actions'],
  },
  {
    title: 'Testing and collaboration',
    skills: ['Pest', 'Jest', 'Playwright', 'Git', 'GitHub', 'Bitbucket'],
  },
];

const processSteps = [
  ['Discover', 'Define the user promise, technical constraints, visual direction, and the smallest useful release.'],
  ['Prototype', 'Build the risky interaction, data flow, or integration first so decisions are based on reality.'],
  ['Ship', 'Turn the strongest direction into accessible, responsive, tested production code.'],
  ['Refine', 'Measure, tune, and polish the moments that separate a decent site from a memorable one.'],
];

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function hydrateProfile() {
  document.querySelectorAll('[data-profile="name"]').forEach((node) => {
    node.textContent = profile.name;
  });

  document.querySelectorAll('[data-profile-link="email"]').forEach((node) => {
    node.setAttribute('href', `mailto:${profile.email}`);
  });

  document.querySelectorAll('[data-profile-link="github"]').forEach((node) => {
    node.setAttribute('href', profile.github);
  });

  document.querySelectorAll('[data-profile-link="linkedin"]').forEach((node) => {
    node.setAttribute('href', profile.linkedin);
  });

  const year = document.querySelector('[data-current-year]');
  if (year) year.textContent = new Date().getFullYear();
}

function renderProjects() {
  const grid = document.querySelector('[data-projects]');
  if (!grid) return;

  grid.innerHTML = projects
    .map(
      (project) => `
        <article class="project-card" data-reveal style="--accent: ${project.accent}">
          <div class="project-card__visual" aria-hidden="true">
            <span>${project.code}</span>
            <div></div>
          </div>
          <div class="project-card__meta">
            <span>${project.type}</span>
            <span>${project.year}</span>
          </div>
          <h3>${project.title}</h3>
          <p>${project.summary}</p>
          <ul>
            ${project.points.map((point) => `<li>${point}</li>`).join('')}
          </ul>
        </article>
      `,
    )
    .join('');
}

function renderSkillCategories() {
  const list = document.querySelector('[data-capabilities]');
  if (!list) return;

  list.innerHTML = skillCategories
    .map(
      ({ title, skills }, index) => `
        <article class="capability-item" data-reveal>
          <span>${String(index + 1).padStart(2, '0')}</span>
          <div>
            <h3>${title}</h3>
            <ul class="skill-tags">
              ${skills.map((skill) => `<li>${skill}</li>`).join('')}
            </ul>
          </div>
        </article>
      `,
    )
    .join('');
}

function renderProcess() {
  const list = document.querySelector('[data-process]');
  if (!list) return;

  list.innerHTML = processSteps
    .map(
      ([title, copy], index) => `
        <article class="process-item" data-reveal>
          <span>${String(index + 1).padStart(2, '0')}</span>
          <h3>${title}</h3>
          <p>${copy}</p>
        </article>
      `,
    )
    .join('');
}

function initAnimations() {
  if (prefersReducedMotion) {
    document.documentElement.classList.add('reduced-motion');
    return;
  }

  gsap
    .timeline({ defaults: { ease: 'power3.out', duration: 1 } })
    .from('[data-header]', { y: -24, opacity: 0 })
    .from('[data-animate]', { y: 38, opacity: 0, stagger: 0.08 }, '-=0.65');

  gsap.utils.toArray('[data-reveal]').forEach((element) => {
    gsap.from(element, {
      y: 44,
      opacity: 0,
      duration: 0.85,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: element,
        start: 'top 86%',
      },
    });
  });

  gsap.to('.scroll-progress', {
    scaleX: 1,
    ease: 'none',
    scrollTrigger: {
      trigger: document.documentElement,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.2,
    },
  });

  gsap.to('.signal-strip__track', {
    xPercent: -18,
    ease: 'none',
    scrollTrigger: {
      trigger: '.signal-strip',
      start: 'top 75%',
      end: 'bottom top',
      scrub: true,
    },
  });
}

function createParticleGeometry(count, radius) {
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const phases = new Float32Array(count);
  const palette = [
    new Color('#c8ff4d'),
    new Color('#42e8db'),
    new Color('#ff7b66'),
    new Color('#f5f1df'),
  ];

  for (let index = 0; index < count; index += 1) {
    const stride = index * 3;
    const angle = index * 0.21;
    const lane = (index % 18) / 18;
    const wave = Math.sin(index * 0.17) * 0.65;
    const depth = (lane - 0.5) * radius * 1.4;
    const band = radius * (0.42 + (index % 9) * 0.035);

    positions[stride] = Math.cos(angle) * band + wave;
    positions[stride + 1] = Math.sin(angle * 0.72) * radius * 0.42 + (lane - 0.5) * 1.3;
    positions[stride + 2] = depth + Math.sin(angle) * radius * 0.28;

    const color = palette[index % palette.length].clone().lerp(new Color('#ffffff'), lane * 0.18);
    colors[stride] = color.r;
    colors[stride + 1] = color.g;
    colors[stride + 2] = color.b;
    phases[index] = angle;
  }

  const geometry = new BufferGeometry();
  geometry.setAttribute('position', new BufferAttribute(positions, 3));
  geometry.setAttribute('color', new BufferAttribute(colors, 3));
  geometry.setAttribute('phase', new BufferAttribute(phases, 1));
  geometry.userData.original = positions.slice();

  return geometry;
}

function createLineGeometry() {
  const points = [];
  const rings = 7;
  const segments = 56;

  for (let ring = 0; ring < rings; ring += 1) {
    const radius = 1.7 + ring * 0.24;
    const z = (ring - rings / 2) * 0.32;

    for (let segment = 0; segment < segments; segment += 1) {
      const a = (segment / segments) * Math.PI * 2;
      const b = ((segment + 1) / segments) * Math.PI * 2;
      points.push(
        Math.cos(a) * radius,
        Math.sin(a) * radius * 0.62,
        z + Math.sin(a * 2) * 0.08,
        Math.cos(b) * radius,
        Math.sin(b) * radius * 0.62,
        z + Math.sin(b * 2) * 0.08,
      );
    }
  }

  const geometry = new BufferGeometry();
  geometry.setAttribute('position', new Float32BufferAttribute(points, 3));
  return geometry;
}

function initWebGLScene() {
  const canvas = document.querySelector('#webgl-scene');
  if (!canvas) return;

  const renderer = new WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true,
    powerPreference: 'high-performance',
  });
  renderer.setClearColor(0x000000, 0);

  const scene = new Scene();
  const camera = new PerspectiveCamera(42, window.innerWidth / window.innerHeight, 0.1, 100);
  camera.position.set(0, 0.1, 7.8);

  const group = new Group();
  scene.add(group);

  const isCompact = window.innerWidth < 720;
  const particleCount = isCompact ? 460 : 920;
  const geometry = createParticleGeometry(particleCount, isCompact ? 2.4 : 3.15);
  const particleMaterial = new PointsMaterial({
    size: isCompact ? 0.035 : 0.028,
    vertexColors: true,
    transparent: true,
    opacity: 0.9,
    depthWrite: false,
    blending: AdditiveBlending,
  });
  const particles = new Points(geometry, particleMaterial);
  particles.position.set(isCompact ? 0.15 : 1.7, isCompact ? -0.05 : -0.08, 0);
  group.add(particles);

  const lineMaterial = new LineBasicMaterial({
    color: 0xc8ff4d,
    transparent: true,
    opacity: 0.16,
    blending: AdditiveBlending,
  });
  const lineMesh = new LineSegments(createLineGeometry(), lineMaterial);
  lineMesh.position.copy(particles.position);
  group.add(lineMesh);

  const knot = new Mesh(
    new TorusKnotGeometry(isCompact ? 0.58 : 0.72, 0.015, 160, 10),
    new MeshBasicMaterial({
      color: 0x42e8db,
      wireframe: true,
      transparent: true,
      opacity: 0.38,
    }),
  );
  knot.position.set(isCompact ? 1.55 : 3.05, isCompact ? 1.35 : 1.05, -0.6);
  knot.rotation.set(0.65, 0.2, 0.15);
  group.add(knot);

  const shard = new Mesh(
    new IcosahedronGeometry(isCompact ? 0.48 : 0.62, 1),
    new MeshBasicMaterial({
      color: 0xff7b66,
      wireframe: true,
      transparent: true,
      opacity: 0.42,
    }),
  );
  shard.position.set(isCompact ? -1.55 : -2.45, isCompact ? -1.25 : -1.05, -0.9);
  group.add(shard);

  const pointer = new Vector2(0, 0);
  const target = new Vector2(0, 0);
  const startedAt = performance.now();

  function resize() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.75);

    renderer.setPixelRatio(pixelRatio);
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  }

  function onPointerMove(event) {
    target.x = (event.clientX / window.innerWidth - 0.5) * 2;
    target.y = (event.clientY / window.innerHeight - 0.5) * 2;
  }

  window.addEventListener('resize', resize);
  window.addEventListener('pointermove', onPointerMove, { passive: true });
  resize();

  function animate(now = performance.now()) {
    const elapsed = (now - startedAt) / 1000;
    pointer.lerp(target, 0.055);

    const position = geometry.attributes.position;
    const original = geometry.userData.original;
    const phases = geometry.attributes.phase.array;

    for (let index = 0; index < position.count; index += 1) {
      const stride = index * 3;
      const phase = phases[index];
      position.array[stride + 1] = original[stride + 1] + Math.sin(elapsed * 0.8 + phase) * 0.045;
      position.array[stride] = original[stride] + Math.cos(elapsed * 0.55 + phase) * 0.035;
    }

    position.needsUpdate = true;
    group.rotation.y = elapsed * 0.065 + pointer.x * 0.16;
    group.rotation.x = pointer.y * -0.07;
    lineMesh.rotation.z = elapsed * 0.035;
    knot.rotation.x += 0.004;
    knot.rotation.y += 0.006;
    shard.rotation.x -= 0.0035;
    shard.rotation.y += 0.0045;

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }

  if (prefersReducedMotion) {
    renderer.render(scene, camera);
    return;
  }

  requestAnimationFrame(animate);
}

hydrateProfile();
renderProjects();
renderSkillCategories();
renderProcess();
initAnimations();
initWebGLScene();
