// The four open paths follow the outlines of the ES monogram in BrandMark.
const FRAGMENTS = {
  home: {
    color: "91, 224, 255",
    path: "M4 24V8H41L35 15H15V20.5H32",
    stars: [[4, 24], [4, 8], [41, 8], [15, 15], [32, 20.5]],
  },
  about: {
    color: "105, 177, 255",
    path: "M32 20.5L26.5 27.5H15V33H38L32 40H4V24",
    stars: [[32, 20.5], [15, 27.5], [38, 33], [4, 40], [4, 24]],
  },
  approach: {
    color: "133, 155, 255",
    path: "M33.1 18.6C33.1 12 37.4 8 45 8H70L64 15H46C43.5 15 42 16.1 42 18.2C42 20 43.4 20.9 46.2 20.9H57.4C61.8 20.9 65.2 21.725 67.5 23.3125",
    stars: [[33.1, 18.6], [45, 8], [70, 8], [46.2, 20.9], [67.5, 23.3125]],
  },
  contact: {
    color: "165, 132, 255",
    path: "M67.5 23.3125C69.8 24.9 71 27.25 71 30.3C71 36.7 65.8 40 57.2 40H31L37 33H57.7C60.5 33 61.9 32 61.9 30.3C61.9 28.7 60.5 27.9 57.5 27.9H46.2C37.8 27.9 33.1 24.7 33.1 18.6",
    stars: [[67.5, 23.3125], [71, 30.3], [57.2, 40], [31, 40], [46.2, 27.9], [33.1, 18.6]],
  },
};

const STORAGE_KEY = "eiad.hero-signature.v2";
const TRANSITIONS_PER_GLOW = 3;
let progress;

function getProgress() {
  if (progress !== undefined) return progress;
  progress = { page: null, transitions: 0 };
  try {
    const saved = JSON.parse(window.sessionStorage.getItem(STORAGE_KEY));
    if (
      saved && Object.hasOwn(FRAGMENTS, saved.page) &&
      Number.isInteger(saved.transitions) && saved.transitions >= 0 && saved.transitions <= TRANSITIONS_PER_GLOW
    ) {
      progress = saved;
    }
  } catch {
    // Keep the in-memory progress if browser storage is unavailable.
  }
  return progress;
}

function saveProgress(value) {
  progress = value;
  try {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(value));
  } catch {
    // Navigation still works within the loaded app when storage is blocked.
  }
}

export function visitConstellationPage(page) {
  const previous = getProgress();
  if (previous.page === page) return previous.transitions === TRANSITIONS_PER_GLOW;

  const transitions = previous.page === null ? 0 : Math.min(previous.transitions + 1, TRANSITIONS_PER_GLOW);
  saveProgress({ page, transitions });
  return transitions === TRANSITIONS_PER_GLOW;
}

export function claimSignatureGlow() {
  const { page, transitions } = getProgress();
  if (transitions !== TRANSITIONS_PER_GLOW) return false;
  saveProgress({ page, transitions: 0 });
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

function fillStars(context, stars, radius, color) {
  context.beginPath();
  for (const [x, y] of stars) {
    context.moveTo(x + radius, y);
    context.arc(x, y, radius, 0, Math.PI * 2);
  }
  context.fillStyle = color;
  context.fill();
}

export function drawConstellation(context, paths, position, illumination) {
  const { x, y, scale } = position;
  context.save();
  context.translate(x, y);
  context.scale(scale, scale);
  context.translate(-37.5, -24);
  context.lineWidth = (0.8 + illumination * 0.64) / scale;
  context.lineCap = "round";
  context.lineJoin = "round";

  for (const part of paths) {
    const lineOpacity = (part.current ? 0.31 : 0.26) + illumination * 0.52;
    const starOpacity = (part.current ? 0.53 : 0.46) + illumination * 0.38;
    context.strokeStyle = `rgba(${part.color}, ${lineOpacity})`;
    context.stroke(part.path);

    fillStars(context, part.stars, (3.5 + illumination * 2.5) / scale, `rgba(${part.color}, ${starOpacity * 0.13})`);
    fillStars(context, part.stars, (1.05 + illumination * 0.48) / scale, `rgba(${part.color}, ${starOpacity})`);
  }

  context.restore();
}
