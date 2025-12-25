function processCardVisual(card) {
    const currentText = card.innerText.trim();
    
    // 1. Verificação de segurança: se o texto contém nossos ícones, 
    // não tratamos como texto original para não estragar o Regex
    if (currentText.includes('🧮') || currentText.includes('⏳')) {
        return;
    }

    const pointsMatch = currentText.match(/\((\d+(?:\.\d+)?)\)/);
    const points = pointsMatch ? pointsMatch[1] : null;

    const hoursMatch = currentText.match(/\[(\d+(?:\.\d+)?)\]/);
    const hours = hoursMatch ? hoursMatch[1] : null;

    // Se não tem métricas no texto atual, mas já processamos antes, 
    // precisamos garantir que o originalText exista para o calculador
    if (!points && !hours) {
        if (!card.dataset.originalText) {
            card.dataset.originalText = currentText;
        }
        card.dataset.metricsRendered = "true";
        return;
    }

    // Guardamos o texto COM as métricas para o calculator.js usar na soma total
    card.dataset.originalText = currentText;

    // 2. Limpeza do título (remove parênteses e colchetes)
    const cleanTitle = currentText
        .replace(/\(\d+(?:\.\d+)?\)/g, "")
        .replace(/\[\d+(?:\.\d+)?\]/g, "")
        .trim();

    // 3. Atualização do DOM
    card.innerText = cleanTitle;

    const existingMetrics = card.querySelector(".trello-card-metrics");
    if (existingMetrics) existingMetrics.remove();

    const metricsLine = document.createElement("div");
    metricsLine.className = "trello-card-metrics";

    const parts = [];
    if (points && Number(points) !== 0) parts.push(`🧮 ${points} pts`);
    if (hours && Number(hours) !== 0) parts.push(`⏳ ${hours} h`);

    metricsLine.textContent = parts.join("  ");
    card.appendChild(metricsLine);

    card.dataset.metricsRendered = "true";
}

function getVisibleCardTexts(listElement) {
    const cards = Array.from(listElement.querySelectorAll('[data-testid="card-name"]'));
    
    return cards
        .filter(card => card.offsetParent !== null)
        .map(card => {
            // Processa o visual do cartão (isso preenche o dataset.originalText)
            processCardVisual(card);

            // Retorna o texto original (com os números) para o calculator.js fazer a soma
            return card.dataset.originalText || card.innerText;
        });
}

function updateListHeader(listElement, totalPoints, totalHours) {
    const listTitle = listElement.querySelector('[data-testid="list-name"]');
    if (!listTitle) return;

    let existingCounter = listTitle.querySelector('.trello-points-hours');
    if (existingCounter) {
        existingCounter.remove();
    }

    // Só adiciona o badge se houver valores maiores que zero
    if (totalPoints > 0 || totalHours > 0) {
        const badge = document.createElement('span');
        badge.className = 'trello-points-hours';

        const parts = [];
        if (totalPoints > 0) parts.push(`🧮 ${totalPoints} pts`);
        if (totalHours > 0) parts.push(`⏳ ${totalHours} h`);
        
        badge.textContent = parts.join("  ");
        listTitle.appendChild(badge);
    }
}