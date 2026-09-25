import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RotateCw, Pause, Play, Eye, Sparkles, Layers, ShieldCheck, Info } from 'lucide-react';

type ViewMode = 'natural' | 'implant' | 'xray';

interface Hotspot {
  id: string;
  name: string;
  desc: string;
  position: [number, number, number];
}

const HOTSPOTS: Hotspot[] = [
  {
    id: 'enamel',
    name: 'Mineralized Enamel',
    desc: 'The hardest substance in the human body, providing high wear resistance.',
    position: [0.8, 1.4, 0.4],
  },
  {
    id: 'pulp',
    name: 'Pulp Chamber',
    desc: 'Houses vital sensory nerves and nourishing micro-vasculature.',
    position: [0, 0.2, 0.7],
  },
  {
    id: 'margin',
    name: 'Gingival Margin',
    desc: 'The critical protective barrier where enamel meets periodontal tissue.',
    position: [0.9, -0.3, -0.2],
  },
  {
    id: 'root',
    name: 'Periodontal Root',
    desc: 'Anchors deeply into alveolar bone with shock-absorbing ligaments.',
    position: [-0.6, -1.8, 0.2],
  },
];

export const ThreeToothViewer: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('natural');
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const [activeHotspot, setActiveHotspot] = useState<Hotspot | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const controlsRef = useRef<OrbitControls | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const toothGroupRef = useRef<THREE.Group | null>(null);
  const naturalGroupRef = useRef<THREE.Group | null>(null);
  const implantGroupRef = useRef<THREE.Group | null>(null);
  const xrayGroupRef = useRef<THREE.Group | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 500;
    const height = container.clientHeight || 500;

    // 1. Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // 2. Camera setup
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(3.8, 1.8, 4.6);
    cameraRef.current = camera;

    // 3. Renderer setup
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // 4. OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enablePan = false;
    controls.minDistance = 3.2;
    controls.maxDistance = 8.5;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 1.4;
    controls.target.set(0, -0.1, 0);
    controlsRef.current = controls;

    // 5. Lighting: Three-point soft clinical lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xf0fdfa, 1.6);
    keyLight.position.set(4, 5, 3);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xe0f2fe, 1.0);
    fillLight.position.set(-4, 2, -2);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0x99f6e4, 1.4);
    rimLight.position.set(0, -4, -3);
    scene.add(rimLight);

    const topSoftLight = new THREE.PointLight(0xffffff, 0.9, 12);
    topSoftLight.position.set(0, 3.5, 0);
    scene.add(topSoftLight);

    // 6. Model Root Group
    const toothRootGroup = new THREE.Group();
    scene.add(toothRootGroup);
    toothGroupRef.current = toothRootGroup;

    // Build Model Components
    // A. Natural Tooth (Sculpted crown + dual anatomical roots)
    const naturalGroup = new THREE.Group();
    toothRootGroup.add(naturalGroup);
    naturalGroupRef.current = naturalGroup;

    // Materials
    const enamelMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xfdfbf7,
      roughness: 0.16,
      metalness: 0.04,
      clearcoat: 0.92,
      clearcoatRoughness: 0.12,
      transmission: 0.14,
      thickness: 0.7,
      ior: 1.58,
      attenuationColor: new THREE.Color(0xccfbf1),
      attenuationDistance: 3.0,
      specularIntensity: 1.0,
    });

    const rootDentinMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xf6eee3,
      roughness: 0.38,
      metalness: 0.02,
      clearcoat: 0.25,
      clearcoatRoughness: 0.4,
    });

    // --- Crown Sculpting ---
    // Start with a high-resolution subdivided cylinder for anatomical curvature
    const crownGeo = new THREE.CylinderGeometry(1.2, 0.95, 1.45, 48, 24);
    const crownPos = crownGeo.attributes.position;
    for (let i = 0; i < crownPos.count; i++) {
      const x = crownPos.getX(i);
      const y = crownPos.getY(i);
      const z = crownPos.getZ(i);

      let newX = x;
      let newY = y;
      let newZ = z;

      // Squarish molar profile
      const factor = 1 + 0.12 * Math.cos(4 * Math.atan2(z, x));
      newX *= factor;
      newZ *= factor;

      // On top surface (occlusal table): create 4 distinct cusps and central developmental groove
      if (y > 0.4) {
        // Distance to the 4 cusps: (+-0.5, +-0.5)
        const d1 = Math.hypot(x - 0.5, z - 0.5);
        const d2 = Math.hypot(x + 0.5, z - 0.5);
        const d3 = Math.hypot(x - 0.5, z + 0.5);
        const d4 = Math.hypot(x + 0.5, z + 0.5);

        const cusp1 = Math.exp(-d1 * 2.8) * 0.32;
        const cusp2 = Math.exp(-d2 * 2.8) * 0.28;
        const cusp3 = Math.exp(-d3 * 2.8) * 0.26;
        const cusp4 = Math.exp(-d4 * 2.8) * 0.30;

        // Central pit indentation
        const centralPit = -0.22 * Math.exp(-(x * x + z * z) * 3.5);

        newY += cusp1 + cusp2 + cusp3 + cusp4 + centralPit;
      }

      crownPos.setXYZ(i, newX, newY, newZ);
    }
    crownGeo.computeVertexNormals();

    const crownMesh = new THREE.Mesh(crownGeo, enamelMaterial);
    crownMesh.position.y = 0.72;
    naturalGroup.add(crownMesh);

    // Cervical collar transition
    const collarGeo = new THREE.TorusGeometry(0.92, 0.1, 16, 48);
    collarGeo.scale(1.08, 0.7, 1.05);
    const collarMesh = new THREE.Mesh(collarGeo, rootDentinMaterial);
    collarMesh.rotation.x = Math.PI / 2;
    collarMesh.position.y = 0.02;
    naturalGroup.add(collarMesh);

    // Anatomical Roots: Mesial & Distal curved roots
    const createCurvedRoot = (isMesial: boolean) => {
      const sign = isMesial ? 1 : -1;
      const curve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(sign * 0.4, 0.05, 0.05),
        new THREE.Vector3(sign * 0.52, -0.6, 0.08),
        new THREE.Vector3(sign * 0.62, -1.3, -0.05),
        new THREE.Vector3(sign * 0.45, -1.95, -0.15),
        new THREE.Vector3(sign * 0.38, -2.3, -0.2),
      ]);

      const tubeGeo = new THREE.TubeGeometry(curve, 32, 0.36, 24, false);
      // Taper down to root apex
      const pos = tubeGeo.attributes.position;
      for (let i = 0; i < pos.count; i++) {
        const y = pos.getY(i);
        const t = Math.max(0, Math.min(1, (0.05 - y) / 2.35));
        const taper = Math.max(0.22, 1 - 0.76 * t);
        pos.setX(i, pos.getX(i) * taper);
        pos.setZ(i, pos.getZ(i) * taper);
      }
      tubeGeo.computeVertexNormals();

      return new THREE.Mesh(tubeGeo, rootDentinMaterial);
    };

    const mesialRoot = createCurvedRoot(true);
    const distalRoot = createCurvedRoot(false);
    naturalGroup.add(mesialRoot);
    naturalGroup.add(distalRoot);

    // B. Implant Assembly Group (Titanium screw + Gold/Titanium Abutment + Porcelain Crown)
    const implantGroup = new THREE.Group();
    toothRootGroup.add(implantGroup);
    implantGroupRef.current = implantGroup;
    implantGroup.visible = false;

    // Titanium threaded screw fixture
    const titaniumMat = new THREE.MeshStandardMaterial({
      color: 0x94a3b8,
      roughness: 0.28,
      metalness: 0.92,
    });

    const abutmentMat = new THREE.MeshStandardMaterial({
      color: 0xd4af37, // warm surgical gold nitride finish
      roughness: 0.22,
      metalness: 0.88,
    });

    // Implant body
    const fixtureGeo = new THREE.CylinderGeometry(0.48, 0.22, 2.2, 32);
    const fixtureMesh = new THREE.Mesh(fixtureGeo, titaniumMat);
    fixtureMesh.position.y = -1.15;
    implantGroup.add(fixtureMesh);

    // Spiral implant micro-threads
    const threadCount = 14;
    for (let i = 0; i < threadCount; i++) {
      const progress = i / threadCount;
      const radius = 0.5 - progress * 0.24;
      const ringGeo = new THREE.TorusGeometry(radius, 0.045, 12, 32);
      const ringMesh = new THREE.Mesh(ringGeo, titaniumMat);
      ringMesh.rotation.x = Math.PI / 2 + 0.08;
      ringMesh.position.y = -0.25 - progress * 1.8;
      implantGroup.add(ringMesh);
    }

    // Abutment collar & post
    const abutmentCollarGeo = new THREE.CylinderGeometry(0.68, 0.46, 0.45, 32);
    const abutmentCollar = new THREE.Mesh(abutmentCollarGeo, abutmentMat);
    abutmentCollar.position.y = 0.08;
    implantGroup.add(abutmentCollar);

    const abutmentPostGeo = new THREE.ConeGeometry(0.44, 0.7, 16);
    const abutmentPost = new THREE.Mesh(abutmentPostGeo, abutmentMat);
    abutmentPost.position.y = 0.52;
    implantGroup.add(abutmentPost);

    // Precision Porcelain Crown for implant
    const implantCrownMesh = new THREE.Mesh(crownGeo.clone(), enamelMaterial);
    implantCrownMesh.position.y = 0.85;
    implantGroup.add(implantCrownMesh);

    // C. Diagnostic X-Ray Group (Translucent luminous holographic view)
    const xrayGroup = new THREE.Group();
    toothRootGroup.add(xrayGroup);
    xrayGroupRef.current = xrayGroup;
    xrayGroup.visible = false;

    const xrayHoloMat = new THREE.MeshPhysicalMaterial({
      color: 0x06b6d4,
      roughness: 0.1,
      metalness: 0.1,
      transmission: 0.75,
      thickness: 1.2,
      opacity: 0.65,
      transparent: true,
      wireframe: false,
      emissive: new THREE.Color(0x083344),
      emissiveIntensity: 0.5,
    });

    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x22d3ee,
      wireframe: true,
      transparent: true,
      opacity: 0.28,
    });

    const xrayCrown = new THREE.Mesh(crownGeo.clone(), xrayHoloMat);
    xrayCrown.position.y = 0.72;
    xrayGroup.add(xrayCrown);

    const xrayWire = new THREE.Mesh(crownGeo.clone(), wireMat);
    xrayWire.position.y = 0.72;
    xrayWire.scale.set(1.01, 1.01, 1.01);
    xrayGroup.add(xrayWire);

    const xrayRoot1 = new THREE.Mesh(mesialRoot.geometry.clone(), xrayHoloMat);
    const xrayRoot2 = new THREE.Mesh(distalRoot.geometry.clone(), xrayHoloMat);
    xrayGroup.add(xrayRoot1);
    xrayGroup.add(xrayRoot2);

    // Internal glowing pulp canal (healthy active nerve tissue)
    const pulpCanalMat = new THREE.MeshBasicMaterial({
      color: 0xf43f5e,
      wireframe: false,
    });
    const pulpChamberGeo = new THREE.SphereGeometry(0.38, 16, 16);
    pulpChamberGeo.scale(1.2, 0.8, 1.0);
    const pulpChamber = new THREE.Mesh(pulpChamberGeo, pulpCanalMat);
    pulpChamber.position.y = 0.45;
    xrayGroup.add(pulpChamber);

    const canalCurve1 = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0.18, 0.4, 0),
      new THREE.Vector3(0.35, -0.4, 0.05),
      new THREE.Vector3(0.48, -1.2, -0.05),
      new THREE.Vector3(0.36, -2.1, -0.18),
    ]);
    const canalTube1 = new THREE.Mesh(
      new THREE.TubeGeometry(canalCurve1, 24, 0.06, 12, false),
      pulpCanalMat
    );
    xrayGroup.add(canalTube1);

    const canalCurve2 = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-0.18, 0.4, 0),
      new THREE.Vector3(-0.35, -0.4, 0.05),
      new THREE.Vector3(-0.48, -1.2, -0.05),
      new THREE.Vector3(-0.36, -2.1, -0.18),
    ]);
    const canalTube2 = new THREE.Mesh(
      new THREE.TubeGeometry(canalCurve2, 24, 0.06, 12, false),
      pulpCanalMat
    );
    xrayGroup.add(canalTube2);

    // Center offset
    toothRootGroup.position.y = 0.3;

    // Subtle gentle floating oscillation
    let clock = new THREE.Clock();

    // 7. Animation loop
    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Gentle floating levitation
      if (toothGroupRef.current) {
        toothGroupRef.current.position.y = 0.3 + Math.sin(elapsedTime * 1.5) * 0.06;
      }

      controls.update();
      renderer.render(scene, camera);
    };
    animate();
    setIsLoaded(true);

    // 8. Resize observer
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      controls.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  // Update view mode visibility
  useEffect(() => {
    if (!naturalGroupRef.current || !implantGroupRef.current || !xrayGroupRef.current) return;

    naturalGroupRef.current.visible = viewMode === 'natural';
    implantGroupRef.current.visible = viewMode === 'implant';
    xrayGroupRef.current.visible = viewMode === 'xray';
  }, [viewMode]);

  // Update auto rotate
  useEffect(() => {
    if (controlsRef.current) {
      controlsRef.current.autoRotate = isAutoRotating;
    }
  }, [isAutoRotating]);

  const handleResetCamera = () => {
    if (!cameraRef.current || !controlsRef.current) return;
    cameraRef.current.position.set(3.8, 1.8, 4.6);
    controlsRef.current.target.set(0, -0.1, 0);
    controlsRef.current.update();
  };

  return (
    <div className="relative w-full h-[420px] md:h-[480px] lg:h-[520px] rounded-3xl bg-gradient-to-b from-teal-950/5 via-slate-50/80 to-white/90 border border-slate-200/80 shadow-xl shadow-teal-900/5 backdrop-blur-sm overflow-hidden flex flex-col">
      {/* Top Header HUD */}
      <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
        <div className="pointer-events-auto flex items-center gap-2 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-slate-200/90 shadow-xs">
          <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
          <span className="text-xs font-semibold tracking-wide text-slate-800 uppercase">
            3D Interactive Dental Model
          </span>
        </div>

        {/* View Mode Segmented Selector */}
        <div className="pointer-events-auto flex items-center p-1 bg-white/90 backdrop-blur-md rounded-2xl border border-slate-200 shadow-xs">
          <button
            onClick={() => setViewMode('natural')}
            className={`px-3 py-1 text-xs font-medium rounded-xl transition-all whitespace-nowrap ${
              viewMode === 'natural'
                ? 'bg-teal-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Enamel Crown
          </button>
          <button
            onClick={() => setViewMode('implant')}
            className={`px-3 py-1 text-xs font-medium rounded-xl transition-all whitespace-nowrap ${
              viewMode === 'implant'
                ? 'bg-teal-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Titanium Implant
          </button>
          <button
            onClick={() => setViewMode('xray')}
            className={`px-3 py-1 text-xs font-medium rounded-xl transition-all whitespace-nowrap ${
              viewMode === 'xray'
                ? 'bg-teal-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Diagnostic Scan
          </button>
        </div>
      </div>

      {/* Main Three.js Canvas Container */}
      <div
        ref={mountRef}
        className="w-full h-full cursor-grab active:cursor-grabbing touch-none select-none"
        aria-label="Interactive 3D dental tooth and implant model. Drag with mouse or finger to rotate 360 degrees."
      />

      {/* Interactive Tooltip Callout if selected */}
      {activeHotspot && (
        <div className="absolute bottom-16 left-6 right-6 z-20 max-w-sm mx-auto bg-slate-900/95 backdrop-blur-md text-white p-3.5 rounded-2xl border border-white/10 shadow-xl transition-all">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="text-xs font-semibold text-teal-300">{activeHotspot.name}</p>
              <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">{activeHotspot.desc}</p>
            </div>
            <button
              onClick={() => setActiveHotspot(null)}
              className="text-slate-400 hover:text-white p-1 text-xs"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Bottom Floating Control Bar */}
      <div className="absolute bottom-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
        <div className="pointer-events-auto flex items-center gap-1.5 text-xs text-slate-600 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-slate-200/80 shadow-xs">
          <RotateCw className="w-3.5 h-3.5 text-teal-600 animate-spin-slow" />
          <span>Drag to inspect 360°</span>
        </div>

        <div className="pointer-events-auto flex items-center gap-2">
          {/* Quick anatomical hotspot chips */}
          <div className="hidden sm:flex items-center gap-1 bg-white/90 backdrop-blur-md p-1 rounded-full border border-slate-200/80 shadow-xs">
            {HOTSPOTS.map((spot) => (
              <button
                key={spot.id}
                onClick={() => setActiveHotspot(activeHotspot?.id === spot.id ? null : spot)}
                className={`px-2.5 py-1 text-[11px] font-medium rounded-full transition-all ${
                  activeHotspot?.id === spot.id
                    ? 'bg-slate-900 text-white'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {spot.name.split(' ')[0]}
              </button>
            ))}
          </div>

          <button
            onClick={() => setIsAutoRotating(!isAutoRotating)}
            className="p-2 bg-white/90 backdrop-blur-md text-slate-700 hover:text-teal-700 rounded-full border border-slate-200/80 shadow-xs transition-colors"
            title={isAutoRotating ? 'Pause Rotation' : 'Start Auto-Rotation'}
          >
            {isAutoRotating ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          </button>

          <button
            onClick={handleResetCamera}
            className="px-2.5 py-1.5 bg-white/90 backdrop-blur-md text-[11px] font-medium text-slate-700 hover:text-teal-700 rounded-full border border-slate-200/80 shadow-xs transition-colors"
            title="Reset Angle"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};
