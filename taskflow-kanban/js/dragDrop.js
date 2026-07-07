/**
 * dragDrop.js
 * Drag-and-drop logic using the HTML Drag & Drop API.
 * Isolated from rendering and storage concerns.
 */

/** @type {string|null} */
let draggedTaskId = null;

/**
 * Initializes drag-and-drop behavior on the board.
 * @param {HTMLElement} boardElement - The root board container.
 * @param {{ onMove: (taskId: string, newStatus: string) => void }} callbacks
 */
export function initDragDrop(boardElement, { onMove }) {
  if (!boardElement || typeof onMove !== 'function') {
    return;
  }

  boardElement.addEventListener('dragstart', handleDragStart);
  boardElement.addEventListener('dragend', handleDragEnd);

  const dropZones = boardElement.querySelectorAll('.column__cards');

  dropZones.forEach((zone) => {
    zone.addEventListener('dragover', handleDragOver);
    zone.addEventListener('dragleave', handleDragLeave);
    zone.addEventListener('drop', (event) => handleDrop(event, onMove));
  });
}

/**
 * Handles the start of a card drag operation.
 * @param {DragEvent} event
 */
export function handleDragStart(event) {
  const card = event.target.closest('.card');

  if (!card) {
    return;
  }

  draggedTaskId = card.dataset.id;
  event.dataTransfer.effectAllowed = 'move';
  event.dataTransfer.setData('text/plain', draggedTaskId);

  card.setAttribute('aria-grabbed', 'true');
  setDropZonesActive(true);

  requestAnimationFrame(() => {
    card.classList.add('card--dragging');
  });
}

/**
 * Cleans up drag state when a drag operation ends.
 * @param {DragEvent} event
 */
function handleDragEnd(event) {
  const card = event.target.closest('.card');

  card?.classList.remove('card--dragging');
  card?.setAttribute('aria-grabbed', 'false');
  clearAllDragOver();
  setDropZonesActive(false);
  draggedTaskId = null;
}

/**
 * Allows dropping and highlights the target column.
 * @param {DragEvent} event
 */
function handleDragOver(event) {
  event.preventDefault();
  event.dataTransfer.dropEffect = 'move';
  event.currentTarget.classList.add('column__cards--drag-over');
}

/**
 * Removes drop highlight when the pointer leaves the column.
 * @param {DragEvent} event
 */
function handleDragLeave(event) {
  const zone = event.currentTarget;

  if (!zone.contains(event.relatedTarget)) {
    zone.classList.remove('column__cards--drag-over');
  }
}

/**
 * Handles dropping a card into a target column.
 * @param {DragEvent} event
 * @param {(taskId: string, newStatus: string) => void} onMove
 */
export function handleDrop(event, onMove) {
  event.preventDefault();

  const zone = event.currentTarget;
  zone.classList.remove('column__cards--drag-over');

  const taskId = event.dataTransfer.getData('text/plain') || draggedTaskId;
  const column = zone.closest('.column');
  const newStatus = column?.dataset.status;

  if (!taskId || !newStatus) {
    return;
  }

  const card = document.querySelector(`.card[data-id="${taskId}"]`);
  const currentStatus = card?.dataset.status;

  if (currentStatus && currentStatus !== newStatus) {
    onMove(taskId, newStatus);
  }
}

/**
 * Toggles drop-zone affordances while a drag is active.
 * @param {boolean} isActive
 */
function setDropZonesActive(isActive) {
  document.querySelectorAll('.column__cards').forEach((zone) => {
    zone.setAttribute('aria-dropeffect', isActive ? 'move' : 'none');
  });
}

/**
 * Removes drag-over styling from all column drop zones.
 */
function clearAllDragOver() {
  document.querySelectorAll('.column__cards--drag-over').forEach((zone) => {
    zone.classList.remove('column__cards--drag-over');
  });
}
