function calculatePointsAndHours(cardTexts) {
    let totalPoints = 0;
    let totalHours = 0;

    cardTexts.forEach(text => {
        // Points: (n)
        const pointsMatch = text.match(/\((\d+)\)/);
        if (pointsMatch) {
            totalPoints += Number(pointsMatch[1]);
        }

        // Hours: [n]
        const hoursMatch = text.match(/\[(\d+)\]/);
        if (hoursMatch) {
            totalHours += Number(hoursMatch[1]);
        }
    });

    return { totalPoints, totalHours };
}