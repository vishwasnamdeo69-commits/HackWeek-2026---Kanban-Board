# TaskFlow

A lightweight, Trello-style Kanban board built with vanilla HTML, CSS, and JavaScript. TaskFlow helps you organize work visually across three workflow stages — no backend, no frameworks, fully offline.

Built for **HackWeek 2026**.

---

## Overview

TaskFlow is a browser-based task management board that lets users create cards, drag them between columns, and persist board state using `localStorage`. This repository is structured for modular development across five phases, starting with a static UI foundation.

---

## Features

### Current (Phase 1)

- Clean, Trello-inspired responsive layout
- Three Kanban columns: **To Do**, **In Progress**, **Done**
- Modular JavaScript architecture with separated concerns
- Semantic HTML and professional CSS organization

### Planned

| Phase | Feature |
|-------|---------|
| Phase 2 | Card creation with title input |
| Phase 3 | Drag-and-drop between columns |
| Phase 4 | `localStorage` persistence across page refreshes |
| Phase 5 | UI polish, empty states, screenshots, and demo video |

---

## Folder Structure

```
taskflow-kanban/
│
├── index.html          # Application shell and static board layout
├── style.css           # Global styles and responsive layout
├── script.js           # Entry point and application bootstrap
│
├── js/
│   ├── board.js        # Board rendering and column management
│   ├── card.js         # Card creation and rendering
│   ├── dragDrop.js     # Drag-and-drop interactions
│   ├── storage.js      # localStorage read/write operations
│   └── utils.js        # Shared helper functions
│
├── assets/             # Images, icons, and static media
│
├── README.md
└── LICENSE
```

---

## Installation

No build step or package manager is required.

1. Clone or download this repository.
2. Open `index.html` in a modern browser.

```bash
# Optional: serve locally to use ES modules without file:// restrictions
npx serve .
```

Or open `index.html` directly — most modern browsers support ES modules from the file system.

---

## Usage

Phase 1 delivers a static board preview only. Buttons and card containers are visual placeholders; functionality arrives in Phase 2.

---

## Roadmap

- [x] **Phase 1** — Project foundation, static UI, modular architecture
- [ ] **Phase 2** — Card creation
- [ ] **Phase 3** — Drag & drop
- [ ] **Phase 4** — localStorage persistence
- [ ] **Phase 5** — Polish, documentation, demo video

---

## Technologies

- **HTML5** — Semantic markup
- **CSS3** — Flexbox layout, custom properties, responsive design
- **JavaScript (ES6+)** — ES modules, separation of concerns
- **HTML Drag & Drop API** — Planned for Phase 3
- **localStorage** — Planned for Phase 4

---

## Data Model

Each task will be stored as:

```json
{
  "id": "uuid",
  "title": "Build README",
  "status": "todo",
  "createdAt": "timestamp"
}
```

Status values: `todo` · `progress` · `done`

---

## Architecture

```
Browser
  ↓
HTML (static shell)
  ↓
script.js (entry point)
  ↓
board.js → card.js
  ↓
dragDrop.js
  ↓
storage.js → localStorage
```

Each module owns a single responsibility. UI rendering, interaction logic, and persistence are kept separate to keep the codebase maintainable as features are added.

---

## License

This project is licensed under the [MIT License](LICENSE).
