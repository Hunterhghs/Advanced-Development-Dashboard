// Chart visualizations for the Prosperity Diffusion Dashboard
import { state } from './state.js';
import { COUNTRIES, COUNTRY_BY_ID } from './data.js';
import { COLORS, formatNumber, formatPercent, formatCurrency } from './utils.js';
import { getDriverContributions } from './simulation.js';

let trendCharts = {};
let comparisonCharts = {};
let waterfallChart = null;
let scatterChart = null;

const chartDefaults = {
  responsive: true,
  maintainAspectRatio: false,
  animation: { duration: 400 },
  plugins: {
    legend: { display: false },
    tooltip: {
      backgroundColor: 'rgba(15, 22, 37, 0.95)',
      titleColor: '#e0e6ed',
      bodyColor: '#8892a4',
      borderColor: '#1e2a3e',
      borderWidth: 1,
      padding: 10,
      titleFont: { family: 'Inter', size: 12, weight: 600 },
      bodyFont: { family: 'JetBrains Mono', size: 11 },
      cornerRadius: 6
    }
  },
  scales: {
    x: {
      grid: { color: 'rgba(30, 42, 62, 0.5)', lineWidth: 0.5 },
      ticks: { color: '#5a6478', font: { family: 'JetBrains Mono', size: 10 } }
    },
    y: {
      grid: { color: 'rgba(30, 42, 62, 0.5)', lineWidth: 0.5 },
      ticks: { color: '#5a6478', font: { family: 'JetBrains Mono', size: 10 } }
    }
  }
};

export function initCharts() {
  state.on('tabChange', (tab) => {
    if (tab === 'trends') renderTrendCharts();
    if (tab === 'contribution') renderWaterfallChart();
    if (tab === 'scatter') renderScatterChart();
  });
  
  state.on('yearChange', () => {
    if (state.activeTab === 'trends') updateTrendCharts();
    if (state.activeTab === 'contribution') renderWaterfallChart();
    if (state.activeTab === 'scatter') renderScatterChart();
  });
  
  state.on('simUpdate', () => {
    if (state.activeTab === 'trends') renderTrendCharts();
    if (state.activeTab === 'contribution') renderWaterfallChart();
    if (state.activeTab === 'scatter') renderScatterChart();
  });
}

export function renderTrendCharts() {
  const panel = document.getElementById('trend-panel');
  if (!panel) return;
  
  const indicators = [
    { field: 'extremePoverty', label: 'Global Total Poverty (%)', color: COLORS.negative },
    { field: 'gdpPerCapita', label: 'Global GDP per Capita ($)', color: COLORS.accent },
    { field: 'energyAccess', label: 'Energy Access (%)', color: COLORS.positive },
    { field: 'internetAccess', label: 'Internet Access (%)', color: '#40c4ff' },
    { field: 'cleanEnergy', label: 'Clean Energy Share (%)', color: '#69f0ae' },
    { field: 'lifeExpectancy', label: 'Life Expectancy (years)', color: COLORS.purple }
  ];
  
  panel.innerHTML = indicators.map((ind, i) => `
    <div class="trend-chart-container">
      <div class="trend-chart-title">${ind.label}</div>
      <canvas id="trend-chart-${i}" class="trend-chart-canvas"></canvas>
    </div>
  `).join('');
  
  // Destroy previous
  Object.values(trendCharts).forEach(c => c.destroy());
  trendCharts = {};
  
  indicators.forEach((ind, i) => {
    const canvas = document.getElementById(`trend-chart-${i}`);
    if (!canvas) return;
    
    const labels = [];
    const data = [];
    for (let j = 0; j < state.globalKPIs.length; j++) {
      labels.push(2025 + j);
      data.push(state.globalKPIs[j]?.[ind.field] ?? null);
    }
    
    const yearIdx = state.yearIndex;
    const pointRadius = data.map((_, idx) => idx === yearIdx ? 4 : 0);
    
    trendCharts[i] = new Chart(canvas, {
      type: 'line',
      data: {
        labels,
        datasets: [{
          data,
          borderColor: ind.color,
          backgroundColor: ind.color + '15',
          fill: true,
          borderWidth: 1.5,
          pointRadius,
          pointBackgroundColor: ind.color,
          tension: 0.3
        }]
      },
      options: {
        ...chartDefaults,
        plugins: {
          ...chartDefaults.plugins,
          annotation: {
            annotations: {
              currentYear: {
                type: 'line',
                xMin: yearIdx,
                xMax: yearIdx,
                borderColor: 'rgba(255,255,255,0.2)',
                borderWidth: 1
              }
            }
          }
        },
        scales: {
          x: {
            ...chartDefaults.scales.x,
            ticks: {
              ...chartDefaults.scales.x.ticks,
              maxTicksLimit: 8,
              callback: (val, idx) => idx % 10 === 0 ? labels[idx] : ''
            }
          },
          y: chartDefaults.scales.y
        }
      }
    });
  });
}

function updateTrendCharts() {
  Object.values(trendCharts).forEach(chart => {
    const yearIdx = state.yearIndex;
    chart.data.datasets[0].pointRadius = chart.data.labels.map((_, idx) => idx === yearIdx ? 4 : 0);
    chart.update('none');
  });
}

export function renderWaterfallChart() {
  const container = document.getElementById('waterfall-panel');
  if (!container) return;
  
  // Use selected country or default to a representative developing economy
  const countryId = state.selectedCountry || '356'; // India as default
  const country = COUNTRY_BY_ID[countryId];
  if (!country) return;
  
  const contributions = getDriverContributions(country, state.drivers, state.policies, state.shocks);
  
  container.innerHTML = `
    <div class="waterfall-chart-container" style="flex: 1;">
      <div class="trend-chart-title">GDP Growth Driver Contributions — ${country.name} (${state.year})</div>
      <canvas id="waterfall-canvas" style="width:100%;height:200px;"></canvas>
    </div>
    <div class="waterfall-chart-container" style="flex: 0 0 300px;">
      <div class="trend-chart-title">Growth by Region</div>
      <canvas id="region-bar-canvas" style="width:100%;height:200px;"></canvas>
    </div>
  `;
  
  if (waterfallChart) waterfallChart.destroy();
  
  const canvas = document.getElementById('waterfall-canvas');
  if (!canvas) return;
  
  const labels = contributions.map(c => c.name);
  const values = contributions.map(c => c.value);
  const colors = values.map(v => v >= 0 ? COLORS.positive : COLORS.negative);
  
  // Compute cumulative for waterfall
  let cumulative = 0;
  const bgData = [];
  const barData = [];
  
  values.forEach(v => {
    if (v >= 0) {
      bgData.push(cumulative);
      barData.push(v);
    } else {
      bgData.push(cumulative + v);
      barData.push(-v);
    }
    cumulative += v;
  });
  
  // Add total
  labels.push('Total');
  bgData.push(0);
  barData.push(Math.max(0, cumulative));
  colors.push(COLORS.accent);
  
  waterfallChart = new Chart(canvas, {
    type: 'bar',
    data: {
      labels,
      datasets: [
        {
          data: bgData,
          backgroundColor: 'transparent',
          borderWidth: 0,
          barPercentage: 0.6
        },
        {
          data: barData,
          backgroundColor: colors,
          borderWidth: 0,
          barPercentage: 0.6
        }
      ]
    },
    options: {
      ...chartDefaults,
      plugins: {
        ...chartDefaults.plugins,
        tooltip: {
          ...chartDefaults.plugins.tooltip,
          callbacks: {
            label: (ctx) => {
              if (ctx.datasetIndex === 0) return '';
              const idx = ctx.dataIndex;
              if (idx < values.length) return values[idx].toFixed(2) + '% contribution';
              return cumulative.toFixed(2) + '% total growth';
            }
          }
        }
      },
      scales: {
        x: {
          ...chartDefaults.scales.x,
          stacked: true,
          ticks: { ...chartDefaults.scales.x.ticks, maxRotation: 45, font: { size: 9 } }
        },
        y: {
          ...chartDefaults.scales.y,
          stacked: true,
          ticks: { ...chartDefaults.scales.y.ticks, callback: (v) => v.toFixed(1) + '%' }
        }
      }
    }
  });
  
  // Region bar chart
  renderRegionBarChart();
}

function renderRegionBarChart() {
  const canvas = document.getElementById('region-bar-canvas');
  if (!canvas) return;
  
  const regionData = {};
  for (const country of COUNTRIES) {
    const data = state.getCountryData(country.id);
    if (!data) continue;
    if (!regionData[country.region]) {
      regionData[country.region] = { totalGDP: 0, totalPop: 0, growth: [], count: 0 };
    }
    regionData[country.region].totalGDP += data.gdppc * data.population;
    regionData[country.region].totalPop += data.population;
    regionData[country.region].growth.push(data.gdpGrowth);
    regionData[country.region].count++;
  }
  
  const regions = Object.keys(regionData);
  const avgGrowth = regions.map(r => {
    const g = regionData[r].growth;
    return g.reduce((a, b) => a + b, 0) / g.length;
  });
  
  const regionColors = ['#ff9100', '#ff80ab', '#00d4ff', '#b388ff', '#00e676', '#ffab00', '#40c4ff'];
  
  new Chart(canvas, {
    type: 'bar',
    data: {
      labels: regions.map(r => r.length > 18 ? r.substring(0, 16) + '...' : r),
      datasets: [{
        data: avgGrowth,
        backgroundColor: regionColors.slice(0, regions.length),
        borderWidth: 0,
        barPercentage: 0.6
      }]
    },
    options: {
      ...chartDefaults,
      indexAxis: 'y',
      scales: {
        x: {
          ...chartDefaults.scales.x,
          ticks: { ...chartDefaults.scales.x.ticks, callback: (v) => v.toFixed(1) + '%' }
        },
        y: {
          ...chartDefaults.scales.y,
          ticks: { ...chartDefaults.scales.y.ticks, font: { size: 9 } }
        }
      }
    }
  });
}

export function renderScatterChart() {
  const container = document.getElementById('scatter-panel');
  if (!container) return;
  
  container.innerHTML = `
    <div class="trend-chart-container" style="flex:1;min-width:400px;">
      <div class="trend-chart-title">Governance vs GDP Growth (${state.year})</div>
      <canvas id="scatter-canvas-1" style="width:100%;height:200px;"></canvas>
    </div>
    <div class="trend-chart-container" style="flex:1;min-width:400px;">
      <div class="trend-chart-title">Energy Access vs Industrialization (${state.year})</div>
      <canvas id="scatter-canvas-2" style="width:100%;height:200px;"></canvas>
    </div>
  `;
  
  // Scatter 1: Governance vs GDP Growth
  const scatterData1 = [];
  const scatterData2 = [];
  const bubbleSizes = [];
  const regionColorMap = {};
  const regionList = Object.keys(COLORS.chart.length ? {} : {});
  
  COUNTRIES.forEach((c, i) => {
    const d = state.getCountryData(c.id);
    if (!d) return;
    
    scatterData1.push({ x: d.governance, y: d.gdpGrowth, label: c.name });
    scatterData2.push({ x: d.energy, y: d.manufacturing, label: c.name });
  });
  
  const canvas1 = document.getElementById('scatter-canvas-1');
  const canvas2 = document.getElementById('scatter-canvas-2');
  
  if (canvas1) {
    new Chart(canvas1, {
      type: 'scatter',
      data: {
        datasets: [{
          data: scatterData1,
          backgroundColor: COLORS.accent + '60',
          borderColor: COLORS.accent,
          borderWidth: 1,
          pointRadius: 3,
          pointHoverRadius: 6
        }]
      },
      options: {
        ...chartDefaults,
        plugins: {
          ...chartDefaults.plugins,
          tooltip: {
            ...chartDefaults.plugins.tooltip,
            callbacks: {
              label: (ctx) => `${scatterData1[ctx.dataIndex].label}: Gov ${ctx.parsed.x.toFixed(2)}, Growth ${ctx.parsed.y.toFixed(1)}%`
            }
          }
        },
        scales: {
          x: { ...chartDefaults.scales.x, title: { display: true, text: 'Governance Index', color: '#5a6478', font: { size: 10 } } },
          y: { ...chartDefaults.scales.y, title: { display: true, text: 'GDP Growth %', color: '#5a6478', font: { size: 10 } } }
        }
      }
    });
  }
  
  if (canvas2) {
    new Chart(canvas2, {
      type: 'scatter',
      data: {
        datasets: [{
          data: scatterData2,
          backgroundColor: COLORS.positive + '60',
          borderColor: COLORS.positive,
          borderWidth: 1,
          pointRadius: 3,
          pointHoverRadius: 6
        }]
      },
      options: {
        ...chartDefaults,
        plugins: {
          ...chartDefaults.plugins,
          tooltip: {
            ...chartDefaults.plugins.tooltip,
            callbacks: {
              label: (ctx) => `${scatterData2[ctx.dataIndex].label}: Energy ${ctx.parsed.x.toFixed(0)}%, Mfg ${ctx.parsed.y.toFixed(1)}%`
            }
          }
        },
        scales: {
          x: { ...chartDefaults.scales.x, title: { display: true, text: 'Energy Access %', color: '#5a6478', font: { size: 10 } } },
          y: { ...chartDefaults.scales.y, title: { display: true, text: 'Manufacturing % GDP', color: '#5a6478', font: { size: 10 } } }
        }
      }
    });
  }
}

export function renderComparisonCharts(countryIds) {
  const container = document.getElementById('comparison-charts-grid');
  if (!container) return;
  
  const indicators = [
    { field: 'gdppc', label: 'GDP per Capita ($)' },
    { field: 'poverty', label: 'Poverty Rate (%)' },
    { field: 'energy', label: 'Energy Access (%)' },
    { field: 'internet', label: 'Internet Access (%)' },
    { field: 'education', label: 'Education Index' },
    { field: 'governance', label: 'Governance Index' }
  ];
  
  container.innerHTML = indicators.map((ind, i) => `
    <div class="comparison-chart-card">
      <div class="comparison-chart-label">${ind.label}</div>
      <canvas id="comp-chart-${i}" style="width:100%;height:150px;"></canvas>
    </div>
  `).join('');
  
  // Destroy old
  Object.values(comparisonCharts).forEach(c => c.destroy());
  comparisonCharts = {};
  
  indicators.forEach((ind, i) => {
    const canvas = document.getElementById(`comp-chart-${i}`);
    if (!canvas) return;
    
    const datasets = countryIds.map((id, ci) => {
      const country = COUNTRY_BY_ID[id];
      const years = state.simResults[id];
      if (!country || !years) return null;
      
      return {
        label: country.name,
        data: years.map(y => y[ind.field]),
        borderColor: COLORS.chart[ci % COLORS.chart.length],
        backgroundColor: 'transparent',
        borderWidth: 1.5,
        pointRadius: 0,
        tension: 0.3
      };
    }).filter(Boolean);
    
    const labels = Array.from({ length: 76 }, (_, i) => 2025 + i);
    
    comparisonCharts[i] = new Chart(canvas, {
      type: 'line',
      data: { labels, datasets },
      options: {
        ...chartDefaults,
        plugins: {
          ...chartDefaults.plugins,
          legend: {
            display: true,
            position: 'top',
            labels: {
              color: '#8892a4',
              font: { family: 'Inter', size: 10 },
              boxWidth: 12,
              padding: 8
            }
          }
        },
        scales: {
          x: {
            ...chartDefaults.scales.x,
            ticks: { ...chartDefaults.scales.x.ticks, maxTicksLimit: 5, callback: (v, i) => i % 15 === 0 ? labels[i] : '' }
          },
          y: chartDefaults.scales.y
        }
      }
    });
  });
}
