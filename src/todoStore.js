/**
 * In-memory todo storage.
 */
let nextId = 1;
const todos = [];

/**
 * Create a todo.
 * @param {string} title
 * @returns {{id: number, title: string, completed: boolean, createdAt: string}}
 */
export function addTodo(title) {
  if (typeof title !== 'string' || title.trim() === '') {
    throw new Error('Title is required');
  }
  const todo = {
    id: nextId++,
    title: title.trim(),
    completed: false,
    createdAt: new Date().toISOString()
  };
  todos.push(todo);
  return todo;
}

export function listTodos() {
  return todos.map(todo => ({ ...todo }));
}

export function toggleTodo(id) {
  const todo = todos.find(t => t.id === id);
  if (!todo) return null;
  todo.completed = !todo.completed;
  return { ...todo };
}

export function removeTodo(id) {
  const index = todos.findIndex(t => t.id === id);
  if (index === -1) return false;
  todos.splice(index, 1);
  return true;
}

export function resetTodos() {
  todos.length = 0;
  nextId = 1;
}
