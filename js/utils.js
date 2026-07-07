/**
 * utils.js
 * Shared utility functions used across TaskFlow modules.
 */

/** @type {Record<string, string>} */
export const COLUMN_LABELS = {
  todo: 'To Do',
  progress: 'In Progress',
  done: 'Done',
};

/**
 * Generates a unique identifier for a new task.
 * @returns {string}
 */
export function generateId() {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }

  return `task-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

/**
 * Returns the current ISO timestamp.
 * @returns {string}
 */
export function getTimestamp() {
  return new Date().toISOString();
}

/**
 * Queries a single DOM element with an optional parent scope.
 * @param {string} selector - CSS selector string.
 * @param {ParentNode} [parent=document] - Parent element to search within.
 * @returns {HTMLElement|null}
 */
export function $(selector, parent = document) {
  return parent.querySelector(selector);
}

/**
 * Queries all matching DOM elements with an optional parent scope.
 * @param {string} selector - CSS selector string.
 * @param {ParentNode} [parent=document] - Parent element to search within.
 * @returns {NodeListOf<Element>}
 */
export function $$(selector, parent = document) {
  return parent.querySelectorAll(selector);
}

/**
 * Announces a message to screen readers via the live region.
 * @param {string} message
 */
export function announce(message) {
  const liveRegion = document.getElementById('board-announcer');

  if (!liveRegion) {
    return;
  }

  liveRegion.textContent = '';

  requestAnimationFrame(() => {
    liveRegion.textContent = message;
  });
}
