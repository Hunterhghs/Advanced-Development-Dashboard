// Control panel for the Prosperity Diffusion Dashboard
import { state } from './state.js';
import { SCENARIOS } from './data.js';
import { debounce } from './utils.js';

const DRIVER_DEFS = [
  { key: 'infrastructure', name: 'Infrastructure Investment' },
  { key: 'digital', name: 'Digital Connectivity' },
  { key: 'trade', name: 'Trade Openness' },
  { key: 'institutions', name: 'Institutional Capacity' },
  { key: 'humanCapital', name: 'Human Capital' },
  { key: 'demographics', name: 'Demographic Dividend' },
  { key: 'energy', name: 'Energy Reliability' },
  { key: 'urbanProductivity', name: 'Urban Productivity' },
  { key: 'financialInclusion', name: 'Financial Inclusion' },
  { key: 'industrialPolicy', name: 'Industrial Policy' },
  { key: 'ruleOfLaw', name: 'Rule of Law' },
  { key: 'exportComplexity', name: 'Export Complexity' }
];

const POLICY_DEFS = [
  { key: 'education', name: 'Education Expansion' },
  { key: 'broadband', name: 'Broadband Rollout' },
  { key: 'grid', name: 'Grid Modernization' },
  { key: 'cleanPower', name: 'Clean Power Buildout' },
  { key: 'ports', name: 'Port & Corridor Upgrades' },
  { key: 'manufacturing', name: 'Manufacturing Zones' },
  { key: 'health', name: 'Health System Strengthening' },
  { key: 'landReform', name: 'Land & Housing Reform' },
  { key: 'antiCorruption', name: 'Anti-Corruption Reform' },
  { key: 'womenLabor', name: "Women's Labor Participation" },
  { key: 'smeFinance', name: 'SME Finance Access' },
  { key: 'regionalTrade', name: 'Regional Trade Agreements' }
];

const SHOCK_DEFS = [
  { key: 'climate', name: 'Climate Shock Severity' },
  { key: 'commodity', name: 'Commodity Cycle' },
  { key: 'conflict', name: 'Conflict Spillover' },
  { key: 'debt', name: 'Debt Stress' },
  { key: 'pandemic', name: 'Pandemic Disruption' },
  { key: 'aiAdoption', name: 'AI Productivity Adoption' },
  { key: 'friendShoring', name: 'Friend-shoring / Reshoring' },
  { key: 'techTransfer', name: 'Technology Transfer' }
];

export function initControls() {
  renderDrivers();
  renderPolicies();
  renderShocks();
  
  // Update on state changes
  state.on('scenarioChange', () => {
    syncControlsToState();
  });
}

function renderDrivers() {
  const body = document.getElementById('drivers-body');
  if (!body) return;
  
  const debouncedUpdate = debounce((key, val) => state.setDriver(key, val), 80);
  
  body.innerHTML = DRIVER_DEFS.map(d => `
    <div class="slider-group">
      <div class="slider-label">
        <span class="slider-name">${d.name}</span>
        <span class="slider-value" id="dv-${d.key}">${Math.round(state.drivers[d.key] * 100)}%</span>
      </div>
      <input type="range" class="control-slider" id="ds-${d.key}" 
        min="0" max="100" value="${Math.round(state.drivers[d.key] * 100)}"
        data-key="${d.key}">
    </div>
  `).join('');
  
  body.querySelectorAll('.control-slider').forEach(slider => {
    slider.addEventListener('input', (e) => {
      const key = e.target.dataset.key;
      const val = parseInt(e.target.value) / 100;
      document.getElementById(`dv-${key}`).textContent = Math.round(val * 100) + '%';
      debouncedUpdate(key, val);
    });
  });
}

function renderPolicies() {
  const body = document.getElementById('policies-body');
  if (!body) return;
  
  body.innerHTML = POLICY_DEFS.map(p => `
    <div class="toggle-group">
      <span class="toggle-name">${p.name}</span>
      <label class="toggle-switch">
        <input type="checkbox" id="pt-${p.key}" data-key="${p.key}" ${state.policies[p.key] ? 'checked' : ''}>
        <span class="toggle-track"></span>
      </label>
    </div>
  `).join('');
  
  body.querySelectorAll('input[type="checkbox"]').forEach(toggle => {
    toggle.addEventListener('change', (e) => {
      state.setPolicy(e.target.dataset.key, e.target.checked);
    });
  });
}

function renderShocks() {
  const body = document.getElementById('shocks-body');
  if (!body) return;
  
  const debouncedUpdate = debounce((key, val) => state.setShock(key, val), 80);
  
  body.innerHTML = SHOCK_DEFS.map(s => `
    <div class="slider-group shock-slider">
      <div class="slider-label">
        <span class="slider-name">${s.name}</span>
        <span class="slider-value" id="sv-${s.key}">${Math.round(state.shocks[s.key] * 100)}%</span>
      </div>
      <input type="range" class="control-slider" id="ss-${s.key}"
        min="0" max="100" value="${Math.round(state.shocks[s.key] * 100)}"
        data-key="${s.key}">
    </div>
  `).join('');
  
  body.querySelectorAll('.control-slider').forEach(slider => {
    slider.addEventListener('input', (e) => {
      const key = e.target.dataset.key;
      const val = parseInt(e.target.value) / 100;
      document.getElementById(`sv-${key}`).textContent = Math.round(val * 100) + '%';
      debouncedUpdate(key, val);
    });
  });
}

function syncControlsToState() {
  // Sync driver sliders
  DRIVER_DEFS.forEach(d => {
    const slider = document.getElementById(`ds-${d.key}`);
    const valEl = document.getElementById(`dv-${d.key}`);
    if (slider && valEl) {
      slider.value = Math.round(state.drivers[d.key] * 100);
      valEl.textContent = Math.round(state.drivers[d.key] * 100) + '%';
    }
  });
  
  // Sync policy toggles
  POLICY_DEFS.forEach(p => {
    const toggle = document.getElementById(`pt-${p.key}`);
    if (toggle) toggle.checked = !!state.policies[p.key];
  });
  
  // Sync shock sliders
  SHOCK_DEFS.forEach(s => {
    const slider = document.getElementById(`ss-${s.key}`);
    const valEl = document.getElementById(`sv-${s.key}`);
    if (slider && valEl) {
      slider.value = Math.round(state.shocks[s.key] * 100);
      valEl.textContent = Math.round(state.shocks[s.key] * 100) + '%';
    }
  });
}

// Collapsible sections
export function initCollapsible() {
  document.querySelectorAll('.control-section-header').forEach(header => {
    header.addEventListener('click', () => {
      header.parentElement.classList.toggle('collapsed');
    });
  });
}
