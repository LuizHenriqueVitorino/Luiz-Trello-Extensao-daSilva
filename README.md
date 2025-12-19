# Trello Points and Hours Calculator

A lightweight Chrome extension that automatically calculates **story points** and **worked hours** per Trello list, updating the totals in real time and **respecting active filters**.

Designed to be simple, fast, and privacy-friendly — all processing happens locally in your browser.

---

## Features

* Automatic calculation per list
  Sums points and hours for each Trello column independently.

* Filter-aware
  Only counts visible cards, respecting Trello filters (for example: "Cards assigned to me").

* Simple syntax
  Points at the end of the card name using parentheses `(n)`
  Hours at the end of the card name using brackets `[n]`

* Real-time updates
  Reacts instantly to drag & drop, card edits, filter changes and new cards.

* Privacy-first
  No data collection, no external requests, no tracking and no remote code execution.

---

## Card Naming Convention

To make the extension work, follow this naming pattern in your Trello cards:

Task description (points) [hours]

### Examples

Fix login button (3) [2]
Refactor payment service (5) [6]
Write unit tests (2) [1]

* `(3)` represents story points
* `[2]` represents worked hours

Both values are optional. Cards without this format are ignored.

---

## How It Works

* The extension scans each Trello list (column)
* Only visible cards are processed
* Points and hours are extracted using numeric patterns
* Totals are displayed next to the list title

Example display:

Done  |  8 pts  |  5 h

---

## Project Structure

/
├─ manifest.json
├─ icons/
│  ├─ 16x16.png
│  ├─ 48x48.png
│  └─ 128x128.png
└─ src/
├─ trello-dom.js     # DOM reading and UI updates
├─ calculator.js    # Points and hours calculation logic
├─ observer.js      # MutationObserver handling
└─ main.js          # Content script entry point

All scripts are loaded in order via `manifest.json` and share the same execution context.

---

## Installation (Development)

1. Clone the repository
2. Open Chrome and navigate to chrome://extensions
3. Enable Developer mode
4. Click "Load unpacked"
5. Select the project root folder
6. Open Trello and refresh the page

---

## Permissions

This extension only uses site content access on trello.com.

No additional permissions are required.

---

## Privacy Policy

This extension does not collect, store, or transmit any personal data.

* All processing happens locally in the user's browser
* The extension runs only on trello.com
* No analytics, tracking, or external services are used

---

## Technical Notes

* Built using Chrome Extension Manifest V3
* Uses a multi-file content script approach without ES Modules
* Avoids bundlers for maximum compatibility and simplicity
* Uses MutationObserver to efficiently track DOM changes

---

## Roadmap

* Customizable patterns for points and hours
* Toggle display (points only / hours only)
* Options page
* Localization support
* Export totals (CSV / JSON)

---

## Contributing

Contributions are welcome.

You can open issues, suggest improvements or submit pull requests. Please keep changes small and focused.

---

## License

MIT License

---

## Author

Luiz Henrique Vitorino

---

If you find this extension useful, consider starring the project or sharing it with your team.
