import { test, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import { addTodo, listTodos, toggleTodo, removeTodo, resetTodos } from '../src/todoStore.js';

beforeEach(() => resetTodos());

test('addTodo trims the title and assigns incrementing ids', () => {
  const first = addTodo('  Buy milk ');
  const second = addTodo('Walk dog');
  assert.equal(first.title, 'Buy milk');
  assert.equal(second.id, first.id + 1);
});

test('addTodo rejects empty titles', () => {
  assert.throws(() => addTodo('   '), /Title is required/);
});

test('toggleTodo flips completion and returns null for unknown ids', () => {
  const todo = addTodo('Read');
  assert.equal(toggleTodo(todo.id).completed, true);
  assert.equal(toggleTodo(999), null);
});

test('removeTodo deletes existing todos only', () => {
  const todo = addTodo('Cook');
  assert.equal(removeTodo(todo.id), true);
  assert.equal(removeTodo(todo.id), false);
  assert.deepEqual(listTodos(), []);
});
