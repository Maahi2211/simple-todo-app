import http from 'node:http';
import { addTodo, listTodos, toggleTodo, removeTodo } from './todoStore.js';
const PORT = Number(process.env.PORT) || 3000;

function sendJson(res, status, body) {
  res.writeHead(status, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(body));
}

async function readJson(req) {
  let raw = '';
  for await (const chunk of req) raw += chunk;
  return raw ? JSON.parse(raw) : {};
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const toggleMatch = url.pathname.match(/^\/todos\/(\d+)\/toggle$/);
  const idMatch = url.pathname.match(/^\/todos\/(\d+)$/);

  try {
    if (req.method === 'GET' && url.pathname === '/todos') {
      return sendJson(res, 200, listTodos());
    }
    if (req.method === 'POST' && url.pathname === '/todos') {
      const { title } = await readJson(req);
      return sendJson(res, 201, addTodo(title));
    }
    if (req.method === 'PATCH' && toggleMatch) {
      const todo = toggleTodo(Number(toggleMatch[1]));
      return todo ? sendJson(res, 200, todo) : sendJson(res, 404, { error: 'Not found' });
    }
    if (req.method === 'DELETE' && idMatch) {
      return removeTodo(Number(idMatch[1]))
        ? sendJson(res, 204, {})
        : sendJson(res, 404, { error: 'Not found' });
    }
    sendJson(res, 404, { error: 'Not found' });
  } catch (error) {
    sendJson(res, 400, { error: error.message });
  }
});

server.listen(PORT, () => console.log(`Todo API listening on http://localhost:${PORT}`));
