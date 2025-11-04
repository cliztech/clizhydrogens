/* eslint-disable react/no-unknown-property */
import {useEffect, useMemo, useRef, useState} from 'react';
import {Canvas, useFrame} from '@react-three/fiber';
import {Float, Text} from '@react-three/drei';
import * as THREE from 'three';

const DEFAULT_TEXTURE =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 600 400'><defs><linearGradient id='g' x1='0%' y1='0%' x2='100%' y2='100%'><stop offset='0%' stop-color='%23FF2CC3'/><stop offset='50%' stop-color='%233BF7FF'/><stop offset='100%' stop-color='%23FFAD00'/></linearGradient><radialGradient id='r' cx='50%' cy='50%' r='70%'><stop offset='0%' stop-color='rgba(255,255,255,0.35)'/><stop offset='100%' stop-color='rgba(0,0,0,0)'/></radialGradient></defs><rect width='600' height='400' fill='url(%23g)'/><circle cx='480' cy='120' r='160' fill='url(%23r)'/><circle cx='140' cy='260' r='140' fill='url(%23r)'/></svg>";

function useSceneTexture(url) {
  const [texture, setTexture] = useState(null);

  useEffect(() => {
    let active = true;
    let currentTexture;
    const loader = new THREE.TextureLoader();
    loader.setCrossOrigin('anonymous');

    const source = url || DEFAULT_TEXTURE;

    loader.load(
      source,
      (loaded) => {
        if (!active) {
          loaded.dispose();
          return;
        }

        loaded.encoding = THREE.sRGBEncoding;
        loaded.needsUpdate = true;
        currentTexture = loaded;
        setTexture(loaded);
      },
      undefined,
      () => {
        if (active) {
          setTexture(null);
        }
      },
    );

    return () => {
      active = false;
      if (currentTexture) {
        currentTexture.dispose();
      }
    };
  }, [url]);

  return texture;
}

function ParallaxMascot({textureUrl}) {
  const meshRef = useRef(null);
  const texture = useSceneTexture(textureUrl);

  useFrame(({clock, camera, mouse}) => {
    const t = clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.position.z = -0.2 + Math.sin(t * 0.6) * 0.05;
      meshRef.current.rotation.z = Math.sin(t * 0.5) * 0.03;
    }
    camera.position.x = mouse.x * 0.35;
    camera.position.y = mouse.y * -0.22;
    camera.lookAt(0, 0, 0);
  });

  return (
    <mesh ref={meshRef} position={[0, -0.2, -1]}>
      <planeGeometry args={[5.5, 3.1]} />
      {texture ? (
        <meshBasicMaterial map={texture} transparent />
      ) : (
        <meshStandardMaterial color="#ffffff" />
      )}
    </mesh>
  );
}

function Orbs() {
  const groupRef = useRef(null);
  const tempObject = useMemo(() => new THREE.Object3D(), []);
  const colorA = useMemo(() => new THREE.Color('#3BF7FF'), []);
  const colorB = useMemo(() => new THREE.Color('#FF2CC3'), []);
  const count = 120;
  const positions = useMemo(
    () =>
      Array.from({length: count}, () => [
        (Math.random() - 0.5) * 12,
        (Math.random() - 0.2) * 7,
        Math.random() * -6 - 2,
      ]),
    [count],
  );

  useFrame(({clock}) => {
    const t = clock.getElapsedTime();
    const group = groupRef.current;
    if (!group) return;
    const mesh = group.children[0];
    if (!mesh) return;

    positions.forEach((position, index) => {
      const [x, y, z] = position;
      tempObject.position.set(x + Math.sin(t * 0.7 + index) * 0.2, y + Math.cos(t * 0.5 + index) * 0.2, z);
      const scale = 0.24 + (Math.sin(t + index) * 0.07 + 0.07);
      tempObject.scale.setScalar(scale);
      tempObject.updateMatrix();
      mesh.setMatrixAt(index, tempObject.matrix);

      const color = colorA.clone().lerp(colorB, (Math.sin(t * 0.3 + index) + 1) / 2);
      mesh.setColorAt(index, color);
    });

    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) {
      mesh.instanceColor.needsUpdate = true;
    }
  });

  return (
    <group ref={groupRef}>
      <instancedMesh args={[undefined, undefined, count]}>
        <icosahedronGeometry args={[1, 2]} />
        <meshStandardMaterial emissiveIntensity={0.6} roughness={0.3} metalness={0.1} />
      </instancedMesh>
    </group>
  );
}

function LiquidText() {
  const textRef = useRef(null);

  useFrame(({clock}) => {
    if (!textRef.current) return;
    const t = clock.getElapsedTime();
    textRef.current.rotation.z = Math.sin(t * 0.4) * 0.06;
    textRef.current.scale.y = 1 + Math.sin(t * 0.9) * 0.03;
    textRef.current.scale.x = 1 + Math.cos(t * 0.7) * 0.03;
  });

  return (
    <Float floatIntensity={2} rotationIntensity={0.4} speed={1.15}>
      <Text
        ref={textRef}
        fontSize={1.2}
        letterSpacing={-0.04}
        fontWeight={700}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        strokeWidth={0.02}
        outlineBlur={0.002}
        outlineColor="#050110"
      >
        {`Let's Get CHEEKY`}
      </Text>
    </Float>
  );
}

export function HeroCanvas({textureUrl}) {
  return (
    <Canvas className="immersive-hero__three" camera={{position: [0, 0, 7], fov: 55}} dpr={[1, 2]}>
      <color attach="background" args={["transparent"]} />
      <ambientLight intensity={0.85} />
      <directionalLight position={[2, 3, 5]} intensity={1.2} color="#FF2CC3" />
      <directionalLight position={[-4, -2, 3]} intensity={0.8} color="#FFAD00" />
      <ParallaxMascot textureUrl={textureUrl} />
      <LiquidText />
      <Orbs />
    </Canvas>
  );
}

/* eslint-enable react/no-unknown-property */
