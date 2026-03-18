# Prosperity Diffusion Dashboard — Detailed Expansion Spec

## Core goal
Transform the current visual into a decision-grade global development simulator that explains **what is happening, why it is happening, where it is happening, and what changes under different policy choices**.

## 1. Information architecture

### A. Global header
Show the most important controls and context at the top:
- Year selector with play / pause / step forward / step back
- Scenario selector: Baseline, Accelerated Reform, Fragmentation, Green Leapfrog, Regional Bloc Growth
- Geographic mode: Global, Region, Country, City-cluster
- View mode: Poverty, GDP per capita, Human Development, Infrastructure, Energy, Trade, Demographics, Governance, Risk
- Data source and methodology drawer

### B. Main map panel
The map should become the main exploration layer rather than just a background visual.

Map layers to toggle:
- Poverty intensity
- GDP per capita growth bands
- Electricity access
- Internet penetration
- Logistics / ports / corridors
- Education attainment
- Air pollution exposure
- Governance quality
- Conflict / fragility risk
- Urbanization and megacity expansion
- Industrial cluster formation
- Migration flows
- Clean energy buildout

Map interactions:
- Hover for quick tooltip
- Click country to pin a full country panel
- Shift-click multiple countries for comparison
- Lasso-select region clusters
- Toggle flow overlays: trade, FDI, migration, data cables, power corridors, supply chains
- Time scrubber animation with visible change trails

### C. Right-side control rail
Replace the current small slider panel with grouped driver systems.

#### Growth drivers
- Infrastructure investment
- Digital connectivity
- Trade openness
- Institutional capacity
- Human capital
- Demographic dividend
- Energy reliability
- Urban productivity
- Financial inclusion
- Industrial policy effectiveness
- Rule of law
- Export complexity

#### Policy interventions
Use binary toggles plus intensity sliders:
- Education expansion
- Broadband rollout
- Grid modernization
- Clean power buildout
- Port and corridor upgrades
- Manufacturing zones
- Health system strengthening
- Land and housing reform
- Anti-corruption reform
- Women’s labor participation initiatives
- SME finance access
- Regional trade agreements

#### Shock modules
Add positive and negative shocks:
- Climate shock severity
- Commodity boom / bust
- Conflict spillover
- Debt stress
- Pandemic-type disruption
- AI productivity adoption
- Friend-shoring / reshoring
- Technology transfer acceleration

## 2. KPI layer
The current KPI strip should expand into a modular metrics deck.

### Global KPIs
- Extreme poverty rate
- Moderate poverty rate
- People lifted from poverty this decade
- GDP per capita (PPP)
- Median household income proxy
- Inequality (Gini)
- Youth employment
- Labor productivity
- Urbanization
- Electricity access
- Broadband access
- Clean energy share
- PM2.5 exposure
- Life expectancy
- Education attainment index

### Distribution-aware KPIs
Do not only show averages. Also show:
- Bottom 40% income growth
- Rural vs urban gap
- Gender participation gap
- Regional concentration of growth
- Fragile-state population share

### KPI card behavior
Each KPI card should support:
- Trend line
- Change since selected baseline year
- Scenario delta vs baseline scenario
- Confidence band / uncertainty note
- Drill-through to drivers

## 3. Country detail drawer
When a user clicks a country, open a deep detail drawer.

### Country overview
- Population, median age, urban share
- GDP and GDP per capita
- Poverty rate and vulnerable population
- Sector mix: agriculture, industry, services
- Export basket summary
- Infrastructure scorecard
- Institutional capacity scorecard
- Energy mix and reliability

### Country trajectory charts
- Poverty rate over time
- GDP per capita over time
- Electricity access over time
- Internet penetration over time
- Education completion over time
- Clean energy share over time
- Air pollution / health burden over time

### Country levers panel
Explain highest-impact reforms for that country:
- Top 5 growth bottlenecks
- Top 5 poverty-reduction levers
- Estimated impact by 2030 / 2040 / 2050
- Sensitivity to governance quality
- Sensitivity to external trade conditions

## 4. Comparison mode
A serious dashboard needs comparison functionality.

### Compare countries or regions
Allow comparison of 2–6 entities across:
- Poverty path
- GDP per capita path
- Infrastructure depth
- Energy transition status
- Digital adoption
- Institutional capacity
- Demographic profile
- Trade integration

### Benchmark groups
Users should be able to compare against:
- Income peer group
- Regional peer group
- Aspirational peer group
- Fast improvers
- Frontier economies

## 5. Scenario engine
The current scenarios should be made more transparent and analytical.

### Scenario explanation panel
For each scenario, clearly explain:
- Assumptions
- Policy package included
- External conditions
- Adoption rates
- Main winners and laggards
- Risks to the scenario

### Scenario outputs
Show:
- Change in poverty headcount
- Change in GDP per capita
- Change in emissions intensity
- Change in electricity access
- Change in inequality
- Change in migration pressure
- Change in employment structure

### Waterfall / contribution analysis
For any country or region, show how outcomes are driven by:
- Infrastructure
- Education
- Governance
- Demographics
- Trade
- Energy
- Technology adoption
- External shocks

## 6. New panels to add

### A. Development diffusion network panel
A dedicated panel showing how prosperity spreads through:
- Trade corridors
- Port systems
- Rail and road links
- Undersea cables
- Electricity interconnectors
- Migration networks
- Knowledge spillovers
- FDI hubs

### B. Opportunity hotspots panel
Highlight locations where modest intervention yields outsized gains:
- Secondary cities
- Border trade zones
- Manufacturing corridors
- Clean energy clusters
- Logistics chokepoints
- Agricultural productivity belts

### C. Fragility and resilience panel
Track:
- Conflict exposure
- Food insecurity
- Climate vulnerability
- Water stress
- Debt burden
- Import dependence
- Governance resilience

### D. Structural transformation panel
Make this much richer than the current small bar:
- Employment by sector
- Value added by sector
- Export sophistication
- Informality rate
- Manufacturing depth
- Services complexity

## 7. Charts to add
Use a richer analytical panel beneath the map or in tabs.

Recommended chart types:
- Time-series lines for core indicators
- Stacked area for sector transition
- Sankey for migration / trade / energy flows
- Waterfall for driver contribution
- Radar chart for country capability profile
- Scatter plot: governance vs growth, electricity vs industrialization, broadband vs productivity
- Choropleth small multiples by year
- Cohort chart for regions by poverty reduction speed
- Bubble chart for city hubs and influence radius

## 8. Data model
To support a more detailed dashboard, structure the data in layers.

### Entity levels
- Global
- Region
- Country
- State / province where available
- Metro / city-cluster where available

### Time horizon
- Historical baseline: 2000–2025
- Simulation range: 2025–2100
- Near-term planning checkpoints: 2030, 2035, 2040, 2050

### Domain tables
- Macroeconomics
- Poverty and inequality
- Demographics
- Education
- Health
- Energy
- Infrastructure
- Trade and logistics
- Governance
- Climate and environment
- Technology adoption

## 9. UX upgrades
- Make the map less visually crowded with layer-specific density controls
- Add search for country, city, corridor, or indicator
- Add saved views and bookmarked scenarios
- Add explanation popovers for every metric
- Add uncertainty labels where projections are model-driven
- Support dark mode and export-ready presentation mode
- Allow CSV / PNG / PDF export

## 10. Best next version
If you want the next iteration to feel much more advanced, the best upgraded layout is:

1. **Top bar:** year, scenario, geography, indicator, search
2. **Center:** interactive world map with switchable layers and flows
3. **Right rail:** driver sliders, intervention toggles, shocks
4. **Bottom analytics tabs:** KPIs, trends, comparison, contribution, country details, hotspots, risks
5. **Left mini-rail:** saved views, benchmark presets, legend, export, notes

## 11. Priority build roadmap

### Phase 1 — Better dashboard structure
- Expand KPIs
- Add country detail drawer
- Add comparison mode
- Improve scenario controls
- Add more map layers

### Phase 2 — True analytical depth
- Driver contribution analysis
- Opportunity hotspot engine
- Fragility and resilience layer
- Benchmarking and peer comparison

### Phase 3 — Simulation maturity
- Scenario saving
- Policy package presets
- Uncertainty bands
- Subnational data
- City and corridor network modeling

## 12. Recommended design direction
Keep the premium dark global-command-center aesthetic, but make it more analytical and less decorative:
- Slightly reduce glow effects
- Increase text hierarchy and readability
- Use fewer simultaneous map arcs by default
- Let users toggle density of flows
- Reserve bright color for truly important changes
- Make the bottom section tabbed so the dashboard does not feel crowded

## 13. Strong feature shortlist
If the goal is the biggest upgrade with the least wasted effort, prioritize these seven additions first:
1. Country detail drawer
2. Comparison mode
3. More KPI cards with trend and delta
4. Map layer toggles
5. Contribution analysis waterfall
6. Opportunity hotspots panel
7. Risk / fragility overlay

