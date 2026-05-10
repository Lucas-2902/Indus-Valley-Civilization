const archData = {
    'great-bath': `<h2>The Great Bath</h2><p>A 12x7 meter tank lined with bitumen (natural tar) for waterproofing. It is considered the earliest public water tank in the ancient world.</p>`,
    'granary': `<h2>The Great Granary</h2><p>Massive brick platforms used to store surplus grain. Its elevated design kept the food dry and protected from floods.</p>`,
    'drainage': `<h2>Drainage & Toilets</h2><p>Every house had a private bathroom connected to covered street drains. This level of sanitation wasn't seen again until the Roman Empire.</p>`,
    'dockyard': `<h2>Lothal Dockyard</h2><p>An artificial basin connected to the river, allowing ships to dock despite tidal changes. It proves their maritime mastery.</p>`,
    'citadel': `<h2>The Citadel</h2><p>The raised western part of the city. It housed important public buildings and religious structures, separating them from the lower town.</p>`,
    'walls': `<h2>Defensive Walls</h2><p>Massive fortifications built with sun-dried and kiln-burnt bricks. They protected against both invaders and massive floods.</p>`
};

function openArch(id) {
    document.getElementById('arch-details').innerHTML = archData[id];
    document.getElementById('archModal').style.display = 'flex';
}

function closeArch() {
    document.getElementById('archModal').style.display = 'none';
}