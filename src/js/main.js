function runCalculator() {
    const lists = document.querySelectorAll('[data-testid="list"]');

    lists.forEach(list => {
        const cardTexts = getVisibleCardTexts(list);
        const { totalPoints, totalHours } = calculatePointsAndHours(cardTexts);
        updateListHeader(list, totalPoints, totalHours);
    });
}

// Initial execution
runCalculator();

// Observe DOM changes (filters, drag-and-drop, etc.)
startDomObserver(runCalculator);