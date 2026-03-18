// Utility functions for the Prosperity Diffusion Dashboard

export function formatNumber(n, decimals = 0) {
  if (n === null || n === undefined || isNaN(n)) return '—';
  if (Math.abs(n) >= 1e12) return (n / 1e12).toFixed(1) + 'T';
  if (Math.abs(n) >= 1e9) return (n / 1e9).toFixed(1) + 'B';
  if (Math.abs(n) >= 1e6) return (n / 1e6).toFixed(1) + 'M';
  if (Math.abs(n) >= 1e3) return (n / 1e3).toFixed(1) + 'K';
  return n.toFixed(decimals);
}

export function formatPercent(n, decimals = 1) {
  if (n === null || n === undefined || isNaN(n)) return '—';
  return n.toFixed(decimals) + '%';
}

export function formatCurrency(n) {
  if (n === null || n === undefined || isNaN(n)) return '—';
  if (n >= 1e6) return '$' + (n / 1e6).toFixed(1) + 'M';
  if (n >= 1e3) return '$' + (n / 1e3).toFixed(1) + 'K';
  return '$' + n.toFixed(0);
}

export function clamp(val, min, max) {
  return Math.max(min, Math.min(max, val));
}

export function lerp(a, b, t) {
  return a + (b - a) * t;
}

export function debounce(fn, delay = 150) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

export function throttle(fn, limit = 100) {
  let last = 0;
  return function (...args) {
    const now = Date.now();
    if (now - last >= limit) {
      last = now;
      fn.apply(this, args);
    }
  };
}

export function colorInterpolate(color1, color2, t) {
  const c1 = hexToRgb(color1);
  const c2 = hexToRgb(color2);
  const r = Math.round(lerp(c1.r, c2.r, t));
  const g = Math.round(lerp(c1.g, c2.g, t));
  const b = Math.round(lerp(c1.b, c2.b, t));
  return `rgb(${r},${g},${b})`;
}

export function hexToRgb(hex) {
  hex = hex.replace('#', '');
  return {
    r: parseInt(hex.substring(0, 2), 16),
    g: parseInt(hex.substring(2, 4), 16),
    b: parseInt(hex.substring(4, 6), 16)
  };
}

export function getColorScale(value, min, max, colors) {
  const t = clamp((value - min) / (max - min), 0, 1);
  const idx = t * (colors.length - 1);
  const low = Math.floor(idx);
  const high = Math.min(low + 1, colors.length - 1);
  const frac = idx - low;
  return colorInterpolate(colors[low], colors[high], frac);
}

// Color palettes
export const COLORS = {
  bg: '#0a0e17',
  surface: '#131a2b',
  surfaceLight: '#1a2340',
  border: '#1e2a3e',
  borderLight: '#2a3a55',
  text: '#e0e6ed',
  textMuted: '#8892a4',
  textDim: '#5a6478',
  accent: '#00d4ff',
  accentDim: '#0088aa',
  positive: '#00e676',
  negative: '#ff5252',
  warning: '#ffab00',
  purple: '#b388ff',
  pink: '#ff80ab',
  orange: '#ff9100',
  
  // Chart palette
  chart: ['#00d4ff', '#00e676', '#ffab00', '#ff5252', '#b388ff', '#ff80ab', '#ff9100', '#69f0ae', '#40c4ff', '#ea80fc'],
  
  // Poverty scale (0% = dark green, 70% = dark red)
  povertyScale: ['#1b5e20', '#2e7d32', '#388e3c', '#43a047', '#66bb6a', '#a5d6a7', '#fff9c4', '#ffcc80', '#ff8a65', '#ef5350', '#d32f2f', '#c62828', '#b71c1c', '#7f0000'],
  
  // GDP scale (low to high)
  gdpScale: ['#1a0a2e', '#2d1b69', '#1e3a8a', '#1e40af', '#0369a1', '#0891b2', '#0d9488', '#059669', '#16a34a', '#65a30d', '#ca8a04', '#ea580c'],
  
  // Infrastructure scale
  infraScale: ['#1a0a2e', '#312e81', '#3730a3', '#4338ca', '#6366f1', '#818cf8', '#a5b4fc'],
  
  // Energy scale  
  energyScale: ['#1a0a2e', '#064e3b', '#065f46', '#047857', '#059669', '#10b981', '#34d399', '#6ee7b7'],
  
  // Digital scale
  digitalScale: ['#1a0a2e', '#1e1b4b', '#312e81', '#4338ca', '#6366f1', '#818cf8', '#c4b5fd'],
  
  // Development Index scale (low to high)
  devScale: ['#7f0000', '#b71c1c', '#d32f2f', '#ef5350', '#ff8a65', '#ffcc80', '#fff9c4', '#a5d6a7', '#66bb6a', '#43a047', '#2e7d32', '#1b5e20'],

  // Risk scale (low to high)
  riskScale: ['#064e3b', '#065f46', '#047857', '#ca8a04', '#ea580c', '#dc2626', '#991b1b', '#7f1d1d']
};

// Sparkline generator (returns SVG path)
export function generateSparklinePath(data, width, height, padding = 2) {
  if (!data || data.length < 2) return '';
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const stepX = (width - padding * 2) / (data.length - 1);
  
  return data.map((d, i) => {
    const x = padding + i * stepX;
    const y = height - padding - ((d - min) / range) * (height - padding * 2);
    return (i === 0 ? 'M' : 'L') + x.toFixed(1) + ',' + y.toFixed(1);
  }).join(' ');
}

// Easing functions
export function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}

export function easeInOutQuad(t) {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
}
