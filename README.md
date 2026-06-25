# QueueCure Pro

Transparent, real-time clinic queue management system.

## Tech Stack

- Frontend: HTML, CSS, JavaScript
- Backend: Node.js, Express.js

## Run In VS Code

Open this folder in VS Code:

```text
C:\Users\priya dharshini.S\OneDrive\Desktop\Queue-Cure-26
```

Then open the VS Code terminal and run:

```powershell
npm.cmd start
```

If that does not work, run:

```powershell
node server.js
```

Open:

```text
http://localhost:4173
```

## Demo Login

- Receptionist: `receptionist@test.com`
- Doctor: `doctor@test.com`
- Admin: `admin@test.com`

Password:

```text
password
```

Each staff dashboard has its own login screen. Open Receptionist, Doctor, or Admin from the top menu, enter the matching account, then press `Login`.

## Important Queue Behavior

- No token number is shown when the app first opens.
- The first generated token is `A001`.
- Tokens continue in order: `A002`, `A003`, `A004`.
- Queue data is stored in memory for the demo, so restarting the server resets the queue.

## Folder Structure

The project follows this structure:

```text
frontend/
  src/
    pages/
    components/
    layouts/
    hooks/
    services/
    context/
    routes/
    utils/

backend/
  controllers/
  routes/
  middleware/
  models/
  services/
  sockets/
  config/
  utils/
  seed/

docs/
  architecture/
  api/
  screenshots/
  database/
```
