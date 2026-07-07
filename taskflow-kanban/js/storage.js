/**
 * storage.js
 * Manages localStorage persistence for board state.
 * Storage is isolated from UI and drag-and-drop logic.
 */

const STORAGE_KEY = 'taskflow-board';

const VALID_STATUSES = new Set(['todo', 'progress', 'done']);

/**
 * Returns whether localStorage is available.
 * @returns {boolean}
 */
function isStorageAvailable() {
  try {
    const probe = '__taskflow_storage_probe__';
    localStorage.setItem(probe, probe);
    localStorage.removeItem(probe);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validates a single task object from persisted data.
 * @param {unknown} task
 * @returns {boolean}
 */
function isValidTask(task) {
  if (!task || typeof task !== 'object') {
    return false;
  }

  const { id, title, status, createdAt } = task;

  return (
    typeof id === 'string' &&
    id.length > 0 &&
    typeof title === 'string' &&
    title.length > 0 &&
    typeof status === 'string' &&
    VALID_STATUSES.has(status) &&
    typeof createdAt === 'string' &&
    createdAt.length > 0
  );
}

/**
 * Normalizes a valid task object to the expected shape.
 * @param {Object} task
 * @returns {{ id: string, title: string, status: string, createdAt: string }}
 */
function normalizeTask(task) {
  return {
    id: task.id,
    title: task.title,
    status: task.status,
    createdAt: task.createdAt,
  };
}

/**
 * Saves the current board state to localStorage.
 * @param {Array} tasks - Array of task objects to persist.
 */
export function saveBoard(tasks) {
  if (!isStorageAvailable() || !Array.isArray(tasks)) {
    return;
  }

  try {
    const payload = tasks.map(normalizeTask);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  } catch {
    // Silently ignore write failures (quota, privacy mode, etc.).
  }
}

/**
 * Loads the board state from localStorage.
 * @returns {Array<{ id: string, title: string, status: string, createdAt: string }>}
 */
export function loadBoard() {
  if (!isStorageAvailable()) {
    return [];
  }

  let raw;

  try {
    raw = localStorage.getItem(STORAGE_KEY);
  } catch {
    return [];
  }

  if (raw === null || raw === '') {
    return [];
  }

  let parsed;

  try {
    parsed = JSON.parse(raw);
  } catch {
    clearBoard();
    return [];
  }

  if (!Array.isArray(parsed)) {
    clearBoard();
    return [];
  }

  const validTasks = parsed.filter(isValidTask).map(normalizeTask);

  if (validTasks.length !== parsed.length) {
    if (validTasks.length === 0) {
      clearBoard();
      return [];
    }

    saveBoard(validTasks);
  }

  return validTasks;
}

/**
 * Clears all persisted board data from localStorage.
 */
export function clearBoard() {
  if (!isStorageAvailable()) {
    return;
  }

  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Silently ignore removal failures.
  }
}

/**
 * Returns the localStorage key used for board persistence.
 * @returns {string}
 */
export function getStorageKey() {
  return STORAGE_KEY;
}
