# PrepTrack

PrepTrack is a lightweight interview-practice tracker built with React and Vite. It helps you organize coding, Git/GitHub, and technical interview topics, monitor completion progress, and quickly find questions in your preparation list.

## Features

- Dashboard overview with:
  - Total tracked questions
  - Completed DSA questions
  - Completed technical questions
  - Overall completion percentage
- Add new practice questions through a validated modal form
- Track question status:
  - Pending
  - In Progress
  - Completed
- Organize questions by category:
  - DSA
  - Git/GitHub
  - Technical
- Set question difficulty:
  - Easy
  - Medium
  - Hard
- Search questions by title
- Filter by category, difficulty, and status
- Update question status directly from the question list
- Delete questions from the tracker
- Light and dark themes
- Responsive layout for desktop, tablet, and mobile screens
- Automatic persistence in the browser using `localStorage`

## Tech Stack

- [React](https://react.dev/) 19
- [Vite](https://vite.dev/) 6
- [Tailwind CSS](https://tailwindcss.com/) 4
- [Lucide React](https://lucide.dev/) for icons
- JavaScript and JSX

## Project Structure

```text
prep-track/
├── public/                 # Static public assets
├── src/
│   ├── components/
│   │   ├── dashboard/      # Metric and progress cards
│   │   ├── layout/         # Header and sidebar
│   │   └── questions/      # Question form, filters, list, and rows
│   ├── data/               # Initial question data
│   ├── hooks/              # Question and theme state logic
│   ├── utils/              # localStorage helpers
│   ├── App.jsx             # Main application layout
│   ├── index.css           # Global styles and Tailwind layers
│   └── main.jsx            # React entry point
├── index.html
├── package.json
└── vite.config.js
```

## Data Persistence

PrepTrack does not require a backend or database. Questions and theme preferences are stored in the browser's localStorage:

- `preptrack_questions` stores the question list
- `preptrack_theme` stores the selected light or dark theme

To reset the application data, remove these keys from the browser's localStorage for the PrepTrack site and reload the page. Removing `preptrack_questions` restores the sample questions.

## Adding a Question

Use the **Add Question** action and provide:

1. A title between 3 and 120 characters
2. A category
3. A difficulty level
4. An initial status

New questions are added to the beginning of the list and are saved automatically.

### Thank You!
