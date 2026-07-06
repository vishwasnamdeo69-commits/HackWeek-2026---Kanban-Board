/**
 * card.js
 * Responsible for card rendering and card-related UI.
 */

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
  card.setAttribute('draggable', 'false');
  card.setAttribute('aria-label', `Task: ${task.title}`);

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
 * Renders a list of cards into a column container.
 * @param {HTMLElement} container - The column's card container element.
 * @param {Array} tasks - Array of task objects for this column.
 */
export function renderCards(container, tasks) {
  container.replaceChildren();

  tasks.forEach((task) => {
    container.appendChild(createCardElement(task));
  });
}

/**
 * Removes a card element from the DOM.
 * @param {string} taskId - Unique identifier of the task to remove.
 * @returns {boolean} Whether a matching card was found and removed.
 */
export function removeCard(taskId) {
  const card = document.querySelector(`.card[data-id="${taskId}"]`);

  if (!card) {
    return false;
  }

  card.remove();
  return true;
}
