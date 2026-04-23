import * as THREE from "three";
import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { EffectComposer, N8AO } from "@react-three/postprocessing";
import {
  BallCollider,
  Physics,
  RigidBody,
  CylinderCollider,
  RapierRigidBody,
} from "@react-three/rapier";

import {
  siPython,
  siC,
  siCplusplus,
  siOpenjdk,
  siGo,
  siJavascript,
  siDjango,
  siNodedotjs,
  siReact,
  siOpencv,
  siTensorflow,
  siKeras,
  siPytorch,
  siScipy,
} from "simple-icons";

type TechItem = {
  label: string;
  iconSvg: string;
};

const techItems: TechItem[] = [
  // Programming languages
  { label: "Python", iconSvg: iconToSvg(siPython) },
  { label: "C", iconSvg: iconToSvg(siC) },
  { label: "C++", iconSvg: iconToSvg(siCplusplus) },
  { label: "Java", iconSvg: iconToSvg(siOpenjdk) }, // closest match in Simple Icons
  { label: "Go", iconSvg: iconToSvg(siGo) },
  { label: "JavaScript", iconSvg: iconToSvg(siJavascript) },

  // Frameworks / libraries
  { label: "Django", iconSvg: iconToSvg(siDjango) },
  { label: "Node.js", iconSvg: iconToSvg(siNodedotjs) },
  { label: "React", iconSvg: iconToSvg(siReact) },
  { label: "OpenCV", iconSvg: iconToSvg(siOpencv) },
  { label: "TensorFlow", iconSvg: iconToSvg(siTensorflow) },
  { label: "Keras", iconSvg: iconToSvg(siKeras) },
  { label: "PyTorch", iconSvg: iconToSvg(siPytorch) },
  { label: "SciPy", iconSvg: iconToSvg(siScipy) },
];

function iconToSvg(icon: { path: string; hex?: string }) {
  const fill = icon.hex ? `#${icon.hex}` : "rgba(10, 14, 23, 0.92)";
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="${fill}" d="${icon.path}"/></svg>`;
}

function makeLogoLabelTexture(item: TechItem) {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) return new THREE.CanvasTexture(canvas);

  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const width = 512;
  const height = 256;
  canvas.width = Math.floor(width * dpr);
  canvas.height = Math.floor(height * dpr);
  ctx.scale(dpr, dpr);

  // Card background (keeps the "white" look)
  const r = 38;
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = "rgba(255, 255, 255, 0.96)";
  ctx.strokeStyle = "rgba(10, 14, 23, 0.14)";
  ctx.lineWidth = 2;

  ctx.beginPath();
  ctx.moveTo(r, 0);
  ctx.arcTo(width, 0, width, height, r);
  ctx.arcTo(width, height, 0, height, r);
  ctx.arcTo(0, height, 0, 0, r);
  ctx.arcTo(0, 0, width, 0, r);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Text label (bottom)
  ctx.fillStyle = "rgba(10, 14, 23, 0.92)";
  ctx.textAlign = "center";
  ctx.textBaseline = "alphabetic";
  let fontSize = 44;
  const maxWidth = 460;
  while (fontSize > 26) {
    ctx.font = `800 ${fontSize}px Geist, system-ui, -apple-system, Segoe UI, sans-serif`;
    if (ctx.measureText(item.label).width <= maxWidth) break;
    fontSize -= 2;
  }
  ctx.font = `800 ${fontSize}px Geist, system-ui, -apple-system, Segoe UI, sans-serif`;
  ctx.fillText(item.label, width / 2, height - 36);

  // Icon (top) - drawn asynchronously from embedded SVG
  const iconImg = new Image();
  iconImg.decoding = "async";
  iconImg.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(item.iconSvg)}`;

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 8;
  texture.needsUpdate = true;

  iconImg.onload = () => {
    const target = 118; // icon box size
    const x = width / 2 - target / 2;
    const y = 34;
    ctx.drawImage(iconImg, x, y, target, target);
    texture.needsUpdate = true;
  };

  return texture;
}

const sphereGeometry = new THREE.SphereGeometry(1, 28, 28);

const spheres = [...Array(30)].map(() => ({
  scale: [0.7, 1, 0.8, 1, 1][Math.floor(Math.random() * 5)],
  materialIndex: Math.floor(Math.random() * techItems.length),
}));

type SphereProps = {
  vec?: THREE.Vector3;
  scale: number;
  r?: typeof THREE.MathUtils.randFloatSpread;
  material: THREE.MeshPhysicalMaterial;
  isActive: boolean;
};

function SphereGeo({
  vec = new THREE.Vector3(),
  scale,
  r = THREE.MathUtils.randFloatSpread,
  material,
  isActive,
}: SphereProps) {
  const api = useRef<RapierRigidBody | null>(null);

  useFrame((_state, delta) => {
    if (!isActive) return;
    delta = Math.min(0.1, delta);
    const impulse = vec
      .copy(api.current!.translation())
      .normalize()
      .multiply(
        new THREE.Vector3(
          -50 * delta * scale,
          -150 * delta * scale,
          -50 * delta * scale
        )
      );

    api.current?.applyImpulse(impulse, true);
  });

  return (
    <RigidBody
      linearDamping={0.75}
      angularDamping={0.15}
      friction={0.2}
      position={[r(20), r(20) - 25, r(20) - 10]}
      ref={api}
      colliders={false}
    >
      <BallCollider args={[scale]} />
      <CylinderCollider
        rotation={[Math.PI / 2, 0, 0]}
        position={[0, 0, 1.2 * scale]}
        args={[0.15 * scale, 0.275 * scale]}
      />
      <mesh
        castShadow
        receiveShadow
        scale={scale}
        geometry={sphereGeometry}
        material={material}
        rotation={[0.3, 1, 1]}
      />
    </RigidBody>
  );
}

type PointerProps = {
  vec?: THREE.Vector3;
  isActive: boolean;
};

function Pointer({ vec = new THREE.Vector3(), isActive }: PointerProps) {
  const ref = useRef<RapierRigidBody>(null);

  useFrame(({ pointer, viewport }) => {
    if (!isActive) return;
    const targetVec = vec.lerp(
      new THREE.Vector3(
        (pointer.x * viewport.width) / 2,
        (pointer.y * viewport.height) / 2,
        0
      ),
      0.2
    );
    ref.current?.setNextKinematicTranslation(targetVec);
  });

  return (
    <RigidBody
      position={[100, 100, 100]}
      type="kinematicPosition"
      colliders={false}
      ref={ref}
    >
      <BallCollider args={[2]} />
    </RigidBody>
  );
}

const TechStack = () => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      const threshold = document
        .getElementById("work")!
        .getBoundingClientRect().top;
      setIsActive(scrollY > threshold);
    };
    document.querySelectorAll(".header a").forEach((elem) => {
      const element = elem as HTMLAnchorElement;
      element.addEventListener("click", () => {
        const interval = setInterval(() => {
          handleScroll();
        }, 10);
        setTimeout(() => {
          clearInterval(interval);
        }, 1000);
      });
    });
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const materials = useMemo(() => {
    const textures = techItems.map((item) => makeLogoLabelTexture(item));
    return textures.map(
      (texture) =>
        new THREE.MeshPhysicalMaterial({
          map: texture,
          emissive: "#ffffff",
          emissiveMap: texture,
          emissiveIntensity: 0.3,
          metalness: 0.5,
          roughness: 1,
          clearcoat: 0.1,
        })
    );
  }, []);

  return (
    <div className="techstack">
      <h2> My Techstack</h2>

      <Canvas
        shadows
        gl={{ alpha: true, stencil: false, depth: false, antialias: false }}
        camera={{ position: [0, 0, 20], fov: 32.5, near: 1, far: 100 }}
        onCreated={(state) => (state.gl.toneMappingExposure = 1.5)}
        className="tech-canvas"
      >
        <ambientLight intensity={1} />
        <spotLight
          position={[20, 20, 25]}
          penumbra={1}
          angle={0.2}
          color="white"
          castShadow
          shadow-mapSize={[512, 512]}
        />
        <directionalLight position={[0, 5, -4]} intensity={2} />
        <Physics gravity={[0, 0, 0]}>
          <Pointer isActive={isActive} />
          {spheres.map((props, i) => (
            <SphereGeo
              key={i}
              scale={props.scale}
              material={materials[props.materialIndex % materials.length]}
              isActive={isActive}
            />
          ))}
        </Physics>
        <Environment
          files="/models/char_enviorment.hdr"
          environmentIntensity={0.5}
          environmentRotation={[0, 4, 2]}
        />
        <EffectComposer enableNormalPass={false}>
          <N8AO color="#0f002c" aoRadius={2} intensity={1.15} />
        </EffectComposer>
      </Canvas>
    </div>
  );
};

export default TechStack;
