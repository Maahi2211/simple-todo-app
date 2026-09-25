/**
 * Deterministic sample data for tests.
 */
export const FIXED_DATE = '2024-01-15T09:30:00.000Z';

export const cleanTodos = Object.freeze([
  Object.freeze({ id: 1, title: 'Write project README', completed: true, createdAt: FIXED_DATE }),
  Object.freeze({ id: 2, title: 'Add unit tests', completed: false, createdAt: FIXED_DATE }),
  Object.freeze({ id: 3, title: 'Review pull requests', completed: false, createdAt: FIXED_DATE })
]);

/**
 * Build a todo with sensible defaults, overriding any field.
 * @param {Partial<{id: number, title: string, completed: boolean, createdAt: string}>} overrides
 */
export function buildTodo(overrides = {}) {
  return { id: 100, title: 'Sample todo', completed: false, createdAt: FIXED_DATE, ...overrides };
}
