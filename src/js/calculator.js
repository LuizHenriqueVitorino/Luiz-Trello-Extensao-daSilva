function calculatePointsAndHours(cardTexts) {
    let totalPoints = 0;
    let totalHours = 0;

    let maxPointsDecimals = 0;
    let maxHoursDecimals = 0;

    cardTexts.forEach(text => {
        // Points: (n)
        const pointsMatch = text.match(/\((\d+(?:\.\d+)?)\)/);
        if (pointsMatch) {
            const value = pointsMatch[1];
            totalPoints += Number(value);

            const decimals = value.includes('.') ? value.split('.')[1].length : 0;
            maxPointsDecimals = Math.max(maxPointsDecimals, decimals);
        }

        // Hours: [n]
        const hoursMatch = text.match(/\[(\d+(?:\.\d+)?)\]/);
        if (hoursMatch) {
            const value = hoursMatch[1];
            totalHours += Number(value);

            const decimals = value.includes('.') ? value.split('.')[1].length : 0;
            maxHoursDecimals = Math.max(maxHoursDecimals, decimals);
        }
    });

    return { 
        totalPoints: Number(totalPoints.toFixed(maxPointsDecimals)), 
        totalHours: Number(totalHours.toFixed(maxHoursDecimals))
    };
}
