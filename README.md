# Software EOL Date

A simple chat agent that answers questions about software end-of-life (EOL) support. The application uses a React frontend and a NestJS backend integrated with the ChatGPT API to provide users with up-to-date information on software EOL dates.

## Tech Stack

- **Frontend** — React (CRA)
- **Backend** — NestJS + OpenAI API

## Getting Started

### Prerequisites

- Node.js installed
- An OpenAI API key configured in `backend/.env`

### Backend

```bash
cd backend
npm install
npm run start:dev
```

The backend starts in watch mode and listens for API requests.

### Frontend

```bash
cd client
npm install
npm start
```

The frontend starts on [http://localhost:3000](http://localhost:3000) by default.