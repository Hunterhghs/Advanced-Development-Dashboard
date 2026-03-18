// State management for the Prosperity Diffusion Dashboard
import { SCENARIOS } from './data.js';
import { runSimulation, getGlobalKPIs } from './simulation.js';

class AppState {
  constructor() {
    this.year = 2025;
    this.yearIndex = 0;
    this.playing = false;
    this.playSpeed = 300; // ms per year
    this.scenario = 'baseline';
    this.viewMode = 'devIndex';
    this.geoMode = 'global';
    this.selectedCountry = null;
    this.comparisonCountries = [];
    this.showComparison = false;
    this.activeTab = 'kpis';
    this.mapLayer = 'poverty';
    this.showFlows = false;
    this.flowType = 'trade';
    
    // Initialize from baseline scenario
    const baseline = SCENARIOS.baseline;
    this.drivers = { ...baseline.drivers };
    this.policies = {
      education: false, broadband: false, grid: false, cleanPower: false,
      ports: false, manufacturing: false, health: false, landReform: false,
      antiCorruption: false, womenLabor: false, smeFinance: false, regionalTrade: false,
      ...baseline.policies
    };
    this.shocks = { ...baseline.shocks };
    
    // Listeners
    this._listeners = {};
    
    // Run initial simulation
    this.simResults = null;
    this.globalKPIs = null;
    this.baselineResults = null;
    this.runSim();
  }
  
  on(event, fn) {
    if (!this._listeners[event]) this._listeners[event] = [];
    this._listeners[event].push(fn);
  }
  
  emit(event, data) {
    const fns = this._listeners[event];
    if (fns) fns.forEach(fn => fn(data));
  }
  
  runSim() {
    this.simResults = runSimulation(this.drivers, this.policies, this.shocks);
    this.globalKPIs = [];
    for (let i = 0; i <= 75; i++) {
      this.globalKPIs.push(getGlobalKPIs(this.simResults, i));
    }
    // Store baseline for delta comparisons
    if (!this.baselineResults) {
      this.baselineResults = runSimulation(
        SCENARIOS.baseline.drivers,
        { education: false, broadband: false, grid: false, cleanPower: false,
          ports: false, manufacturing: false, health: false, landReform: false,
          antiCorruption: false, womenLabor: false, smeFinance: false, regionalTrade: false },
        SCENARIOS.baseline.shocks
      );
    }
  }
  
  setYear(year) {
    this.year = year;
    this.yearIndex = year - 2025;
    this.emit('yearChange', year);
  }
  
  setScenario(scenarioId) {
    this.scenario = scenarioId;
    const s = SCENARIOS[scenarioId];
    if (s) {
      this.drivers = { ...s.drivers };
      this.policies = {
        education: false, broadband: false, grid: false, cleanPower: false,
        ports: false, manufacturing: false, health: false, landReform: false,
        antiCorruption: false, womenLabor: false, smeFinance: false, regionalTrade: false,
        ...s.policies
      };
      this.shocks = { ...s.shocks };
      this.runSim();
      this.emit('scenarioChange', scenarioId);
      this.emit('simUpdate');
    }
  }
  
  setViewMode(mode) {
    this.viewMode = mode;
    this.mapLayer = mode;
    this.emit('viewModeChange', mode);
  }
  
  setDriver(key, value) {
    this.drivers[key] = value;
    this.runSim();
    this.emit('simUpdate');
  }
  
  setPolicy(key, value) {
    this.policies[key] = value;
    this.runSim();
    this.emit('simUpdate');
  }
  
  setShock(key, value) {
    this.shocks[key] = value;
    this.runSim();
    this.emit('simUpdate');
  }
  
  selectCountry(countryId) {
    this.selectedCountry = countryId;
    this.emit('countrySelect', countryId);
  }
  
  deselectCountry() {
    this.selectedCountry = null;
    this.emit('countryDeselect');
  }
  
  toggleComparison(countryId) {
    const idx = this.comparisonCountries.indexOf(countryId);
    if (idx >= 0) {
      this.comparisonCountries.splice(idx, 1);
    } else if (this.comparisonCountries.length < 6) {
      this.comparisonCountries.push(countryId);
    }
    this.emit('comparisonChange', this.comparisonCountries);
  }
  
  setActiveTab(tab) {
    this.activeTab = tab;
    this.emit('tabChange', tab);
  }
  
  toggleFlows(show, type) {
    this.showFlows = show;
    if (type) this.flowType = type;
    this.emit('flowsChange', { show, type });
  }
  
  getCountryData(countryId, yearIndex) {
    const yi = yearIndex !== undefined ? yearIndex : this.yearIndex;
    const years = this.simResults[countryId];
    return years ? years[yi] : null;
  }
  
  getCurrentGlobalKPIs() {
    return this.globalKPIs[this.yearIndex] || this.globalKPIs[0];
  }
  
  getBaselineGlobalKPIs() {
    if (!this.baselineResults) return null;
    let totalPop = 0, totalPovPop = 0, totalGDP = 0;
    for (const [id, years] of Object.entries(this.baselineResults)) {
      const d = years[this.yearIndex];
      if (!d) continue;
      totalPop += d.population;
      totalPovPop += d.population * d.poverty / 100;
      totalGDP += d.gdppc * d.population;
    }
    return {
      extremePoverty: totalPop > 0 ? totalPovPop / totalPop * 100 : 0,
      gdpPerCapita: totalPop > 0 ? totalGDP / totalPop : 0
    };
  }
}

export const state = new AppState();
