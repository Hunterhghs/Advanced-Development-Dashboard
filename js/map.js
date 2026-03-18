// Interactive D3 World Map for the Prosperity Diffusion Dashboard
import { state } from './state.js';
import { COUNTRIES, COUNTRY_BY_ID, VIEW_MODES, TRADE_FLOWS, COUNTRY_BY_ISO3, DIFFUSION_NODES } from './data.js';
import { COLORS, getColorScale, formatNumber, formatPercent, formatCurrency } from './utils.js';

let svg, g, projection, path, zoom;
let countryPaths = {};
let tooltip, legendEl;
let width, height;
let topoData = null;
let flowsGroup, countriesGroup, graticuleGroup, nodesGroup;
let showNodes = true;

export function initMap() {
  const container = document.querySelector('.map-container');
  if (!container) return;
  
  width = container.clientWidth;
  height = container.clientHeight;
  
  svg = d3.select(container)
    .append('svg')
    .attr('width', '100%')
    .attr('height', '100%')
    .attr('viewBox', `0 0 ${width} ${height}`)
    .attr('preserveAspectRatio', 'xMidYMid meet');
  
  // Projection
  projection = d3.geoNaturalEarth1()
    .scale(width / 5.5)
    .translate([width / 2, height / 2]);
  
  path = d3.geoPath().projection(projection);
  
  // Zoom behavior
  zoom = d3.zoom()
    .scaleExtent([1, 8])
    .on('zoom', (event) => {
      g.attr('transform', event.transform);
    });
  
  svg.call(zoom);
  g = svg.append('g');
  
  // Layers
  // Sphere background
  g.append('path')
    .datum({ type: 'Sphere' })
    .attr('class', 'sphere')
    .attr('d', path);
  
  // Graticule
  graticuleGroup = g.append('g').attr('class', 'graticule-group');
  const graticule = d3.geoGraticule().step([20, 20]);
  graticuleGroup.append('path')
    .datum(graticule)
    .attr('class', 'graticule')
    .attr('d', path);
  
  // Countries layer
  countriesGroup = g.append('g').attr('class', 'countries-group');
  
  // Flows layer
  flowsGroup = g.append('g').attr('class', 'flows-group');
  
  // Diffusion nodes layer
  nodesGroup = g.append('g').attr('class', 'nodes-group');
  
  // Tooltip
  tooltip = document.querySelector('.map-tooltip');
  legendEl = document.querySelector('.map-legend');
  
  // Load TopoJSON
  loadWorldData();
  
  // Setup zoom controls
  setupZoomControls();
  
  // Setup overlay controls
  setupOverlayControls();
  
  // Resize
  window.addEventListener('resize', handleResize);
  
  // State listeners
  state.on('yearChange', () => updateColors());
  state.on('simUpdate', () => updateColors());
  state.on('viewModeChange', () => { updateColors(); updateLegend(); });
  state.on('countrySelect', (id) => highlightCountry(id));
  state.on('countryDeselect', () => clearHighlight());
  state.on('flowsChange', ({ show }) => { if (show) { drawFlows(); drawDiffusionNodes(); } else { clearFlows(); clearNodes(); } });
}

async function loadWorldData() {
  try {
    const response = await fetch('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json');
    topoData = await response.json();
    drawCountries();
    updateColors();
    updateLegend();
  } catch (e) {
    console.error('Failed to load world data:', e);
  }
}

function drawCountries() {
  if (!topoData) return;
  
  const countries = topojson.feature(topoData, topoData.objects.countries);
  
  countriesGroup.selectAll('.country-path')
    .data(countries.features)
    .join('path')
    .attr('class', 'country-path')
    .attr('d', path)
    .attr('data-id', d => d.id)
    .on('mouseover', handleMouseOver)
    .on('mousemove', handleMouseMove)
    .on('mouseout', handleMouseOut)
    .on('click', handleClick);
  
  // Store references
  countriesGroup.selectAll('.country-path').each(function(d) {
    countryPaths[d.id] = this;
  });
}

function updateColors() {
  if (!topoData) return;
  
  const viewMode = VIEW_MODES.find(v => v.id === state.viewMode) || VIEW_MODES[0];
  const colorScaleColors = COLORS[viewMode.colorScale] || COLORS.gdpScale;
  
  countriesGroup.selectAll('.country-path')
    .transition()
    .duration(400)
    .attr('fill', d => {
      const countryData = state.getCountryData(String(d.id));
      if (!countryData) return '#0d1220';
      
      let value;
      value = countryData[viewMode.field];
      
      if (value === undefined || value === null) return '#0d1220';
      
      let min = viewMode.min;
      let max = viewMode.max;
      
      if (viewMode.log) {
        value = Math.log10(Math.max(1, value));
        min = Math.log10(Math.max(1, min));
        max = Math.log10(Math.max(1, max));
      }
      
      let t = (value - min) / (max - min);
      t = Math.max(0, Math.min(1, t));
      if (viewMode.invert) t = 1 - t;
      
      const idx = t * (colorScaleColors.length - 1);
      const lo = Math.floor(idx);
      const hi = Math.min(lo + 1, colorScaleColors.length - 1);
      const frac = idx - lo;
      
      return interpolateColor(colorScaleColors[lo], colorScaleColors[hi], frac);
    });
}

function interpolateColor(c1, c2, t) {
  const r1 = parseInt(c1.slice(1, 3), 16), g1 = parseInt(c1.slice(3, 5), 16), b1 = parseInt(c1.slice(5, 7), 16);
  const r2 = parseInt(c2.slice(1, 3), 16), g2 = parseInt(c2.slice(3, 5), 16), b2 = parseInt(c2.slice(5, 7), 16);
  const r = Math.round(r1 + (r2 - r1) * t);
  const gv = Math.round(g1 + (g2 - g1) * t);
  const b = Math.round(b1 + (b2 - b1) * t);
  return `rgb(${r},${gv},${b})`;
}

function handleMouseOver(event, d) {
  const countryInfo = COUNTRY_BY_ID[String(d.id)];
  const countryData = state.getCountryData(String(d.id));
  if (!countryInfo || !countryData) {
    tooltip.classList.remove('visible');
    return;
  }
  
  d3.select(this).raise();
  
  tooltip.innerHTML = `
    <div class="map-tooltip-name">${countryInfo.name}</div>
    <div class="map-tooltip-row">
      <span class="map-tooltip-label">GDP per Capita</span>
      <span class="map-tooltip-value">${formatCurrency(countryData.gdppc)}</span>
    </div>
    <div class="map-tooltip-row">
      <span class="map-tooltip-label">Total Poverty Rate</span>
      <span class="map-tooltip-value">${formatPercent(countryData.poverty)}</span>
    </div>
    <div class="map-tooltip-row">
      <span class="map-tooltip-label">Population</span>
      <span class="map-tooltip-value">${formatNumber(countryData.population * 1e6)}</span>
    </div>
    <div class="map-tooltip-row">
      <span class="map-tooltip-label">Energy Access</span>
      <span class="map-tooltip-value">${formatPercent(countryData.energy)}</span>
    </div>
    <div class="map-tooltip-row">
      <span class="map-tooltip-label">Internet</span>
      <span class="map-tooltip-value">${formatPercent(countryData.internet)}</span>
    </div>
    <div class="map-tooltip-row">
      <span class="map-tooltip-label">Growth Rate</span>
      <span class="map-tooltip-value" style="color:${countryData.gdpGrowth >= 0 ? 'var(--positive)' : 'var(--negative)'}">${countryData.gdpGrowth >= 0 ? '+' : ''}${countryData.gdpGrowth.toFixed(1)}%</span>
    </div>
  `;
  tooltip.classList.add('visible');
}

function handleMouseMove(event) {
  const mapPanel = document.querySelector('.map-panel');
  const rect = mapPanel.getBoundingClientRect();
  let x = event.clientX - rect.left + 15;
  let y = event.clientY - rect.top - 10;
  
  // Keep tooltip in view
  if (x + 220 > rect.width) x = event.clientX - rect.left - 225;
  if (y + 180 > rect.height) y = event.clientY - rect.top - 190;
  
  tooltip.style.left = x + 'px';
  tooltip.style.top = y + 'px';
}

function handleMouseOut() {
  tooltip.classList.remove('visible');
}

function handleClick(event, d) {
  const countryId = String(d.id);
  const countryInfo = COUNTRY_BY_ID[countryId];
  if (!countryInfo) return;
  
  if (event.shiftKey) {
    // Shift+click for comparison
    state.toggleComparison(countryId);
    updateComparisonHighlights();
  } else {
    state.selectCountry(countryId);
  }
}

function highlightCountry(countryId) {
  // Clear previous selection
  countriesGroup.selectAll('.country-path').classed('selected', false);
  
  if (countryPaths[countryId]) {
    d3.select(countryPaths[countryId]).classed('selected', true).raise();
  }
}

function clearHighlight() {
  countriesGroup.selectAll('.country-path').classed('selected', false);
}

function updateComparisonHighlights() {
  countriesGroup.selectAll('.country-path').classed('comparison', false);
  for (const id of state.comparisonCountries) {
    if (countryPaths[id]) {
      d3.select(countryPaths[id]).classed('comparison', true);
    }
  }
}

const FLOW_COLORS = {
  trade: '#00d4ff',
  energy: '#ffab00',
  tech: '#b388ff',
  finance: '#00e676'
};

function drawFlows() {
  clearFlows();
  
  // Add SVG defs for arrowheads and glow
  let defs = svg.select('defs');
  if (defs.empty()) defs = svg.append('defs');
  
  // Arrow markers per type
  for (const [type, color] of Object.entries(FLOW_COLORS)) {
    if (defs.select(`#arrow-${type}`).empty()) {
      defs.append('marker')
        .attr('id', `arrow-${type}`)
        .attr('viewBox', '0 0 10 6')
        .attr('refX', 10)
        .attr('refY', 3)
        .attr('markerWidth', 8)
        .attr('markerHeight', 5)
        .attr('orient', 'auto')
        .append('path')
        .attr('d', 'M0,0 L10,3 L0,6 Z')
        .attr('fill', color)
        .attr('fill-opacity', 0.6);
    }
  }
  
  // Glow filter
  if (defs.select('#flow-glow').empty()) {
    const glow = defs.append('filter').attr('id', 'flow-glow');
    glow.append('feGaussianBlur').attr('stdDeviation', '2').attr('result', 'coloredBlur');
    const merge = glow.append('feMerge');
    merge.append('feMergeNode').attr('in', 'coloredBlur');
    merge.append('feMergeNode').attr('in', 'SourceGraphic');
  }
  
  const flows = TRADE_FLOWS.filter(f => {
    const fromC = COUNTRY_BY_ISO3[f.from];
    const toC = COUNTRY_BY_ISO3[f.to];
    return fromC && toC;
  });
  
  flows.forEach((flow, i) => {
    const from = COUNTRY_BY_ISO3[flow.from];
    const to = COUNTRY_BY_ISO3[flow.to];
    
    const source = projection([from.lon, from.lat]);
    const target = projection([to.lon, to.lat]);
    
    if (!source || !target) return;
    
    const dx = target[0] - source[0];
    const dy = target[1] - source[1];
    const dist = Math.sqrt(dx * dx + dy * dy);
    const dr = dist * 1.5;
    
    const color = FLOW_COLORS[flow.type] || FLOW_COLORS.trade;
    const opacity = Math.min(0.55, flow.volume / 600 * 0.4 + 0.12);
    const strokeWidth = Math.min(2.5, flow.volume / 600 * 2 + 0.5);
    
    const pathD = `M${source[0]},${source[1]}A${dr},${dr} 0 0,1 ${target[0]},${target[1]}`;
    
    // Glow under-layer
    flowsGroup.append('path')
      .attr('class', 'trade-arc-glow')
      .attr('d', pathD)
      .style('stroke', color)
      .style('stroke-opacity', opacity * 0.3)
      .style('stroke-width', strokeWidth + 2)
      .style('filter', 'url(#flow-glow)');
    
    // Main arc
    flowsGroup.append('path')
      .attr('class', 'trade-arc animated')
      .attr('d', pathD)
      .attr('id', `flow-path-${i}`)
      .style('stroke', color)
      .style('stroke-opacity', opacity)
      .style('stroke-width', strokeWidth)
      .attr('marker-end', `url(#arrow-${flow.type || 'trade'})`);
    
    // Animated particle along path
    if (flow.volume > 30) {
      const particle = flowsGroup.append('circle')
        .attr('class', 'flow-particle')
        .attr('r', Math.min(3, strokeWidth + 0.5))
        .attr('fill', color)
        .attr('fill-opacity', 0.9);
      
      function animateParticle() {
        const pathEl = flowsGroup.select(`#flow-path-${i}`).node();
        if (!pathEl) return;
        const totalLength = pathEl.getTotalLength();
        particle
          .attr('opacity', 1)
          .transition()
          .duration(2000 + Math.random() * 2000)
          .ease(d3.easeLinear)
          .attrTween('transform', function() {
            return function(t) {
              const pt = pathEl.getPointAtLength(t * totalLength);
              return `translate(${pt.x},${pt.y})`;
            };
          })
          .on('end', animateParticle);
      }
      // Stagger starts
      setTimeout(animateParticle, Math.random() * 2000);
    }
  });
}

function clearFlows() {
  flowsGroup.selectAll('*').remove();
}

function drawDiffusionNodes() {
  clearNodes();
  
  const NODE_COLORS = {
    finance: '#00e676',
    trade: '#00d4ff',
    tech: '#b388ff',
    manufacturing: '#ff9100'
  };
  
  const tierRadius = { 1: 5, 2: 3.5, 3: 2.5 };
  const tierPulse = { 1: 10, 2: 7, 3: 5 };
  
  DIFFUSION_NODES.forEach(node => {
    const pos = projection([node.lon, node.lat]);
    if (!pos) return;
    
    const color = NODE_COLORS[node.type] || '#00d4ff';
    const r = tierRadius[node.tier] || 3;
    const pulseR = tierPulse[node.tier] || 6;
    
    const nodeG = nodesGroup.append('g')
      .attr('transform', `translate(${pos[0]},${pos[1]})`);
    
    // Pulse ring
    nodeG.append('circle')
      .attr('class', 'node-pulse')
      .attr('r', r)
      .attr('fill', 'none')
      .attr('stroke', color)
      .attr('stroke-width', 1)
      .attr('stroke-opacity', 0.6);
    
    // Solid core
    nodeG.append('circle')
      .attr('class', 'node-core')
      .attr('r', r)
      .attr('fill', color)
      .attr('fill-opacity', 0.85)
      .attr('stroke', '#fff')
      .attr('stroke-width', node.tier === 1 ? 1.2 : 0.6)
      .attr('stroke-opacity', 0.5);
    
    // Label for tier 1 & 2
    if (node.tier <= 2) {
      nodeG.append('text')
        .attr('class', 'node-label')
        .attr('x', r + 3)
        .attr('y', 3)
        .attr('fill', '#c0c8d8')
        .attr('font-size', node.tier === 1 ? '7px' : '5.5px')
        .attr('font-family', 'Inter, sans-serif')
        .attr('font-weight', node.tier === 1 ? '600' : '400')
        .attr('opacity', node.tier === 1 ? 0.9 : 0.7)
        .text(node.name);
    }
  });
  
  // Animate pulse rings
  function pulseAnimate() {
    nodesGroup.selectAll('.node-pulse')
      .transition()
      .duration(2000)
      .attr('r', function() {
        const core = d3.select(this.parentNode).select('.node-core');
        return parseFloat(core.attr('r')) * 2.5;
      })
      .attr('stroke-opacity', 0)
      .transition()
      .duration(0)
      .attr('r', function() {
        const core = d3.select(this.parentNode).select('.node-core');
        return parseFloat(core.attr('r'));
      })
      .attr('stroke-opacity', 0.6)
      .on('end', pulseAnimate);
  }
  pulseAnimate();
}

function clearNodes() {
  nodesGroup.selectAll('*').remove();
}

function updateLegend() {
  if (!legendEl) return;
  const viewMode = VIEW_MODES.find(v => v.id === state.viewMode) || VIEW_MODES[0];
  const colors = COLORS[viewMode.colorScale] || COLORS.gdpScale;
  
  const gradient = viewMode.invert ? [...colors].reverse() : colors;
  const gradientCSS = `linear-gradient(to right, ${gradient.join(', ')})`;
  
  let minLabel = viewMode.min;
  let maxLabel = viewMode.max;
  
  if (viewMode.unit === '$') {
    minLabel = formatCurrency(viewMode.min);
    maxLabel = formatCurrency(viewMode.max);
  } else if (viewMode.unit === '%') {
    minLabel = viewMode.min + '%';
    maxLabel = viewMode.max + '%';
  } else if (viewMode.unit === 'yr') {
    minLabel = viewMode.min + 'yr';
    maxLabel = viewMode.max + 'yr';
  } else if (viewMode.unit === 'idx') {
    minLabel = 'Low';
    maxLabel = 'High';
  }
  
  const title = viewMode.id === 'devIndex' ? 'DEVELOPMENT INDEX' : viewMode.name.toUpperCase();
  
  legendEl.innerHTML = `
    <div class="map-legend-title">${title}</div>
    <div class="map-legend-bar" style="background:${gradientCSS}"></div>
    <div class="map-legend-labels">
      <span>${minLabel}</span>
      <span>${maxLabel}</span>
    </div>
  `;
}

function setupZoomControls() {
  document.querySelector('.zoom-in')?.addEventListener('click', () => {
    svg.transition().duration(300).call(zoom.scaleBy, 1.5);
  });
  document.querySelector('.zoom-out')?.addEventListener('click', () => {
    svg.transition().duration(300).call(zoom.scaleBy, 0.67);
  });
  document.querySelector('.zoom-reset')?.addEventListener('click', () => {
    svg.transition().duration(500).call(zoom.transform, d3.zoomIdentity);
  });
}

function setupOverlayControls() {
  document.querySelectorAll('.map-overlay-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const layer = btn.dataset.layer;
      if (layer === 'flows') {
        btn.classList.toggle('active');
        state.toggleFlows(btn.classList.contains('active'), 'trade');
      }
    });
  });
}

function handleResize() {
  const container = document.querySelector('.map-container');
  if (!container) return;
  width = container.clientWidth;
  height = container.clientHeight;
  
  svg.attr('viewBox', `0 0 ${width} ${height}`);
  
  projection
    .scale(width / 5.5)
    .translate([width / 2, height / 2]);
  
  if (topoData) {
    countriesGroup.selectAll('.country-path').attr('d', path);
    g.select('.sphere').attr('d', path);
    g.select('.graticule').attr('d', path);
    if (state.showFlows) {
      drawFlows();
      drawDiffusionNodes();
    }
  }
}

export function zoomToCountry(countryId) {
  const el = countryPaths[countryId];
  if (!el) return;
  
  const bounds = path.bounds(d3.select(el).datum());
  const dx = bounds[1][0] - bounds[0][0];
  const dy = bounds[1][1] - bounds[0][1];
  const x = (bounds[0][0] + bounds[1][0]) / 2;
  const y = (bounds[0][1] + bounds[1][1]) / 2;
  const scale = Math.max(1, Math.min(6, 0.8 / Math.max(dx / width, dy / height)));
  const translate = [width / 2 - scale * x, height / 2 - scale * y];
  
  svg.transition()
    .duration(750)
    .call(zoom.transform, d3.zoomIdentity.translate(translate[0], translate[1]).scale(scale));
}
