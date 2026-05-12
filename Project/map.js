const map = L.map('map', {
    center: [26.5, 70.5],
    zoom: 6,
    zoomControl: true,
    attributionControl: false
});

L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    maxZoom: 18, opacity: 1
}).addTo(map);

L.tileLayer('https://tile.opentopomap.org/{z}/{x}/{y}.png', {
    maxZoom: 17, opacity: 0.55
}).addTo(map);

const anchors = [
    [37.3,69.4],[35.8,72.5],[34.0,76.8],[31.8,79.2],
    [29.0,80.2],[26.0,78.5],[23.5,77.8],[19.0,74.8],
    [20.2,71.2],[21.8,69.2],[23.0,67.2],[24.5,62.0],
    [25.3,61.0],[28.0,61.5],[31.5,66.5],[34.8,67.8],[37.3,69.4]
];

function smoothPoints(points, iterations) {
    let s = [...points];
    for (let i = 0; i < iterations; i++) {
        let n = [];
        for (let j = 0; j < s.length - 1; j++) {
        let p1 = s[j], p2 = s[j+1];
        n.push([p1[0]*0.75+p2[0]*0.25, p1[1]*0.75+p2[1]*0.25]);
        n.push([p1[0]*0.25+p2[0]*0.75, p1[1]*0.25+p2[1]*0.75]);
        }
        n.push(n[0]); s = n;
    }
    return s;
}

const boundary = smoothPoints(anchors, 4);
const worldMask = [[-90,-180],[-90,180],[90,180],[90,-180],[-90,-180]];

L.polygon([worldMask, boundary], {
    fillColor: '#0d0a05', fillOpacity: 0.97,
    color: '#c9922a', weight: 2.5, opacity: 1, interactive: false
}).addTo(map);

L.polygon([boundary], {
    fillColor: 'transparent', fillOpacity: 0,
    color: '#ffd700', weight: 0.8, opacity: 0.4, interactive: false
}).addTo(map);

const rivers = [
    { name: "Indus",         path: [[37,72],[35,71.5],[33,70.5],[31,71],[29,70.5],[27.5,68.3],[25.5,68],[24,67.5],[22.8,67.6],[22,67.3]] },
    { name: "Sutlej",        path: [[32,78.5],[31,76],[30,74],[29.5,72],[29,71],[28.5,70.2],[28.2,69.8]] },
    { name: "Ravi",          path: [[33,76.5],[32,74.5],[31,73.5],[30.5,72.5],[29.8,71.8],[29.3,71.3]] },
    { name: "Chenab",        path: [[34,75.5],[33,73.5],[31.5,72.5],[30.5,71.8],[29.5,71]] },
    { name: "Jhelum",        path: [[34.5,74.5],[33.5,73],[32.5,72.5],[31,72],[30,71.5],[29.5,71.2]] },
    { name: "Hakra/Ghaggar", path: [[30,75],[29,73],[28,71],[27,69.5],[26.5,68.5],[26,67.5]] },
    { name: "Helmand",       path: [[34,62],[33,62.5],[31,63],[29.5,62],[28,61.5]] }
];

rivers.forEach(r => {
    L.polyline(r.path, { color: '#1e90ff', weight: 2.5, opacity: 0.85, smoothFactor: 2 }).addTo(map);
    L.polyline(r.path, { color: '#87ceeb', weight: 0.8, opacity: 0.5,  smoothFactor: 2 }).addTo(map);

    const mid = r.path[Math.floor(r.path.length / 2)];
    L.marker(mid, {
        icon: L.divIcon({ className: 'river-label', html: `<span>${r.name}</span>`, iconAnchor: [0,0] }),
        interactive: false
    }).addTo(map);
});

const sites = [
    { name: "Harappa",      pos: [30.6, 72.8], desc: "Major urban center, Punjab region" },
    { name: "Mohenjo-daro", pos: [27.3, 68.1], desc: "Largest IVC city, advanced drainage" },
    { name: "Dholavira",    pos: [23.9, 70.2], desc: "Rann of Kutch, unique water system" },
    { name: "Lothal",       pos: [22.5, 72.2], desc: "Major port city, Gujarat" },
    { name: "Shortugai",    pos: [37.3, 69.5], desc: "Northernmost IVC outpost, Afghanistan" },
    { name: "Sutkagan Dor", pos: [25.2, 61.8], desc: "Westernmost IVC site, Balochistan" }
];

sites.forEach(site => {
    const icon = L.divIcon({
        className: 'city-label',
        html: `<div class="dot"></div><span>${site.name}</span>`,
        iconAnchor: [4, 4]
  });
  L.marker(site.pos, { icon }).addTo(map)
    .bindPopup(`<strong style="color:#c9922a;">${site.name}</strong><br/><span style="font-size:11px;">${site.desc}</span>`);
});