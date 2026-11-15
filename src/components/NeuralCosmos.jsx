import useHydrationSafeReducedMotion from "../hooks/useHydrationSafeReducedMotion";
import { useEffect, useRef } from "react";

const LINK_COLORS = [
  [91, 224, 255],
  [105, 137, 255],
  [165, 132, 255],
];

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);
const randomBetween = (min, max) => min + Math.random() * (max - min);

function createNodes(width, height, count) {
  const focusX = width * 0.72;
  const focusY = height * 0.43;

  return Array.from({ length: count }, (_, index) => {
    const clustered = index < count * 0.46;
    const spreadX = width * 0.27;
    const spreadY = height * 0.34;
    const x = clustered
      ? focusX + (Math.random() + Math.random() - 1) * spreadX
      : Math.random() * width;
    const y = clustered
      ? focusY + (Math.random() + Math.random() - 1) * spreadY
      : Math.random() * height;

    return {
      x: clamp(x, 10, width - 10),
      y: clamp(y, 10, height - 10),
      vx: randomBetween(-0.055, 0.055),
      vy: randomBetween(-0.045, 0.045),
      radius: randomBetween(0.75, 1.65),
      depth: randomBetween(0.35, 1),
      phase: randomBetween(0, Math.PI * 2),
      colorIndex: index % LINK_COLORS.length,
    };
  });
}

function createStars(width, height, count) {
  return Array.from({ length: count }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    radius: randomBetween(0.28, 1.05),
    depth: randomBetween(0.2, 1),
    speed: randomBetween(0.006, 0.026),
    phase: randomBetween(0, Math.PI * 2),
  }));
}

export default function NeuralCosmos() {
  const hostRef = useRef(null);
  const canvasRef = useRef(null);
  const reduceMotion = useHydrationSafeReducedMotion();

  useEffect(() => {
    const host = hostRef.current;
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d", { alpha: true });

    if (!host || !canvas || !context) return undefined;

    let width = 0;
    let height = 0;
    let nodes = [];
    let stars = [];
    let pulses = [];
    let bursts = [];
    let animationFrame = 0;
    let lastFrame = 0;
    let lastPulse = 0;
    let lastBurst = 0;
    let inViewport = true;
    let pageVisible = !document.hidden;
    let targetFps = 55;
    let pulseLimit = 12;
    let linkDistance = 150;
    let bounds = host.getBoundingClientRect();

    const pointer = {
      x: 0,
      y: 0,
      targetX: 0,
      targetY: 0,
    };

    const saveData = Boolean(navigator.connection?.saveData);

    const getPosition = (node) => ({
      x: node.x + pointer.x * node.depth * 13,
      y: node.y + pointer.y * node.depth * 9,
    });

    const spawnPulse = (time) => {
      if (nodes.length < 2 || pulses.length >= pulseLimit) return;

      const from = nodes[Math.floor(Math.random() * nodes.length)];
      const nearby = nodes.filter((node) => {
        if (node === from) return false;
        const dx = node.x - from.x;
        const dy = node.y - from.y;
        const distance = Math.hypot(dx, dy);
        return distance > 34 && distance < linkDistance * 1.18;
      });

      if (!nearby.length) return;

      pulses.push({
        from,
        to: nearby[Math.floor(Math.random() * nearby.length)],
        start: time,
        duration: randomBetween(720, 1180),
      });
    };

    const spawnBurst = (time) => {
      if (!nodes.length) return;
      const focusNodes = nodes.filter((node) => node.x > width * 0.54);
      const source =
        focusNodes[Math.floor(Math.random() * focusNodes.length)] || nodes[0];

      bursts.push({ source, start: time, duration: 1700 });
      for (let index = 0; index < 3; index += 1) spawnPulse(time + index * 70);
    };

    const draw = (time, update, delta = 1) => {
      context.clearRect(0, 0, width, height);

      pointer.x += (pointer.targetX - pointer.x) * 0.035;
      pointer.y += (pointer.targetY - pointer.y) * 0.035;

      context.globalCompositeOperation = "source-over";
      stars.forEach((star) => {
        if (update) {
          star.x += star.speed * delta;
          if (star.x > width + 2) star.x = -2;
        }

        const twinkle = 0.58 + Math.sin(time * 0.001 + star.phase) * 0.34;
        const x = star.x + pointer.x * star.depth * 5;
        const y = star.y + pointer.y * star.depth * 4;
        context.beginPath();
        context.arc(x, y, star.radius, 0, Math.PI * 2);
        context.fillStyle = `rgba(207, 234, 255, ${0.12 * star.depth * twinkle})`;
        context.fill();
      });

      if (update) {
        nodes.forEach((node) => {
          node.x += node.vx * delta;
          node.y += node.vy * delta;

          if (node.x < -18) node.x = width + 18;
          if (node.x > width + 18) node.x = -18;
          if (node.y < -18) node.y = height + 18;
          if (node.y > height + 18) node.y = -18;
        });
      }

      const positions = nodes.map(getPosition);
      const maxDistanceSquared = linkDistance * linkDistance;

      for (let first = 0; first < nodes.length; first += 1) {
        for (let second = first + 1; second < nodes.length; second += 1) {
          const dx = positions[second].x - positions[first].x;
          const dy = positions[second].y - positions[first].y;
          const distanceSquared = dx * dx + dy * dy;

          if (distanceSquared > maxDistanceSquared) continue;

          const distance = Math.sqrt(distanceSquared);
          const strength = 1 - distance / linkDistance;
          const color = LINK_COLORS[(first + second) % LINK_COLORS.length];
          const rightSideBoost = positions[first].x > width * 0.48 ? 1.2 : 0.72;

          context.beginPath();
          context.moveTo(positions[first].x, positions[first].y);
          context.lineTo(positions[second].x, positions[second].y);
          context.lineWidth = 0.58;
          context.strokeStyle = `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${strength * 0.15 * rightSideBoost})`;
          context.stroke();
        }
      }

      context.globalCompositeOperation = "lighter";
      nodes.forEach((node, index) => {
        const position = positions[index];
        const color = LINK_COLORS[node.colorIndex];
        const pulse = 0.7 + Math.sin(time * 0.00125 + node.phase) * 0.3;
        const haloRadius = node.radius * (3.6 + pulse);

        context.beginPath();
        context.arc(position.x, position.y, haloRadius, 0, Math.PI * 2);
        context.fillStyle = `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${0.025 + pulse * 0.025})`;
        context.fill();

        context.beginPath();
        context.arc(position.x, position.y, node.radius * pulse, 0, Math.PI * 2);
        context.fillStyle = `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${0.34 + node.depth * 0.42})`;
        context.fill();
      });

      pulses = pulses.filter((pulse) => {
        const progress = (time - pulse.start) / pulse.duration;
        if (progress < 0) return true;
        if (progress >= 1) return false;

        const eased = 1 - Math.pow(1 - progress, 2.2);
        const from = getPosition(pulse.from);
        const to = getPosition(pulse.to);
        const x = from.x + (to.x - from.x) * eased;
        const y = from.y + (to.y - from.y) * eased;
        const tailProgress = Math.max(0, eased - 0.13);
        const tailX = from.x + (to.x - from.x) * tailProgress;
        const tailY = from.y + (to.y - from.y) * tailProgress;
        const fade = Math.sin(progress * Math.PI);

        context.beginPath();
        context.moveTo(tailX, tailY);
        context.lineTo(x, y);
        context.lineCap = "round";
        context.lineWidth = 1.25;
        context.strokeStyle = `rgba(132, 231, 255, ${0.72 * fade})`;
        context.stroke();

        context.beginPath();
        context.arc(x, y, 7.5, 0, Math.PI * 2);
        context.fillStyle = `rgba(91, 224, 255, ${0.075 * fade})`;
        context.fill();

        context.beginPath();
        context.arc(x, y, 1.75, 0, Math.PI * 2);
        context.fillStyle = `rgba(235, 251, 255, ${0.94 * fade})`;
        context.fill();
        return true;
      });

      bursts = bursts.filter((burst) => {
        const progress = (time - burst.start) / burst.duration;
        if (progress < 0) return true;
        if (progress >= 1) return false;

        const position = getPosition(burst.source);
        const radius = 12 + progress * 118;
        const opacity = Math.pow(1 - progress, 1.7) * 0.23;

        context.beginPath();
        context.arc(position.x, position.y, radius, 0, Math.PI * 2);
        context.lineWidth = 0.8;
        context.strokeStyle = `rgba(165, 132, 255, ${opacity})`;
        context.stroke();
        return true;
      });

      context.globalCompositeOperation = "source-over";
    };

    const shouldAnimate = () => !reduceMotion && inViewport && pageVisible;

    const frame = (time) => {
      animationFrame = 0;
      if (!shouldAnimate()) return;

      const frameInterval = 1000 / targetFps;
      const elapsed = time - lastFrame;
      if (targetFps >= 50 || elapsed >= frameInterval) {
        const delta = clamp((time - lastFrame) / 16.67, 0.45, 1.9);
        lastFrame =
          targetFps >= 50 ? time : time - (elapsed % frameInterval);

        const pulseInterval = width < 640 ? 720 : 470;
        if (time - lastPulse > pulseInterval) {
          spawnPulse(time);
          lastPulse = time;
        }

        const burstInterval = width < 640 ? 8200 : 5200;
        if (time - lastBurst > burstInterval) {
          spawnBurst(time);
          lastBurst = time;
        }

        draw(time, true, delta);
      }

      animationFrame = window.requestAnimationFrame(frame);
    };

    const syncAnimation = () => {
      host.dataset.motion = shouldAnimate() ? "running" : "paused";

      if (shouldAnimate() && !animationFrame) {
        lastFrame = performance.now();
        animationFrame = window.requestAnimationFrame(frame);
      } else if (!shouldAnimate() && animationFrame) {
        window.cancelAnimationFrame(animationFrame);
        animationFrame = 0;
      }
    };

    const resize = () => {
      bounds = host.getBoundingClientRect();
      width = Math.max(1, bounds.width);
      height = Math.max(1, bounds.height);

      const mobile = width < 640;
      const dprCap = mobile ? 1.25 : 1.5;
      const pixelRatio = Math.min(window.devicePixelRatio || 1, dprCap);
      const baseNodeCount = mobile ? 34 : clamp(Math.round(width / 19), 58, 72);
      const baseStarCount = mobile ? 52 : clamp(Math.round(width / 12), 88, 112);
      const powerFactor = saveData ? 0.65 : 1;

      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

      nodes = createNodes(width, height, Math.round(baseNodeCount * powerFactor));
      stars = createStars(width, height, Math.round(baseStarCount * powerFactor));
      pulses = [];
      bursts = [];
      linkDistance = mobile ? 112 : 154;
      pulseLimit = mobile ? 6 : 12;
      targetFps = saveData ? 30 : mobile ? 34 : 55;

      draw(performance.now(), false);
    };

    const handlePointerMove = (event) => {
      if (!inViewport) return;

      const inside =
        event.clientX >= bounds.left &&
        event.clientX <= bounds.right &&
        event.clientY >= bounds.top &&
        event.clientY <= bounds.bottom;

      if (!inside) {
        pointer.targetX = 0;
        pointer.targetY = 0;
        return;
      }

      pointer.targetX = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2;
      pointer.targetY = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2;
    };

    const updateBounds = () => {
      if (inViewport) bounds = host.getBoundingClientRect();
    };

    const handleVisibility = () => {
      pageVisible = !document.hidden;
      syncAnimation();
    };

    const resizeObserver = new ResizeObserver(resize);
    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        inViewport = entry.isIntersecting;
        if (inViewport) updateBounds();
        syncAnimation();
      },
      { threshold: 0.02 },
    );

    resizeObserver.observe(host);
    intersectionObserver.observe(host);
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("scroll", updateBounds, { passive: true });
    document.addEventListener("visibilitychange", handleVisibility);

    resize();
    syncAnimation();

    return () => {
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("scroll", updateBounds);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [reduceMotion]);

  return (
    <div
      ref={hostRef}
      className="neural-cosmos pointer-events-none absolute inset-0 -z-20 overflow-hidden"
      data-motion="paused"
      aria-hidden="true"
    >
      <div className="hero-aurora hero-aurora--cyan" />
      <div className="hero-aurora hero-aurora--violet" />
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      <div className="hero-neural-grid absolute inset-0" />
    </div>
  );
}
