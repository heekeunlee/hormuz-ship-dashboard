const API = 'https://hormuz.now/api';
const CACHE_KEYS = {
  region: 'hormuzRegionCache',
  snapshot: 'hormuzSnapshotCache',
};

const FALLBACK_REGION = {
  chokePoint: { west: 55.88, east: 56.9, south: 26.18, north: 26.72 },
  lanes: {
    inbound: [
      { lon: 55.78, lat: 26.34 },
      { lon: 56.05, lat: 26.4 },
      { lon: 56.34, lat: 26.5 },
      { lon: 56.76, lat: 26.61 },
      { lon: 57.12, lat: 26.65 },
    ],
    outbound: [
      { lon: 57.12, lat: 26.48 },
      { lon: 56.78, lat: 26.48 },
      { lon: 56.38, lat: 26.4 },
      { lon: 56.08, lat: 26.29 },
      { lon: 55.76, lat: 26.22 },
    ],
  },
};

const FALLBACK_VESSELS = [
  { id: 'demo-1', name: 'Gulf Horizon', flag: 'LR', category: 'tanker', lon: 56.42, lat: 26.49, speed: 12.4, heading: 78, course: 78, destination: 'Fujairah', length: 333, width: 60, dwt: 299000, elapsedMin: 6 },
  { id: 'demo-2', name: 'Zagros Trader', flag: 'PA', category: 'cargo', lon: 56.08, lat: 26.31, speed: 10.1, heading: 258, course: 258, destination: 'Jebel Ali', length: 228, width: 32, dwt: 76000, elapsedMin: 11 },
  { id: 'demo-3', name: 'Musandam Pilot', flag: 'OM', category: 'tug', lon: 56.52, lat: 26.57, speed: 5.8, heading: 43, course: 43, destination: 'Khasab', length: 34, width: 11, dwt: 0, elapsedMin: 4 },
  { id: 'demo-4', name: 'Al Noor', flag: 'AE', category: 'cargo', lon: 55.96, lat: 26.21, speed: 8.7, heading: 92, course: 92, destination: 'Sharjah', length: 148, width: 24, dwt: 18000, elapsedMin: 18 },
  { id: 'demo-5', name: 'Pacific Meridian', flag: 'MH', category: 'tanker', lon: 56.82, lat: 26.63, speed: 13.2, heading: 252, course: 252, destination: 'Ras Tanura', length: 274, width: 48, dwt: 158000, elapsedMin: 9 },
  { id: 'demo-6', name: 'Dibba Pearl', flag: 'IR', category: 'fishing', lon: 56.22, lat: 26.67, speed: 2.6, heading: 188, course: 188, destination: '', length: 28, width: 7, dwt: 0, elapsedMin: 21 },
  { id: 'demo-7', name: 'Strait Express', flag: 'BH', category: 'highspeed', lon: 56.66, lat: 26.41, speed: 18.9, heading: 74, course: 74, destination: 'Bandar Abbas', length: 52, width: 12, dwt: 0, elapsedMin: 3 },
  { id: 'demo-8', name: 'Hormuz Light', flag: 'OM', category: 'navaid', lon: 56.31, lat: 26.52, speed: 0, heading: 0, course: 0, destination: '', length: 12, width: 12, dwt: 0, elapsedMin: 0 },
  { id: 'demo-9', name: 'Eastern Promise', flag: 'SG', category: 'cargo', lon: 56.92, lat: 26.52, speed: 9.4, heading: 265, course: 265, destination: 'Doha', length: 190, width: 30, dwt: 52000, elapsedMin: 14 },
  { id: 'demo-10', name: 'Nissos Qeshm', flag: 'GR', category: 'tanker', lon: 55.86, lat: 26.35, speed: 11.7, heading: 86, course: 86, destination: 'Kuwait', length: 249, width: 44, dwt: 115000, elapsedMin: 7 },
];

const CATEGORIES = [
  ['tanker', '#45df9f'],
  ['cargo', '#60a5fa'],
  ['tug', '#f6b44b'],
  ['fishing', '#a78bfa'],
  ['highspeed', '#fb7185'],
  ['navaid', '#facc15'],
  ['unknown', '#cbd5e1'],
];

const I18N = {
  ko: {
    eyebrow: 'Live AIS · 호르무즈 해협',
    title: '호르무즈 레이더',
    splashBrand: '호르무즈 레이더',
    splashTagline: '실시간 AIS 선박 관제',
    splashStatus: '해협 통항 신호 확인 중...',
    metricTotal: '전체 선박',
    metricChoke: '해협 내부',
    metricTankers: '탱커',
    metricCargo: '화물선',
    metricSpeed: '평균 속도',
    metricUpdated: '마지막 갱신',
    filters: '필터',
    refresh: '새로고침',
    searchPlaceholder: '선박명, 목적지, 국가 검색',
    traffic: '통항 방향',
    eastbound: '동향 · 걸프 진입',
    westbound: '서향 · 걸프 이탈',
    otherTraffic: '정박/횡단/기타',
    notableVessels: '대형 선박',
    country: '국가',
    speed: '속도',
    course: '방위',
    destination: '목적지',
    size: '크기',
    lastSeen: '최근 수신',
    close: '닫기',
    disclaimer: 'AIS 데이터는 지연, 누락, 스푸핑 가능성이 있습니다. 항해나 안전 판단용이 아닌 상황 인식용입니다.',
    connecting: '연결 중',
    loading: '불러오는 중',
    ships: '척',
    apiError: 'API 오류',
    offlineData: '오프라인 데이터',
    cachedData: '저장된 데이터',
    unknown: '미상',
    unnamed: '[이름 없음]',
    noDestination: '-',
    trailToggleOff: '48시간 궤적',
    trailToggleOn: '궤적 끄기',
    trailLoading: '궤적 로딩',
    secondsAgo: (n) => `${n}초 전`,
    minutesAgo: (n) => `${n}분 전`,
    hoursAgo: (n) => `${n}시간 전`,
    categories: {
      tanker: '탱커',
      cargo: '화물',
      tug: '예인/서비스',
      fishing: '어선',
      highspeed: '고속선',
      navaid: '항로표지',
      unknown: '미상',
    },
  },
  en: {
    eyebrow: 'Live AIS · Strait of Hormuz',
    title: 'Hormuz Radar',
    splashBrand: 'Hormuz Radar',
    splashTagline: 'Live AIS Vessel Watch',
    splashStatus: 'Scanning the Strait...',
    metricTotal: 'Total vessels',
    metricChoke: 'In chokepoint',
    metricTankers: 'Tankers',
    metricCargo: 'Cargo ships',
    metricSpeed: 'Avg speed',
    metricUpdated: 'Last update',
    filters: 'Filters',
    refresh: 'Refresh',
    searchPlaceholder: 'Search vessel, destination, or country',
    traffic: 'Traffic Direction',
    eastbound: 'Eastbound · into Gulf',
    westbound: 'Westbound · out of Gulf',
    otherTraffic: 'Anchored / cross / other',
    notableVessels: 'Large Vessels',
    country: 'Country',
    speed: 'Speed',
    course: 'Course',
    destination: 'Destination',
    size: 'Size',
    lastSeen: 'Last seen',
    close: 'Close',
    disclaimer: 'AIS data can be delayed, incomplete, or spoofed. Use for situational awareness only, not navigation or safety decisions.',
    connecting: 'Connecting',
    loading: 'Loading',
    ships: 'ships',
    apiError: 'API error',
    offlineData: 'Offline data',
    cachedData: 'Cached data',
    unknown: 'Unknown',
    unnamed: '[Unnamed]',
    noDestination: '-',
    trailToggleOff: '48h trails',
    trailToggleOn: 'Hide trails',
    trailLoading: 'Loading trails',
    secondsAgo: (n) => `${n}s ago`,
    minutesAgo: (n) => `${n}m ago`,
    hoursAgo: (n) => `${n}h ago`,
    categories: {
      tanker: 'Tankers',
      cargo: 'Cargo',
      tug: 'Tug / service',
      fishing: 'Fishing',
      highspeed: 'High-speed',
      navaid: 'Nav. aid',
      unknown: 'Unknown',
    },
  },
};

const state = {
  snapshot: null,
  region: null,
  selected: null,
  enabled: new Set(CATEGORIES.map(([key]) => key)),
  query: '',
  lang: localStorage.getItem('dashboardLang') === 'en' ? 'en' : 'ko',
  statusKind: '',
  statusKey: 'connecting',
  trailsVisible: false,
  trailsLoaded: false,
  trailsLoading: false,
  trailRows: [],
};

const $ = (id) => document.getElementById(id);

const els = {
  splash: $('splash'),
  status: $('status'),
  langToggle: $('langToggle'),
  trailToggle: $('trailToggle'),
  total: $('total'),
  choke: $('choke'),
  tankers: $('tankers'),
  cargo: $('cargo'),
  speed: $('speed'),
  updated: $('updated'),
  chips: $('chips'),
  search: $('search'),
  refresh: $('refresh'),
  eastText: $('eastText'),
  westText: $('westText'),
  crossText: $('crossText'),
  eastBar: $('eastBar'),
  westBar: $('westBar'),
  crossBar: $('crossBar'),
  vesselList: $('vesselList'),
  detail: $('detail'),
  closeDetail: $('closeDetail'),
  detailType: $('detailType'),
  detailName: $('detailName'),
  detailFlag: $('detailFlag'),
  detailSpeed: $('detailSpeed'),
  detailCourse: $('detailCourse'),
  detailDest: $('detailDest'),
  detailSize: $('detailSize'),
  detailAge: $('detailAge'),
};

const colors = Object.fromEntries(CATEGORIES.map(([key, color]) => [key, color]));
const regionNames = {};
const STRAIT_CHANNEL = [
  [55.95, 26.28],
  [56.12, 26.33],
  [56.34, 26.43],
  [56.58, 26.55],
  [56.78, 26.62],
  [56.95, 26.66],
];

const map = new maplibregl.Map({
  container: 'map',
  style: 'https://tiles.openfreemap.org/styles/bright',
  center: [56.25, 26.55],
  zoom: 7.35,
  minZoom: 5,
  maxZoom: 13,
  attributionControl: false,
});

const shipPopup = new maplibregl.Popup({
  closeButton: false,
  closeOnClick: false,
  offset: 14,
  className: 'ship-hover-popup',
});

map.addControl(new maplibregl.NavigationControl({ visualizePitch: false }), 'bottom-right');
map.addControl(new maplibregl.ScaleControl({ unit: 'nautical' }), 'bottom-left');
map.addControl(new maplibregl.AttributionControl({ compact: true }), 'bottom-right');

map.on('load', async () => {
  enhanceMapContrast();
  await addShipImages();
  addSources();
  addLayers();
  loadAll();
});

map.on('styledata', enhanceMapContrast);

function setStatus(kind, text) {
  state.statusKind = kind;
  state.statusKey = text;
  els.status.className = `status ${kind}`;
  els.status.querySelector('strong').textContent = statusText(text);
}

function buildChips() {
  els.chips.innerHTML = '';
  CATEGORIES.forEach(([key, color]) => {
    const button = document.createElement('button');
    button.className = 'chip';
    button.type = 'button';
    button.dataset.key = key;
    button.style.borderColor = `${color}88`;
    button.addEventListener('click', () => {
      if (state.enabled.has(key)) state.enabled.delete(key);
      else state.enabled.add(key);
      button.classList.toggle('off', !state.enabled.has(key));
      render();
    });
    els.chips.appendChild(button);
  });
}

async function loadAll() {
  setStatus('', 'loading');
  try {
    const [region, snapshot] = await Promise.all([
      fetchJson(`${API}/region`),
      fetchJson(`${API}/snapshot`),
    ]);
    state.region = region;
    state.snapshot = snapshot;
    writeCache(CACHE_KEYS.region, region);
    writeCache(CACHE_KEYS.snapshot, snapshot);
    renderRegion();
    render();
    setStatus('live', 'liveCount');
  } catch (error) {
    console.error(error);
    const cachedRegion = readCache(CACHE_KEYS.region);
    const cachedSnapshot = readCache(CACHE_KEYS.snapshot);
    state.region = cachedRegion || FALLBACK_REGION;
    state.snapshot = normalizeFallbackSnapshot(cachedSnapshot || makeFallbackSnapshot());
    renderRegion();
    render();
    setStatus(cachedRegion && cachedSnapshot ? 'offline' : 'demo', cachedRegion && cachedSnapshot ? 'cachedData' : 'offlineData');
  }
}

async function fetchJson(url) {
  const response = await fetch(url, { cache: 'no-store' });
  if (!response.ok) throw new Error(`${response.status} ${url}`);
  return response.json();
}

function readCache(key) {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch {
    return null;
  }
}

function writeCache(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Storage can be unavailable in private browsing or strict browser modes.
  }
}

function normalizeFallbackSnapshot(snapshot) {
  const now = Date.now();
  return {
    ...snapshot,
    generatedAt: snapshot.generatedAt || now,
    fetchedAt: snapshot.fetchedAt || now,
    vessels: (snapshot.vessels || []).map((vessel, index) => ({
      ...vessel,
      id: vessel.id || `fallback-${index}`,
      elapsedMin: Number.isFinite(Number(vessel.elapsedMin)) ? Number(vessel.elapsedMin) : 0,
    })),
  };
}

function makeFallbackSnapshot() {
  const vessels = FALLBACK_VESSELS.map((vessel) => ({ ...vessel }));
  const stats = vessels.reduce((acc, vessel) => {
    const speed = Number(vessel.speed) || 0;
    const category = vessel.category || 'unknown';
    const course = Number(vessel.course || vessel.heading) || 0;
    const inChoke = vessel.lon >= FALLBACK_REGION.chokePoint.west &&
      vessel.lon <= FALLBACK_REGION.chokePoint.east &&
      vessel.lat >= FALLBACK_REGION.chokePoint.south &&
      vessel.lat <= FALLBACK_REGION.chokePoint.north;

    acc.speedTotal += speed;
    if (inChoke) acc.inChokePoint += 1;
    if (category === 'tanker') acc.tankers += 1;
    if (category === 'cargo') acc.cargo += 1;
    if (course >= 45 && course <= 135) acc.eastbound += 1;
    else if (course >= 225 && course <= 315) acc.westbound += 1;
    else acc.northSouth += 1;
    return acc;
  }, {
    inChokePoint: 0,
    tankers: 0,
    cargo: 0,
    eastbound: 0,
    westbound: 0,
    northSouth: 0,
    speedTotal: 0,
  });

  stats.avgSpeed = stats.speedTotal / Math.max(1, vessels.length);
  delete stats.speedTotal;

  return {
    count: vessels.length,
    generatedAt: Date.now(),
    fetchedAt: Date.now(),
    stats,
    vessels,
  };
}

async function fetchTrailRows() {
  const [history, current] = await Promise.all([
    fetchJson(`${API}/transits/history?hours=48&limit=500`),
    fetchJson(`${API}/transits/current`),
  ]);
  return [
    ...((history && history.transits) || []),
    ...((current && current.transits) || []),
  ];
}

function addSources() {
  map.addSource('trails', {
    type: 'geojson',
    data: { type: 'FeatureCollection', features: [] },
  });
  map.addSource('ships', {
    type: 'geojson',
    data: { type: 'FeatureCollection', features: [] },
  });
  map.addSource('choke', {
    type: 'geojson',
    data: { type: 'FeatureCollection', features: [] },
  });
  map.addSource('lanes', {
    type: 'geojson',
    data: { type: 'FeatureCollection', features: [] },
  });
}

function addLayers() {
  map.addLayer({
    id: 'trail-glow',
    type: 'line',
    source: 'trails',
    paint: {
      'line-color': ['get', 'color'],
      'line-width': ['get', 'glowWidth'],
      'line-opacity': ['get', 'glowOpacity'],
      'line-blur': 4,
    },
  });
  map.addLayer({
    id: 'trail-line',
    type: 'line',
    source: 'trails',
    paint: {
      'line-color': ['get', 'color'],
      'line-width': ['get', 'width'],
      'line-opacity': ['get', 'opacity'],
    },
  });
  map.addLayer({
    id: 'choke-fill',
    type: 'fill',
    source: 'choke',
    paint: { 'fill-color': '#f6b44b', 'fill-opacity': 0.12 },
  });
  map.addLayer({
    id: 'choke-line',
    type: 'line',
    source: 'choke',
    paint: {
      'line-color': '#f6b44b',
      'line-width': 2.5,
      'line-dasharray': [3, 2],
    },
  });
  map.addLayer({
    id: 'lane-line',
    type: 'line',
    source: 'lanes',
    paint: {
      'line-color': ['match', ['get', 'dir'], 'inbound', '#22d3ee', '#f6b44b'],
      'line-width': 2,
      'line-opacity': 0.7,
    },
  });
  map.addLayer({
    id: 'ship-glow',
    type: 'circle',
    source: 'ships',
    paint: {
      'circle-color': ['get', 'color'],
      'circle-radius': ['interpolate', ['linear'], ['zoom'], 5, 3, 9, 9, 12, 16],
      'circle-opacity': 0.26,
      'circle-blur': 0.9,
    },
  });
  map.addLayer({
    id: 'ships',
    type: 'symbol',
    source: 'ships',
    layout: {
      'icon-image': ['case', ['get', 'moving'], 'ship-arrow', 'ship-dot'],
      'icon-size': ['interpolate', ['linear'], ['zoom'], 5, 0.42, 9, 0.76, 12, 1.12],
      'icon-rotate': ['get', 'bearing'],
      'icon-rotation-alignment': 'map',
      'icon-allow-overlap': true,
      'icon-ignore-placement': true,
    },
    paint: {
      'icon-color': ['get', 'color'],
      'icon-halo-color': '#020617',
      'icon-halo-width': 0.9,
    },
  });
  map.addLayer({
    id: 'ship-labels',
    type: 'symbol',
    source: 'ships',
    minzoom: 9.2,
    filter: ['>=', ['get', 'length'], 180],
    layout: {
      'text-field': ['get', 'name'],
      'text-size': 10,
      'text-offset': [0, 1.35],
      'text-anchor': 'top',
      'text-optional': true,
    },
    paint: {
      'text-color': '#f8fafc',
      'text-halo-color': '#020617',
      'text-halo-width': 1.5,
    },
  });

  map.on('click', 'ships', (event) => {
    const id = event.features?.[0]?.properties?.id;
    if (id) showDetail(id, true);
  });
  map.on('mouseenter', 'ships', () => { map.getCanvas().style.cursor = 'pointer'; });
  map.on('mousemove', 'ships', showShipPopup);
  map.on('mouseleave', 'ships', () => {
    map.getCanvas().style.cursor = '';
    shipPopup.remove();
  });
}

async function addShipImages() {
  const arrow = await makeIcon((ctx, size) => {
    ctx.translate(size / 2, size / 2);
    ctx.beginPath();
    ctx.moveTo(0, -23);
    ctx.lineTo(13, 15);
    ctx.lineTo(0, 7);
    ctx.lineTo(-13, 15);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  }, 64);
  const dot = await makeIcon((ctx) => {
    ctx.beginPath();
    ctx.arc(16, 16, 9, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
  }, 32);
  map.addImage('ship-arrow', arrow, { sdf: true, pixelRatio: 2 });
  map.addImage('ship-dot', dot, { sdf: true, pixelRatio: 2 });
}

async function makeIcon(draw, size) {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#fff';
  ctx.strokeStyle = 'rgba(0,0,0,0.62)';
  ctx.lineWidth = 1.5;
  draw(ctx, size);
  return createImageBitmap(canvas);
}

function renderRegion() {
  if (!state.region) return;
  const box = state.region.chokePoint;
  map.getSource('choke').setData({
    type: 'Feature',
    properties: {},
    geometry: {
      type: 'Polygon',
      coordinates: [[
        [box.west, box.south],
        [box.east, box.south],
        [box.east, box.north],
        [box.west, box.north],
        [box.west, box.south],
      ]],
    },
  });
  map.getSource('lanes').setData({
    type: 'FeatureCollection',
    features: [
      laneFeature('inbound', state.region.lanes.inbound),
      laneFeature('outbound', state.region.lanes.outbound),
    ],
  });
}

function laneFeature(dir, points) {
  return {
    type: 'Feature',
    properties: { dir },
    geometry: { type: 'LineString', coordinates: points.map((p) => [p.lon, p.lat]) },
  };
}

function render() {
  if (!state.snapshot || !map.getSource('ships')) return;
  const ships = filteredShips();
  map.getSource('ships').setData({
    type: 'FeatureCollection',
    features: ships.map((v) => ({
      type: 'Feature',
      properties: {
        id: v.id,
        name: v.name || t('unnamed'),
        color: colors[v.category] || colors.unknown,
        flag: v.flag || '',
        country: countryName(v.flag),
        type: vesselTypeLabel(v),
        speed: Number(v.speed || 0).toFixed(1),
        bearing: validBearing(v.heading) ? v.heading : (v.course || 0),
        moving: Number(v.speed) > 0.5,
        length: Number(v.length) || 0,
      },
      geometry: { type: 'Point', coordinates: [v.lon, v.lat] },
    })),
  });
  renderStats();
  renderList(ships);
}

function filteredShips() {
  const q = state.query.toLowerCase();
  return state.snapshot.vessels.filter((v) => {
    if (!state.enabled.has(v.category || 'unknown')) return false;
    if (!q) return true;
    return [v.name, v.destination, v.flag, countryName(v.flag), v.shiptypeLabel, v.gtLabel]
      .filter(Boolean)
      .some((value) => String(value).toLowerCase().includes(q));
  });
}

function renderStats() {
  const { snapshot } = state;
  const stats = snapshot.stats || {};
  els.total.textContent = fmt(snapshot.count);
  els.choke.textContent = fmt(stats.inChokePoint);
  els.tankers.textContent = fmt(stats.tankers);
  els.cargo.textContent = fmt(stats.cargo);
  els.speed.textContent = `${Number(stats.avgSpeed || 0).toFixed(1)} kn`;
  els.updated.textContent = age(snapshot.generatedAt || snapshot.fetchedAt);

  const east = stats.eastbound || 0;
  const west = stats.westbound || 0;
  const cross = stats.northSouth || 0;
  const total = Math.max(1, east + west + cross);
  els.eastText.textContent = fmt(east);
  els.westText.textContent = fmt(west);
  els.crossText.textContent = fmt(cross);
  els.eastBar.style.width = `${(east / total) * 100}%`;
  els.westBar.style.width = `${(west / total) * 100}%`;
  els.crossBar.style.width = `${(cross / total) * 100}%`;
}

function renderList(ships) {
  const notable = ships
    .filter((v) => Number(v.length) > 140 || Number(v.dwt) > 80000)
    .sort((a, b) => (Number(b.dwt) || Number(b.length)) - (Number(a.dwt) || Number(a.length)))
    .slice(0, 12);
  els.vesselList.innerHTML = '';
  notable.forEach((v) => {
    const li = document.createElement('li');
    li.innerHTML = `<b>${escapeHtml(v.name || t('unnamed'))}</b><span>${escapeHtml(vesselTypeLabel(v))} · ${Number(v.speed || 0).toFixed(1)} kn</span>`;
    li.addEventListener('click', () => showDetail(v.id, true));
    els.vesselList.appendChild(li);
  });
}

function showDetail(id, fly) {
  const v = state.snapshot?.vessels.find((item) => item.id === id);
  if (!v) return;
  state.selected = id;
  els.detail.classList.remove('hidden');
  els.detailType.textContent = `${vesselTypeLabel(v)} · ${flagEmoji(v.flag)} ${countryName(v.flag)}`;
  els.detailName.textContent = v.name || t('unnamed');
  els.detailFlag.textContent = `${flagEmoji(v.flag)} ${countryName(v.flag)}`;
  els.detailSpeed.textContent = `${Number(v.speed || 0).toFixed(1)} kn`;
  els.detailCourse.textContent = `${Math.round(v.course || v.heading || 0)} deg`;
  els.detailDest.textContent = v.destination || t('noDestination');
  els.detailSize.textContent = v.length ? `${Math.round(v.length)} x ${Math.round(v.width || 0)} m` : '-';
  els.detailAge.textContent = v.elapsedMin >= 0 ? t('minutesAgo')(Math.round(v.elapsedMin)) : '-';
  if (fly) map.flyTo({ center: [v.lon, v.lat], zoom: Math.max(9.4, map.getZoom()), duration: 700 });
}

function showShipPopup(event) {
  const feature = event.features?.[0];
  if (!feature) return;
  const props = feature.properties;
  const flag = props.flag || '';
  const html = `
    <div class="ship-pop">
      <div class="ship-pop-country">
        <span class="ship-pop-flag">${flagEmoji(flag)}</span>
        <strong>${escapeHtml(props.country || countryName(flag))}</strong>
      </div>
      <div class="ship-pop-name">${escapeHtml(props.name || t('unnamed'))}</div>
      <div class="ship-pop-meta">${escapeHtml(props.type || t('unknown'))} · ${escapeHtml(props.speed || '0.0')} kn</div>
    </div>
  `;
  shipPopup
    .setLngLat(event.lngLat)
    .setHTML(html)
    .addTo(map);
}

async function toggleTrails() {
  if (state.trailsLoading) return;
  state.trailsVisible = !state.trailsVisible;
  els.trailToggle.dataset.active = state.trailsVisible ? 'true' : 'false';

  if (!state.trailsVisible) {
    renderTrails([]);
    applyTrailButtonLabel();
    return;
  }

  if (!state.trailsLoaded) {
    state.trailsLoading = true;
    applyTrailButtonLabel();
    try {
      state.trailRows = await fetchTrailRows();
      state.trailsLoaded = true;
    } catch (error) {
      console.error(error);
      state.trailsVisible = false;
      els.trailToggle.dataset.active = 'false';
    } finally {
      state.trailsLoading = false;
    }
  }

  if (state.trailsVisible) renderTrails(state.trailRows);
  applyTrailButtonLabel();
}

function renderTrails(rows) {
  const source = map.getSource('trails');
  if (!source) return;
  source.setData({
    type: 'FeatureCollection',
    features: rows.flatMap((row) => trailFeatures(row)),
  });
}

function trailFeatures(row) {
  const start = pointFrom(row.entryLon, row.entryLat);
  const end = pointFrom(row.exitLon ?? row.lon, row.exitLat ?? row.lat);
  if (!start || !end) return [];

  const ageMs = Date.now() - Number(row.enteredAt || row.exitedAt || row.lastSeen || 0);
  if (ageMs > 48 * 60 * 60 * 1000 && !row.lastSeen) return [];

  const color = colors[row.category] || colors.unknown;
  const curve = routeCurve(start, end);
  const segments = curve.length - 1;
  const features = [];
  for (let i = 0; i < segments; i += 1) {
    const alpha = (i + 1) / segments;
    features.push({
      type: 'Feature',
      properties: {
        color,
        opacity: 0.08 + alpha * 0.62,
        glowOpacity: 0.03 + alpha * 0.16,
        width: 1.2 + alpha * 3.4,
        glowWidth: 5 + alpha * 11,
      },
      geometry: {
        type: 'LineString',
        coordinates: [
          curve[i],
          curve[i + 1],
        ],
      },
    });
  }
  return features;
}

function pointFrom(lon, lat) {
  const x = Number(lon);
  const y = Number(lat);
  if (!Number.isFinite(x) || !Number.isFinite(y)) return null;
  return [x, y];
}

function routeCurve(start, end) {
  const steps = 36;
  const controlA = mixPoint(start, channelPoint(start[0]), 0.78);
  const controlB = mixPoint(end, channelPoint(end[0]), 0.78);
  const distance = Math.hypot(end[0] - start[0], end[1] - start[1]);

  if (distance < 0.08) {
    const middle = channelPoint((start[0] + end[0]) / 2);
    const loop = [middle[0], middle[1] + 0.08];
    return Array.from({ length: steps + 1 }, (_, i) => {
      const tValue = i / steps;
      return quadraticBezier(start, loop, end, tValue);
    });
  }

  return Array.from({ length: steps + 1 }, (_, i) => {
    const tValue = i / steps;
    return cubicBezier(start, controlA, controlB, end, tValue);
  });
}

function channelPoint(lon) {
  const clampedLon = Math.min(Math.max(Number(lon), STRAIT_CHANNEL[0][0]), STRAIT_CHANNEL[STRAIT_CHANNEL.length - 1][0]);
  for (let i = 0; i < STRAIT_CHANNEL.length - 1; i += 1) {
    const a = STRAIT_CHANNEL[i];
    const b = STRAIT_CHANNEL[i + 1];
    if (clampedLon >= a[0] && clampedLon <= b[0]) {
      const tValue = (clampedLon - a[0]) / (b[0] - a[0] || 1);
      return mixPoint(a, b, tValue);
    }
  }
  return STRAIT_CHANNEL[STRAIT_CHANNEL.length - 1];
}

function mixPoint(a, b, tValue) {
  return [
    a[0] + (b[0] - a[0]) * tValue,
    a[1] + (b[1] - a[1]) * tValue,
  ];
}

function quadraticBezier(a, b, c, tValue) {
  const p = mixPoint(a, b, tValue);
  const q = mixPoint(b, c, tValue);
  return mixPoint(p, q, tValue);
}

function cubicBezier(a, b, c, d, tValue) {
  const p = quadraticBezier(a, b, c, tValue);
  const q = quadraticBezier(b, c, d, tValue);
  return mixPoint(p, q, tValue);
}

function enhanceMapContrast() {
  const style = map.getStyle();
  if (!style || !style.layers) return;
  for (const layer of style.layers) {
    const id = layer.id || '';
    const sourceLayer = layer['source-layer'] || '';
    try {
      if (layer.type === 'background') {
        map.setPaintProperty(id, 'background-color', '#eef4f7');
      } else if (layer.type === 'fill' && (sourceLayer === 'water' || /water|ocean|sea/i.test(id))) {
        map.setPaintProperty(id, 'fill-color', '#8ed0ef');
        map.setPaintProperty(id, 'fill-opacity', 1);
      } else if (layer.type === 'fill' && /land|earth|park|sand/i.test(id)) {
        map.setPaintProperty(id, 'fill-opacity', 1);
      } else if (layer.type === 'line' && /water|river|marine/i.test(id)) {
        map.setPaintProperty(id, 'line-color', '#2b92c3');
      } else if (layer.type === 'line' && /road|boundary/i.test(id)) {
        map.setPaintProperty(id, 'line-opacity', 0.82);
      } else if (layer.type === 'symbol') {
        if (map.getPaintProperty(id, 'text-color') !== undefined) {
          map.setPaintProperty(id, 'text-color', '#273946');
          map.setPaintProperty(id, 'text-halo-color', '#ffffff');
          map.setPaintProperty(id, 'text-halo-width', 1.4);
        }
      }
    } catch {
      // Some upstream style layers do not support every paint property.
    }
  }
}

function validBearing(value) {
  return Number(value) > 0 && Number(value) <= 360;
}

function fmt(value) {
  return Number(value || 0).toLocaleString('en-US');
}

function age(timestamp) {
  const seconds = Math.max(0, Math.round((Date.now() - timestamp) / 1000));
  if (seconds < 60) return t('secondsAgo')(seconds);
  const minutes = Math.round(seconds / 60);
  if (minutes < 60) return t('minutesAgo')(minutes);
  return t('hoursAgo')(Math.round(minutes / 60));
}

function flagEmoji(code) {
  const cc = normalizeCountryCode(code);
  if (!cc) return '🏳';
  const base = 0x1F1E6;
  return String.fromCodePoint(base + cc.charCodeAt(0) - 65) +
    String.fromCodePoint(base + cc.charCodeAt(1) - 65);
}

function countryName(code) {
  const cc = normalizeCountryCode(code);
  if (!cc) return t('unknown');
  if (typeof Intl === 'undefined' || !Intl.DisplayNames) return cc;
  regionNames[state.lang] ||= new Intl.DisplayNames([state.lang], { type: 'region' });
  return regionNames[state.lang]?.of(cc) || cc;
}

function normalizeCountryCode(code) {
  const cc = String(code || '').trim().toUpperCase();
  return /^[A-Z]{2}$/.test(cc) ? cc : '';
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  }[char]));
}

function t(key) {
  return I18N[state.lang][key];
}

function statusText(key) {
  if (key === 'liveCount') return `${fmt(state.snapshot?.count || 0)} ${t('ships')}`;
  if (key === 'loading') return t('loading');
  if (key === 'apiError') return t('apiError');
  if (key === 'offlineData') return t('offlineData');
  if (key === 'cachedData') return t('cachedData');
  if (key === 'connecting') return t('connecting');
  return key;
}

function vesselTypeLabel(v) {
  return t('categories')[v.category] || v.shiptypeLabel || v.category || t('unknown');
}

function applyLanguage() {
  document.documentElement.lang = state.lang;
  document.querySelectorAll('[data-i18n]').forEach((node) => {
    node.textContent = t(node.dataset.i18n);
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach((node) => {
    node.placeholder = t(node.dataset.i18nPlaceholder);
  });
  document.querySelectorAll('[data-i18n-aria]').forEach((node) => {
    node.setAttribute('aria-label', t(node.dataset.i18nAria));
  });
  document.querySelectorAll('[data-lang-option]').forEach((node) => {
    node.dataset.active = node.dataset.langOption === state.lang ? 'true' : 'false';
  });
  els.langToggle.setAttribute('aria-pressed', state.lang === 'en' ? 'true' : 'false');
  els.status.querySelector('strong').textContent = statusText(state.statusKey);
  els.chips.querySelectorAll('.chip').forEach((button) => {
    button.textContent = t('categories')[button.dataset.key] || button.dataset.key;
  });
  applyTrailButtonLabel();
  render();
  if (state.selected) showDetail(state.selected, false);
}

function startSplash() {
  if (!els.splash) return;
  document.body.classList.add('splash-active');
  window.setTimeout(() => {
    els.splash.classList.add('is-hidden');
    document.body.classList.remove('splash-active');
  }, 3000);
}

function applyTrailButtonLabel() {
  if (state.trailsLoading) {
    els.trailToggle.textContent = t('trailLoading');
  } else {
    els.trailToggle.textContent = state.trailsVisible ? t('trailToggleOn') : t('trailToggleOff');
  }
}

buildChips();
applyLanguage();
startSplash();
els.refresh.addEventListener('click', loadAll);
els.trailToggle.addEventListener('click', toggleTrails);
els.langToggle.addEventListener('click', () => {
  state.lang = state.lang === 'ko' ? 'en' : 'ko';
  localStorage.setItem('dashboardLang', state.lang);
  shipPopup.remove();
  applyLanguage();
});
els.search.addEventListener('input', (event) => {
  state.query = event.target.value.trim();
  render();
});
els.closeDetail.addEventListener('click', () => els.detail.classList.add('hidden'));
setInterval(() => {
  if (state.snapshot) els.updated.textContent = age(state.snapshot.generatedAt || state.snapshot.fetchedAt);
}, 1000);
