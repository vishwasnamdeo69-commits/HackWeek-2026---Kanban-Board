/**
 * card.js
 * Responsible for card rendering and card-related UI.
 */

const EMPTY_MESSAGE = 'Drop cards here';

/**
 * Creates a card DOM element from task data.
 * @param {Object} task - Task object with id, title, status, and createdAt.
 * @param {Object} [options]
 * @param {boolean} [options.animate=false] - Apply entrance animation.
 * @returns {HTMLElement}
 */
export function createCardElement(task, { animate = false } = {}) {
  const card = document.createElement('article');
  card.className = 'card';
  card.dataset.id = task.id;
  card.dataset.status = task.status;
  card.setAttribute('draggable', 'true');
  card.setAttribute('role', 'listitem');
  card.setAttribute('tabindex', '0');
  card.setAttribute('aria-grabbed', 'false');
  card.setAttribute('aria-label', task.title);

  const title = document.createElement('p');
  title.className = 'card__title';
  title.textContent = task.title;

  card.appendChild(title);

  if (animate) {
    requestAnimationFrame(() => {
      card.classList.add('card--entering');
    });
  }

  return card;
}

/**
 * Creates the empty-column placeholder element.
 * @returns {HTMLElement}
 */
function createEmptyState() {
  const empty = document.createElement('p');
  empty.className = 'column__empty';
  empty.textContent = EMPTY_MESSAGE;
  return empty;
}

/**
 * Renders a list of cards into a column container.
 * @param {HTMLElement} container - The column's card container element.
 * @param {Array} tasks - Array of task objects for this column.
 */
export function renderCards(container, tasks) {
  container.replaceChildren();

  if (tasks.length === 0) {
    container.appendChild(createEmptyState());
    return;
  }

  tasks.forEach((task) => {
    container.appendChild(createCardElement(task));
  });
}

/**
 * Appends a single card to a column, removing the empty state if present.
 * @param {HTMLElement} container - The column's card container element.
 * @param {Object} task - Task object to render.
 * @param {Object} [options]
 * @param {boolean} [options.animate=false] - Apply entrance animation.
 */
export function appendCard(container, task, { animate = false } = {}) {
  container.querySelector('.column__empty')?.remove();
  container.appendChild(createCardElement(task, { animate }));
}
