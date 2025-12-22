# Changelog

All notable changes to this project will be documented in this file.

The format follows a simplified version of Keep a Changelog
and adheres to Semantic Versioning.

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