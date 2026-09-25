# simple-todo-app

A minimal todo REST API (Node.js, no dependencies) used as a fixture for automated code review.

```bash
npm start   # http://localhost:3000
npm test
```

| Method | Path | Description |
|--------|------|-------------|
| GET | /todos | List todos |
| POST | /todos | Create a todo `{ "title": "..." }` |
| PATCH | /todos/:id/toggle | Toggle completion |
| DELETE | /todos/:id | Delete a todo |
