function getMetricStats(text, regex) {
    const matches = [...text.matchAll(regex)];

    if (matches.length === 0) {
        return { total: 0, maxDecimals: 0 };
    }

    return matches.reduce((acc, match) => {
        const rawValue = match[1].replace(',', '.');
        const numericValue = Number(rawValue);
        const decimals = rawValue.includes('.') ? rawValue.split('.')[1].length : 0;

        return {
            total: acc.total + numericValue,
            maxDecimals: Math.max(acc.maxDecimals, decimals)
        };
    }, { total: 0, maxDecimals: 0 });
}

function calculatePointsAndHours(cardTexts) {
    let totalPoints = 0;
    let totalHours = 0;

    let maxPointsDecimals = 0;
    let maxHoursDecimals = 0;

    cardTexts.forEach(text => {
        const pointsStats = getMetricStats(text, /\((\d+(?:[\.,]\d+)?)\)/g);
        const hoursStats = getMetricStats(text, /\[(\d+(?:[\.,]\d+)?)\]/g);

        totalPoints += pointsStats.total;
        totalHours += hoursStats.total;

        maxPointsDecimals = Math.max(maxPointsDecimals, pointsStats.maxDecimals);
        maxHoursDecimals = Math.max(maxHoursDecimals, hoursStats.maxDecimals);
    });

    return {
        totalPoints: Number(totalPoints.toFixed(maxPointsDecimals)),
        totalHours: Number(totalHours.toFixed(maxHoursDecimals))
    };
}
