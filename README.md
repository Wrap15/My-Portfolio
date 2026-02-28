# Panchal's Portfolio

A modern, professional, and highly responsive personal portfolio website built to showcase projects, skills, and academic history. Designed with smooth animations and a clean, glass-morphism aesthetic.

## 🚀 Features

- **Smooth Animations**: Integrated with `framer-motion` for elegant page transitions, scroll progress tracking, and interactive element scaling.
- **Responsive Design**: Fully optimized for mobile, tablet, and desktop viewing using Tailwind CSS.
- **Dynamic Content**: Easy to update projects, education, and skills via a centralized `constants.ts` file.
- **Glassmorphism UI**: Modern aesthetic with frosted glass effects and subtle gradients.
- **Interactive Sections**:
  - **Hero**: Introduction, quick links, and downloadable resume.
  - **Portfolio**: Grid display of selected projects with hover effects and external links.
  - **Academic**: Timeline view of education history.
  - **Expertise**: Categorized technical skills with staggered entrance animations.
  - **Contact**: Direct email link and social media connections.

## 🛠️ Tech Stack

- **Framework**: [React 18](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Language**: TypeScript

## 📂 Project Structure

```text
├── public/
│   ├── profile.jpg        # Your profile picture (Add this manually)
│   └── resume.pdf         # Your resume document (Add this manually)
├── src/
│   ├── components/        # Reusable UI components (if any)
│   ├── lib/
│   │   └── utils.ts       # Utility functions (e.g., Tailwind class merging)
│   ├── App.tsx            # Main application component and layout
│   ├── constants.ts       # Centralized data for Projects, Education, and Skills
│   ├── index.css          # Global styles and Tailwind configuration
│   └── main.tsx           # React entry point
├── index.html             # HTML template
├── package.json           # Project dependencies and scripts
└── vite.config.ts         # Vite configuration
```

## ⚙️ Local Setup & Configuration

Follow these steps to run the project on your local machine:

### 1. Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your system.

### 2. Installation
Clone the repository (or download the source code) and open the terminal in the project directory. Install the required dependencies:

```bash
npm install
```

### 3. Running the Development Server
Start the local Vite development server:

```bash
npm run dev
```
Open your browser and navigate to the URL provided in the terminal (usually `http://localhost:5173` or `http://localhost:3000`).

### 4. Building for Production
To create an optimized production build:

```bash
npm run build
```
This will generate a `dist` folder containing the minified and optimized assets ready for deployment (e.g., on Vercel, Netlify, or GitHub Pages).

## ✏️ How to Customize

1. **Update Personal Info**: Open `src/App.tsx` to change your name, email, and social media links in the Hero and Contact sections.
2. **Update Portfolio Data**: Open `src/constants.ts` to modify your:
   - `PROJECTS` array
   - `EDUCATION` array
   - `SKILLS` array
3. **Update Assets**: 
   - Place your profile photo in the `public` folder and name it `profile.jpg`.
   - Place your resume in the `public` folder and name it `resume.pdf`.


