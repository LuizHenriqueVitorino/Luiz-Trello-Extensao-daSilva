function processCardVisual(card) {
    // Evita reprocessar
    if (card.dataset.metricsRendered === "true") return;

    const originalText = card.dataset.originalText || card.innerText.trim();
    card.dataset.originalText = originalText;


    // Extrai pontos (n ou n.n)
    const pointsMatch = originalText.match(/\((\d+(?:\.\d+)?)\)/);
    const points = pointsMatch ? pointsMatch[1] : null;

    // Extrai horas (n ou n.n)
    const hoursMatch = originalText.match(/\[(\d+(?:\.\d+)?)\]/);
    const hours = hoursMatch ? hoursMatch[1] : null;

    // Se não tiver nada, não mexe
    if (!points && !hours) {
        card.dataset.metricsRendered = "true";
        return;
    }

    // Limpa o título
    const cleanTitle = originalText
        .replace(/\(\d+(?:\.\d+)?\)/g, "")
        .replace(/\[\d+(?:\.\d+)?\]/g, "")
        .trim();

    // Atualiza texto visível
    card.innerText = cleanTitle;

    // Cria linha de métricas
    const metricsLine = document.createElement("div");
    metricsLine.className = "trello-card-metrics";
    metricsLine.textContent = `🧮 ${points ?? 0} pts  ⏳ ${hours ?? 0} h`;

    // Estilo mínimo TODO: melhorar depois
    metricsLine.style.fontSize = "12px";
    metricsLine.style.opacity = "0.8";
    metricsLine.style.marginTop = "4px";

    card.appendChild(metricsLine);

    // Marca como processado
    card.dataset.metricsRendered = "true";
}


function getVisibleCardTexts(listElement) {
    return Array.from(
        listElement.querySelectorAll('[data-testid="card-name"]')
    )
        // Ignore filtered (hidden) cards
        .filter(card => card.offsetParent !== null)
        .map(card => {
            // Processa visualmente o cartão
            processCardVisual(card);

            // Retorna o texto ORIGINAL para cálculo
            return card.dataset.originalText
                ? card.dataset.originalText
                : card.innerText.trim();
        });
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