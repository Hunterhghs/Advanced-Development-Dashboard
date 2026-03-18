// KPI Cards System for the Prosperity Diffusion Dashboard
import { state } from './state.js';
import { formatNumber, formatPercent, formatCurrency, generateSparklinePath, COLORS } from './utils.js';

const KPI_DEFS = [
  { id: 'extremePoverty', name: 'Extreme Poverty', format: 'percent', color: COLORS.negative, higherIsBad: true },
  { id: 'povertyPopulation', name: 'People in Poverty', format: 'millions', color: COLORS.negative, higherIsBad: true },
  { id: 'gdpPerCapita', name: 'GDP per Capita (PPP)', format: 'currency', color: COLORS.accent },
  { id: 'totalGDP', name: 'Global GDP', format: 'trillions', color: COLORS.accent },
  { id: 'population', name: 'World Population', format: 'billions', color: COLORS.purple },
  { id: 'urbanization', name: 'Urbanization', format: 'percent', color: COLORS.purple },
  { id: 'energyAccess', name: 'Electricity Access', format: 'percent', color: COLORS.positive },
  { id: 'internetAccess', name: 'Internet Access', format: 'percent', color: COLORS.accent },
  { id: 'cleanEnergy', name: 'Clean Energy Share', format: 'percent', color: COLORS.positive },
  { id: 'lifeExpectancy', name: 'Life Expectancy', format: 'years', color: '#69f0ae' },
  { id: 'inequality', name: 'Inequality (Gini)', format: 'number', color: COLORS.warning, higherIsBad: true },
  { id: 'education', name: 'Education Index', format: 'index', color: '#40c4ff' },
  { id: 'governance', name: 'Governance Index', format: 'index', color: '#ea80fc' }
];

export function initKPIs() {
  renderKPIs();
  state.on('yearChange', () => updateKPIs());
  state.on('simUpdate', () => updateKPIs());
}

function renderKPIs() {
  const grid = document.getElementById('kpi-grid');
  if (!grid) return;
  
  grid.innerHTML = KPI_DEFS.map(kpi => `
    <div class="kpi-card" data-kpi="${kpi.id}">
      <div class="kpi-card-header">
        <span class="kpi-card-title">${kpi.name}</span>
        <span class="kpi-card-delta" id="kpi-delta-${kpi.id}"></span>
      </div>
      <div class="kpi-card-value" id="kpi-value-${kpi.id}">—</div>
      <div class="kpi-card-subtitle" id="kpi-sub-${kpi.id}"></div>
      <svg class="kpi-sparkline" id="kpi-spark-${kpi.id}" viewBox="0 0 160 24" preserveAspectRatio="none">
        <path stroke="${kpi.color}" stroke-opacity="0.6"/>
      </svg>
    </div>
  `).join('');
  
  updateKPIs();
}

function updateKPIs() {
  const current = state.getCurrentGlobalKPIs();
  if (!current) return;
  
  const baseline = state.globalKPIs[0]; // 2025 baseline
  
  KPI_DEFS.forEach(kpi => {
    const value = current[kpi.id];
    const baseValue = baseline ? baseline[kpi.id] : value;
    
    // Format value
    const valueEl = document.getElementById(`kpi-value-${kpi.id}`);
    const deltaEl = document.getElementById(`kpi-delta-${kpi.id}`);
    const subEl = document.getElementById(`kpi-sub-${kpi.id}`);
    const sparkEl = document.getElementById(`kpi-spark-${kpi.id}`);
    
    if (!valueEl) return;
    
    valueEl.textContent = formatKPIValue(kpi, value);
    
    // Compute delta from 2025
    if (baseValue && value !== undefined) {
      const delta = computeDelta(kpi, value, baseValue);
      if (delta) {
        deltaEl.textContent = delta.text;
        deltaEl.className = `kpi-card-delta ${delta.className}`;
      }
    }
    
    // Subtitle
    subEl.textContent = `Year ${state.year}`;
    
    // Sparkline
    if (sparkEl) {
      const series = [];
      const end = Math.min(state.yearIndex + 1, state.globalKPIs.length);
      for (let i = 0; i < end; i++) {
        const d = state.globalKPIs[i];
        if (d) series.push(d[kpi.id]);
      }
      
      // Also add future projection (dimmer)
      const futureSeries = [];
      for (let i = end; i < state.globalKPIs.length; i++) {
        const d = state.globalKPIs[i];
        if (d) futureSeries.push(d[kpi.id]);
      }
      
      const allData = [...series, ...futureSeries];
      if (allData.length > 1) {
        const sparkPath = generateSparklinePath(allData, 160, 24);
        const pathEl = sparkEl.querySelector('path');
        if (pathEl) pathEl.setAttribute('d', sparkPath);
      }
    }
  });
}

function formatKPIValue(kpi, value) {
  if (value === undefined || value === null) return '—';
  switch (kpi.format) {
    case 'percent': return formatPercent(value);
    case 'currency': return formatCurrency(value);
    case 'millions': return formatNumber(value) + 'M';
    case 'billions': return (value / 1000).toFixed(2) + 'B';
    case 'trillions': return '$' + (value / 1e6).toFixed(1) + 'T';
    case 'years': return value.toFixed(1) + ' yr';
    case 'index': return (value * 100).toFixed(1);
    case 'number': return value.toFixed(1);
    default: return formatNumber(value);
  }
}

function computeDelta(kpi, current, base) {
  if (!base || base === 0) return null;
  
  let diff, text;
  if (kpi.format === 'percent' || kpi.format === 'years' || kpi.format === 'number') {
    diff = current - base;
    text = (diff >= 0 ? '+' : '') + diff.toFixed(1);
    if (kpi.format === 'percent') text += 'pp';
    if (kpi.format === 'years') text += ' yr';
  } else if (kpi.format === 'index') {
    diff = (current - base) * 100;
    text = (diff >= 0 ? '+' : '') + diff.toFixed(1);
  } else {
    const pctChange = ((current - base) / base) * 100;
    diff = pctChange;
    text = (pctChange >= 0 ? '+' : '') + pctChange.toFixed(1) + '%';
  }
  
  const isPositive = kpi.higherIsBad ? diff < 0 : diff > 0;
  const isNegative = kpi.higherIsBad ? diff > 0 : diff < 0;
  
  return {
    text,
    className: isPositive ? 'positive' : isNegative ? 'negative' : 'neutral'
  };
}
