'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import type { MotionValue } from 'framer-motion';
import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';

type SubterraneanSceneProps = {
  progress: MotionValue<number>;
};

const WORLD = {
  surfaceY: 5.5,
  cameraStartY: 7.8,
  cameraEndY: -82,
  cameraStartZ: 9.6,
  cameraEndZ: 11.2,
  shaftFrontZ: -3,
  shaftBackZ: -10.5,
  shaftHalfWidth: 4.1,
  wallInnerX: 4.2,
  wallOuterX: 9,
} as const;

function rng(seed: number) {
  const value = Math.sin(seed * 12.9898 + 0.4321) * 43758.5453;

  return value - Math.floor(value);
}

function noise(seedA: number, seedB: number) {
  return rng(seedA * 17.31 + seedB * 91.7);
}

const FOG_COLOR_TOP = new THREE.Color('#a4b6b8');
const FOG_COLOR_MID = new THREE.Color('#3a2a26');
const FOG_COLOR_DEEP = new THREE.Color('#0a0606');

const TRAIL_LIGHT_TOP = new THREE.Color('#dfd4c2');
const TRAIL_LIGHT_DEEP = new THREE.Color('#d6916a');

function lerpThreeColors(target: THREE.Color, a: THREE.Color, b: THREE.Color, t: number) {
  target.copy(a).lerp(b, t);
}

const GRADIENT_STOPS: ReadonlyArray<readonly [number, string]> = [
  [0.0, '#020101'],
  [0.08, '#070403'],
  [0.18, '#0e0807'],
  [0.3, '#1a100e'],
  [0.42, '#2a1c18'],
  [0.55, '#3d2a23'],
  [0.68, '#4a3f33'],
  [0.78, '#6a7164'],
  [0.88, '#8ea3a3'],
  [1.0, '#b3c7c7'],
];

function GradientBackdrop() {
  const geometry = useMemo(() => {
    const geom = new THREE.PlaneGeometry(96, 150, 1, 64);
    const positions = geom.attributes.position;
    const colors = new Float32Array(positions.count * 3);
    const stops = GRADIENT_STOPS.map(
      ([t, hex]) => [t, new THREE.Color(hex)] as const,
    );
    const minY = -75;
    const maxY = 75;

    for (let index = 0; index < positions.count; index += 1) {
      const y = positions.getY(index);
      const t = THREE.MathUtils.clamp((y - minY) / (maxY - minY), 0, 1);
      let color = stops[stops.length - 1][1];

      for (let stopIndex = 0; stopIndex < stops.length - 1; stopIndex += 1) {
        const [t0, color0] = stops[stopIndex];
        const [t1, color1] = stops[stopIndex + 1];

        if (t >= t0 && t <= t1) {
          const localT = (t - t0) / (t1 - t0 || 1);
          color = color0.clone().lerp(color1, localT);
          break;
        }
      }

      colors[index * 3] = color.r;
      colors[index * 3 + 1] = color.g;
      colors[index * 3 + 2] = color.b;
    }

    geom.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    return geom;
  }, []);

  return (
    <mesh geometry={geometry} position={[0, -36, -28]}>
      <meshBasicMaterial vertexColors fog={false} toneMapped={false} />
    </mesh>
  );
}

function SurfaceCanopy() {
  const grassRef = useRef<THREE.InstancedMesh>(null);
  const pebbleRef = useRef<THREE.InstancedMesh>(null);
  const grassCount = 130;
  const pebbleCount = 26;

  const grassGeometry = useMemo(() => {
    const shape = new THREE.Shape();
    const halfWidth = 30;
    const front = 12;
    const back = -22;

    shape.moveTo(-halfWidth, back);
    shape.lineTo(halfWidth, back);
    shape.lineTo(halfWidth, front);
    shape.lineTo(-halfWidth, front);
    shape.lineTo(-halfWidth, back);

    const hole = new THREE.Path();
    const hw = WORLD.shaftHalfWidth;
    hole.moveTo(-hw, WORLD.shaftBackZ);
    hole.lineTo(hw, WORLD.shaftBackZ);
    hole.lineTo(hw, WORLD.shaftFrontZ);
    hole.lineTo(-hw, WORLD.shaftFrontZ);
    hole.lineTo(-hw, WORLD.shaftBackZ);

    shape.holes.push(hole);

    const geom = new THREE.ShapeGeometry(shape, 1);
    geom.rotateX(Math.PI / 2);

    return geom;
  }, []);

  useEffect(() => {
    if (grassRef.current) {
      const dummy = new THREE.Object3D();
      const hw = WORLD.shaftHalfWidth;

      for (let index = 0; index < grassCount; index += 1) {
        let x = 0;
        let z = 0;
        let attempt = 0;

        do {
          x = (rng(index * 3 + 111 + attempt) - 0.5) * 38;
          z = WORLD.shaftFrontZ + 9 - rng(index * 3 + 222 + attempt) * 30;
          attempt += 1;
        } while (
          attempt < 6 &&
          Math.abs(x) < hw + 0.2 &&
          z < WORLD.shaftFrontZ + 0.2 &&
          z > WORLD.shaftBackZ - 0.2
        );

        const height = 0.18 + rng(index + 301) * 0.32;

        dummy.position.set(x, WORLD.surfaceY + 0.02 + height / 2, z);
        dummy.rotation.set(
          (rng(index + 410) - 0.5) * 0.14,
          rng(index + 420) * Math.PI,
          (rng(index + 430) - 0.5) * 0.18,
        );
        dummy.scale.set(0.024, height, 0.024);
        dummy.updateMatrix();
        grassRef.current.setMatrixAt(index, dummy.matrix);
      }

      grassRef.current.instanceMatrix.needsUpdate = true;
    }

    if (pebbleRef.current) {
      const dummy = new THREE.Object3D();
      const hw = WORLD.shaftHalfWidth;

      for (let index = 0; index < pebbleCount; index += 1) {
        let x = 0;
        let z = 0;
        let attempt = 0;

        do {
          x = (rng(index + 530 + attempt) - 0.5) * 36;
          z = WORLD.shaftFrontZ + 8 - rng(index + 540 + attempt) * 28;
          attempt += 1;
        } while (
          attempt < 6 &&
          Math.abs(x) < hw + 0.4 &&
          z < WORLD.shaftFrontZ + 0.4 &&
          z > WORLD.shaftBackZ - 0.4
        );

        const radius = 0.04 + rng(index + 550) * 0.09;

        dummy.position.set(x, WORLD.surfaceY - 0.02, z);
        dummy.rotation.set(
          rng(index + 560) * Math.PI,
          rng(index + 570) * Math.PI,
          rng(index + 580) * Math.PI,
        );
        dummy.scale.setScalar(radius);
        dummy.updateMatrix();
        pebbleRef.current.setMatrixAt(index, dummy.matrix);
      }

      pebbleRef.current.instanceMatrix.needsUpdate = true;
    }
  }, []);

  const rimColor = '#5a3f2a';
  const hw = WORLD.shaftHalfWidth;
  const rimY = WORLD.surfaceY - 0.34;
  const rimDepth = 0.74;
  const shaftLength = WORLD.shaftFrontZ - WORLD.shaftBackZ;
  const shaftMidZ = (WORLD.shaftFrontZ + WORLD.shaftBackZ) / 2;

  return (
    <group>
      <mesh
        geometry={grassGeometry}
        position={[0, WORLD.surfaceY, 0]}
      >
        <meshStandardMaterial
          color='#566a48'
          roughness={1}
          metalness={0}
          emissive='#1c2417'
          emissiveIntensity={0.16}
          side={THREE.DoubleSide}
        />
      </mesh>

      <mesh position={[0, rimY, WORLD.shaftFrontZ + 0.04]}>
        <boxGeometry args={[hw * 2 + 0.4, rimDepth, 0.08]} />
        <meshStandardMaterial color={rimColor} roughness={1} />
      </mesh>
      <mesh position={[0, rimY, WORLD.shaftBackZ - 0.04]}>
        <boxGeometry args={[hw * 2 + 0.4, rimDepth, 0.08]} />
        <meshStandardMaterial color={rimColor} roughness={1} />
      </mesh>
      <mesh position={[-hw - 0.04, rimY, shaftMidZ]}>
        <boxGeometry args={[0.08, rimDepth, shaftLength + 0.4]} />
        <meshStandardMaterial color={rimColor} roughness={1} />
      </mesh>
      <mesh position={[hw + 0.04, rimY, shaftMidZ]}>
        <boxGeometry args={[0.08, rimDepth, shaftLength + 0.4]} />
        <meshStandardMaterial color={rimColor} roughness={1} />
      </mesh>

      <instancedMesh
        ref={grassRef}
        args={[undefined, undefined, grassCount]}
        frustumCulled={false}
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color='#6c7d59' roughness={1} />
      </instancedMesh>

      <instancedMesh
        ref={pebbleRef}
        args={[undefined, undefined, pebbleCount]}
        frustumCulled={false}
      >
        <icosahedronGeometry args={[1, 0]} />
        <meshStandardMaterial color='#9b8870' roughness={0.95} />
      </instancedMesh>
    </group>
  );
}

type WallSlab = {
  position: [number, number, number];
  rotation: [number, number, number];
  scale: [number, number, number];
  colorIndex: number;
};

const STRATA_COLORS = [
  '#7a6149',
  '#5e4632',
  '#4d3a2c',
  '#5c3a32',
  '#3a2a26',
  '#2c1f1c',
  '#1a1310',
  '#0d0907',
] as const;

function buildWallSlabs(side: -1 | 1): WallSlab[] {
  const slabs: WallSlab[] = [];
  const yStart = WORLD.surfaceY - 0.4;
  const yEnd = -92;
  const step = 0.78;

  for (let y = yStart, index = 0; y > yEnd; y -= step, index += 1) {
    const seed = index + (side === 1 ? 1000 : 0);
    const noiseA = rng(seed + 11);
    const noiseB = rng(seed + 47);
    const noiseC = rng(seed + 83);
    const depthT = THREE.MathUtils.clamp(
      (yStart - y) / (yStart - yEnd),
      0,
      1,
    );
    const colorIndex = Math.min(
      STRATA_COLORS.length - 1,
      Math.floor(depthT * (STRATA_COLORS.length - 0.5)),
    );

    const innerEdge = WORLD.wallInnerX + (noiseA - 0.5) * 0.7;
    const width = 4.4 + noiseB * 1.4;
    const x = side * (innerEdge + width / 2);
    const z = -7.4 - noiseC * 2.8;
    const height = step * (0.86 + noiseA * 0.38);
    const depth = 0.6 + noiseB * 0.7;
    const tilt = (noiseC - 0.5) * 0.18;
    const yaw = side * (0.16 + noiseA * 0.18);

    slabs.push({
      position: [x, y - height / 2, z],
      rotation: [tilt * 0.5, yaw, side * tilt],
      scale: [width, height, depth],
      colorIndex,
    });
  }

  return slabs;
}

function EarthWall({ side }: { side: -1 | 1 }) {
  const meshRefs = useRef<Array<THREE.InstancedMesh | null>>([]);
  const slabs = useMemo(() => buildWallSlabs(side), [side]);
  const groups = useMemo(() => {
    const buckets: WallSlab[][] = STRATA_COLORS.map(() => []);

    for (const slab of slabs) {
      buckets[slab.colorIndex].push(slab);
    }

    return buckets;
  }, [slabs]);

  useEffect(() => {
    const dummy = new THREE.Object3D();

    groups.forEach((bucket, bucketIndex) => {
      const mesh = meshRefs.current[bucketIndex];

      if (!mesh) return;

      bucket.forEach((slab, slabIndex) => {
        dummy.position.set(...slab.position);
        dummy.rotation.set(...slab.rotation);
        dummy.scale.set(...slab.scale);
        dummy.updateMatrix();
        mesh.setMatrixAt(slabIndex, dummy.matrix);
      });

      mesh.instanceMatrix.needsUpdate = true;
    });
  }, [groups]);

  return (
    <group>
      {groups.map((bucket, bucketIndex) => (
        <instancedMesh
          key={bucketIndex}
          ref={(node) => {
            meshRefs.current[bucketIndex] = node;
          }}
          args={[undefined, undefined, Math.max(1, bucket.length)]}
          frustumCulled={false}
        >
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial
            color={STRATA_COLORS[bucketIndex]}
            roughness={1}
            metalness={0}
            emissive={STRATA_COLORS[bucketIndex]}
            emissiveIntensity={bucketIndex < 3 ? 0.04 : 0.02}
          />
        </instancedMesh>
      ))}
    </group>
  );
}

function RootCurtain() {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const count = 64;

  useEffect(() => {
    if (!meshRef.current) return;

    const dummy = new THREE.Object3D();

    for (let index = 0; index < count; index += 1) {
      const side = index % 2 === 0 ? -1 : 1;
      const x = side * (WORLD.wallInnerX - 0.4 + rng(index + 31) * 1.2);
      const yTop = WORLD.surfaceY - 0.5 - rng(index + 32) * 1.6;
      const length = 0.6 + rng(index + 33) * 2.2;
      const z = -5.6 - rng(index + 34) * 2.6;
      const tilt = side * (0.06 + rng(index + 35) * 0.16);

      dummy.position.set(x, yTop - length / 2, z);
      dummy.rotation.set(
        (rng(index + 36) - 0.5) * 0.4,
        rng(index + 37) * Math.PI,
        tilt + (rng(index + 38) - 0.5) * 0.2,
      );
      dummy.scale.set(0.018 + rng(index + 39) * 0.012, length, 0.018);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(index, dummy.matrix);
    }

    meshRef.current.instanceMatrix.needsUpdate = true;
  }, []);

  return (
    <instancedMesh
      ref={meshRef}
      args={[undefined, undefined, count]}
      frustumCulled={false}
    >
      <cylinderGeometry args={[1, 0.7, 1, 5, 1]} />
      <meshStandardMaterial color='#3b2a1f' roughness={1} />
    </instancedMesh>
  );
}

function ArchiveSlides() {
  const frameRef = useRef<THREE.InstancedMesh>(null);
  const glowRef = useRef<THREE.InstancedMesh>(null);
  const count = 36;

  useEffect(() => {
    if (!frameRef.current || !glowRef.current) return;

    const dummy = new THREE.Object3D();

    for (let index = 0; index < count; index += 1) {
      const side = index % 2 === 0 ? -1 : 1;
      const x = side * (WORLD.wallInnerX + 0.2 + rng(index + 41) * 1.6);
      const y = -8 - index * 1.7 - rng(index + 42) * 0.6;
      const z = -6.4 + rng(index + 43) * 0.6;
      const w = 0.55 + rng(index + 44) * 0.45;
      const h = 0.34 + rng(index + 45) * 0.3;
      const tilt = (rng(index + 46) - 0.5) * 0.42;
      const yaw = side * (0.34 + rng(index + 47) * 0.22);

      dummy.position.set(x, y, z);
      dummy.rotation.set(tilt, yaw, side * (rng(index + 48) - 0.5) * 0.18);
      dummy.scale.set(w, h, 1);
      dummy.updateMatrix();
      frameRef.current.setMatrixAt(index, dummy.matrix);

      const inner = dummy.clone();
      inner.position.set(x, y, z + 0.012);
      inner.scale.set(w * 0.78, h * 0.7, 1);
      inner.updateMatrix();
      glowRef.current.setMatrixAt(index, inner.matrix);
    }

    frameRef.current.instanceMatrix.needsUpdate = true;
    glowRef.current.instanceMatrix.needsUpdate = true;
  }, []);

  return (
    <group>
      <instancedMesh
        ref={frameRef}
        args={[undefined, undefined, count]}
        frustumCulled={false}
      >
        <planeGeometry args={[1, 1]} />
        <meshStandardMaterial
          color='#1c1612'
          roughness={1}
          side={THREE.DoubleSide}
        />
      </instancedMesh>
      <instancedMesh
        ref={glowRef}
        args={[undefined, undefined, count]}
        frustumCulled={false}
      >
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial
          color='#d6c2a4'
          transparent
          opacity={0.42}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          side={THREE.DoubleSide}
          fog={true}
        />
      </instancedMesh>
    </group>
  );
}

const CHAMBER_DEPTHS = [-22, -32, -41, -51, -60, -69, -77];

function makeArchShape(width: number, height: number) {
  const shape = new THREE.Shape();
  const halfWidth = width / 2;
  const stemHeight = height * 0.55;

  shape.moveTo(-halfWidth, 0);
  shape.lineTo(-halfWidth, stemHeight);
  shape.absarc(0, stemHeight, halfWidth, Math.PI, 0, true);
  shape.lineTo(halfWidth, 0);
  shape.lineTo(-halfWidth, 0);

  return shape;
}

function ChapelChambers() {
  const archGeometry = useMemo(() => {
    const shape = makeArchShape(1, 1);

    return new THREE.ShapeGeometry(shape, 32);
  }, []);

  const chambers = useMemo(
    () =>
      CHAMBER_DEPTHS.map((y, index) => {
        const side = index % 2 === 0 ? -1 : 1;
        const x = side * (WORLD.wallInnerX + 0.05 + noise(index, 1) * 0.6);
        const z = -6.6 - noise(index, 2) * 0.6;
        const width = 1.4 + noise(index, 3) * 0.6;
        const height = 1.9 + noise(index, 4) * 0.6;
        const yaw = side * (0.36 + noise(index, 5) * 0.2);

        return {
          x,
          y,
          z,
          width,
          height,
          yaw,
          side,
        };
      }),
    [],
  );

  return (
    <group>
      {chambers.map((chamber, index) => (
        <group
          key={index}
          position={[chamber.x, chamber.y, chamber.z]}
          rotation={[0, chamber.yaw, 0]}
        >
          <mesh position={[0, 0, -0.08]}>
            <boxGeometry
              args={[chamber.width + 0.42, chamber.height + 0.42, 0.18]}
            />
            <meshStandardMaterial color='#1a120e' roughness={1} />
          </mesh>

          <mesh
            position={[0, chamber.height * 0.06, 0]}
            geometry={archGeometry}
            scale={[chamber.width, chamber.height * 0.86, 1]}
          >
            <meshBasicMaterial
              color='#e0a877'
              transparent
              opacity={0.78}
              blending={THREE.AdditiveBlending}
              depthWrite={false}
              side={THREE.DoubleSide}
            />
          </mesh>

          <mesh
            position={[0, chamber.height * 0.06, 0.012]}
            geometry={archGeometry}
            scale={[chamber.width * 0.62, chamber.height * 0.55, 1]}
          >
            <meshBasicMaterial
              color='#f5e3c4'
              transparent
              opacity={0.92}
              blending={THREE.AdditiveBlending}
              depthWrite={false}
              side={THREE.DoubleSide}
            />
          </mesh>

          <mesh position={[0, -chamber.height * 0.36, 0.04]}>
            <boxGeometry
              args={[chamber.width * 0.55, chamber.height * 0.18, 0.05]}
            />
            <meshStandardMaterial
              color='#0c0807'
              roughness={1}
              emissive='#3a1f12'
              emissiveIntensity={0.4}
            />
          </mesh>

          <mesh
            position={[0, chamber.height * 0.06, 0.4]}
            scale={[chamber.width * 1.6, chamber.height * 1.4, 1]}
          >
            <planeGeometry args={[1, 1]} />
            <meshBasicMaterial
              color='#d6916a'
              transparent
              opacity={0.16}
              blending={THREE.AdditiveBlending}
              depthWrite={false}
              fog={false}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
}

function PaperFragments() {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const count = 42;

  useEffect(() => {
    if (!meshRef.current) return;

    const dummy = new THREE.Object3D();

    for (let index = 0; index < count; index += 1) {
      const side = index % 2 === 0 ? -1 : 1;
      const x = side * (WORLD.wallInnerX - 0.6 + rng(index + 91) * 1.4);
      const y = -4 - rng(index + 92) * 78;
      const z = -5.2 - rng(index + 93) * 1.4;
      const size = 0.16 + rng(index + 94) * 0.24;

      dummy.position.set(x, y, z);
      dummy.rotation.set(
        (rng(index + 95) - 0.5) * 1.6,
        side * (0.4 + rng(index + 96) * 0.5),
        (rng(index + 97) - 0.5) * 1.4,
      );
      dummy.scale.set(size, size * 1.3, 1);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(index, dummy.matrix);
    }

    meshRef.current.instanceMatrix.needsUpdate = true;
  }, []);

  return (
    <instancedMesh
      ref={meshRef}
      args={[undefined, undefined, count]}
      frustumCulled={false}
    >
      <planeGeometry args={[1, 1]} />
      <meshStandardMaterial
        color='#cfc1aa'
        roughness={0.9}
        side={THREE.DoubleSide}
        emissive='#3b3326'
        emissiveIntensity={0.2}
      />
    </instancedMesh>
  );
}

type DustData = {
  geometry: THREE.BufferGeometry;
  basePositions: Float32Array;
  phases: Float32Array;
};

let cachedDustData: DustData | undefined;

function getDustData(): DustData {
  if (cachedDustData) return cachedDustData;

  const count = 720;
  const positions = new Float32Array(count * 3);
  const basePositions = new Float32Array(count * 3);
  const phases = new Float32Array(count);

  for (let index = 0; index < count; index += 1) {
    const x = (rng(index + 12) - 0.5) * 18;
    const y = (rng(index + 11) - 0.5) * 90;
    const z = -2.6 - rng(index + 13) * 6;

    positions[index * 3] = x;
    positions[index * 3 + 1] = y;
    positions[index * 3 + 2] = z;
    basePositions[index * 3] = x;
    basePositions[index * 3 + 1] = y;
    basePositions[index * 3 + 2] = z;
    phases[index] = rng(index + 14) * Math.PI * 2;
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  cachedDustData = { geometry, basePositions, phases };

  return cachedDustData;
}

function animateDustPositions(
  positionAttribute: THREE.BufferAttribute,
  basePositions: Float32Array,
  phases: Float32Array,
  time: number,
) {
  const positions = positionAttribute.array as Float32Array;

  for (let particleIndex = 0; particleIndex < phases.length; particleIndex += 1) {
    const offset = particleIndex * 3;
    const phase = phases[particleIndex];

    positions[offset] =
      basePositions[offset] + Math.sin(time * 0.18 + phase) * 0.18;
    positions[offset + 1] =
      basePositions[offset + 1] + Math.sin(time * 0.13 + phase * 1.3) * 0.12;
  }

  positionAttribute.needsUpdate = true;
}

function DustField({ progress }: SubterraneanSceneProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const data = getDustData();

  useFrame(({ clock }) => {
    if (!pointsRef.current) return;

    const positionAttribute = data.geometry.attributes
      .position as THREE.BufferAttribute;
    const depth = progress.get();

    animateDustPositions(
      positionAttribute,
      data.basePositions,
      data.phases,
      clock.elapsedTime,
    );

    const material = pointsRef.current.material as THREE.PointsMaterial;
    material.opacity = THREE.MathUtils.lerp(0.18, 0.46, depth);
  });

  return (
    <points ref={pointsRef} geometry={data.geometry}>
      <pointsMaterial
        color='#d8cdb8'
        size={0.045}
        sizeAttenuation
        transparent
        opacity={0.22}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function LightShaft({ progress }: SubterraneanSceneProps) {
  const groupRef = useRef<THREE.Group>(null);

  const shaftHeight = 76;
  const shaftCenterY = WORLD.surfaceY - shaftHeight / 2;
  const shaftMidZ = (WORLD.shaftFrontZ + WORLD.shaftBackZ) / 2;

  useFrame(({ clock }) => {
    const depth = progress.get();
    const opacityFalloff = THREE.MathUtils.smoothstep(depth, 0, 0.7);

    if (!groupRef.current) return;

    groupRef.current.position.x = Math.sin(clock.elapsedTime * 0.12) * 0.05;

    const baseOpacities = [0.14, 0.1, 0.06];

    groupRef.current.children.forEach((child, index) => {
      const mesh = child as THREE.Mesh;
      const material = mesh.material as THREE.MeshBasicMaterial;
      const baseOpacity = baseOpacities[index] ?? 0.05;

      material.opacity = baseOpacity * (1 - opacityFalloff * 0.92);
    });
  });

  return (
    <group ref={groupRef} position={[0, shaftCenterY, shaftMidZ]}>
      <mesh>
        <planeGeometry args={[4.2, shaftHeight]} />
        <meshBasicMaterial
          color='#cfd8c8'
          transparent
          opacity={0.14}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          side={THREE.DoubleSide}
          fog={false}
        />
      </mesh>
      <mesh position={[0, 0, 0.04]}>
        <planeGeometry args={[2.2, shaftHeight]} />
        <meshBasicMaterial
          color='#e8d6b6'
          transparent
          opacity={0.1}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          side={THREE.DoubleSide}
          fog={false}
        />
      </mesh>
      <mesh position={[0, 0, 0.08]}>
        <planeGeometry args={[0.85, shaftHeight]} />
        <meshBasicMaterial
          color='#fff2dc'
          transparent
          opacity={0.06}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          side={THREE.DoubleSide}
          fog={false}
        />
      </mesh>
    </group>
  );
}

function CameraRig({ progress }: SubterraneanSceneProps) {
  const lightRef = useRef<THREE.PointLight>(null);
  const fogColor = useMemo(() => new THREE.Color(), []);
  const trailColor = useMemo(() => new THREE.Color(), []);

  useFrame(({ camera, scene, clock }) => {
    const rawDepth = progress.get();
    const depth = THREE.MathUtils.clamp(rawDepth, 0, 1);
    const time = clock.elapsedTime;

    const drift = Math.sin(time * 0.12) * 0.18;
    const swing = Math.sin(depth * Math.PI * 1.4) * 0.45;
    const cameraX = drift + swing;
    const cameraY = THREE.MathUtils.lerp(
      WORLD.cameraStartY,
      WORLD.cameraEndY,
      depth,
    );
    const cameraZ = THREE.MathUtils.lerp(
      WORLD.cameraStartZ,
      WORLD.cameraEndZ,
      depth,
    );

    camera.position.set(cameraX, cameraY, cameraZ);
    camera.lookAt(
      cameraX * 0.35,
      cameraY - THREE.MathUtils.lerp(5.4, 4.2, depth),
      THREE.MathUtils.lerp(-3, -1.5, depth),
    );

    if (scene.fog instanceof THREE.Fog) {
      if (depth < 0.5) {
        const t = depth / 0.5;
        lerpThreeColors(fogColor, FOG_COLOR_TOP, FOG_COLOR_MID, t);
      } else {
        const t = (depth - 0.5) / 0.5;
        lerpThreeColors(fogColor, FOG_COLOR_MID, FOG_COLOR_DEEP, t);
      }

      scene.fog.color.copy(fogColor);
      scene.fog.near = THREE.MathUtils.lerp(7, 3.4, depth);
      scene.fog.far = THREE.MathUtils.lerp(36, 16, depth);
    }

    if (lightRef.current) {
      lerpThreeColors(trailColor, TRAIL_LIGHT_TOP, TRAIL_LIGHT_DEEP, depth);
      lightRef.current.color.copy(trailColor);
      lightRef.current.position.set(cameraX * 0.4, cameraY + 0.6, cameraZ - 4);
      lightRef.current.intensity = THREE.MathUtils.lerp(2.4, 4.6, depth);
      lightRef.current.distance = THREE.MathUtils.lerp(22, 14, depth);
    }
  });

  return (
    <pointLight
      ref={lightRef}
      color='#dfd4c2'
      intensity={2.4}
      distance={22}
      decay={1.6}
      position={[0, 4, 6]}
    />
  );
}

function SubterraneanWorld({ progress }: SubterraneanSceneProps) {
  return (
    <>
      <fog attach='fog' args={['#7e8d8c', 7, 36]} />
      <ambientLight intensity={0.34} color='#9aaaa8' />
      <directionalLight
        position={[2, 10, 4]}
        intensity={1.4}
        color='#d8e3df'
      />
      <hemisphereLight
        args={['#bfd2cf', '#1a120e', 0.4]}
      />

      <CameraRig progress={progress} />

      <GradientBackdrop />
      <SurfaceCanopy />
      <LightShaft progress={progress} />
      <EarthWall side={-1} />
      <EarthWall side={1} />
      <RootCurtain />
      <ArchiveSlides />
      <ChapelChambers />
      <PaperFragments />
      <DustField progress={progress} />
    </>
  );
}

export function SubterraneanScene({ progress }: SubterraneanSceneProps) {
  return (
    <div
      className='pointer-events-none fixed inset-0 z-1 overflow-hidden'
      aria-hidden='true'
    >
      <Canvas
        camera={{
          fov: 46,
          position: [0, WORLD.cameraStartY, WORLD.cameraStartZ],
          near: 0.1,
          far: 140,
        }}
        dpr={[1, 1.6]}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: 'high-performance',
        }}
      >
        <color attach='background' args={['#050505']} />
        <SubterraneanWorld progress={progress} />
      </Canvas>

      <div className='absolute inset-0 bg-[radial-gradient(ellipse_120%_60%_at_50%_0%,rgba(212,228,226,0.10),transparent_55%),radial-gradient(circle_at_50%_92%,rgba(214,145,106,0.05),transparent_42%)]' />
      <div className='absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_28%,rgba(0,0,0,0.3)_74%,rgba(0,0,0,0.74)_100%)]' />
      <div className='absolute inset-0 bg-[linear-gradient(180deg,rgba(154,178,178,0.04)_0%,transparent_22%,rgba(0,0,0,0.16)_62%,rgba(0,0,0,0.6)_100%)]' />
    </div>
  );
}
