import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

interface RoverSceneProps {
  fallbackImage?: string;
}

const RoverScene: React.FC<RoverSceneProps> = ({ 
  fallbackImage = '/images/rover/sfusat-recruitment-poster.png' 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showFallback, setShowFallback] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Early exit if container not available
    if (!containerRef.current) return;

    // Check WebGL support
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('webgl2');
    if (!gl) {
      console.warn('WebGL not supported, using fallback image');
      setShowFallback(true);
      return;
    }

    try {
      const container = containerRef.current;
      const width = container.clientWidth;
      const height = Math.max(container.clientHeight, 500);

      // Scene setup
      const scene = new THREE.Scene();
      scene.background = new THREE.Color(0x000000);
      scene.fog = new THREE.Fog(0xf8fafc, 50, 100);

      // Camera
      const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
      camera.position.set(0, 1.4, 4.8);
      camera.lookAt(0, 0.4, 0);

      // Renderer with error handling
      const renderer = new THREE.WebGLRenderer({ 
        antialias: true, 
        alpha: false,
        powerPreference: 'high-performance',
        failIfMajorPerformanceCaveat: false
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.6;
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFShadowMap;
      
      container.appendChild(renderer.domElement);

      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.08;
      controls.enablePan = false;
      controls.autoRotate = false;
      controls.minDistance = 2;
      controls.maxDistance = 12;
      controls.minPolarAngle = Math.PI * 0.2;
      controls.maxPolarAngle = Math.PI * 0.8;

      const frameObject = (object: THREE.Object3D) => {
        const box = new THREE.Box3().setFromObject(object);
        const sphere = box.getBoundingSphere(new THREE.Sphere());
        const center = sphere.center;
        const radius = sphere.radius || 1;
        const verticalOffset = radius * 0.18;

        const verticalFov = THREE.MathUtils.degToRad(camera.fov);
        const horizontalFov = 2 * Math.atan(Math.tan(verticalFov / 2) * camera.aspect);
        const fitHeightDistance = radius / Math.sin(verticalFov / 2);
        const fitWidthDistance = radius / Math.sin(horizontalFov / 2);
        const distance = Math.max(fitHeightDistance, fitWidthDistance) * 1.15;

        controls.target.set(center.x, center.y + verticalOffset, center.z);
        camera.position.set(
          center.x + distance * 0.48,
          center.y + verticalOffset + distance * 0.5,
          center.z + distance * 0.6
        );
        camera.near = Math.max(0.01, distance / 100);
        camera.far = distance * 20;
        camera.updateProjectionMatrix();

        controls.minDistance = distance * 0.5;
        controls.maxDistance = distance * 2.2;
        controls.update();
      };

      // Lighting setup
      const ambientLight = new THREE.AmbientLight(0xffffff, 1.1);
      scene.add(ambientLight);

      const hemiLight = new THREE.HemisphereLight(0xffffff, 0xdbeafe, 1.05);
      scene.add(hemiLight);

      const directionalLight = new THREE.DirectionalLight(0xffffff, 1.45);
      directionalLight.position.set(5, 8, 5);
      directionalLight.castShadow = true;
      directionalLight.shadow.mapSize.width = 2048;
      directionalLight.shadow.mapSize.height = 2048;
      directionalLight.shadow.camera.left = -20;
      directionalLight.shadow.camera.right = 20;
      directionalLight.shadow.camera.top = 20;
      directionalLight.shadow.camera.bottom = -20;
      directionalLight.shadow.camera.far = 50;
      scene.add(directionalLight);

      // Load GLB model (best browser compatibility)
      let model: THREE.Object3D | null = null;
      const loader = new GLTFLoader();

      loader.load(
        '/models/24883_MER_static.glb',
        (gltf) => {
          model = gltf.scene;

          const box = new THREE.Box3().setFromObject(model);
          const size = box.getSize(new THREE.Vector3());
          const center = box.getCenter(new THREE.Vector3());
          const maxDim = Math.max(size.x, size.y, size.z) || 1;
          const targetSize = 2.9;
          const scale = targetSize / maxDim;

          model.scale.setScalar(scale);
          model.position.sub(center.multiplyScalar(scale));
          model.position.y -= 0.15;

          // Enable shadows for all meshes.
          model.traverse((child) => {
            const mesh = child as THREE.Mesh;
            if (mesh.isMesh) {
              mesh.castShadow = true;
              mesh.receiveShadow = true;
              if ((mesh.material as THREE.Material).type === 'MeshStandardMaterial') {
                const stdMat = mesh.material as THREE.MeshStandardMaterial;
                stdMat.metalness = Math.min(stdMat.metalness ?? 0.2, 0.35);
                stdMat.roughness = Math.min(stdMat.roughness ?? 0.6, 0.85);
                stdMat.envMapIntensity = 1.4;
              }
              if (Array.isArray(mesh.material)) {
                mesh.material.forEach((mat) => {
                  mat.side = THREE.DoubleSide;
                });
              } else if (mesh.material) {
                mesh.material.side = THREE.DoubleSide;
              }
            }
          });

          scene.add(model);
          frameObject(model);
        },
        undefined,
        (loadError) => {
          console.error('Error loading GLB model:', loadError);
          setShowFallback(true);
        }
      );

      // Animation loop
      let animationId: number;

      const animate = () => {
        animationId = requestAnimationFrame(animate);

        // Rotate model if loaded
        if (model) {
          model.position.y = -0.15;
        }

        controls.update();

        renderer.render(scene, camera);
      };

      animate();

      // Handle window resize
      const handleResize = () => {
        if (container && container.clientWidth > 0 && container.clientHeight > 0) {
          const newWidth = container.clientWidth;
          const newHeight = Math.max(container.clientHeight, 500);
          camera.aspect = newWidth / newHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(newWidth, newHeight);
          if (model) {
            frameObject(model);
          }
        }
      };

      window.addEventListener('resize', handleResize);

      // Cleanup
      return () => {
        window.removeEventListener('resize', handleResize);
        cancelAnimationFrame(animationId);
        if (container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
        }
        controls.dispose();
        renderer.dispose();
      };
    } catch (err) {
      console.error('Error initializing 3D rover scene:', err);
      setError(err instanceof Error ? err.message : 'Failed to initialize 3D scene');
      setShowFallback(true);
    }
  }, []);

  if (showFallback || error) {
    return (
      <div className="ra-static-hero">
        <img
          src={fallbackImage}
          alt="SFUSAT rover team recruitment"
          className="ra-hero-image"
        />
        <div className="ra-hero-badges" aria-hidden="true">
          <span>Mars Analog Terrain</span>
          <span>Autonomous Systems</span>
          <span>Mission Ready Team</span>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        minHeight: '400px',
      }}
    >
      <div
        ref={containerRef}
        style={{
          width: '100%',
          height: '100%',
          minHeight: '400px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#000',
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: '14px',
          bottom: '14px',
          pointerEvents: 'none',
          background: 'rgba(255, 255, 255, 0.92)',
          color: '#0f172a',
          border: '1px solid rgba(148, 163, 184, 0.45)',
          borderRadius: '999px',
          padding: '7px 11px',
          fontSize: '0.76rem',
          fontWeight: 700,
          letterSpacing: '0.01em',
          boxShadow: '0 4px 14px rgba(15, 23, 42, 0.1)',
        }}
      >
        Drag to rotate
      </div>
    </div>
  );
};

export default RoverScene;
