# Node.js HW - Express

Express-додаток для роботи з колекцією нотаток.

## Installation

Встановлення залежностей:

```bash
npm install
```

## Running the application

Запуск у режимі розробки:

```bash
npm run dev
```

Запуск сервера:

```bash
npm start
```

## Environment Variables

Створіть файл `.env` у корені проєкту:

```env
PORT=3000
```

## Middleware

У проєкті використовуються:

- `cors` — для дозволу запитів з інших доменів;
- `express.json()` — для обробки JSON у body запиту;
- `pino-http` — для логування HTTP-запитів;
- middleware для обробки 404 помилок;
- middleware для обробки 500 помилок.

## API Routes

### Get all notes

**GET**

```
/notes
```

Response:

```json
{
  "message": "Retrieved all notes"
}
```

---

### Get note by ID

**GET**

```
/notes/:noteId
```

Example:

```
/notes/123
```

Response:

```json
{
  "message": "Retrieved note with ID: 123"
}
```

---

### Test error

**GET**

```
/test-error
```

Response:

```json
{
  "message": "Simulated server error"
}
```

## Deployment

The application is deployed on Render:

https://nodejs-hw-3gj8.onrender.com