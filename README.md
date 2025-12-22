# Trello Points and Hours Calculator

A Chrome extension that automatically calculates total points and worked hours from Trello cards per column, fully respecting active Trello filters.

This extension is ideal for agile teams, personal Kanban boards, and anyone who wants quick visibility into effort distribution without leaving Trello.

---

## Features

- Automatically sums points and worked hours per Trello column
- Supports integer and decimal values
- Updates totals dynamically as cards change
- Respects active Trello filters (only visible cards are counted)
- Works entirely locally in the browser
- No data collection, no external services, no tracking

---

## How It Works

The extension reads values directly from the card title using a simple notation.

### Points

Use parentheses ( ) anywhere in the card title to define points.

Examples:
- (2) Implement login
- (1.5) Refactor API
- (0.5) Minor UI fix

### Worked Hours

Use brackets [ ] anywhere in the card title to define worked hours.

Examples:
- [3] Setup environment
- [1.75] Bug fixing
- [0.5] Quick review

### Combined Example

(2) Adjust button alignment [1.5]

This card represents:
- 2 points
- 1.5 worked hours

---

## Column Totals

For each Trello column, the extension displays:

🧮 X pts   ⏳ Y h

Where:
- X is the total points
- Y is the total worked hours

Decimal precision is handled automatically to avoid floating-point errors.

---

## Filter Awareness

When Trello filters are active (for example, filtering by member or label):

- Only visible cards are counted
- Totals update automatically as filters change

This allows accurate per-person or per-context tracking.

---

## Privacy

This extension does not collect, store, or transmit any personal data.

All processing happens locally in the user's browser and only on trello.com pages.

---

## Technical Overview

- Chrome Extension using Manifest V3
- Content script-based architecture
- Uses MutationObserver to react to Trello DOM changes
- Modular internal structure for better maintainability

---

## Installation (Development)

1. Clone or download this repository
2. Open Chrome and navigate to chrome://extensions
3. Enable Developer mode
4. Click "Load unpacked"
5. Select the project folder

---

## Roadmap Ideas

- Toggle to show or hide points and hours
- Custom formatting options
- Per-board configuration
- Export column summaries

