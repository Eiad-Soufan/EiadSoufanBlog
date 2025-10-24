import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Neural 3D background — refined version
 * Slower motion + visual separation from hero content
 */
export default function NeuralBackground3D({
    nodeCount = 100,
    linkProbability = 0.06,
    pulseCount = 50,
    depth = 10,
    opacity = 0.15,
    offsetX,
}) {
    const mountRef = useRef(null);

    useEffect(() => {
        const mount = mountRef.current;
        if (!mount) return;

        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (prefersReducedMotion) return;

        const isSmall = window.innerWidth < 768;
        const effectiveNodes = Math.max(40, Math.floor(nodeCount * (isSmall ? 0.45 : 1)));
        const effectivePulses = Math.max(12, Math.floor(pulseCount * (isSmall ? 0.4 : 1)));
        const effectiveDepth = isSmall ? Math.max(8, depth * 0.85) : depth;

        const scene = new THREE.Scene();
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        const DPR = Math.min(1.5, window.devicePixelRatio || 1);
        renderer.setPixelRatio(DPR);
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setClearColor(0x000000, 0);
        renderer.domElement.style.pointerEvents = "none";
        renderer.domElement.style.position = "absolute";
        renderer.domElement.style.inset = "0";
        renderer.domElement.style.zIndex = "0"; // always behind hero content
        mount.appendChild(renderer.domElement);

        const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 160);
        camera.position.z = 6;

        const neuronColor = new THREE.Color("#8B5CF6");
        const synapseColor = new THREE.Color("#06B6D4");
        const pulseColor = new THREE.Color("#38BDF8");
        const glowColor = new THREE.Color("#A855F7");

        const positions = [];
        for (let i = 0; i < effectiveNodes; i++) {
            positions.push(
                (Math.random() - 0.5) * effectiveDepth * 2,
                (Math.random() - 0.5) * effectiveDepth * 1.5,
                (Math.random() - 0.5) * effectiveDepth
            );
        }

        const neuronGeometry = new THREE.BufferGeometry();
        neuronGeometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
        const neuronMaterial = new THREE.PointsMaterial({
            size: 0.08,
            color: neuronColor,
            transparent: true,
            opacity: opacity,
            blending: THREE.AdditiveBlending,
        });
        const neurons = new THREE.Points(neuronGeometry, neuronMaterial);
        scene.add(neurons);

        const synapseGeometry = new THREE.BufferGeometry();
        const synapsePositions = [];
        const synapseColors = [];

        for (let i = 0; i < effectiveNodes; i++) {
            const i3 = i * 3;
            const x1 = positions[i3],
                y1 = positions[i3 + 1],
                z1 = positions[i3 + 2];

            for (let j = i + 1; j < effectiveNodes; j++) {
                if (Math.random() > linkProbability) continue;
                const j3 = j * 3;
                const x2 = positions[j3],
                    y2 = positions[j3 + 1],
                    z2 = positions[j3 + 2];

                const dx = x2 - x1,
                    dy = y2 - y1,
                    dz = z2 - z1;
                const d2 = dx * dx + dy * dy + dz * dz;
                if (d2 > (effectiveDepth * 0.9) ** 2) continue;

                synapsePositions.push(x1, y1, z1, x2, y2, z2);
                const c = synapseColor.clone().lerp(neuronColor, Math.random() * 0.5);
                synapseColors.push(c.r, c.g, c.b, c.r, c.g, c.b);
            }
        }

        synapseGeometry.setAttribute("position", new THREE.Float32BufferAttribute(synapsePositions, 3));
        synapseGeometry.setAttribute("color", new THREE.Float32BufferAttribute(synapseColors, 3));
        const synapseMaterial = new THREE.LineBasicMaterial({
            vertexColors: true,
            transparent: true,
            opacity: 0.3 * opacity,
            blending: THREE.AdditiveBlending,
        });
        const synapses = new THREE.LineSegments(synapseGeometry, synapseMaterial);
        scene.add(synapses);

        const pulseGeom = new THREE.SphereGeometry(0.05, 8, 8);
        const pulseMat = new THREE.MeshBasicMaterial({
            color: pulseColor,
            transparent: true,
            opacity: 0.9,
            blending: THREE.AdditiveBlending,
        });
        const pulses = [];
        for (let p = 0; p < effectivePulses; p++) {
            const mesh = new THREE.Mesh(pulseGeom, pulseMat.clone());
            mesh.position.set(
                (Math.random() - 0.5) * effectiveDepth * 2,
                (Math.random() - 0.5) * effectiveDepth * 1.5,
                (Math.random() - 0.5) * effectiveDepth
            );
            const dir = new THREE.Vector3(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5).normalize();
            const speed = 0.004 + Math.random() * 0.008; // much slower now
            pulses.push({ mesh, dir, speed });
            scene.add(mesh);
        }

        const glowMaterial = new THREE.PointsMaterial({
            size: 0.22,
            color: glowColor,
            transparent: true,
            opacity: 0.1,
            blending: THREE.AdditiveBlending,
        });
        const glowPoints = new THREE.Points(neuronGeometry, glowMaterial);
        scene.add(glowPoints);

        let rafId = null;
        let running = true;
        let t = 0;
        let lastTime = performance.now();

        const onVisibility = () => {
            running = !document.hidden;
            if (running) loop();
        };
        document.addEventListener("visibilitychange", onVisibility, { passive: true });

        const loop = () => {
            if (!running) return;
            const now = performance.now();
            const dt = now - lastTime;
            lastTime = now;
            const slow = dt > 25;

            // much slower camera drift
            const camStep = slow ? 0.0004 : 0.0006;
            t += camStep;

            camera.position.x = Math.sin(t) * 1.2;
            camera.position.y = Math.cos(t / 3) * 0.5;
            camera.lookAt(0, 0, 0);

            const pulseStepScale = slow ? 0.6 : 1.0;
            for (const p of pulses) {
                p.mesh.position.addScaledVector(p.dir, p.speed * pulseStepScale);
                if (p.mesh.position.length() > effectiveDepth) p.dir.multiplyScalar(-1);
            }

            renderer.render(scene, camera);
            rafId = requestAnimationFrame(loop);
        };
        loop();

        const handleResize = () => {
            const w = window.innerWidth;
            const h = window.innerHeight;
            renderer.setPixelRatio(Math.min(1.5, window.devicePixelRatio || 1));
            renderer.setSize(w, h);
            camera.aspect = w / h;
            camera.updateProjectionMatrix();
        };
        window.addEventListener("resize", handleResize, { passive: true });

        return () => {
            running = false;
            if (rafId) cancelAnimationFrame(rafId);
            window.removeEventListener("resize", handleResize);
            document.removeEventListener("visibilitychange", onVisibility);
            renderer.dispose();
            if (renderer.domElement && renderer.domElement.parentNode === mount) {
                mount.removeChild(renderer.domElement);
            }
        };
    }, [nodeCount, linkProbability, depth, opacity, pulseCount]);

    return (
        <div
            ref={mountRef}
            className="absolute inset-0 pointer-events-none"
            style={{
                zIndex: 0,
                filter: "saturate(1.1) contrast(1.05)",
                transform: offsetX ? `translateX(${offsetX})` : undefined,
            }}
            aria-hidden="true"
        />
    );
}
