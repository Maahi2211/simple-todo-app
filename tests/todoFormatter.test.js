import { test } from 'node:test';
import assert from 'node:assert/strict';
import { formatTodo, summarize } from '../src/todoFormatter.js';
import { cleanTodos, buildTodo } from './fixtures/clean-todos.fixture.js';

test('formatTodo marks completed todos', () => {
  assert.equal(formatTodo(buildTodo({ title: 'Ship it', completed: true })), '[x] Ship it');
});

test('formatTodo marks pending todos', () => {
  assert.equal(formatTodo(buildTodo({ title: 'Plan', completed: false })), '[ ] Plan');
});

test('summarize computes totals and percentage', () => {
  assert.deepEqual(summarize(cleanTodos), { total: 3, completed: 1, percentComplete: 33 });
});

test('summarize handles an empty list', () => {
  assert.deepEqual(summarize([]), { total: 0, completed: 0, percentComplete: 0 });
});

test('fixtures are immutable', () => {
  assert.throws(() => { cleanTodos[0].title = 'changed'; }, TypeError);
});
