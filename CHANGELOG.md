# Changelog

All notable changes to this project will be documented in this file.

The format follows a simplified version of Keep a Changelog
and adheres to Semantic Versioning.

---
## [1.2.1] - 2026-02-06

### Improved
- More resilient card rendering flow, preventing stale metric badges when Trello re-renders card titles
- Calculator now supports both dot and comma decimal separators in points/hours values
- Aggregation now sums all metric occurrences found in a card title for more predictable totals


## [1.2.0] - 2026-02-03

### Added
- Display of **points and worked hours directly on each Trello card**
- Automatic parsing of card titles to extract:
  - Points defined inside parentheses `( )`
  - Worked hours defined inside brackets `[ ]`
- Visual indicators added below the card title:
  - 🧮 for points
  - ⏳ for worked hours
- Cards without metrics or with **zero values** no longer display indicators, keeping the interface clean
- Preservation of the original card title internally to ensure accurate calculations

### Improved
- Dynamic update of card metrics when the card title is edited, without requiring a page reload
- More robust DOM handling to prevent duplicate rendering and infinite update loops
- Improved synchronization between card-level metrics and list-level totals

---

## [1.1.0] - 2025-12-22

### Added
- Support for decimal values in points calculation (e.g. (1.5))
- Support for decimal values in worked hours calculation (e.g. [2.75])

### Improved
- Floating-point precision handling to avoid rounding issues (e.g. 7.800000000000001)
- Automatic formatting of totals based on user input precision

---

## [1.0.1] - 2025-12-19

### Changed
- Internal codebase refactored into multiple files for better maintainability
- Improved project structure without changing user-facing behavior

---

## [1.0.0] - 2025-12-18

### Added
- Initial release
- Points calculation per Trello column
- Worked hours calculation per Trello column
- Respect for active Trello filters
- Local-only processing with no data collection