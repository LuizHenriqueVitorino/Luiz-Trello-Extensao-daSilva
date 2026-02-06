function extractMetric(text, pattern) {
    const match = text.match(pattern);
    return match ? match[1] : null;
}

function removeMetricsFromTitle(text) {
    return text
        .replace(/\(\d+(?:[\.,]\d+)?\)/g, "")
        .replace(/\[\d+(?:[\.,]\d+)?\]/g, "")
        .trim();
}

function normalizeMetricValue(value) {
    return value ? value.replace(',', '.') : null;
}

function processCardVisual(card) {
    const previousOriginal = card.dataset.originalText;

    const existingMetrics = card.querySelector('.trello-card-metrics');
    if (existingMetrics) {
        existingMetrics.remove();
    }

    const visibleText = card.textContent.trim();
    const sourceText = previousOriginal && previousOriginal.includes('(') || previousOriginal && previousOriginal.includes('[')
        ? previousOriginal
        : visibleText;

    const points = normalizeMetricValue(extractMetric(sourceText, /\((\d+(?:[\.,]\d+)?)\)/));
    const hours = normalizeMetricValue(extractMetric(sourceText, /\[(\d+(?:[\.,]\d+)?)\]/));

    card.dataset.originalText = sourceText;

    const cleanTitle = removeMetricsFromTitle(sourceText);
    card.textContent = cleanTitle;

    const parts = [];
    if (points && Number(points) !== 0) parts.push(`🧮 ${points} pts`);
    if (hours && Number(hours) !== 0) parts.push(`⏳ ${hours} h`);

    if (parts.length > 0) {
        const metricsLine = document.createElement('div');
        metricsLine.className = 'trello-card-metrics';
        metricsLine.textContent = parts.join('  ');
        card.appendChild(metricsLine);
    }

    card.dataset.metricsRendered = 'true';
}

function getVisibleCardTexts(listElement) {
    const cards = Array.from(listElement.querySelectorAll('[data-testid="card-name"]'));

    return cards
        .filter(card => card.offsetParent !== null)
        .map(card => {
            processCardVisual(card);
            return card.dataset.originalText || card.textContent;
        });
}

function updateListHeader(listElement, totalPoints, totalHours) {
    const listTitle = listElement.querySelector('[data-testid="list-name"]');
    if (!listTitle) return;

    const existingCounter = listTitle.querySelector('.trello-points-hours');
    if (existingCounter) {
        existingCounter.remove();
    }

    if (totalPoints > 0 || totalHours > 0) {
        const badge = document.createElement('span');
        badge.className = 'trello-points-hours';

        const parts = [];
        if (totalPoints > 0) parts.push(`🧮 ${totalPoints} pts`);
        if (totalHours > 0) parts.push(`⏳ ${totalHours} h`);

        badge.textContent = parts.join('  ');
        listTitle.appendChild(badge);
    }
}
