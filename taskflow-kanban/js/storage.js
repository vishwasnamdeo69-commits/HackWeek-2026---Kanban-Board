/**
 * storage.js
 * Will manage localStorage persistence for board state.
 * Phase 4+: Storage is isolated from UI and drag-and-drop logic.
 */

const STORAGE_KEY = 'taskflow-board';

/**
 * Saves the current board state to localStorage.
 * @param {Array} tasks - Array of task objects to persist.
 */
export function saveBoard(tasks) {
  // Implementation planned for Phase 4.
}

/**
 * Loads the board state from localStorage.
 * @returns {Array} Array of task objects, or empty array if none saved.
 */
export function loadBoard() {
  // Implementation planned for Phase 4.
}

/**
 * Clears all persisted board data from localStorage.
 */
export function clearBoard() {
  // Implementation planned for Phase 4.
}

/**
 * Returns the localStorage key used for board persistence.
 * @returns {string}
 */
export function getStorageKey() {
  return STORAGE_KEY;
}
