# Interview Companion

An AI-powered interview preparation platform that analyzes your resume (or a quick self-description) against a target job description, and generates a personalized interview strategy — technical questions, behavioral questions, a skill-gap breakdown, and a day-by-day preparation roadmap.

**Live demo:** [https://ai-interviewer-k4pc.onrender.com](https://tinyurl.com/interview-companion)

---

## Features

- 🔐 **Secure authentication** — JWT-based auth with HTTP-only cookies and a token blacklist for proper logout handling.
- 📄 **Resume-aware analysis** — Upload a PDF resume, or skip it and write a quick self-description instead.
- 🎯 **AI-generated interview strategy** — Powered by Google's Gemini API, tailored to the specific job description you provide.
  - Match score against the role
  - 5 technical questions with intention and model answers
  - 5 behavioral questions with intention and model answers
  - Skill gap analysis with severity ratings
  - A 5-day preparation roadmap with daily focus areas and tasks
- 📥 **AI-tailored resume export** — Generate and download a job-tailored resume as a PDF.
- 🗂 **Report history** — Revisit previously generated interview plans anytime.

---

## Tech Stack

**Frontend**
- React 19 + Vite
- React Router
- Sass

**Backend**
- Node.js + Express 5
- MongoDB + Mongoose
- JWT authentication (`jsonwebtoken`, `bcryptjs`)
- Multer (file uploads)
- `pdf-parse` (resume text extraction)
- Puppeteer (HTML → PDF resume generation)
- Google Gemini API (`@google/genai`) for AI-generated reports
- Zod (schema validation)

---

## Project Structure

```
Interview-Companion-/
├── Backend/
│   └── src/
│       ├── controllers/    # Route handlers (auth, interview)
│       ├── middlewares/    # Auth guard, file upload handling
│       ├── models/         # Mongoose schemas (user, blacklist token, interview report)
│       ├── routes/         # Express route definitions
│       ├── services/       # Gemini AI integration
│       └── app.js          # Express app setup
│   └── server.js           # Entry point
└── Frontend/
    └── src/
        ├── features/
        │   ├── auth/        # Login/register, auth context, hooks
        │   └── interview/   # Home page, report page, interview context/hooks
        └── app.routes.jsx   # Route definitions
```

---

## Getting Started

### Prerequisites
- Node.js (v18+)
- A MongoDB connection string (local or Atlas)
- A [Google Gemini API key](https://aistudio.google.com/apikey)

### 1. Clone the repo
```bash
git clone https://github.com/AdityaMazumder/Interview-Companion-.git
cd Interview-Companion-
```

### 2. Backend setup
```bash
cd Backend
npm install
```

Create a `.env` file inside `Backend/`:
```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GOOGLE_GENAI_API_KEY=your_gemini_api_key
NODE_ENV=development
```

Run the backend:
```bash
npm run dev
```
The server starts on `http://localhost:3000`.

### 3. Frontend setup
```bash
cd ../Frontend
npm install
npm run dev
```
The app runs on `http://localhost:5173`.

---

## API Overview

| Method | Endpoint                              | Description                                  | Access  |
|--------|----------------------------------------|-----------------------------------------------|---------|
| POST   | `/api/auth/register`                  | Register a new user                            | Public  |
| POST   | `/api/auth/login`                     | Log in with email and password                | Public  |
| GET    | `/api/auth/logout`                    | Log out and blacklist the current token        | Public  |
| GET    | `/api/auth/get-me`                    | Get the current logged-in user                | Private |
| POST   | `/api/interview/`                     | Generate a new interview report                | Private |
| GET    | `/api/interview/`                     | Get all interview reports for the logged-in user | Private |
| GET    | `/api/interview/report/:interviewId`  | Get a specific interview report by ID          | Private |
| POST   | `/api/interview/resume/pdf/:interviewReportId` | Generate and download a tailored resume PDF | Private |

---

## Deployment

This project is deployed as a single combined service on **Render** — the Express backend serves the built React frontend (`Frontend/dist`) as static files, so both live under one URL.

To deploy your own instance:
1. Build the frontend: `cd Frontend && npm run build`
2. Set `NODE_ENV=production` and your environment variables on your hosting platform.
3. Deploy the `Backend` service with `npm start` as the start command (Express serves the pre-built frontend automatically).

---

## License

ISC
