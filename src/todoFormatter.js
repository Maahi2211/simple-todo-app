/**
 * Presentation helpers for todos.
 */

const STATUS_ICON = Object.freeze({ done: '[x]', pending: '[ ]' });

/**
 * Format a single todo as a checklist line.
 * @param {{title: string, completed: boolean}} todo
 * @returns {string}
 */
export function formatTodo({ title, completed }) {
  const icon = completed ? STATUS_ICON.done : STATUS_ICON.pending;
  return `${icon} ${title}`;
}

/**
 * Summarise progress across todos.
 * @param {Array<{completed: boolean}>} todos
 * @returns {{total: number, completed: number, percentComplete: number}}
 */
export function summarize(todos) {
  const total = todos.length;
  const completed = todos.filter(todo => todo.completed).length;
  const percentComplete = total === 0 ? 0 : Math.round((completed / total) * 100);
  return { total, completed, percentComplete };
}
