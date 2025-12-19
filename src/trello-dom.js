function getVisibleCardTexts(listElement) {
    return Array.from(
        listElement.querySelectorAll('[data-testid="card-name"]')
    )
        // Ignore filtered (hidden) cards
        .filter(card => card.offsetParent !== null)
        .map(card => card.innerText.trim());
}

function updateListHeader(listElement, totalPoints, totalHours) {
    const listTitle = listElement.querySelector('[data-testid="list-name"]');
    if (!listTitle) return;

    // Remove previous counter
    const existingCounter = listTitle.querySelector('.trello-points-hours');
    if (existingCounter) {
        existingCounter.remove();
    }

    // Create counter badge
    const badge = document.createElement('span');
    badge.className = 'trello-points-hours';
    badge.style.marginLeft = '8px';
    badge.style.fontWeight = 'bold';
    badge.style.fontSize = '12px';
    badge.textContent = `🧮${totalPoints} pts  ⏳${totalHours} h`;

    listTitle.appendChild(badge);
}