/**
 * TaskFlow – Main Entry Point
 * Bootstraps the board module on DOM ready.
 */

import { initBoard } from './js/board.js';

function init() {
  initBoard();
}

document.addEventListener('DOMContentLoaded', init);
