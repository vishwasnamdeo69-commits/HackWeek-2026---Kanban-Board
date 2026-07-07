/**
 * board.js
 * Responsible for board rendering, column management, and card insertion.
 */

import { appendCard, renderCards } from './card.js';
import { initDragDrop } from './dragDrop.js';
import { loadBoard, saveBoard } from './storage.js';
import { generateId, getTimestamp, $$ } from './utils.js';

/** @type {Array<{id: string, title: string, status: string, createdAt: string}>} */
let tasks = [];

/**
 * Initializes the Kanban board and binds column interactions.
 */
export function initBoard() {
  tasks = loadBoard();
  bindAddCardListeners();
  renderBoard();
  initDragDrop(getBoardElement(), { onMove: moveTask });
}

/**
 * Renders the full board from the in-memory task list.
 */
export function renderBoard() {
  const columns = $$('.column');

  columns.forEach((column) => {
    const status = column.dataset.status;
    const container = column.querySelector('.column__cards');
    const columnTasks = tasks.filter((task) => task.status === status);

    renderCards(container, columnTasks);
  });
}

/**
 * Returns a reference to the board container element.
 * @returns {HTMLElement|null}
 */
export function getBoardElement() {
  return document.querySelector('.board');
}

/**
 * Returns the current in-memory task list.
 * @returns {Array}
 */
export function getTasks() {
  return [...tasks];
}

/**
 * Moves a task to a different column and re-renders the board.
 * @param {string} taskId
 * @param {string} newStatus
 */
export function moveTask(taskId, newStatus) {
  const task = tasks.find((item) => item.id === taskId);

  if (!task || task.status === newStatus) {
    return;
  }

  task.status = newStatus;
  renderBoard();
  saveBoard(tasks);
}

/**
 * Binds click handlers to each column's Add Card button.
 */
function bindAddCardListeners() {
  const columns = $$('.column');

  columns.forEach((column) => {
    const addBtn = column.querySelector('.column__add-btn');

    addBtn.addEventListener('click', () => {
      openCardComposer(column);
    });
  });
}

/**
 * Opens an inline card composer inside the target column.
 * @param {HTMLElement} column
 */
function openCardComposer(column) {
  closeAllComposers();

  const composer = buildComposer(column);
  const addBtn = column.querySelector('.column__add-btn');

  column.insertBefore(composer, addBtn);
  addBtn.hidden = true;

  const input = composer.querySelector('.card-composer__input');
  input.focus();
}

/**
 * Builds the inline card creation form for a column.
 * @param {HTMLElement} column
 * @returns {HTMLElement}
 */
function buildComposer(column) {
  const status = column.dataset.status;
  const composer = document.createElement('div');
  composer.className = 'card-composer';
  composer.dataset.status = status;

  composer.innerHTML = `
    <textarea
      class="card-composer__input"
      placeholder="What needs to be done?"
      rows="3"
      aria-label="Card title"
      maxlength="280"
    ></textarea>
    <div class="card-composer__actions">
      <button class="btn btn--primary card-composer__submit" type="button">
        Add card
      </button>
      <button class="btn btn--ghost card-composer__cancel" type="button">
        Cancel
      </button>
    </div>
  `;

  const input = composer.querySelector('.card-composer__input');
  const submitBtn = composer.querySelector('.card-composer__submit');
  const cancelBtn = composer.querySelector('.card-composer__cancel');

  submitBtn.addEventListener('click', () => {
    handleComposerSubmit(column, input.value);
  });

  cancelBtn.addEventListener('click', () => {
    closeComposer(column);
  });

  input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleComposerSubmit(column, input.value);
    }

    if (event.key === 'Escape') {
      closeComposer(column);
    }
  });

  return composer;
}

/**
 * Validates input and creates a card for the column.
 * @param {HTMLElement} column
 * @param {string} rawTitle
 */
function handleComposerSubmit(column, rawTitle) {
  const title = rawTitle.trim();

  if (!title) {
    const input = column.querySelector('.card-composer__input');
    input?.focus();
    return;
  }

  const status = column.dataset.status;
  insertTask(title, status);
  closeComposer(column);
}

/**
 * Creates a task, stores it, and renders the card in the correct column.
 * @param {string} title
 * @param {string} status
 */
function insertTask(title, status) {
  const task = {
    id: generateId(),
    title,
    status,
    createdAt: getTimestamp(),
  };

  tasks.push(task);

  const column = document.querySelector(`.column[data-status="${status}"]`);
  const container = column.querySelector('.column__cards');

  appendCard(container, task, { animate: true });
  saveBoard(tasks);
}

/**
 * Closes the composer inside a column and restores the Add Card button.
 * @param {HTMLElement} column
 */
function closeComposer(column) {
  const composer = column.querySelector('.card-composer');
  const addBtn = column.querySelector('.column__add-btn');

  composer?.remove();
  addBtn.hidden = false;
}

/**
 * Closes any open composers across all columns.
 */
function closeAllComposers() {
  $$('.card-composer').forEach((composer) => {
    const column = composer.closest('.column');
    if (column) {
      closeComposer(column);
    }
  });
}
