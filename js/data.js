// Country baseline data and definitions for the Prosperity Diffusion Dashboard
// All values represent 2025 estimates

export const REGIONS = {
  'Sub-Saharan Africa': { abbr: 'SSA', color: '#ff9100' },
  'South Asia': { abbr: 'SA', color: '#ff80ab' },
  'East Asia & Pacific': { abbr: 'EAP', color: '#00d4ff' },
  'Europe & Central Asia': { abbr: 'ECA', color: '#b388ff' },
  'Latin America & Caribbean': { abbr: 'LAC', color: '#00e676' },
  'Middle East & North Africa': { abbr: 'MENA', color: '#ffab00' },
  'North America': { abbr: 'NA', color: '#40c4ff' }
};

export const INCOME_GROUPS = ['Low', 'Lower-middle', 'Upper-middle', 'High'];

// Trade flow definitions (source, target, volume in billions USD)
export const TRADE_FLOWS = [
  // Trans-Pacific
  { from: 'USA', to: 'CHN', volume: 580, type: 'trade' },
  { from: 'USA', to: 'JPN', volume: 190, type: 'trade' },
  { from: 'USA', to: 'KOR', volume: 140, type: 'trade' },
  { from: 'USA', to: 'TWN', volume: 110, type: 'trade' },
  // NAFTA / Americas
  { from: 'USA', to: 'CAN', volume: 620, type: 'trade' },
  { from: 'USA', to: 'MEX', volume: 590, type: 'trade' },
  { from: 'USA', to: 'BRA', volume: 80, type: 'trade' },
  // Trans-Atlantic
  { from: 'USA', to: 'DEU', volume: 210, type: 'trade' },
  { from: 'USA', to: 'GBR', volume: 140, type: 'trade' },
  { from: 'USA', to: 'IND', volume: 95, type: 'trade' },
  // Intra-Asia
  { from: 'CHN', to: 'JPN', volume: 320, type: 'trade' },
  { from: 'CHN', to: 'KOR', volume: 310, type: 'trade' },
  { from: 'CHN', to: 'VNM', volume: 180, type: 'trade' },
  { from: 'CHN', to: 'AUS', volume: 170, type: 'trade' },
  { from: 'CHN', to: 'IND', volume: 120, type: 'trade' },
  { from: 'CHN', to: 'IDN', volume: 75, type: 'trade' },
  { from: 'CHN', to: 'THA', volume: 70, type: 'trade' },
  { from: 'CHN', to: 'MYS', volume: 95, type: 'trade' },
  { from: 'CHN', to: 'SGP', volume: 90, type: 'trade' },
  { from: 'JPN', to: 'KOR', volume: 85, type: 'trade' },
  { from: 'JPN', to: 'THA', volume: 55, type: 'trade' },
  // Europe internal
  { from: 'DEU', to: 'FRA', volume: 190, type: 'trade' },
  { from: 'DEU', to: 'NLD', volume: 180, type: 'trade' },
  { from: 'DEU', to: 'GBR', volume: 130, type: 'trade' },
  { from: 'DEU', to: 'POL', volume: 110, type: 'trade' },
  { from: 'DEU', to: 'ITA', volume: 120, type: 'trade' },
  { from: 'DEU', to: 'CHN', volume: 240, type: 'trade' },
  { from: 'FRA', to: 'ESP', volume: 75, type: 'trade' },
  { from: 'NLD', to: 'BEL', volume: 70, type: 'trade' },
  // MENA / Energy
  { from: 'SAU', to: 'CHN', volume: 60, type: 'energy' },
  { from: 'SAU', to: 'IND', volume: 45, type: 'energy' },
  { from: 'SAU', to: 'JPN', volume: 35, type: 'energy' },
  { from: 'ARE', to: 'IND', volume: 50, type: 'energy' },
  { from: 'QAT', to: 'KOR', volume: 30, type: 'energy' },
  { from: 'RUS', to: 'CHN', volume: 100, type: 'energy' },
  { from: 'RUS', to: 'DEU', volume: 40, type: 'energy' },
  // Africa
  { from: 'NGA', to: 'IND', volume: 15, type: 'energy' },
  { from: 'NGA', to: 'ESP', volume: 12, type: 'energy' },
  { from: 'ZAF', to: 'CHN', volume: 20, type: 'trade' },
  { from: 'ZAF', to: 'DEU', volume: 12, type: 'trade' },
  { from: 'KEN', to: 'GBR', volume: 8, type: 'trade' },
  { from: 'ETH', to: 'CHN', volume: 10, type: 'trade' },
  { from: 'CIV', to: 'FRA', volume: 8, type: 'trade' },
  // South America
  { from: 'CHN', to: 'BRA', volume: 130, type: 'trade' },
  { from: 'BRA', to: 'ARG', volume: 30, type: 'trade' },
  { from: 'CHL', to: 'CHN', volume: 35, type: 'trade' },
  { from: 'COL', to: 'USA', volume: 25, type: 'trade' },
  // India corridors
  { from: 'IND', to: 'ARE', volume: 80, type: 'trade' },
  { from: 'IND', to: 'SGP', volume: 40, type: 'trade' },
  { from: 'IND', to: 'BGD', volume: 15, type: 'trade' },
  // Australia links
  { from: 'AUS', to: 'JPN', volume: 45, type: 'energy' },
  { from: 'AUS', to: 'KOR', volume: 30, type: 'energy' },
];

// Major global diffusion hubs / cities
export const DIFFUSION_NODES = [
  // Global mega-hubs
  { name: 'New York', lat: 40.71, lon: -74.01, tier: 1, type: 'finance' },
  { name: 'London', lat: 51.51, lon: -0.13, tier: 1, type: 'finance' },
  { name: 'Shanghai', lat: 31.23, lon: 121.47, tier: 1, type: 'trade' },
  { name: 'Singapore', lat: 1.35, lon: 103.82, tier: 1, type: 'trade' },
  { name: 'Tokyo', lat: 35.68, lon: 139.69, tier: 1, type: 'tech' },
  { name: 'San Francisco', lat: 37.77, lon: -122.42, tier: 1, type: 'tech' },
  // Regional hubs
  { name: 'Dubai', lat: 25.20, lon: 55.27, tier: 2, type: 'trade' },
  { name: 'Mumbai', lat: 19.08, lon: 72.88, tier: 2, type: 'finance' },
  { name: 'São Paulo', lat: -23.55, lon: -46.63, tier: 2, type: 'finance' },
  { name: 'Lagos', lat: 6.52, lon: 3.38, tier: 2, type: 'trade' },
  { name: 'Nairobi', lat: -1.29, lon: 36.82, tier: 2, type: 'tech' },
  { name: 'Beijing', lat: 39.90, lon: 116.40, tier: 2, type: 'tech' },
  { name: 'Seoul', lat: 37.57, lon: 126.98, tier: 2, type: 'tech' },
  { name: 'Frankfurt', lat: 50.11, lon: 8.68, tier: 2, type: 'finance' },
  { name: 'Hong Kong', lat: 22.32, lon: 114.17, tier: 2, type: 'finance' },
  { name: 'Istanbul', lat: 41.01, lon: 28.98, tier: 2, type: 'trade' },
  { name: 'Mexico City', lat: 19.43, lon: -99.13, tier: 2, type: 'trade' },
  { name: 'Jakarta', lat: -6.21, lon: 106.85, tier: 2, type: 'trade' },
  // Emerging hubs
  { name: 'Ho Chi Minh City', lat: 10.82, lon: 106.63, tier: 3, type: 'manufacturing' },
  { name: 'Bangalore', lat: 12.97, lon: 77.56, tier: 3, type: 'tech' },
  { name: 'Shenzhen', lat: 22.54, lon: 114.06, tier: 3, type: 'tech' },
  { name: 'Addis Ababa', lat: 9.02, lon: 38.75, tier: 3, type: 'trade' },
  { name: 'Dar es Salaam', lat: -6.79, lon: 39.28, tier: 3, type: 'trade' },
  { name: 'Accra', lat: 5.56, lon: -0.19, tier: 3, type: 'tech' },
  { name: 'Cairo', lat: 30.04, lon: 31.24, tier: 3, type: 'trade' },
  { name: 'Johannesburg', lat: -26.20, lon: 28.05, tier: 3, type: 'finance' },
  { name: 'Bangkok', lat: 13.76, lon: 100.50, tier: 3, type: 'trade' },
  { name: 'Lima', lat: -12.05, lon: -77.04, tier: 3, type: 'trade' },
  { name: 'Bogotá', lat: 4.71, lon: -74.07, tier: 3, type: 'trade' },
  { name: 'Kigali', lat: -1.94, lon: 30.06, tier: 3, type: 'tech' },
  { name: 'Casablanca', lat: 33.57, lon: -7.59, tier: 3, type: 'finance' },
  { name: 'Riyadh', lat: 24.71, lon: 46.68, tier: 3, type: 'finance' },
];

// Country data: id = ISO 3166-1 numeric, iso3 = ISO alpha-3
// Indicators: gdppc (GDP per capita PPP $), poverty (% <$2.15/day), population (millions),
// urban (% urban), energy (% electricity access), internet (% using internet),
// education (index 0-1), governance (index 0-1), gini (Gini coefficient),
// lifeExp (years), cleanEnergy (% of total energy), manufacturing (% of GDP),
// services (% of GDP), agriculture (% of GDP), exports (% of GDP)
export const COUNTRIES = [
  // === SUB-SAHARAN AFRICA ===
  { id: '566', iso3: 'NGA', name: 'Nigeria', region: 'Sub-Saharan Africa', income: 'Lower-middle', lat: 9.08, lon: 7.49, gdppc: 5900, poverty: 30.9, population: 230, urban: 54, energy: 60, internet: 36, education: 0.50, governance: 0.28, gini: 35.1, lifeExp: 55, cleanEnergy: 14, manufacturing: 9, services: 52, agriculture: 22, exports: 10 },
  { id: '231', iso3: 'ETH', name: 'Ethiopia', region: 'Sub-Saharan Africa', income: 'Low', lat: 9.15, lon: 40.49, gdppc: 2900, poverty: 30.8, population: 130, urban: 23, energy: 53, internet: 17, education: 0.38, governance: 0.25, gini: 35.0, lifeExp: 67, cleanEnergy: 90, manufacturing: 5, services: 37, agriculture: 37, exports: 8 },
  { id: '710', iso3: 'ZAF', name: 'South Africa', region: 'Sub-Saharan Africa', income: 'Upper-middle', lat: -30.56, lon: 22.94, gdppc: 15400, poverty: 18.9, population: 60, urban: 68, energy: 85, internet: 72, education: 0.68, governance: 0.52, gini: 63.0, lifeExp: 65, cleanEnergy: 11, manufacturing: 12, services: 63, agriculture: 2, exports: 31 },
  { id: '404', iso3: 'KEN', name: 'Kenya', region: 'Sub-Saharan Africa', income: 'Lower-middle', lat: -0.02, lon: 37.91, gdppc: 5500, poverty: 29.4, population: 56, urban: 29, energy: 76, internet: 40, education: 0.52, governance: 0.38, gini: 40.8, lifeExp: 63, cleanEnergy: 75, manufacturing: 8, services: 44, agriculture: 22, exports: 12 },
  { id: '180', iso3: 'COD', name: 'DR Congo', region: 'Sub-Saharan Africa', income: 'Low', lat: -4.04, lon: 21.76, gdppc: 1200, poverty: 64.0, population: 108, urban: 47, energy: 21, internet: 9, education: 0.36, governance: 0.12, gini: 42.1, lifeExp: 61, cleanEnergy: 96, manufacturing: 4, services: 34, agriculture: 20, exports: 28 },
  { id: '834', iso3: 'TZA', name: 'Tanzania', region: 'Sub-Saharan Africa', income: 'Lower-middle', lat: -6.37, lon: 34.89, gdppc: 3100, poverty: 44.9, population: 67, urban: 37, energy: 42, internet: 25, education: 0.42, governance: 0.35, gini: 40.5, lifeExp: 67, cleanEnergy: 55, manufacturing: 8, services: 38, agriculture: 27, exports: 15 },
  { id: '288', iso3: 'GHA', name: 'Ghana', region: 'Sub-Saharan Africa', income: 'Lower-middle', lat: 7.95, lon: -1.02, gdppc: 6200, poverty: 23.4, population: 34, urban: 59, energy: 84, internet: 53, education: 0.56, governance: 0.48, gini: 43.5, lifeExp: 64, cleanEnergy: 40, manufacturing: 10, services: 46, agriculture: 19, exports: 36 },
  { id: '024', iso3: 'AGO', name: 'Angola', region: 'Sub-Saharan Africa', income: 'Lower-middle', lat: -11.20, lon: 17.87, gdppc: 7100, poverty: 32.3, population: 37, urban: 69, energy: 46, internet: 20, education: 0.42, governance: 0.18, gini: 51.3, lifeExp: 62, cleanEnergy: 52, manufacturing: 5, services: 32, agriculture: 8, exports: 34 },
  { id: '508', iso3: 'MOZ', name: 'Mozambique', region: 'Sub-Saharan Africa', income: 'Low', lat: -18.67, lon: 35.53, gdppc: 1500, poverty: 62.8, population: 34, urban: 39, energy: 33, internet: 10, education: 0.33, governance: 0.24, gini: 54.0, lifeExp: 61, cleanEnergy: 60, manufacturing: 6, services: 39, agriculture: 25, exports: 35 },
  { id: '384', iso3: 'CIV', name: "Côte d'Ivoire", region: 'Sub-Saharan Africa', income: 'Lower-middle', lat: 7.54, lon: -5.55, gdppc: 5800, poverty: 36.2, population: 29, urban: 53, energy: 70, internet: 36, education: 0.43, governance: 0.30, gini: 41.5, lifeExp: 59, cleanEnergy: 30, manufacturing: 12, services: 42, agriculture: 20, exports: 22 },
  { id: '800', iso3: 'UGA', name: 'Uganda', region: 'Sub-Saharan Africa', income: 'Low', lat: 1.37, lon: 32.29, gdppc: 2600, poverty: 36.7, population: 50, urban: 26, energy: 43, internet: 18, education: 0.44, governance: 0.32, gini: 42.8, lifeExp: 64, cleanEnergy: 85, manufacturing: 9, services: 42, agriculture: 24, exports: 15 },
  { id: '686', iso3: 'SEN', name: 'Senegal', region: 'Sub-Saharan Africa', income: 'Lower-middle', lat: 14.50, lon: -14.45, gdppc: 3800, poverty: 35.0, population: 18, urban: 49, energy: 72, internet: 46, education: 0.40, governance: 0.42, gini: 40.3, lifeExp: 69, cleanEnergy: 20, manufacturing: 14, services: 48, agriculture: 16, exports: 25 },
  { id: '646', iso3: 'RWA', name: 'Rwanda', region: 'Sub-Saharan Africa', income: 'Low', lat: -1.94, lon: 29.87, gdppc: 2500, poverty: 52.0, population: 14, urban: 18, energy: 48, internet: 30, education: 0.45, governance: 0.55, gini: 43.7, lifeExp: 69, cleanEnergy: 72, manufacturing: 7, services: 48, agriculture: 25, exports: 18 },
  { id: '120', iso3: 'CMR', name: 'Cameroon', region: 'Sub-Saharan Africa', income: 'Lower-middle', lat: 7.37, lon: 12.35, gdppc: 4000, poverty: 25.0, population: 29, urban: 59, energy: 65, internet: 22, education: 0.49, governance: 0.22, gini: 46.6, lifeExp: 60, cleanEnergy: 58, manufacturing: 13, services: 47, agriculture: 16, exports: 14 },
  { id: '450', iso3: 'MDG', name: 'Madagascar', region: 'Sub-Saharan Africa', income: 'Low', lat: -18.77, lon: 46.87, gdppc: 1700, poverty: 77.4, population: 31, urban: 40, energy: 34, internet: 10, education: 0.37, governance: 0.22, gini: 42.6, lifeExp: 68, cleanEnergy: 50, manufacturing: 12, services: 46, agriculture: 24, exports: 25 },
  { id: '894', iso3: 'ZMB', name: 'Zambia', region: 'Sub-Saharan Africa', income: 'Low', lat: -13.13, lon: 27.85, gdppc: 3800, poverty: 60.0, population: 20, urban: 46, energy: 43, internet: 19, education: 0.48, governance: 0.35, gini: 57.1, lifeExp: 64, cleanEnergy: 82, manufacturing: 8, services: 52, agriculture: 3, exports: 37 },
  { id: '716', iso3: 'ZWE', name: 'Zimbabwe', region: 'Sub-Saharan Africa', income: 'Lower-middle', lat: -20.0, lon: 30.0, gdppc: 2800, poverty: 39.0, population: 16, urban: 32, energy: 48, internet: 30, education: 0.52, governance: 0.15, gini: 50.3, lifeExp: 62, cleanEnergy: 40, manufacturing: 10, services: 55, agriculture: 10, exports: 22 },
  { id: '466', iso3: 'MLI', name: 'Mali', region: 'Sub-Saharan Africa', income: 'Low', lat: 17.57, lon: -4.0, gdppc: 2400, poverty: 51.0, population: 23, urban: 45, energy: 50, internet: 13, education: 0.28, governance: 0.18, gini: 33.0, lifeExp: 60, cleanEnergy: 25, manufacturing: 5, services: 35, agriculture: 38, exports: 20 },
  { id: '854', iso3: 'BFA', name: 'Burkina Faso', region: 'Sub-Saharan Africa', income: 'Low', lat: 12.36, lon: -1.52, gdppc: 2300, poverty: 43.0, population: 23, urban: 32, energy: 22, internet: 13, education: 0.30, governance: 0.20, gini: 35.3, lifeExp: 62, cleanEnergy: 18, manufacturing: 6, services: 38, agriculture: 28, exports: 25 },
  { id: '562', iso3: 'NER', name: 'Niger', region: 'Sub-Saharan Africa', income: 'Low', lat: 17.61, lon: 8.08, gdppc: 1400, poverty: 50.0, population: 27, urban: 17, energy: 19, internet: 5, education: 0.22, governance: 0.22, gini: 37.3, lifeExp: 63, cleanEnergy: 10, manufacturing: 4, services: 37, agriculture: 40, exports: 12 },
  { id: '148', iso3: 'TCD', name: 'Chad', region: 'Sub-Saharan Africa', income: 'Low', lat: 15.45, lon: 18.73, gdppc: 1600, poverty: 42.0, population: 18, urban: 24, energy: 11, internet: 7, education: 0.25, governance: 0.10, gini: 43.3, lifeExp: 55, cleanEnergy: 5, manufacturing: 3, services: 34, agriculture: 43, exports: 26 },
  { id: '706', iso3: 'SOM', name: 'Somalia', region: 'Sub-Saharan Africa', income: 'Low', lat: 5.15, lon: 46.20, gdppc: 900, poverty: 69.0, population: 18, urban: 48, energy: 18, internet: 8, education: 0.15, governance: 0.05, gini: 36.8, lifeExp: 58, cleanEnergy: 5, manufacturing: 3, services: 50, agriculture: 40, exports: 8 },
  { id: '108', iso3: 'BDI', name: 'Burundi', region: 'Sub-Saharan Africa', income: 'Low', lat: -3.37, lon: 29.92, gdppc: 800, poverty: 62.0, population: 13, urban: 14, energy: 12, internet: 6, education: 0.32, governance: 0.15, gini: 38.6, lifeExp: 62, cleanEnergy: 80, manufacturing: 5, services: 34, agriculture: 40, exports: 7 },
  { id: '516', iso3: 'NAM', name: 'Namibia', region: 'Sub-Saharan Africa', income: 'Upper-middle', lat: -22.96, lon: 18.49, gdppc: 10200, poverty: 15.6, population: 2.6, urban: 55, energy: 56, internet: 53, education: 0.58, governance: 0.55, gini: 59.1, lifeExp: 64, cleanEnergy: 20, manufacturing: 12, services: 55, agriculture: 6, exports: 40 },
  { id: '072', iso3: 'BWA', name: 'Botswana', region: 'Sub-Saharan Africa', income: 'Upper-middle', lat: -22.33, lon: 24.68, gdppc: 18500, poverty: 12.1, population: 2.6, urban: 72, energy: 68, internet: 65, education: 0.62, governance: 0.62, gini: 53.3, lifeExp: 70, cleanEnergy: 5, manufacturing: 5, services: 55, agriculture: 2, exports: 50 },
  { id: '728', iso3: 'SSD', name: 'South Sudan', region: 'Sub-Saharan Africa', income: 'Low', lat: 6.88, lon: 31.31, gdppc: 800, poverty: 76.0, population: 11.5, urban: 21, energy: 8, internet: 8, education: 0.20, governance: 0.04, gini: 44.1, lifeExp: 58, cleanEnergy: 60, manufacturing: 2, services: 28, agriculture: 36, exports: 38 },
  { id: '178', iso3: 'COG', name: 'Republic of Congo', region: 'Sub-Saharan Africa', income: 'Lower-middle', lat: -0.23, lon: 15.83, gdppc: 4100, poverty: 35.0, population: 6.1, urban: 69, energy: 50, internet: 21, education: 0.42, governance: 0.18, gini: 48.9, lifeExp: 65, cleanEnergy: 55, manufacturing: 6, services: 45, agriculture: 8, exports: 60 },
  { id: '324', iso3: 'GIN', name: 'Guinea', region: 'Sub-Saharan Africa', income: 'Low', lat: 9.95, lon: -9.70, gdppc: 2700, poverty: 44.0, population: 14.2, urban: 38, energy: 44, internet: 20, education: 0.30, governance: 0.18, gini: 33.7, lifeExp: 62, cleanEnergy: 45, manufacturing: 8, services: 38, agriculture: 28, exports: 30 },
  { id: '454', iso3: 'MWI', name: 'Malawi', region: 'Sub-Saharan Africa', income: 'Low', lat: -13.25, lon: 34.30, gdppc: 1600, poverty: 70.0, population: 20.9, urban: 18, energy: 15, internet: 13, education: 0.38, governance: 0.33, gini: 44.7, lifeExp: 65, cleanEnergy: 75, manufacturing: 8, services: 42, agriculture: 28, exports: 18 },
  { id: '478', iso3: 'MRT', name: 'Mauritania', region: 'Sub-Saharan Africa', income: 'Lower-middle', lat: 21.01, lon: -10.94, gdppc: 5600, poverty: 31.0, population: 4.9, urban: 57, energy: 47, internet: 25, education: 0.32, governance: 0.22, gini: 32.6, lifeExp: 65, cleanEnergy: 22, manufacturing: 5, services: 40, agriculture: 22, exports: 40 },
  { id: '140', iso3: 'CAF', name: 'Central African Republic', region: 'Sub-Saharan Africa', income: 'Low', lat: 6.61, lon: 20.94, gdppc: 1000, poverty: 71.0, population: 5.6, urban: 43, energy: 15, internet: 7, education: 0.22, governance: 0.06, gini: 56.2, lifeExp: 54, cleanEnergy: 55, manufacturing: 5, services: 35, agriculture: 40, exports: 15 },
  { id: '694', iso3: 'SLE', name: 'Sierra Leone', region: 'Sub-Saharan Africa', income: 'Low', lat: 8.46, lon: -11.78, gdppc: 1900, poverty: 56.0, population: 8.8, urban: 44, energy: 27, internet: 12, education: 0.32, governance: 0.22, gini: 35.7, lifeExp: 55, cleanEnergy: 40, manufacturing: 3, services: 35, agriculture: 55, exports: 12 },
  { id: '430', iso3: 'LBR', name: 'Liberia', region: 'Sub-Saharan Africa', income: 'Low', lat: 6.43, lon: -9.43, gdppc: 1500, poverty: 44.0, population: 5.4, urban: 53, energy: 28, internet: 16, education: 0.34, governance: 0.20, gini: 35.3, lifeExp: 65, cleanEnergy: 35, manufacturing: 4, services: 42, agriculture: 34, exports: 20 },
  { id: '232', iso3: 'ERI', name: 'Eritrea', region: 'Sub-Saharan Africa', income: 'Low', lat: 15.18, lon: 39.78, gdppc: 1900, poverty: 53.0, population: 3.7, urban: 42, energy: 52, internet: 7, education: 0.28, governance: 0.08, gini: 35.0, lifeExp: 67, cleanEnergy: 30, manufacturing: 5, services: 50, agriculture: 25, exports: 8 },
  { id: '204', iso3: 'BEN', name: 'Benin', region: 'Sub-Saharan Africa', income: 'Lower-middle', lat: 9.31, lon: 2.32, gdppc: 3600, poverty: 36.0, population: 13.7, urban: 50, energy: 43, internet: 24, education: 0.38, governance: 0.32, gini: 37.8, lifeExp: 62, cleanEnergy: 15, manufacturing: 12, services: 42, agriculture: 28, exports: 18 },
  { id: '768', iso3: 'TGO', name: 'Togo', region: 'Sub-Saharan Africa', income: 'Low', lat: 8.62, lon: 1.21, gdppc: 2300, poverty: 28.0, population: 9.0, urban: 44, energy: 55, internet: 20, education: 0.40, governance: 0.28, gini: 42.4, lifeExp: 62, cleanEnergy: 20, manufacturing: 10, services: 40, agriculture: 30, exports: 20 },
  { id: '266', iso3: 'GAB', name: 'Gabon', region: 'Sub-Saharan Africa', income: 'Upper-middle', lat: -0.80, lon: 11.61, gdppc: 17500, poverty: 8.0, population: 2.4, urban: 90, energy: 92, internet: 62, education: 0.55, governance: 0.28, gini: 38.0, lifeExp: 66, cleanEnergy: 45, manufacturing: 5, services: 38, agriculture: 5, exports: 45 },
  { id: '748', iso3: 'SWZ', name: 'Eswatini', region: 'Sub-Saharan Africa', income: 'Lower-middle', lat: -26.52, lon: 31.47, gdppc: 10000, poverty: 29.0, population: 1.2, urban: 24, energy: 78, internet: 47, education: 0.52, governance: 0.28, gini: 54.6, lifeExp: 60, cleanEnergy: 25, manufacturing: 28, services: 48, agriculture: 6, exports: 35 },

  // === SOUTH ASIA ===
  { id: '356', iso3: 'IND', name: 'India', region: 'South Asia', income: 'Lower-middle', lat: 20.59, lon: 78.96, gdppc: 9500, poverty: 12.0, population: 1440, urban: 36, energy: 99, internet: 52, education: 0.56, governance: 0.45, gini: 35.7, lifeExp: 71, cleanEnergy: 22, manufacturing: 14, services: 49, agriculture: 16, exports: 22 },
  { id: '586', iso3: 'PAK', name: 'Pakistan', region: 'South Asia', income: 'Lower-middle', lat: 30.38, lon: 69.35, gdppc: 6300, poverty: 21.9, population: 240, urban: 37, energy: 95, internet: 33, education: 0.39, governance: 0.28, gini: 29.6, lifeExp: 67, cleanEnergy: 18, manufacturing: 13, services: 51, agriculture: 22, exports: 10 },
  { id: '050', iso3: 'BGD', name: 'Bangladesh', region: 'South Asia', income: 'Lower-middle', lat: 23.68, lon: 90.36, gdppc: 7100, poverty: 5.0, population: 175, urban: 40, energy: 99, internet: 39, education: 0.50, governance: 0.30, gini: 32.4, lifeExp: 73, cleanEnergy: 5, manufacturing: 22, services: 52, agriculture: 12, exports: 16 },
  { id: '524', iso3: 'NPL', name: 'Nepal', region: 'South Asia', income: 'Lower-middle', lat: 28.39, lon: 84.12, gdppc: 4200, poverty: 15.0, population: 31, urban: 22, energy: 90, internet: 47, education: 0.46, governance: 0.32, gini: 32.8, lifeExp: 71, cleanEnergy: 85, manufacturing: 5, services: 51, agriculture: 23, exports: 8 },
  { id: '144', iso3: 'LKA', name: 'Sri Lanka', region: 'South Asia', income: 'Lower-middle', lat: 7.87, lon: 80.77, gdppc: 13300, poverty: 1.9, population: 22, urban: 19, energy: 100, internet: 47, education: 0.72, governance: 0.42, gini: 39.3, lifeExp: 77, cleanEnergy: 30, manufacturing: 16, services: 58, agriculture: 8, exports: 22 },
  { id: '004', iso3: 'AFG', name: 'Afghanistan', region: 'South Asia', income: 'Low', lat: 33.94, lon: 67.71, gdppc: 2000, poverty: 47.0, population: 42, urban: 26, energy: 98, internet: 18, education: 0.25, governance: 0.08, gini: 29.4, lifeExp: 65, cleanEnergy: 42, manufacturing: 8, services: 46, agriculture: 24, exports: 7 },

  // === EAST ASIA & PACIFIC ===
  { id: '156', iso3: 'CHN', name: 'China', region: 'East Asia & Pacific', income: 'Upper-middle', lat: 35.86, lon: 104.20, gdppc: 23000, poverty: 0.1, population: 1410, urban: 66, energy: 100, internet: 76, education: 0.72, governance: 0.48, gini: 38.2, lifeExp: 78, cleanEnergy: 32, manufacturing: 27, services: 53, agriculture: 7, exports: 20 },
  { id: '392', iso3: 'JPN', name: 'Japan', region: 'East Asia & Pacific', income: 'High', lat: 36.20, lon: 138.25, gdppc: 46000, poverty: 0.0, population: 123, urban: 92, energy: 100, internet: 93, education: 0.88, governance: 0.80, gini: 32.9, lifeExp: 85, cleanEnergy: 22, manufacturing: 20, services: 70, agriculture: 1, exports: 18 },
  { id: '360', iso3: 'IDN', name: 'Indonesia', region: 'East Asia & Pacific', income: 'Upper-middle', lat: -0.79, lon: 113.92, gdppc: 14600, poverty: 2.5, population: 280, urban: 58, energy: 97, internet: 62, education: 0.60, governance: 0.42, gini: 37.9, lifeExp: 72, cleanEnergy: 15, manufacturing: 18, services: 44, agriculture: 13, exports: 22 },
  { id: '704', iso3: 'VNM', name: 'Vietnam', region: 'East Asia & Pacific', income: 'Lower-middle', lat: 14.06, lon: 108.28, gdppc: 13500, poverty: 1.0, population: 100, urban: 40, energy: 100, internet: 74, education: 0.66, governance: 0.42, gini: 35.7, lifeExp: 76, cleanEnergy: 28, manufacturing: 24, services: 42, agriculture: 12, exports: 93 },
  { id: '608', iso3: 'PHL', name: 'Philippines', region: 'East Asia & Pacific', income: 'Lower-middle', lat: 12.88, lon: 121.77, gdppc: 10900, poverty: 5.5, population: 117, urban: 48, energy: 95, internet: 53, education: 0.60, governance: 0.40, gini: 42.3, lifeExp: 72, cleanEnergy: 22, manufacturing: 17, services: 61, agriculture: 9, exports: 25 },
  { id: '764', iso3: 'THA', name: 'Thailand', region: 'East Asia & Pacific', income: 'Upper-middle', lat: 15.87, lon: 100.99, gdppc: 20500, poverty: 0.1, population: 72, urban: 53, energy: 100, internet: 78, education: 0.68, governance: 0.45, gini: 35.0, lifeExp: 79, cleanEnergy: 15, manufacturing: 25, services: 58, agriculture: 8, exports: 60 },
  { id: '458', iso3: 'MYS', name: 'Malaysia', region: 'East Asia & Pacific', income: 'Upper-middle', lat: 4.21, lon: 101.98, gdppc: 33000, poverty: 0.0, population: 34, urban: 78, energy: 100, internet: 89, education: 0.72, governance: 0.60, gini: 41.2, lifeExp: 77, cleanEnergy: 8, manufacturing: 22, services: 55, agriculture: 7, exports: 70 },
  { id: '104', iso3: 'MMR', name: 'Myanmar', region: 'East Asia & Pacific', income: 'Lower-middle', lat: 21.91, lon: 95.96, gdppc: 4800, poverty: 14.0, population: 55, urban: 32, energy: 73, internet: 33, education: 0.40, governance: 0.15, gini: 30.7, lifeExp: 68, cleanEnergy: 52, manufacturing: 22, services: 40, agriculture: 22, exports: 20 },
  { id: '116', iso3: 'KHM', name: 'Cambodia', region: 'East Asia & Pacific', income: 'Lower-middle', lat: 12.57, lon: 104.99, gdppc: 5200, poverty: 16.0, population: 17, urban: 25, energy: 93, internet: 52, education: 0.42, governance: 0.28, gini: 37.9, lifeExp: 70, cleanEnergy: 42, manufacturing: 17, services: 38, agriculture: 22, exports: 63 },
  { id: '410', iso3: 'KOR', name: 'South Korea', region: 'East Asia & Pacific', income: 'High', lat: 35.91, lon: 127.77, gdppc: 50000, poverty: 0.0, population: 52, urban: 82, energy: 100, internet: 98, education: 0.90, governance: 0.72, gini: 31.4, lifeExp: 84, cleanEnergy: 10, manufacturing: 25, services: 58, agriculture: 2, exports: 40 },
  { id: '702', iso3: 'SGP', name: 'Singapore', region: 'East Asia & Pacific', income: 'High', lat: 1.35, lon: 103.82, gdppc: 105000, poverty: 0.0, population: 5.9, urban: 100, energy: 100, internet: 96, education: 0.88, governance: 0.92, gini: 37.9, lifeExp: 84, cleanEnergy: 5, manufacturing: 20, services: 72, agriculture: 0, exports: 180 },
  { id: '036', iso3: 'AUS', name: 'Australia', region: 'East Asia & Pacific', income: 'High', lat: -25.27, lon: 133.78, gdppc: 55000, poverty: 0.5, population: 26, urban: 87, energy: 100, internet: 92, education: 0.88, governance: 0.85, gini: 34.4, lifeExp: 84, cleanEnergy: 30, manufacturing: 6, services: 66, agriculture: 2, exports: 24 },
  { id: '554', iso3: 'NZL', name: 'New Zealand', region: 'East Asia & Pacific', income: 'High', lat: -40.90, lon: 174.89, gdppc: 44000, poverty: 0.0, population: 5.1, urban: 87, energy: 100, internet: 93, education: 0.88, governance: 0.88, gini: 32.0, lifeExp: 82, cleanEnergy: 40, manufacturing: 10, services: 66, agriculture: 6, exports: 27 },
  { id: '418', iso3: 'LAO', name: 'Laos', region: 'East Asia & Pacific', income: 'Lower-middle', lat: 19.86, lon: 102.50, gdppc: 8600, poverty: 7.1, population: 7.6, urban: 38, energy: 100, internet: 48, education: 0.42, governance: 0.28, gini: 38.8, lifeExp: 68, cleanEnergy: 65, manufacturing: 8, services: 42, agriculture: 16, exports: 38 },
  { id: '598', iso3: 'PNG', name: 'Papua New Guinea', region: 'East Asia & Pacific', income: 'Lower-middle', lat: -6.31, lon: 143.96, gdppc: 4200, poverty: 36.0, population: 10, urban: 13, energy: 22, internet: 15, education: 0.38, governance: 0.22, gini: 41.9, lifeExp: 65, cleanEnergy: 30, manufacturing: 5, services: 40, agriculture: 22, exports: 45 },
  { id: '496', iso3: 'MNG', name: 'Mongolia', region: 'East Asia & Pacific', income: 'Lower-middle', lat: 46.86, lon: 103.85, gdppc: 13700, poverty: 0.5, population: 3.4, urban: 69, energy: 92, internet: 64, education: 0.68, governance: 0.42, gini: 32.7, lifeExp: 71, cleanEnergy: 8, manufacturing: 10, services: 45, agriculture: 12, exports: 55 },
  { id: '158', iso3: 'TWN', name: 'Taiwan', region: 'East Asia & Pacific', income: 'High', lat: 23.70, lon: 120.96, gdppc: 62000, poverty: 0.0, population: 23.5, urban: 80, energy: 100, internet: 93, education: 0.88, governance: 0.75, gini: 33.6, lifeExp: 81, cleanEnergy: 10, manufacturing: 30, services: 62, agriculture: 2, exports: 65 },

  // === EUROPE & CENTRAL ASIA ===
  { id: '276', iso3: 'DEU', name: 'Germany', region: 'Europe & Central Asia', income: 'High', lat: 51.17, lon: 10.45, gdppc: 58000, poverty: 0.0, population: 84, urban: 78, energy: 100, internet: 92, education: 0.90, governance: 0.85, gini: 31.7, lifeExp: 81, cleanEnergy: 44, manufacturing: 19, services: 62, agriculture: 1, exports: 47 },
  { id: '826', iso3: 'GBR', name: 'United Kingdom', region: 'Europe & Central Asia', income: 'High', lat: 55.38, lon: -3.44, gdppc: 50000, poverty: 0.2, population: 68, urban: 84, energy: 100, internet: 95, education: 0.88, governance: 0.82, gini: 35.1, lifeExp: 81, cleanEnergy: 42, manufacturing: 9, services: 73, agriculture: 1, exports: 30 },
  { id: '250', iso3: 'FRA', name: 'France', region: 'Europe & Central Asia', income: 'High', lat: 46.23, lon: 2.21, gdppc: 50000, poverty: 0.0, population: 68, urban: 82, energy: 100, internet: 90, education: 0.86, governance: 0.80, gini: 32.4, lifeExp: 83, cleanEnergy: 72, manufacturing: 10, services: 70, agriculture: 2, exports: 31 },
  { id: '380', iso3: 'ITA', name: 'Italy', region: 'Europe & Central Asia', income: 'High', lat: 41.87, lon: 12.57, gdppc: 46000, poverty: 1.5, population: 59, urban: 72, energy: 100, internet: 87, education: 0.80, governance: 0.62, gini: 33.7, lifeExp: 84, cleanEnergy: 38, manufacturing: 15, services: 66, agriculture: 2, exports: 32 },
  { id: '724', iso3: 'ESP', name: 'Spain', region: 'Europe & Central Asia', income: 'High', lat: 40.46, lon: -3.75, gdppc: 43000, poverty: 1.0, population: 48, urban: 81, energy: 100, internet: 93, education: 0.82, governance: 0.72, gini: 33.0, lifeExp: 84, cleanEnergy: 48, manufacturing: 12, services: 68, agriculture: 3, exports: 35 },
  { id: '616', iso3: 'POL', name: 'Poland', region: 'Europe & Central Asia', income: 'High', lat: 51.92, lon: 19.15, gdppc: 41000, poverty: 0.2, population: 37, urban: 60, energy: 100, internet: 88, education: 0.82, governance: 0.68, gini: 30.0, lifeExp: 78, cleanEnergy: 22, manufacturing: 20, services: 57, agriculture: 3, exports: 55 },
  { id: '643', iso3: 'RUS', name: 'Russia', region: 'Europe & Central Asia', income: 'Upper-middle', lat: 61.52, lon: 105.32, gdppc: 30000, poverty: 0.3, population: 144, urban: 75, energy: 100, internet: 85, education: 0.78, governance: 0.30, gini: 36.0, lifeExp: 73, cleanEnergy: 18, manufacturing: 14, services: 56, agriculture: 4, exports: 26 },
  { id: '792', iso3: 'TUR', name: 'Turkey', region: 'Europe & Central Asia', income: 'Upper-middle', lat: 38.96, lon: 35.24, gdppc: 36000, poverty: 0.4, population: 86, urban: 77, energy: 100, internet: 83, education: 0.72, governance: 0.38, gini: 41.9, lifeExp: 78, cleanEnergy: 30, manufacturing: 19, services: 55, agriculture: 6, exports: 30 },
  { id: '804', iso3: 'UKR', name: 'Ukraine', region: 'Europe & Central Asia', income: 'Lower-middle', lat: 48.38, lon: 31.17, gdppc: 13000, poverty: 1.1, population: 37, urban: 70, energy: 100, internet: 75, education: 0.76, governance: 0.30, gini: 25.6, lifeExp: 73, cleanEnergy: 22, manufacturing: 10, services: 55, agriculture: 10, exports: 35 },
  { id: '398', iso3: 'KAZ', name: 'Kazakhstan', region: 'Europe & Central Asia', income: 'Upper-middle', lat: 48.02, lon: 66.92, gdppc: 29000, poverty: 0.1, population: 20, urban: 58, energy: 100, internet: 82, education: 0.78, governance: 0.40, gini: 27.8, lifeExp: 73, cleanEnergy: 5, manufacturing: 11, services: 55, agriculture: 5, exports: 35 },
  { id: '860', iso3: 'UZB', name: 'Uzbekistan', region: 'Europe & Central Asia', income: 'Lower-middle', lat: 41.38, lon: 64.59, gdppc: 8500, poverty: 5.0, population: 36, urban: 51, energy: 100, internet: 66, education: 0.68, governance: 0.28, gini: 35.3, lifeExp: 72, cleanEnergy: 10, manufacturing: 17, services: 38, agriculture: 25, exports: 28 },
  { id: '642', iso3: 'ROU', name: 'Romania', region: 'Europe & Central Asia', income: 'High', lat: 45.94, lon: 24.97, gdppc: 37000, poverty: 2.0, population: 19, urban: 55, energy: 100, internet: 82, education: 0.72, governance: 0.52, gini: 35.8, lifeExp: 76, cleanEnergy: 35, manufacturing: 18, services: 55, agriculture: 4, exports: 42 },
  { id: '528', iso3: 'NLD', name: 'Netherlands', region: 'Europe & Central Asia', income: 'High', lat: 52.13, lon: 5.29, gdppc: 62000, poverty: 0.0, population: 18, urban: 93, energy: 100, internet: 95, education: 0.90, governance: 0.88, gini: 28.5, lifeExp: 82, cleanEnergy: 28, manufacturing: 11, services: 70, agriculture: 2, exports: 82 },
  { id: '752', iso3: 'SWE', name: 'Sweden', region: 'Europe & Central Asia', income: 'High', lat: 60.13, lon: 18.64, gdppc: 58000, poverty: 0.0, population: 10.5, urban: 88, energy: 100, internet: 96, education: 0.90, governance: 0.90, gini: 29.3, lifeExp: 83, cleanEnergy: 60, manufacturing: 14, services: 65, agriculture: 1, exports: 45 },
  { id: '756', iso3: 'CHE', name: 'Switzerland', region: 'Europe & Central Asia', income: 'High', lat: 46.82, lon: 8.23, gdppc: 78000, poverty: 0.0, population: 8.8, urban: 74, energy: 100, internet: 95, education: 0.90, governance: 0.92, gini: 33.1, lifeExp: 84, cleanEnergy: 60, manufacturing: 18, services: 72, agriculture: 1, exports: 66 },
  { id: '578', iso3: 'NOR', name: 'Norway', region: 'Europe & Central Asia', income: 'High', lat: 60.47, lon: 8.47, gdppc: 82000, poverty: 0.0, population: 5.5, urban: 83, energy: 100, internet: 98, education: 0.90, governance: 0.92, gini: 27.0, lifeExp: 83, cleanEnergy: 72, manufacturing: 8, services: 58, agriculture: 2, exports: 40 },
  { id: '040', iso3: 'AUT', name: 'Austria', region: 'Europe & Central Asia', income: 'High', lat: 47.52, lon: 14.55, gdppc: 58000, poverty: 0.0, population: 9.1, urban: 59, energy: 100, internet: 92, education: 0.86, governance: 0.85, gini: 30.5, lifeExp: 82, cleanEnergy: 55, manufacturing: 17, services: 63, agriculture: 1, exports: 54 },
  { id: '208', iso3: 'DNK', name: 'Denmark', region: 'Europe & Central Asia', income: 'High', lat: 56.26, lon: 9.50, gdppc: 62000, poverty: 0.0, population: 5.9, urban: 88, energy: 100, internet: 98, education: 0.90, governance: 0.92, gini: 28.2, lifeExp: 81, cleanEnergy: 65, manufacturing: 14, services: 66, agriculture: 1, exports: 55 },
  { id: '246', iso3: 'FIN', name: 'Finland', region: 'Europe & Central Asia', income: 'High', lat: 61.92, lon: 25.75, gdppc: 52000, poverty: 0.0, population: 5.5, urban: 86, energy: 100, internet: 95, education: 0.90, governance: 0.90, gini: 27.4, lifeExp: 82, cleanEnergy: 45, manufacturing: 14, services: 62, agriculture: 2, exports: 39 },
  { id: '372', iso3: 'IRL', name: 'Ireland', region: 'Europe & Central Asia', income: 'High', lat: 53.14, lon: -7.69, gdppc: 100000, poverty: 0.0, population: 5.1, urban: 64, energy: 100, internet: 92, education: 0.88, governance: 0.85, gini: 30.6, lifeExp: 82, cleanEnergy: 35, manufacturing: 32, services: 60, agriculture: 1, exports: 120 },
  { id: '056', iso3: 'BEL', name: 'Belgium', region: 'Europe & Central Asia', income: 'High', lat: 50.50, lon: 4.47, gdppc: 55000, poverty: 0.0, population: 11.6, urban: 98, energy: 100, internet: 92, education: 0.86, governance: 0.82, gini: 27.2, lifeExp: 82, cleanEnergy: 30, manufacturing: 12, services: 70, agriculture: 1, exports: 85 },
  { id: '203', iso3: 'CZE', name: 'Czech Republic', region: 'Europe & Central Asia', income: 'High', lat: 49.82, lon: 15.47, gdppc: 44000, poverty: 0.0, population: 10.7, urban: 74, energy: 100, internet: 88, education: 0.84, governance: 0.72, gini: 25.0, lifeExp: 79, cleanEnergy: 18, manufacturing: 24, services: 57, agriculture: 2, exports: 75 },
  { id: '300', iso3: 'GRC', name: 'Greece', region: 'Europe & Central Asia', income: 'High', lat: 39.07, lon: 21.82, gdppc: 33000, poverty: 1.0, population: 10.4, urban: 80, energy: 100, internet: 81, education: 0.78, governance: 0.55, gini: 33.4, lifeExp: 82, cleanEnergy: 35, manufacturing: 9, services: 68, agriculture: 4, exports: 40 },
  { id: '620', iso3: 'PRT', name: 'Portugal', region: 'Europe & Central Asia', income: 'High', lat: 39.40, lon: -8.22, gdppc: 38000, poverty: 0.0, population: 10.3, urban: 67, energy: 100, internet: 82, education: 0.78, governance: 0.72, gini: 33.8, lifeExp: 82, cleanEnergy: 55, manufacturing: 13, services: 66, agriculture: 2, exports: 44 },
  { id: '348', iso3: 'HUN', name: 'Hungary', region: 'Europe & Central Asia', income: 'High', lat: 47.16, lon: 19.50, gdppc: 38000, poverty: 0.5, population: 9.7, urban: 72, energy: 100, internet: 85, education: 0.80, governance: 0.55, gini: 30.6, lifeExp: 77, cleanEnergy: 18, manufacturing: 20, services: 56, agriculture: 4, exports: 80 },
  { id: '268', iso3: 'GEO', name: 'Georgia', region: 'Europe & Central Asia', income: 'Upper-middle', lat: 42.32, lon: 43.36, gdppc: 17000, poverty: 5.6, population: 3.7, urban: 60, energy: 100, internet: 76, education: 0.78, governance: 0.55, gini: 34.5, lifeExp: 74, cleanEnergy: 72, manufacturing: 10, services: 55, agriculture: 7, exports: 48 },
  { id: '112', iso3: 'BLR', name: 'Belarus', region: 'Europe & Central Asia', income: 'Upper-middle', lat: 53.71, lon: 27.95, gdppc: 21000, poverty: 0.0, population: 9.2, urban: 80, energy: 100, internet: 85, education: 0.82, governance: 0.22, gini: 25.3, lifeExp: 75, cleanEnergy: 8, manufacturing: 22, services: 50, agriculture: 7, exports: 60 },
  { id: '031', iso3: 'AZE', name: 'Azerbaijan', region: 'Europe & Central Asia', income: 'Upper-middle', lat: 40.14, lon: 47.58, gdppc: 15200, poverty: 0.0, population: 10.3, urban: 57, energy: 100, internet: 82, education: 0.72, governance: 0.30, gini: 26.6, lifeExp: 73, cleanEnergy: 8, manufacturing: 6, services: 40, agriculture: 6, exports: 42 },

  // === LATIN AMERICA & CARIBBEAN ===
  { id: '076', iso3: 'BRA', name: 'Brazil', region: 'Latin America & Caribbean', income: 'Upper-middle', lat: -14.24, lon: -51.93, gdppc: 17000, poverty: 5.8, population: 215, urban: 88, energy: 100, internet: 81, education: 0.68, governance: 0.42, gini: 53.4, lifeExp: 76, cleanEnergy: 45, manufacturing: 11, services: 63, agriculture: 6, exports: 19 },
  { id: '484', iso3: 'MEX', name: 'Mexico', region: 'Latin America & Caribbean', income: 'Upper-middle', lat: 23.63, lon: -102.55, gdppc: 21000, poverty: 3.2, population: 130, urban: 81, energy: 100, internet: 72, education: 0.68, governance: 0.35, gini: 45.4, lifeExp: 75, cleanEnergy: 20, manufacturing: 17, services: 60, agriculture: 4, exports: 40 },
  { id: '170', iso3: 'COL', name: 'Colombia', region: 'Latin America & Caribbean', income: 'Upper-middle', lat: 4.57, lon: -74.30, gdppc: 16000, poverty: 4.6, population: 52, urban: 82, energy: 100, internet: 73, education: 0.66, governance: 0.40, gini: 51.3, lifeExp: 78, cleanEnergy: 68, manufacturing: 11, services: 58, agriculture: 7, exports: 16 },
  { id: '032', iso3: 'ARG', name: 'Argentina', region: 'Latin America & Caribbean', income: 'Upper-middle', lat: -38.42, lon: -63.62, gdppc: 24000, poverty: 4.5, population: 46, urban: 92, energy: 100, internet: 87, education: 0.78, governance: 0.42, gini: 42.3, lifeExp: 77, cleanEnergy: 20, manufacturing: 13, services: 53, agriculture: 7, exports: 14 },
  { id: '604', iso3: 'PER', name: 'Peru', region: 'Latin America & Caribbean', income: 'Upper-middle', lat: -9.19, lon: -75.02, gdppc: 14300, poverty: 3.6, population: 34, urban: 79, energy: 96, internet: 65, education: 0.65, governance: 0.40, gini: 43.8, lifeExp: 77, cleanEnergy: 50, manufacturing: 13, services: 57, agriculture: 7, exports: 25 },
  { id: '152', iso3: 'CHL', name: 'Chile', region: 'Latin America & Caribbean', income: 'High', lat: -35.68, lon: -71.54, gdppc: 28000, poverty: 1.4, population: 19.5, urban: 88, energy: 100, internet: 82, education: 0.78, governance: 0.68, gini: 44.9, lifeExp: 80, cleanEnergy: 40, manufacturing: 10, services: 62, agriculture: 4, exports: 32 },
  { id: '218', iso3: 'ECU', name: 'Ecuador', region: 'Latin America & Caribbean', income: 'Upper-middle', lat: -1.83, lon: -78.18, gdppc: 12000, poverty: 3.8, population: 18, urban: 64, energy: 98, internet: 62, education: 0.62, governance: 0.32, gini: 45.7, lifeExp: 77, cleanEnergy: 55, manufacturing: 12, services: 52, agriculture: 9, exports: 24 },
  { id: '862', iso3: 'VEN', name: 'Venezuela', region: 'Latin America & Caribbean', income: 'Upper-middle', lat: 6.42, lon: -66.59, gdppc: 7800, poverty: 33.0, population: 28, urban: 88, energy: 99, internet: 72, education: 0.62, governance: 0.10, gini: 44.8, lifeExp: 72, cleanEnergy: 58, manufacturing: 5, services: 42, agriculture: 5, exports: 16 },
  { id: '320', iso3: 'GTM', name: 'Guatemala', region: 'Latin America & Caribbean', income: 'Upper-middle', lat: 15.78, lon: -90.23, gdppc: 9300, poverty: 8.7, population: 18, urban: 53, energy: 97, internet: 42, education: 0.48, governance: 0.28, gini: 48.3, lifeExp: 75, cleanEnergy: 55, manufacturing: 14, services: 60, agriculture: 10, exports: 17 },
  { id: '214', iso3: 'DOM', name: 'Dominican Republic', region: 'Latin America & Caribbean', income: 'Upper-middle', lat: 18.74, lon: -70.16, gdppc: 20000, poverty: 1.6, population: 11, urban: 84, energy: 98, internet: 75, education: 0.62, governance: 0.35, gini: 39.6, lifeExp: 74, cleanEnergy: 15, manufacturing: 13, services: 58, agriculture: 6, exports: 22 },
  { id: '188', iso3: 'CRI', name: 'Costa Rica', region: 'Latin America & Caribbean', income: 'Upper-middle', lat: 9.75, lon: -83.75, gdppc: 23000, poverty: 1.4, population: 5.2, urban: 82, energy: 100, internet: 81, education: 0.74, governance: 0.62, gini: 48.2, lifeExp: 80, cleanEnergy: 90, manufacturing: 13, services: 65, agriculture: 4, exports: 33 },
  { id: '591', iso3: 'PAN', name: 'Panama', region: 'Latin America & Caribbean', income: 'High', lat: 8.54, lon: -80.78, gdppc: 31000, poverty: 1.3, population: 4.4, urban: 69, energy: 95, internet: 68, education: 0.66, governance: 0.48, gini: 49.2, lifeExp: 79, cleanEnergy: 65, manufacturing: 6, services: 76, agriculture: 3, exports: 45 },
  { id: '858', iso3: 'URY', name: 'Uruguay', region: 'Latin America & Caribbean', income: 'High', lat: -32.52, lon: -55.77, gdppc: 26000, poverty: 0.1, population: 3.5, urban: 96, energy: 100, internet: 85, education: 0.78, governance: 0.72, gini: 40.2, lifeExp: 78, cleanEnergy: 60, manufacturing: 11, services: 55, agriculture: 6, exports: 25 },
  { id: '068', iso3: 'BOL', name: 'Bolivia', region: 'Latin America & Caribbean', income: 'Lower-middle', lat: -16.29, lon: -63.59, gdppc: 9200, poverty: 4.0, population: 12.3, urban: 71, energy: 96, internet: 53, education: 0.60, governance: 0.28, gini: 43.6, lifeExp: 72, cleanEnergy: 35, manufacturing: 12, services: 46, agriculture: 12, exports: 28 },
  { id: '332', iso3: 'HTI', name: 'Haiti', region: 'Latin America & Caribbean', income: 'Low', lat: 18.97, lon: -72.29, gdppc: 2900, poverty: 30.0, population: 12, urban: 59, energy: 46, internet: 35, education: 0.35, governance: 0.08, gini: 41.1, lifeExp: 64, cleanEnergy: 15, manufacturing: 8, services: 48, agriculture: 22, exports: 12 },
  { id: '340', iso3: 'HND', name: 'Honduras', region: 'Latin America & Caribbean', income: 'Lower-middle', lat: 15.20, lon: -86.24, gdppc: 6400, poverty: 14.8, population: 10.5, urban: 59, energy: 93, internet: 42, education: 0.48, governance: 0.25, gini: 48.2, lifeExp: 75, cleanEnergy: 60, manufacturing: 13, services: 55, agriculture: 12, exports: 38 },
  { id: '600', iso3: 'PRY', name: 'Paraguay', region: 'Latin America & Caribbean', income: 'Upper-middle', lat: -23.44, lon: -58.44, gdppc: 14000, poverty: 1.2, population: 7.4, urban: 63, energy: 100, internet: 68, education: 0.58, governance: 0.32, gini: 45.7, lifeExp: 74, cleanEnergy: 95, manufacturing: 12, services: 50, agriculture: 10, exports: 35 },
  { id: '192', iso3: 'CUB', name: 'Cuba', region: 'Latin America & Caribbean', income: 'Upper-middle', lat: 21.52, lon: -77.78, gdppc: 9500, poverty: 0.0, population: 11, urban: 78, energy: 99, internet: 68, education: 0.75, governance: 0.22, gini: 32.0, lifeExp: 79, cleanEnergy: 10, manufacturing: 10, services: 60, agriculture: 4, exports: 12 },

  // === MIDDLE EAST & NORTH AFRICA ===
  { id: '818', iso3: 'EGY', name: 'Egypt', region: 'Middle East & North Africa', income: 'Lower-middle', lat: 26.82, lon: 30.80, gdppc: 14200, poverty: 5.0, population: 112, urban: 43, energy: 100, internet: 72, education: 0.62, governance: 0.30, gini: 31.5, lifeExp: 72, cleanEnergy: 12, manufacturing: 15, services: 51, agriculture: 11, exports: 18 },
  { id: '682', iso3: 'SAU', name: 'Saudi Arabia', region: 'Middle East & North Africa', income: 'High', lat: 23.89, lon: 45.08, gdppc: 56000, poverty: 0.0, population: 37, urban: 85, energy: 100, internet: 97, education: 0.72, governance: 0.42, gini: 45.9, lifeExp: 77, cleanEnergy: 3, manufacturing: 13, services: 46, agriculture: 3, exports: 35 },
  { id: '784', iso3: 'ARE', name: 'UAE', region: 'Middle East & North Africa', income: 'High', lat: 23.42, lon: 53.85, gdppc: 75000, poverty: 0.0, population: 10, urban: 87, energy: 100, internet: 99, education: 0.78, governance: 0.68, gini: 32.5, lifeExp: 79, cleanEnergy: 8, manufacturing: 9, services: 55, agriculture: 1, exports: 80 },
  { id: '364', iso3: 'IRN', name: 'Iran', region: 'Middle East & North Africa', income: 'Lower-middle', lat: 32.43, lon: 53.69, gdppc: 13200, poverty: 1.2, population: 89, urban: 77, energy: 100, internet: 78, education: 0.70, governance: 0.22, gini: 42.0, lifeExp: 77, cleanEnergy: 8, manufacturing: 13, services: 50, agriculture: 10, exports: 20 },
  { id: '368', iso3: 'IRQ', name: 'Iraq', region: 'Middle East & North Africa', income: 'Upper-middle', lat: 33.22, lon: 43.68, gdppc: 10500, poverty: 2.5, population: 44, urban: 71, energy: 100, internet: 55, education: 0.52, governance: 0.15, gini: 29.5, lifeExp: 72, cleanEnergy: 3, manufacturing: 2, services: 48, agriculture: 5, exports: 35 },
  { id: '504', iso3: 'MAR', name: 'Morocco', region: 'Middle East & North Africa', income: 'Lower-middle', lat: 31.79, lon: -7.09, gdppc: 8600, poverty: 4.0, population: 38, urban: 65, energy: 100, internet: 84, education: 0.52, governance: 0.42, gini: 39.5, lifeExp: 77, cleanEnergy: 25, manufacturing: 15, services: 51, agriculture: 12, exports: 37 },
  { id: '788', iso3: 'TUN', name: 'Tunisia', region: 'Middle East & North Africa', income: 'Lower-middle', lat: 33.89, lon: 9.54, gdppc: 11500, poverty: 0.3, population: 12, urban: 70, energy: 100, internet: 70, education: 0.65, governance: 0.38, gini: 32.8, lifeExp: 77, cleanEnergy: 10, manufacturing: 14, services: 56, agriculture: 10, exports: 45 },
  { id: '012', iso3: 'DZA', name: 'Algeria', region: 'Middle East & North Africa', income: 'Lower-middle', lat: 28.03, lon: 1.66, gdppc: 12300, poverty: 0.5, population: 46, urban: 75, energy: 100, internet: 49, education: 0.62, governance: 0.25, gini: 27.6, lifeExp: 77, cleanEnergy: 3, manufacturing: 5, services: 48, agriculture: 12, exports: 22 },
  { id: '400', iso3: 'JOR', name: 'Jordan', region: 'Middle East & North Africa', income: 'Upper-middle', lat: 30.59, lon: 36.24, gdppc: 11200, poverty: 0.1, population: 11.5, urban: 92, energy: 100, internet: 83, education: 0.72, governance: 0.50, gini: 33.7, lifeExp: 75, cleanEnergy: 20, manufacturing: 12, services: 60, agriculture: 5, exports: 35 },
  { id: '422', iso3: 'LBN', name: 'Lebanon', region: 'Middle East & North Africa', income: 'Lower-middle', lat: 33.85, lon: 35.86, gdppc: 12000, poverty: 12.0, population: 5.6, urban: 89, energy: 100, internet: 78, education: 0.68, governance: 0.22, gini: 31.8, lifeExp: 79, cleanEnergy: 5, manufacturing: 7, services: 72, agriculture: 3, exports: 25 },
  { id: '414', iso3: 'KWT', name: 'Kuwait', region: 'Middle East & North Africa', income: 'High', lat: 29.31, lon: 47.48, gdppc: 52000, poverty: 0.0, population: 4.4, urban: 100, energy: 100, internet: 98, education: 0.72, governance: 0.48, gini: 29.0, lifeExp: 79, cleanEnergy: 2, manufacturing: 6, services: 50, agriculture: 0, exports: 55 },
  { id: '634', iso3: 'QAT', name: 'Qatar', region: 'Middle East & North Africa', income: 'High', lat: 25.35, lon: 51.18, gdppc: 95000, poverty: 0.0, population: 3.0, urban: 99, energy: 100, internet: 99, education: 0.72, governance: 0.60, gini: 41.1, lifeExp: 80, cleanEnergy: 4, manufacturing: 8, services: 48, agriculture: 0, exports: 55 },
  { id: '512', iso3: 'OMN', name: 'Oman', region: 'Middle East & North Africa', income: 'High', lat: 21.47, lon: 55.98, gdppc: 38000, poverty: 0.0, population: 5.3, urban: 88, energy: 100, internet: 95, education: 0.68, governance: 0.55, gini: 30.0, lifeExp: 78, cleanEnergy: 3, manufacturing: 9, services: 48, agriculture: 2, exports: 55 },
  { id: '887', iso3: 'YEM', name: 'Yemen', region: 'Middle East & North Africa', income: 'Low', lat: 15.55, lon: 48.52, gdppc: 2400, poverty: 55.0, population: 34, urban: 39, energy: 73, internet: 27, education: 0.28, governance: 0.05, gini: 36.7, lifeExp: 66, cleanEnergy: 3, manufacturing: 3, services: 40, agriculture: 20, exports: 5 },
  { id: '760', iso3: 'SYR', name: 'Syria', region: 'Middle East & North Africa', income: 'Low', lat: 34.80, lon: 39.00, gdppc: 3200, poverty: 35.0, population: 22, urban: 56, energy: 86, internet: 35, education: 0.42, governance: 0.05, gini: 35.8, lifeExp: 73, cleanEnergy: 5, manufacturing: 5, services: 50, agriculture: 20, exports: 10 },
  { id: '434', iso3: 'LBY', name: 'Libya', region: 'Middle East & North Africa', income: 'Upper-middle', lat: 26.34, lon: 17.23, gdppc: 12000, poverty: 2.0, population: 7.0, urban: 81, energy: 70, internet: 50, education: 0.58, governance: 0.08, gini: 32.0, lifeExp: 73, cleanEnergy: 2, manufacturing: 5, services: 48, agriculture: 2, exports: 42 },

  // === NORTH AMERICA ===
  { id: '840', iso3: 'USA', name: 'United States', region: 'North America', income: 'High', lat: 37.09, lon: -95.71, gdppc: 76000, poverty: 1.0, population: 340, urban: 83, energy: 100, internet: 92, education: 0.88, governance: 0.78, gini: 39.8, lifeExp: 79, cleanEnergy: 22, manufacturing: 11, services: 78, agriculture: 1, exports: 12 },
  { id: '124', iso3: 'CAN', name: 'Canada', region: 'North America', income: 'High', lat: 56.13, lon: -106.35, gdppc: 54000, poverty: 0.5, population: 40, urban: 82, energy: 100, internet: 93, education: 0.88, governance: 0.85, gini: 33.3, lifeExp: 82, cleanEnergy: 68, manufacturing: 10, services: 70, agriculture: 2, exports: 31 },
];

// Create lookup maps
export const COUNTRY_BY_ID = {};
export const COUNTRY_BY_ISO3 = {};
COUNTRIES.forEach(c => {
  COUNTRY_BY_ID[c.id] = c;
  COUNTRY_BY_ISO3[c.iso3] = c;
});

// Get country centroid coordinates
export function getCountryCoords(iso3) {
  const c = COUNTRY_BY_ISO3[iso3];
  return c ? [c.lon, c.lat] : null;
}

// Scenario presets
export const SCENARIOS = {
  baseline: {
    name: 'Baseline',
    description: 'Current trajectory with existing policies and trends continuing. Moderate growth in most regions with gradual improvements driven by demographic and technological forces.',
    drivers: { infrastructure: 0.5, digital: 0.5, trade: 0.5, institutions: 0.5, humanCapital: 0.5, demographics: 0.5, energy: 0.5, urbanProductivity: 0.5, financialInclusion: 0.5, industrialPolicy: 0.5, ruleOfLaw: 0.5, exportComplexity: 0.5 },
    policies: {},
    shocks: { climate: 0.3, commodity: 0.5, conflict: 0.2, debt: 0.3, pandemic: 0.1, aiAdoption: 0.4, friendShoring: 0.3, techTransfer: 0.4 }
  },
  accelerated: {
    name: 'Accelerated Reform',
    description: 'Coordinated global reform effort with strong institutional capacity building, infrastructure investment, and digital transformation across developing economies.',
    drivers: { infrastructure: 0.8, digital: 0.8, trade: 0.7, institutions: 0.8, humanCapital: 0.8, demographics: 0.6, energy: 0.8, urbanProductivity: 0.7, financialInclusion: 0.8, industrialPolicy: 0.7, ruleOfLaw: 0.8, exportComplexity: 0.7 },
    policies: { education: true, broadband: true, grid: true, cleanPower: true, ports: true, manufacturing: true, health: true, landReform: true, antiCorruption: true, womenLabor: true, smeFinance: true, regionalTrade: true },
    shocks: { climate: 0.2, commodity: 0.5, conflict: 0.1, debt: 0.2, pandemic: 0.05, aiAdoption: 0.7, friendShoring: 0.5, techTransfer: 0.7 }
  },
  fragmentation: {
    name: 'Fragmentation',
    description: 'Global fragmentation with rising protectionism, geopolitical tensions, and reduced cooperation. Trade barriers increase and technology transfer slows significantly.',
    drivers: { infrastructure: 0.3, digital: 0.4, trade: 0.2, institutions: 0.3, humanCapital: 0.4, demographics: 0.5, energy: 0.3, urbanProductivity: 0.4, financialInclusion: 0.3, industrialPolicy: 0.3, ruleOfLaw: 0.3, exportComplexity: 0.3 },
    policies: {},
    shocks: { climate: 0.5, commodity: 0.6, conflict: 0.5, debt: 0.6, pandemic: 0.2, aiAdoption: 0.2, friendShoring: 0.8, techTransfer: 0.2 }
  },
  greenLeapfrog: {
    name: 'Green Leapfrog',
    description: 'Massive clean energy deployment and green industrialization enables developing nations to leapfrog fossil fuel dependency. Strong climate action with new economic pathways.',
    drivers: { infrastructure: 0.7, digital: 0.7, trade: 0.6, institutions: 0.6, humanCapital: 0.7, demographics: 0.5, energy: 0.9, urbanProductivity: 0.7, financialInclusion: 0.6, industrialPolicy: 0.7, ruleOfLaw: 0.5, exportComplexity: 0.6 },
    policies: { cleanPower: true, grid: true, broadband: true, manufacturing: true, education: true },
    shocks: { climate: 0.15, commodity: 0.4, conflict: 0.15, debt: 0.3, pandemic: 0.1, aiAdoption: 0.6, friendShoring: 0.4, techTransfer: 0.6 }
  },
  regionalBloc: {
    name: 'Regional Bloc Growth',
    description: 'Growth concentrated within regional trading blocs. Strong intra-regional cooperation but limited cross-bloc exchange. Uneven development outcomes.',
    drivers: { infrastructure: 0.6, digital: 0.5, trade: 0.4, institutions: 0.5, humanCapital: 0.5, demographics: 0.5, energy: 0.5, urbanProductivity: 0.6, financialInclusion: 0.5, industrialPolicy: 0.6, ruleOfLaw: 0.5, exportComplexity: 0.5 },
    policies: { ports: true, manufacturing: true, regionalTrade: true },
    shocks: { climate: 0.35, commodity: 0.5, conflict: 0.3, debt: 0.4, pandemic: 0.15, aiAdoption: 0.4, friendShoring: 0.7, techTransfer: 0.35 }
  }
};

// View modes
export const VIEW_MODES = [
  { id: 'devIndex', name: 'Development', field: 'devIndex', unit: 'idx', colorScale: 'devScale', min: 0, max: 1, computed: true },
  { id: 'poverty', name: 'Poverty', field: 'poverty', unit: '%', colorScale: 'povertyScale', min: 0, max: 70 },
  { id: 'gdppc', name: 'GDP per Capita', field: 'gdppc', unit: '$', colorScale: 'gdpScale', min: 500, max: 100000, log: true },
  { id: 'energy', name: 'Energy Access', field: 'energy', unit: '%', colorScale: 'energyScale', min: 0, max: 100 },
  { id: 'internet', name: 'Digital Connectivity', field: 'internet', unit: '%', colorScale: 'digitalScale', min: 0, max: 100 },
  { id: 'education', name: 'Education', field: 'education', unit: 'idx', colorScale: 'gdpScale', min: 0, max: 1 },
  { id: 'governance', name: 'Governance', field: 'governance', unit: 'idx', colorScale: 'gdpScale', min: 0, max: 1 },
  { id: 'urban', name: 'Urbanization', field: 'urban', unit: '%', colorScale: 'digitalScale', min: 0, max: 100 },
  { id: 'gini', name: 'Inequality (Gini)', field: 'gini', unit: '', colorScale: 'riskScale', min: 20, max: 65, invert: true },
  { id: 'cleanEnergy', name: 'Clean Energy', field: 'cleanEnergy', unit: '%', colorScale: 'energyScale', min: 0, max: 100 },
  { id: 'lifeExp', name: 'Life Expectancy', field: 'lifeExp', unit: 'yr', colorScale: 'gdpScale', min: 50, max: 90 },
  { id: 'risk', name: 'Risk / Fragility', computed: true, unit: 'idx', colorScale: 'riskScale', min: 0, max: 1, invert: true }
];
