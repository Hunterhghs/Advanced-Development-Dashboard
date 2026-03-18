// Country Detail Panel for the Prosperity Diffusion Dashboard
import { state } from './state.js';
import { COUNTRY_BY_ID, COUNTRIES } from './data.js';
import { formatCurrency, formatPercent, formatNumber, COLORS, generateSparklinePath } from './utils.js';
import { getBottlenecks, getRecommendedPolicies, getTimeSeries } from './simulation.js';
import { zoomToCountry } from './map.js';

let countryCharts = {};

export function initCountryPanel() {
  state.on('countrySelect', (id) => openCountryDrawer(id));
  state.on('countryDeselect', () => closeCountryDrawer());
  state.on('yearChange', () => { if (state.selectedCountry) updateCountryPanel(state.selectedCountry); });
  state.on('simUpdate', () => { if (state.selectedCountry) updateCountryPanel(state.selectedCountry); });
  
  // Close button
  document.querySelector('.country-drawer-close')?.addEventListener('click', () => {
    state.deselectCountry();
  });
}

function openCountryDrawer(countryId) {
  const drawer = document.querySelector('.country-drawer');
  if (!drawer) return;
  drawer.classList.add('open');
  updateCountryPanel(countryId);
  zoomToCountry(countryId);
}

function closeCountryDrawer() {
  const drawer = document.querySelector('.country-drawer');
  if (!drawer) return;
  drawer.classList.remove('open');
  // Destroy charts
  Object.values(countryCharts).forEach(c => c.destroy());
  countryCharts = {};
}

function updateCountryPanel(countryId) {
  const country = COUNTRY_BY_ID[countryId];
  const data = state.getCountryData(countryId);
  if (!country || !data) return;
  
  // Header
  const nameEl = document.querySelector('.country-drawer-name');
  const regionEl = document.querySelector('.country-drawer-region');
  if (nameEl) nameEl.textContent = country.name;
  if (regionEl) regionEl.textContent = `${country.region} · ${country.income} income`;
  
  // Overview metrics
  const metricsEl = document.getElementById('country-metrics');
  if (metricsEl) {
    metricsEl.innerHTML = `
      <div class="metric-item">
        <div class="metric-label">Population</div>
        <div class="metric-value">${formatNumber(data.population * 1e6)}</div>
      </div>
      <div class="metric-item">
        <div class="metric-label">GDP per Capita</div>
        <div class="metric-value">${formatCurrency(data.gdppc)}</div>
      </div>
      <div class="metric-item">
        <div class="metric-label">Total Poverty Rate</div>
        <div class="metric-value" style="color:${data.poverty > 10 ? 'var(--negative)' : 'var(--positive)'}">${formatPercent(data.poverty)}</div>
      </div>
      <div class="metric-item">
        <div class="metric-label">GDP Growth</div>
        <div class="metric-value" style="color:${data.gdpGrowth >= 0 ? 'var(--positive)' : 'var(--negative)'}">${data.gdpGrowth >= 0 ? '+' : ''}${data.gdpGrowth.toFixed(1)}%</div>
      </div>
      <div class="metric-item">
        <div class="metric-label">Urbanization</div>
        <div class="metric-value">${formatPercent(data.urban)}</div>
      </div>
      <div class="metric-item">
        <div class="metric-label">Life Expectancy</div>
        <div class="metric-value">${data.lifeExp.toFixed(1)} yr</div>
      </div>
      <div class="metric-item">
        <div class="metric-label">Energy Access</div>
        <div class="metric-value">${formatPercent(data.energy)}</div>
      </div>
      <div class="metric-item">
        <div class="metric-label">Internet</div>
        <div class="metric-value">${formatPercent(data.internet)}</div>
      </div>
      <div class="metric-item">
        <div class="metric-label">Education Index</div>
        <div class="metric-value">${(data.education * 100).toFixed(0)}</div>
      </div>
      <div class="metric-item">
        <div class="metric-label">Governance</div>
        <div class="metric-value">${(data.governance * 100).toFixed(0)}</div>
      </div>
      <div class="metric-item">
        <div class="metric-label">Clean Energy</div>
        <div class="metric-value">${formatPercent(data.cleanEnergy)}</div>
      </div>
      <div class="metric-item">
        <div class="metric-label">Inequality (Gini)</div>
        <div class="metric-value">${data.gini.toFixed(1)}</div>
      </div>
    `;
  }
  
  // Sector breakdown
  const sectorEl = document.getElementById('country-sectors');
  if (sectorEl) {
    sectorEl.innerHTML = `
      <div style="display:flex;gap:4px;height:14px;border-radius:4px;overflow:hidden;margin-bottom:6px;">
        <div style="flex:${data.agriculture};background:${COLORS.positive};border-radius:2px;" title="Agriculture ${data.agriculture.toFixed(1)}%"></div>
        <div style="flex:${data.manufacturing};background:${COLORS.accent};border-radius:2px;" title="Manufacturing ${data.manufacturing.toFixed(1)}%"></div>
        <div style="flex:${data.services};background:${COLORS.purple};border-radius:2px;" title="Services ${data.services.toFixed(1)}%"></div>
      </div>
      <div style="display:flex;gap:12px;font-size:10px;color:var(--text-dim);">
        <span><span style="color:${COLORS.positive}">■</span> Agriculture ${data.agriculture.toFixed(1)}%</span>
        <span><span style="color:${COLORS.accent}">■</span> Manufacturing ${data.manufacturing.toFixed(1)}%</span>
        <span><span style="color:${COLORS.purple}">■</span> Services ${data.services.toFixed(1)}%</span>
      </div>
    `;
  }
  
  // Charts
  renderCountryCharts(countryId);
  
  // Bottlenecks
  renderBottlenecks(countryId);
  
  // Recommendations
  renderRecommendations(data);
}

function renderCountryCharts(countryId) {
  Object.values(countryCharts).forEach(c => c.destroy());
  countryCharts = {};
  
  const chartsEl = document.getElementById('country-charts');
  if (!chartsEl) return;
  
  const indicators = [
    { field: 'gdppc', label: 'GDP per Capita', color: COLORS.accent },
    { field: 'poverty', label: 'Total Poverty Rate', color: COLORS.negative },
    { field: 'energy', label: 'Energy Access', color: COLORS.positive },
    { field: 'internet', label: 'Internet Penetration', color: '#40c4ff' }
  ];
  
  chartsEl.innerHTML = indicators.map((ind, i) => `
    <div class="country-chart-container">
      <div class="country-chart-title">${ind.label}</div>
      <div style="position:relative;height:100px;">
        <canvas id="cc-${i}"></canvas>
      </div>
    </div>
  `).join('');
  
  indicators.forEach((ind, i) => {
    const canvas = document.getElementById(`cc-${i}`);
    if (!canvas) return;
    
    const years = state.simResults[countryId];
    if (!years) return;
    
    const labels = years.map(y => y.year);
    const data = years.map(y => y[ind.field]);
    
    countryCharts[i] = new Chart(canvas, {
      type: 'line',
      data: {
        labels,
        datasets: [{
          data,
          borderColor: ind.color,
          backgroundColor: ind.color + '10',
          fill: true,
          borderWidth: 1.5,
          pointRadius: labels.map((_, idx) => idx === state.yearIndex ? 3 : 0),
          pointBackgroundColor: ind.color,
          tension: 0.3
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: { duration: 300 },
        plugins: { legend: { display: false }, tooltip: { enabled: true } },
        scales: {
          x: {
            grid: { display: false },
            ticks: { color: '#5a6478', font: { size: 9 }, maxTicksLimit: 5 }
          },
          y: {
            grid: { color: 'rgba(30, 42, 62, 0.3)' },
            ticks: { color: '#5a6478', font: { size: 9 }, maxTicksLimit: 4 }
          }
        }
      }
    });
  });
}

function renderBottlenecks(countryId) {
  const el = document.getElementById('country-bottlenecks');
  if (!el) return;
  
  const data = state.getCountryData(countryId);
  if (!data) return;
  
  const bottlenecks = getBottlenecks(data);
  
  el.innerHTML = bottlenecks.map(b => {
    const pct = ((b.value / b.target) * 100).toFixed(0);
    const color = pct < 30 ? COLORS.negative : pct < 60 ? COLORS.warning : COLORS.positive;
    return `
      <div class="bottleneck-item">
        <span class="bottleneck-name">${b.name}</span>
        <div class="bottleneck-bar">
          <div class="bottleneck-fill" style="width:${pct}%;background:${color}"></div>
        </div>
        <span class="bottleneck-value">${pct}%</span>
      </div>
    `;
  }).join('');
}

function renderRecommendations(data) {
  const el = document.getElementById('country-recommendations');
  if (!el) return;
  
  const recs = getRecommendedPolicies(data);
  
  el.innerHTML = recs.map(r => `
    <div class="rec-card">
      <div class="rec-card-header">
        <span class="rec-card-policy">${r.policy}</span>
        <span class="rec-card-impact ${r.impact.toLowerCase()}">${r.impact}</span>
      </div>
      <div class="rec-card-reason">${r.reason}</div>
    </div>
  `).join('');
  
  if (recs.length === 0) {
    el.innerHTML = '<div style="color:var(--text-dim);font-size:11px;padding:8px 0;">No critical policy gaps identified for this country.</div>';
  }
}
