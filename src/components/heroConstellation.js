// The four open paths follow the outlines of the ES monogram in BrandMark.
const FRAGMENTS = {
  home: {
    bit: 1,
    color: "91, 224, 255",
    path: "M4 24V8H41L35 15H15V20.5H32",
    stars: [[4, 24], [4, 8], [41, 8], [15, 15], [32, 20.5]],
  },
  about: {
    bit: 2,
    color: "105, 177, 255",
    path: "M32 20.5L26.5 27.5H15V33H38L32 40H4V24",
    stars: [[32, 20.5], [15, 27.5], [38, 33], [4, 40], [4, 24]],
  },
  approach: {
    bit: 4,
    color: "133, 155, 255",
    path: "M33.1 18.6C33.1 12 37.4 8 45 8H70L64 15H46C43.5 15 42 16.1 42 18.2C42 20 43.4 20.9 46.2 20.9H57.4C61.8 20.9 65.2 21.725 67.5 23.3125",
    stars: [[33.1, 18.6], [45, 8], [70, 8], [46.2, 20.9], [67.5, 23.3125]],
  },
  contact: {
    bit: 8,
    color: "165, 132, 255",
    path: "M67.5 23.3125C69.8 24.9 71 27.25 71 30.3C71 36.7 65.8 40 57.2 40H31L37 33H57.7C60.5 33 61.9 32 61.9 30.3C61.9 28.7 60.5 27.9 57.5 27.9H46.2C37.8 27.9 33.1 24.7 33.1 18.6",
    stars: [[67.5, 23.3125], [71, 30.3], [57.2, 40], [31, 40], [46.2, 27.9], [33.1, 18.6]],
  },
};

const STORAGE_KEY = "eiad.hero-constellation.v1";
const ALL_PAGES = 15;
const ALL_PAGES_REVEALED = ALL_PAGES | 16;
let progress;

function getProgress() {
  if (progress !== undefined) return progress;
  try {
    const saved = Number(window.sessionStorage.getItem(STORAGE_KEY));
    const valid = Number.isInteger(saved) && (saved === ALL_PAGES_REVEALED || (saved >= 0 && saved <= ALL_PAGES));
    progress = valid ? saved : 0;
  } catch {
    progress = 0;
  }
  return progress;
}

function saveProgress(value) {
  progress = value;
  try {
    window.sessionStorage.setItem(STORAGE_KEY, String(value));
  } catch {
    // Navigation still works within the loaded app when storage is blocked.
  }
}

export function visitConstellationPage(page) {
  const previous = getProgress();
  const visited = previous | FRAGMENTS[page].bit;
  if (visited !== previous) saveProgress(visited);
  return visited === ALL_PAGES;
}

export function claimConstellationReveal() {
  if (getProgress() !== ALL_PAGES) return false;
  saveProgress(ALL_PAGES_REVEALED);
  return true;
}

export function createConstellationPaths(page) {
  return Object.entries(FRAGMENTS).map(([name, fragment]) => ({
    path: new Path2D(fragment.path),
    stars: fragment.stars,
    color: fragment.color,
    current: name === page,
  }));
}

export function positionConstellation(width, height, direction) {
  const compact = width < 1120;
  const size = compact
    ? Math.min(112, Math.max(64, width * 0.21))
    : Math.min(214, Math.max(168, width * 0.145));
  const scale = size / 67;
  const halfHeight = 16 * scale;
  const edgeOffset = compact ? Math.max(18, width * 0.04) + size / 2 : width * 0.15;

  return {
    x: direction === "rtl" ? edgeOffset : width - edgeOffset,
    y: compact ? 6 + halfHeight : height * 0.46,
    scale,
    halfHeight,
  };
}

export function drawConstellation(context, paths, position, illumination) {
  const { x, y, scale } = position;
  context.save();
  context.translate(x, y);
  context.scale(scale, scale);
  context.translate(-37.5, -24);
  context.lineWidth = (0.68 + illumination * 0.66) / scale;
  context.lineCap = "round";
  context.lineJoin = "round";

  for (const part of paths) {
    if (!part.current && illumination === 0) continue;

    const lineOpacity = part.current ? 0.19 + illumination * 0.53 : illumination * 0.69;
    const starOpacity = part.current ? 0.45 + illumination * 0.37 : illumination * 0.79;
    context.strokeStyle = `rgba(${part.color}, ${lineOpacity})`;
    context.stroke(part.path);

    for (const [starX, starY] of part.stars) {
      context.beginPath();
      context.arc(starX, starY, (3.5 + illumination * 2.5) / scale, 0, Math.PI * 2);
      context.fillStyle = `rgba(${part.color}, ${starOpacity * 0.13})`;
      context.fill();

      context.beginPath();
      context.arc(starX, starY, (1.05 + illumination * 0.48) / scale, 0, Math.PI * 2);
      context.fillStyle = `rgba(${part.color}, ${starOpacity})`;
      context.fill();
    }
  }

  context.restore();
}
