// Main Application Controller for the Prosperity Diffusion Dashboard
import { state } from './state.js';
import { SCENARIOS, VIEW_MODES, COUNTRIES, COUNTRY_BY_ID } from './data.js';
import { initMap } from './map.js';
import { initControls, initCollapsible } from './controls.js';
import { initKPIs } from './kpi.js';
import { initCharts, renderTrendCharts, renderWaterfallChart, renderScatterChart } from './charts.js';
import { initCountryPanel } from './countryPanel.js';
import { initComparison } from './comparison.js';

let playInterval = null;

document.addEventListener('DOMContentLoaded', () => {
  init();
});

async function init() {
  // Setup header controls
  initYearControls();
  initScenarioSelector();
  initViewModes();
  initSearch();
  initTabs();
  initMobileMenu();
  
  // Initialize modules
  initMap();
  initControls();
  initCollapsible();
  initKPIs();
  initCharts();
  initCountryPanel();
  initComparison();
  
  // Hide loading overlay
  setTimeout(() => {
    const loading = document.getElementById('loading');
    if (loading) loading.classList.add('hidden');
  }, 800);
}

// === YEAR CONTROLS ===
function initYearControls() {
  const yearDisplay = document.getElementById('year-display');
  const yearSlider = document.getElementById('year-slider');
  const playBtn = document.getElementById('play-btn');
  const stepBack = document.getElementById('step-back');
  const stepForward = document.getElementById('step-forward');
  const speedBtn = document.getElementById('speed-btn');
  
  if (yearSlider) {
    yearSlider.addEventListener('input', (e) => {
      const year = parseInt(e.target.value);
      state.setYear(year);
    });
  }
  
  state.on('yearChange', (year) => {
    if (yearDisplay) yearDisplay.textContent = year;
    if (yearSlider) yearSlider.value = year;
  });
  
  if (playBtn) {
    playBtn.addEventListener('click', () => togglePlay());
  }
  
  if (stepBack) {
    stepBack.addEventListener('click', () => {
      if (state.year > 2025) state.setYear(state.year - 1);
    });
  }
  
  if (stepForward) {
    stepForward.addEventListener('click', () => {
      if (state.year < 2100) state.setYear(state.year + 1);
    });
  }
  
  if (speedBtn) {
    speedBtn.addEventListener('click', () => {
      const speeds = [500, 300, 150, 80];
      const labels = ['1×', '2×', '3×', '5×'];
      const idx = speeds.indexOf(state.playSpeed);
      const next = (idx + 1) % speeds.length;
      state.playSpeed = speeds[next];
      speedBtn.textContent = labels[next];
      if (state.playing) {
        clearInterval(playInterval);
        startPlay();
      }
    });
  }
}

function togglePlay() {
  const btn = document.getElementById('play-btn');
  if (state.playing) {
    stopPlay();
    if (btn) btn.innerHTML = `<svg viewBox="0 0 24 24" fill="currentColor"><polygon points="5,3 19,12 5,21"/></svg>`;
  } else {
    startPlay();
    if (btn) btn.innerHTML = `<svg viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>`;
  }
}

function startPlay() {
  state.playing = true;
  document.getElementById('play-btn')?.classList.add('active');
  playInterval = setInterval(() => {
    if (state.year >= 2100) {
      stopPlay();
      document.getElementById('play-btn').innerHTML = `<svg viewBox="0 0 24 24" fill="currentColor"><polygon points="5,3 19,12 5,21"/></svg>`;
      return;
    }
    state.setYear(state.year + 1);
  }, state.playSpeed);
}

function stopPlay() {
  state.playing = false;
  document.getElementById('play-btn')?.classList.remove('active');
  if (playInterval) {
    clearInterval(playInterval);
    playInterval = null;
  }
}

// === SCENARIO SELECTOR ===
function initScenarioSelector() {
  const container = document.getElementById('scenario-selector');
  if (!container) return;
  
  container.innerHTML = Object.entries(SCENARIOS).map(([id, s]) => 
    `<button class="scenario-btn ${id === state.scenario ? 'active' : ''}" data-scenario="${id}" title="${s.description}">${s.name}</button>`
  ).join('');
  
  container.addEventListener('click', (e) => {
    const btn = e.target.closest('.scenario-btn');
    if (!btn) return;
    const scenarioId = btn.dataset.scenario;
    state.setScenario(scenarioId);
    container.querySelectorAll('.scenario-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  });
}

// === VIEW MODES ===
function initViewModes() {
  const container = document.getElementById('view-modes');
  if (!container) return;
  
  container.innerHTML = VIEW_MODES.map(v => 
    `<button class="view-mode-btn ${v.id === state.viewMode ? 'active' : ''}" data-mode="${v.id}">${v.name}</button>`
  ).join('');
  
  container.addEventListener('click', (e) => {
    const btn = e.target.closest('.view-mode-btn');
    if (!btn) return;
    state.setViewMode(btn.dataset.mode);
    container.querySelectorAll('.view-mode-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  });
}

// === SEARCH ===
function initSearch() {
  const input = document.getElementById('search-input');
  const results = document.getElementById('search-results');
  if (!input || !results) return;
  
  input.addEventListener('input', () => {
    const query = input.value.trim().toLowerCase();
    if (query.length < 1) {
      results.classList.remove('visible');
      return;
    }
    
    const matches = COUNTRIES.filter(c => 
      c.name.toLowerCase().includes(query) || 
      c.iso3.toLowerCase().includes(query) ||
      c.region.toLowerCase().includes(query)
    ).slice(0, 10);
    
    if (matches.length === 0) {
      results.classList.remove('visible');
      return;
    }
    
    results.innerHTML = matches.map(c => `
      <div class="search-result-item" data-id="${c.id}">
        ${c.name} <span class="region">${c.region}</span>
      </div>
    `).join('');
    
    results.classList.add('visible');
    
    results.querySelectorAll('.search-result-item').forEach(item => {
      item.addEventListener('click', () => {
        state.selectCountry(item.dataset.id);
        results.classList.remove('visible');
        input.value = '';
      });
    });
  });
  
  // Close results on outside click
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.header-search')) {
      results.classList.remove('visible');
    }
  });
}

// === TABS ===
function initTabs() {
  const tabs = document.querySelectorAll('.bottom-tab');
  const contents = document.querySelectorAll('.bottom-tab-content');
  
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const tabId = tab.dataset.tab;
      
      tabs.forEach(t => t.classList.remove('active'));
      contents.forEach(c => c.classList.remove('active'));
      
      tab.classList.add('active');
      const content = document.getElementById(`tab-${tabId}`);
      if (content) content.classList.add('active');
      
      state.setActiveTab(tabId);
    });
  });
}

// === MOBILE MENU ===
function initMobileMenu() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const rightRail = document.querySelector('.right-rail');
  const overlay = document.getElementById('mobile-overlay');
  
  if (menuBtn) {
    menuBtn.addEventListener('click', () => {
      rightRail?.classList.toggle('open');
      overlay?.classList.toggle('visible');
    });
  }
  
  if (overlay) {
    overlay.addEventListener('click', () => {
      rightRail?.classList.remove('open');
      overlay.classList.remove('visible');
    });
  }
}
