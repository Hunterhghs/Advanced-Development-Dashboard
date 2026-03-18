// Simulation engine for the Prosperity Diffusion Dashboard
// Projects country indicators forward from 2025 to 2100 based on drivers, policies, and shocks

import { COUNTRIES, SCENARIOS } from './data.js';
import { clamp } from './utils.js';

// Growth model coefficients — how each driver affects GDP growth rate
const GROWTH_WEIGHTS = {
  infrastructure: 0.14,
  digital: 0.12,
  trade: 0.10,
  institutions: 0.14,
  humanCapital: 0.12,
  demographics: 0.08,
  energy: 0.08,
  urbanProductivity: 0.06,
  financialInclusion: 0.05,
  industrialPolicy: 0.06,
  ruleOfLaw: 0.04,
  exportComplexity: 0.03
};

// Policy effects on specific indicators (annual bonus when active)
const POLICY_EFFECTS = {
  education:      { humanCapital: 0.008, education: 0.006 },
  broadband:      { internet: 0.015, digital: 0.005 },
  grid:           { energy: 0.012, infrastructure: 0.004 },
  cleanPower:     { cleanEnergy: 0.018, energy: 0.005 },
  ports:          { trade: 0.006, infrastructure: 0.005 },
  manufacturing:  { manufacturing: 0.003, industrialPolicy: 0.005, exportComplexity: 0.004 },
  health:         { lifeExp: 0.2, humanCapital: 0.003 },
  landReform:     { urbanProductivity: 0.004, gini: -0.15 },
  antiCorruption: { governance: 0.006, institutions: 0.005, ruleOfLaw: 0.004 },
  womenLabor:     { humanCapital: 0.005, demographics: 0.003 },
  smeFinance:     { financialInclusion: 0.008, gdppc: 0.003 },
  regionalTrade:  { trade: 0.008, exportComplexity: 0.004 }
};

// Shock multipliers on GDP growth
const SHOCK_EFFECTS = {
  climate:      { gdpGrowth: -0.03, agriculture: 0.02, lifeExp: -0.1, poverty: 0.005 },
  commodity:    { gdpGrowth: -0.015, exports: -0.02 },
  conflict:     { gdpGrowth: -0.05, governance: -0.008, poverty: 0.01, lifeExp: -0.3 },
  debt:         { gdpGrowth: -0.02, financialInclusion: -0.005 },
  pandemic:     { gdpGrowth: -0.04, lifeExp: -0.5, poverty: 0.008 },
  aiAdoption:   { gdpGrowth: 0.025, digital: 0.008, manufacturing: 0.002 },
  friendShoring: { gdpGrowth: -0.01, trade: -0.005 },
  techTransfer: { gdpGrowth: 0.02, digital: 0.005, education: 0.003 }
};

// Income group base growth rates
const BASE_GROWTH = {
  'Low': 0.035,
  'Lower-middle': 0.04,
  'Upper-middle': 0.03,
  'High': 0.015
};

// Country-specific growth modifiers (convergence factor)
function getConvergenceFactor(gdppc) {
  // Poorer countries can grow faster (convergence hypothesis)
  if (gdppc < 2000) return 1.5;
  if (gdppc < 5000) return 1.3;
  if (gdppc < 10000) return 1.15;
  if (gdppc < 20000) return 1.0;
  if (gdppc < 40000) return 0.85;
  return 0.7;
}

// Poverty-growth elasticity for total poverty ($6.85/day)
// Lower than extreme-poverty elasticity since the higher line is harder to cross
function getPovertyElasticity(gini) {
  // Higher inequality means less poverty reduction per unit growth
  if (gini > 50) return 0.4;
  if (gini > 40) return 0.6;
  if (gini > 30) return 0.8;
  return 1.0;
}

// Region-specific vulnerability to shocks
function getShockVulnerability(country) {
  const vulnMap = {
    'Sub-Saharan Africa': 1.4,
    'South Asia': 1.2,
    'East Asia & Pacific': 0.9,
    'Europe & Central Asia': 0.8,
    'Latin America & Caribbean': 1.0,
    'Middle East & North Africa': 1.1,
    'North America': 0.6
  };
  const base = vulnMap[country.region] || 1.0;
  // Fragile states are more vulnerable
  const govFactor = 1.5 - country.governance;
  return base * govFactor;
}

/**
 * Run simulation for all countries across the full time horizon.
 * @param {Object} drivers - Growth driver values (0-1 each)
 * @param {Object} policies - Active policy toggles (boolean each)
 * @param {Object} shocks - Shock severity values (0-1 each)
 * @returns {Object} Map of country id -> array of yearly snapshots
 */
export function runSimulation(drivers, policies, shocks) {
  const results = {};
  
  for (const country of COUNTRIES) {
    results[country.id] = simulateCountry(country, drivers, policies, shocks);
  }
  
  return results;
}

function simulateCountry(country, drivers, policies, shocks) {
  const years = [];
  let state = { ...country };

  for (let year = 2025; year <= 2100; year++) {
    // Compute GDP growth rate
    let gdpGrowth = BASE_GROWTH[country.income] || 0.025;
    const convergence = getConvergenceFactor(state.gdppc);
    
    // Driver contributions
    for (const [driver, weight] of Object.entries(GROWTH_WEIGHTS)) {
      const driverVal = drivers[driver] !== undefined ? drivers[driver] : 0.5;
      // Country-specific capacity modifier
      const capacity = getCountryCapacity(state, driver);
      gdpGrowth += (driverVal - 0.5) * weight * 2 * capacity;
    }
    
    gdpGrowth *= convergence;
    
    // Policy effects on growth and indicators
    let policyGrowthBonus = 0;
    for (const [policy, active] of Object.entries(policies)) {
      if (active && POLICY_EFFECTS[policy]) {
        const effects = POLICY_EFFECTS[policy];
        for (const [field, value] of Object.entries(effects)) {
          if (field === 'humanCapital' || field === 'digital' || field === 'infrastructure' ||
              field === 'trade' || field === 'institutions' || field === 'financialInclusion' ||
              field === 'industrialPolicy' || field === 'ruleOfLaw' || field === 'exportComplexity' ||
              field === 'urbanProductivity' || field === 'demographics') {
            // These boost the effective driver value
            policyGrowthBonus += value * GROWTH_WEIGHTS[field] * 2;
          }
        }
      }
    }
    gdpGrowth += policyGrowthBonus;
    
    // Shock effects
    const vulnerability = getShockVulnerability(state);
    for (const [shock, severity] of Object.entries(shocks)) {
      if (SHOCK_EFFECTS[shock]) {
        const effects = SHOCK_EFFECTS[shock];
        if (effects.gdpGrowth) {
          gdpGrowth += effects.gdpGrowth * severity * vulnerability;
        }
      }
    }
    
    // Clamp GDP growth
    gdpGrowth = clamp(gdpGrowth, -0.08, 0.12);
    
    // Apply GDP growth
    state.gdppc = state.gdppc * (1 + gdpGrowth);
    
    // Poverty reduction (symmetric: growth reduces poverty, contraction increases it)
    const povertyElasticity = getPovertyElasticity(state.gini);
    const povertyChange = state.poverty * gdpGrowth * povertyElasticity;
    state.poverty = clamp(state.poverty - povertyChange, 0, 90);
    
    // Policy effects on poverty
    for (const [policy, active] of Object.entries(policies)) {
      if (active) {
        if (policy === 'education') state.poverty = Math.max(0, state.poverty * 0.997);
        if (policy === 'health') state.poverty = Math.max(0, state.poverty * 0.998);
        if (policy === 'smeFinance') state.poverty = Math.max(0, state.poverty * 0.998);
        if (policy === 'landReform') state.poverty = Math.max(0, state.poverty * 0.997);
        if (policy === 'womenLabor') state.poverty = Math.max(0, state.poverty * 0.998);
      }
    }
    
    // Shock effects on poverty
    for (const [shock, severity] of Object.entries(shocks)) {
      if (SHOCK_EFFECTS[shock] && SHOCK_EFFECTS[shock].poverty) {
        state.poverty = Math.min(90, state.poverty + SHOCK_EFFECTS[shock].poverty * severity * vulnerability * 10);
      }
    }
    state.poverty = clamp(state.poverty, 0, 90);
    
    // Update other indicators
    // Urbanization (gradual increase, faster with higher growth)
    const urbanGrowth = 0.2 + Math.max(0, gdpGrowth) * 3;
    state.urban = clamp(state.urban + urbanGrowth * (1 - state.urban / 100), 5, 100);
    
    // Energy access
    let energyGain = 0.3 + (drivers.energy || 0.5) * 0.5;
    if (policies.grid) energyGain += 0.4;
    if (policies.cleanPower) energyGain += 0.3;
    state.energy = clamp(state.energy + energyGain * (1 - state.energy / 100), 0, 100);
    
    // Internet penetration
    let internetGain = 0.5 + (drivers.digital || 0.5) * 1.0;
    if (policies.broadband) internetGain += 0.8;
    if (shocks.aiAdoption) internetGain += shocks.aiAdoption * 0.3;
    state.internet = clamp(state.internet + internetGain * (1 - state.internet / 100), 0, 100);
    
    // Education
    let eduGain = 0.002 + (drivers.humanCapital || 0.5) * 0.004;
    if (policies.education) eduGain += 0.004;
    state.education = clamp(state.education + eduGain * (1 - state.education), 0, 1);
    
    // Governance
    let govGain = 0.001 + (drivers.institutions || 0.5) * 0.003;
    if (policies.antiCorruption) govGain += 0.003;
    for (const [shock, severity] of Object.entries(shocks)) {
      if (SHOCK_EFFECTS[shock] && SHOCK_EFFECTS[shock].governance) {
        govGain += SHOCK_EFFECTS[shock].governance * severity;
      }
    }
    state.governance = clamp(state.governance + govGain * (1 - state.governance), 0, 1);
    
    // Clean energy
    let cleanGain = 0.3 + (drivers.energy || 0.5) * 0.4;
    if (policies.cleanPower) cleanGain += 1.0;
    state.cleanEnergy = clamp(state.cleanEnergy + cleanGain * (1 - state.cleanEnergy / 100), 0, 100);
    
    // Life expectancy
    let lifeGain = 0.08 + Math.max(0, gdpGrowth) * 0.3;
    if (policies.health) lifeGain += 0.12;
    for (const [shock, severity] of Object.entries(shocks)) {
      if (SHOCK_EFFECTS[shock] && SHOCK_EFFECTS[shock].lifeExp) {
        lifeGain += SHOCK_EFFECTS[shock].lifeExp * severity * vulnerability;
      }
    }
    state.lifeExp = clamp(state.lifeExp + lifeGain * (1 - state.lifeExp / 90), 40, 95);
    
    // Pollution (PM2.5 µg/m³)
    // Industrialization raises pollution, clean energy and governance lower it
    let pollutionChange = 0;
    pollutionChange += Math.max(0, gdpGrowth) * state.pollution * 0.02 * (1 - state.cleanEnergy / 100);
    pollutionChange -= state.governance * 0.3;
    pollutionChange -= (state.cleanEnergy / 100) * 0.4;
    if (policies.cleanPower) pollutionChange -= 0.5;
    state.pollution = clamp(state.pollution + pollutionChange, 2, 120);
    
    // Gini (inequality)
    let giniChange = -0.05; // slow natural convergence
    if (policies.landReform) giniChange -= 0.15;
    if (policies.education) giniChange -= 0.08;
    if (policies.womenLabor) giniChange -= 0.06;
    if (policies.smeFinance) giniChange -= 0.05;
    if (gdpGrowth < 0) giniChange += 0.1; // recessions increase inequality
    state.gini = clamp(state.gini + giniChange, 20, 70);
    
    // Population (simplified model)
    let popGrowth = 0;
    if (country.region === 'Sub-Saharan Africa') popGrowth = 0.024 * Math.pow(0.995, year - 2025);
    else if (country.region === 'South Asia') popGrowth = 0.012 * Math.pow(0.994, year - 2025);
    else if (country.region === 'Middle East & North Africa') popGrowth = 0.014 * Math.pow(0.994, year - 2025);
    else if (country.region === 'Latin America & Caribbean') popGrowth = 0.008 * Math.pow(0.993, year - 2025);
    else if (country.region === 'East Asia & Pacific') popGrowth = 0.004 * Math.pow(0.992, year - 2025);
    else if (country.region === 'Europe & Central Asia') popGrowth = -0.001 * Math.pow(1.001, year - 2025);
    else popGrowth = 0.003 * Math.pow(0.993, year - 2025);
    state.population = state.population * (1 + popGrowth);
    
    // Sector shifts
    if (state.gdppc > country.gdppc) {
      const shift = Math.min(0.2, (state.gdppc - country.gdppc) / country.gdppc * 0.05);
      state.agriculture = Math.max(0, country.agriculture - shift * country.agriculture);
      state.services = Math.min(85, country.services + shift * 10);
      state.manufacturing = clamp(country.manufacturing + shift * 5 * (state.gdppc < 20000 ? 1 : -0.5), 2, 35);
    }
    
    // Compute risk score
    state.risk = computeRiskScore(state, shocks);
    
    // Compute composite Development Index (0–1)
    // Weighted blend of income, health, education, infrastructure, governance, equality
    const diIncome = Math.min(1, Math.log10(Math.max(1, state.gdppc)) / Math.log10(100000));
    const diHealth = Math.min(1, (state.lifeExp - 40) / 50);
    const diEdu = state.education;
    const diInfra = ((state.energy + state.internet) / 2) / 100;
    const diGov = state.governance;
    const diEquality = 1 - Math.min(1, (state.gini - 20) / 50);
    const diPoverty = 1 - Math.min(1, state.poverty / 70);
    state.devIndex = clamp(
      diIncome * 0.20 + diHealth * 0.15 + diEdu * 0.15 + diInfra * 0.15 + diGov * 0.10 + diEquality * 0.10 + diPoverty * 0.15,
      0, 1
    );
    
    years.push({
      year,
      gdppc: Math.round(state.gdppc),
      poverty: Math.round(state.poverty * 100) / 100,
      population: Math.round(state.population * 10) / 10,
      urban: Math.round(state.urban * 10) / 10,
      energy: Math.round(state.energy * 10) / 10,
      internet: Math.round(state.internet * 10) / 10,
      education: Math.round(state.education * 1000) / 1000,
      governance: Math.round(state.governance * 1000) / 1000,
      gini: Math.round(state.gini * 10) / 10,
      lifeExp: Math.round(state.lifeExp * 10) / 10,
      cleanEnergy: Math.round(state.cleanEnergy * 10) / 10,
      manufacturing: Math.round(state.manufacturing * 10) / 10,
      services: Math.round(state.services * 10) / 10,
      agriculture: Math.round(state.agriculture * 10) / 10,
      risk: Math.round(state.risk * 1000) / 1000,
      devIndex: Math.round(state.devIndex * 1000) / 1000,
      pollution: Math.round(state.pollution * 10) / 10,
      gdpGrowth: Math.round(gdpGrowth * 10000) / 100
    });
  }
  
  return years;
}

function getCountryCapacity(state, driver) {
  // Countries with better governance absorb investment more effectively
  const govMultiplier = 0.5 + state.governance * 0.8;
  // Countries with better education can better leverage technology
  const eduMultiplier = driver === 'digital' || driver === 'exportComplexity' 
    ? 0.5 + state.education * 0.8 
    : 1.0;
  return govMultiplier * eduMultiplier;
}

function computeRiskScore(state, shocks) {
  let risk = 0;
  risk += (1 - state.governance) * 0.25;
  risk += (state.poverty / 100) * 0.15;
  risk += (1 - state.energy / 100) * 0.1;
  risk += (1 - state.education) * 0.1;
  risk += (state.gini / 100) * 0.1;
  risk += (shocks.climate || 0) * 0.1;
  risk += (shocks.conflict || 0) * 0.12;
  risk += (shocks.debt || 0) * 0.08;
  return clamp(risk, 0, 1);
}

/**
 * Get aggregated global KPIs for a specific year from simulation results
 */
export function getGlobalKPIs(simResults, yearIndex) {
  let totalPop = 0, totalPovPop = 0, totalGDP = 0;
  let weightedUrban = 0, weightedEnergy = 0, weightedInternet = 0;
  let weightedCleanEnergy = 0, weightedLifeExp = 0, weightedGini = 0;
  let weightedEducation = 0, weightedGovernance = 0;
  let count = 0;
  
  for (const [countryId, years] of Object.entries(simResults)) {
    const d = years[yearIndex];
    if (!d) continue;
    const pop = d.population;
    totalPop += pop;
    totalPovPop += pop * d.poverty / 100;
    totalGDP += d.gdppc * pop;
    weightedUrban += d.urban * pop;
    weightedEnergy += d.energy * pop;
    weightedInternet += d.internet * pop;
    weightedCleanEnergy += d.cleanEnergy * pop;
    weightedLifeExp += d.lifeExp * pop;
    weightedGini += d.gini * pop;
    weightedEducation += d.education * pop;
    weightedGovernance += d.governance * pop;
    count++;
  }
  
  return {
    population: totalPop,
    extremePoverty: totalPop > 0 ? (totalPovPop / totalPop * 100) : 0,
    peopleLiftedFromPoverty: 0, // computed as delta
    gdpPerCapita: totalPop > 0 ? totalGDP / totalPop : 0,
    urbanization: totalPop > 0 ? weightedUrban / totalPop : 0,
    energyAccess: totalPop > 0 ? weightedEnergy / totalPop : 0,
    internetAccess: totalPop > 0 ? weightedInternet / totalPop : 0,
    cleanEnergy: totalPop > 0 ? weightedCleanEnergy / totalPop : 0,
    lifeExpectancy: totalPop > 0 ? weightedLifeExp / totalPop : 0,
    inequality: totalPop > 0 ? weightedGini / totalPop : 0,
    education: totalPop > 0 ? weightedEducation / totalPop : 0,
    governance: totalPop > 0 ? weightedGovernance / totalPop : 0,
    totalGDP: totalGDP,
    povertyPopulation: totalPovPop
  };
}

/**
 * Get country data for a specific year
 */
export function getCountryYear(simResults, countryId, yearIndex) {
  const years = simResults[countryId];
  return years ? years[yearIndex] : null;
}

/**
 * Get time series for a specific country and indicator
 */
export function getTimeSeries(simResults, countryId, field) {
  const years = simResults[countryId];
  if (!years) return [];
  return years.map(y => ({ year: y.year, value: y[field] }));
}

/**
 * Compute driver contribution analysis (waterfall data)
 */
export function getDriverContributions(country, drivers, policies, shocks) {
  const contributions = [];
  const baseGrowth = BASE_GROWTH[country.income] || 0.025;
  const state = country;
  const convergence = getConvergenceFactor(state.gdppc);
  
  contributions.push({ name: 'Base Growth', value: baseGrowth * convergence * 100 });
  
  for (const [driver, weight] of Object.entries(GROWTH_WEIGHTS)) {
    const driverVal = drivers[driver] !== undefined ? drivers[driver] : 0.5;
    const capacity = getCountryCapacity(state, driver);
    const contribution = (driverVal - 0.5) * weight * 2 * capacity * convergence * 100;
    if (Math.abs(contribution) > 0.01) {
      contributions.push({ 
        name: driver.replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase()),
        value: contribution 
      });
    }
  }
  
  // Policy contribution
  let policyTotal = 0;
  for (const [policy, active] of Object.entries(policies)) {
    if (active && POLICY_EFFECTS[policy]) {
      for (const [field, value] of Object.entries(POLICY_EFFECTS[policy])) {
        if (GROWTH_WEIGHTS[field]) {
          policyTotal += value * GROWTH_WEIGHTS[field] * 2 * convergence * 100;
        }
      }
    }
  }
  if (Math.abs(policyTotal) > 0.01) {
    contributions.push({ name: 'Policy Reforms', value: policyTotal });
  }
  
  // Shock contribution
  const vulnerability = getShockVulnerability(state);
  let shockTotal = 0;
  for (const [shock, severity] of Object.entries(shocks)) {
    if (SHOCK_EFFECTS[shock] && SHOCK_EFFECTS[shock].gdpGrowth) {
      shockTotal += SHOCK_EFFECTS[shock].gdpGrowth * severity * vulnerability * 100;
    }
  }
  if (Math.abs(shockTotal) > 0.01) {
    contributions.push({ name: 'External Shocks', value: shockTotal });
  }
  
  return contributions;
}

/**
 * Get top 5 policy bottlenecks for a country
 */
export function getBottlenecks(countryData) {
  const indicators = [
    { name: 'Energy Access', value: countryData.energy, target: 100, field: 'energy' },
    { name: 'Digital Connectivity', value: countryData.internet, target: 100, field: 'internet' },
    { name: 'Education', value: countryData.education * 100, target: 100, field: 'education' },
    { name: 'Governance', value: countryData.governance * 100, target: 100, field: 'governance' },
    { name: 'Urbanization', value: countryData.urban, target: 80, field: 'urban' },
    { name: 'Clean Energy', value: countryData.cleanEnergy, target: 80, field: 'cleanEnergy' },
    { name: 'Poverty Reduction', value: 100 - countryData.poverty, target: 100, field: 'poverty' }
  ];
  
  return indicators
    .map(i => ({ ...i, gap: i.target - i.value }))
    .filter(i => i.gap > 5)
    .sort((a, b) => b.gap - a.gap)
    .slice(0, 5);
}

/**
 * Get recommended high-impact policy levers for a country
 */
export function getRecommendedPolicies(countryData) {
  const recs = [];
  if (countryData.education < 0.6) recs.push({ policy: 'Education Expansion', impact: 'High', reason: 'Low education index limits human capital growth' });
  if (countryData.internet < 50) recs.push({ policy: 'Broadband Rollout', impact: 'High', reason: 'Limited digital connectivity hinders productivity' });
  if (countryData.energy < 80) recs.push({ policy: 'Grid Modernization', impact: 'High', reason: 'Unreliable energy access constrains industry' });
  if (countryData.governance < 0.4) recs.push({ policy: 'Governance Reform', impact: 'Critical', reason: 'Weak institutions reduce investment effectiveness' });
  if (countryData.cleanEnergy < 30) recs.push({ policy: 'Clean Energy Deployment', impact: 'Medium', reason: 'Fossil dependency creates transition risk' });
  if (countryData.gini > 45) recs.push({ policy: 'Land & Housing Reform', impact: 'Medium', reason: 'High inequality limits poverty reduction from growth' });
  if (countryData.poverty > 20) recs.push({ policy: 'SME Finance Access', impact: 'High', reason: 'Financial inclusion accelerates bottom-40% income growth' });
  return recs.slice(0, 5);
}
