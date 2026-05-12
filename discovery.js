const extraInfo = {
    'railway': `
        <h2>The Railway Bricks</h2>
        <hr style="border: 1px solid #c48e3d; margin: 1rem 0;">
        <p>In 1856, brothers John and William Brunton were building a railway between Karachi and Lahore. Needing ballast for the tracks, they dug up thousands of ancient fire-baked bricks from the nearby ruins, unknowingly destroying parts of Harappa to build the railroad.</p>
    `,
    'excavation': `
        <h2>Modern Archaeology</h2>
        <hr style="border: 1px solid #c48e3d; margin: 1rem 0;">
        <p>Between 1920 and 1922, systematic digging began. Rai Bahadur Daya Ram Sahni excavated Harappa, while R.D. Banerji discovered Mohenjo-Daro. These excavations made us know about the main cities of IVC.</p>
    `,
    'naming': `
        <h2>OG Historian</h2>
        <hr style="border: 1px solid #c48e3d; margin: 1rem 0;">
        <p>In 1850s, John Marshall looked at the discoveries and announced it was from a pretty old civilization, later named, Indus Valley Civilization.</p>
    `
};

function openModal(id) {
    document.getElementById('modal-body-text').innerHTML = extraInfo[id];
    document.getElementById('infoModal').style.display = 'flex';
}

function closeModal() {
    document.getElementById('infoModal').style.display = 'none';
}

window.onclick = function(event) {
    if (event.target == document.getElementById('infoModal')) {
        closeModal();
    }
}