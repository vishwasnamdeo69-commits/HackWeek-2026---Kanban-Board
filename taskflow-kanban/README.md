# TaskFlow

A modern Kanban board inspired by Trello, built with **Vanilla HTML, CSS and JavaScript**.

TaskFlow allows users to create tasks, organize them visually using drag-and-drop, and automatically saves the board using browser Local Storage so work persists across page refreshes.

Built for **HackWeek 2026**.

---

## Preview

### Empty Board

![Empty Board](assets/screenshot-desktop1.png)

### Board with Tasks

![Board with Tasks](assets/screenshot-desktop2.png)

---

## Features

- ✅ Create tasks in any column
- ✅ Drag & Drop between columns
- ✅ Automatic Local Storage persistence
- ✅ Responsive design
- ✅ Accessible interface (ARIA, keyboard navigation)
- ✅ Modern minimal UI
- ✅ Zero dependencies

---

## Tech Stack

- HTML5
- CSS3
- JavaScript (ES6 Modules)
- HTML5 Drag & Drop API
- Local Storage

---

## Project Structure

```
TaskFlow/
│
├── assets/
│   ├── screenshot-desktop1.png
│   └── screenshot-desktop2.png
│
├── js/
│   ├── board.js
│   ├── card.js
│   ├── dragDrop.js
│   ├── storage.js
│   └── utils.js
│
├── index.html
├── style.css
├── script.js
├── README.md
└── LICENSE
```

---

## How It Works

### Create Tasks

Click **Add Card**, type a task title and save it.

### Drag & Drop

Move cards freely between:

- To Do
- In Progress
- Done

### Automatic Saving

Every action is saved automatically using **Local Storage**.

Refreshing the browser restores the board exactly as it was.

---

## Architecture

TaskFlow follows a modular architecture where every module has a single responsibility.

```
script.js
      │
      ▼
board.js
 ├── card.js
 ├── dragDrop.js
 ├── storage.js
 └── utils.js
```

- **board.js** manages application state.
- **card.js** renders task cards.
- **dragDrop.js** handles drag-and-drop interactions.
- **storage.js** manages Local Storage.
- **utils.js** provides reusable helper functions.

---

## Getting Started

Clone the repository:

```bash
git clone YOUR_REPO_LINK
```

Open the project folder:

```bash
cd TaskFlow
```

Run a simple local server:

```bash
npx serve .
```

Open

```
http://localhost:3000
```

---

## Keyboard Shortcuts

| Action | Shortcut |
|---------|----------|
| Save Task | Enter |
| New Line | Shift + Enter |
| Cancel | Escape |

---

## Local Storage

Tasks are stored using the browser's Local Storage.

Each task contains:

```json
{
  "id": "uuid",
  "title": "Build README",
  "status": "todo",
  "createdAt": "2026-07-07T12:00:00.000Z"
}
```

The board restores automatically every time the application loads.

---

## Future Improvements

- Edit tasks
- Delete tasks
- Due dates
- Labels & priorities
- Dark mode
- Export / Import board
- Cloud synchronization

---

## Demo

**Repository**

YOUR_REPO_LINK

**Demo Video**

YOUR_DEMO_VIDEO_LINK

---

## License

This project is licensed under the MIT License.