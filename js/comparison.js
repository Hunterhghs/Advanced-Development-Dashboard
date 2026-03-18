// Comparison mode for the Prosperity Diffusion Dashboard
import { state } from './state.js';
import { COUNTRIES, COUNTRY_BY_ID } from './data.js';
import { COLORS } from './utils.js';
import { renderComparisonCharts } from './charts.js';

export function initComparison() {
  state.on('comparisonChange', () => updateComparisonUI());
  
  // Add country button in comparison tab
  const addBtn = document.getElementById('comparison-add-btn');
  if (addBtn) {
    addBtn.addEventListener('click', openComparisonPicker);
  }
  
  // Modal close
  document.querySelector('.comparison-modal')?.addEventListener('click', (e) => {
    if (e.target.classList.contains('comparison-modal')) {
      closeComparisonModal();
    }
  });
  
  document.getElementById('comp-modal-close')?.addEventListener('click', closeComparisonModal);
  
  state.on('tabChange', (tab) => {
    if (tab === 'comparison') updateComparisonUI();
  });
}

function updateComparisonUI() {
  const tagsEl = document.getElementById('comparison-tags');
  const chartsGrid = document.getElementById('comparison-charts-grid');
  const emptyState = document.getElementById('comparison-empty');
  
  if (!tagsEl) return;
  
  if (state.comparisonCountries.length === 0) {
    tagsEl.innerHTML = '';
    if (chartsGrid) chartsGrid.innerHTML = '';
    if (emptyState) emptyState.style.display = 'flex';
    return;
  }
  
  if (emptyState) emptyState.style.display = 'none';
  
  // Render country tags
  tagsEl.innerHTML = state.comparisonCountries.map((id, i) => {
    const country = COUNTRY_BY_ID[id];
    if (!country) return '';
    const color = COLORS.chart[i % COLORS.chart.length];
    return `
      <div class="country-tag" style="background:${color}20;border:1px solid ${color}40;color:${color}">
        ${country.name}
        <span class="remove" data-id="${id}">×</span>
      </div>
    `;
  }).join('');
  
  tagsEl.querySelectorAll('.remove').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      state.toggleComparison(e.target.dataset.id);
    });
  });
  
  // Render comparison charts
  if (chartsGrid && state.comparisonCountries.length > 0) {
    renderComparisonCharts(state.comparisonCountries);
  }
}

function openComparisonPicker() {
  const modal = document.querySelector('.comparison-modal');
  if (!modal) return;
  
  const body = document.getElementById('comp-modal-body');
  if (!body) return;
  
  // Group countries by region
  const byRegion = {};
  COUNTRIES.forEach(c => {
    if (!byRegion[c.region]) byRegion[c.region] = [];
    byRegion[c.region].push(c);
  });
  
  body.innerHTML = Object.entries(byRegion).map(([region, countries]) => `
    <div style="margin-bottom:14px;">
      <div style="font-size:11px;font-weight:600;color:var(--text-dim);text-transform:uppercase;letter-spacing:0.5px;margin-bottom:6px;">${region}</div>
      <div style="display:flex;flex-wrap:wrap;gap:4px;">
        ${countries.map(c => {
          const isSelected = state.comparisonCountries.includes(c.id);
          return `<button class="scenario-btn comp-pick-btn ${isSelected ? 'active' : ''}" data-id="${c.id}">${c.name}</button>`;
        }).join('')}
      </div>
    </div>
  `).join('');
  
  body.querySelectorAll('.comp-pick-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      state.toggleComparison(btn.dataset.id);
      btn.classList.toggle('active');
    });
  });
  
  // Preset groups
  const presets = document.getElementById('comp-presets');
  if (presets) {
    presets.innerHTML = `
      <button class="scenario-btn" data-preset="brics">BRICS</button>
      <button class="scenario-btn" data-preset="g7">G7</button>
      <button class="scenario-btn" data-preset="asean">ASEAN-5</button>
      <button class="scenario-btn" data-preset="africa">Top Africa</button>
      <button class="scenario-btn" data-preset="latam">LatAm</button>
    `;
    
    const presetMap = {
      brics: ['076', '643', '356', '156', '710'],
      g7: ['840', '826', '250', '276', '380', '124', '392'],
      asean: ['360', '764', '704', '458', '608'],
      africa: ['566', '710', '404', '231', '288'],
      latam: ['076', '484', '032', '170', '152']
    };
    
    presets.querySelectorAll('.scenario-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const ids = presetMap[btn.dataset.preset];
        if (!ids) return;
        // Clear and add all
        state.comparisonCountries = [];
        ids.forEach(id => state.toggleComparison(id));
        closeComparisonModal();
      });
    });
  }
  
  modal.classList.add('open');
}

function closeComparisonModal() {
  const modal = document.querySelector('.comparison-modal');
  if (modal) modal.classList.remove('open');
  updateComparisonUI();
}
