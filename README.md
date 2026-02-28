# ElevatED - AI-Driven Campus Placement ERP

<div align="center">
  <h3>Predict your placement readiness. Improve it strategically. Track it transparently.</h3>
</div>

## 🚀 Overview

ElevatED is an institutional, AI-driven, and real-time student placement tracking and opportunity match engine. It aims to solve the "black box" problem of campus placements by providing AI-powered insights, predictive readiness scoring, and transparent policy enforcement for students, recruiters, and university administrators.

## ✨ Key Features

- **Candidate ATX Intelligence:** Proprietary AI scoring (ATX Index) combining tech proficiency, behavioral insights, and academic data.
- **Smart Resume Parsing:** Automated extraction of skills, projects, and domains using Google Gemini AI.
- **Target Role Matching:** Real-time keyword gap analysis against industry standards, showing match percentages for various tech roles.
- **Skill Gap Analysis:** Multi-axis competency radar and detailed breakdown of skills needing improvement.
- **Gamified "Road to 1000" Quests:** Gamified milestones and tasks to improve candidates' ATX score and prepare them for Tier-1 companies.
- **Dynamic Growth Forecasting:** Probability charts showing the impact of simulated skill acquisitions on placement chances.
- **Automated Readiness Reports:** Quick generation of tailored PDF reports encompassing candidate metrics and project highlights.
- **Institutional Admin/Recruiter Hubs (WIP):** Streamlined dashboards for HR screening and placement cell management.

## 🛠️ Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org/) (React 19, Turbopack)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) & [Framer Motion](https://www.framer.com/motion/) for micro-animations
- **Database & Auth:** [Firebase](https://firebase.google.com/) (Firestore)
- **State Management:** [Zustand](https://github.com/pmndrs/zustand)
- **AI Integration:** [Google Generative AI](https://ai.google.dev/) (Gemini-2.5-Flash)
- **Data Visualization:** [Recharts](https://recharts.org/)
- **PDF Generation:** [jsPDF](https://parall.ax/products/jspdf)

## 📦 Installation & Setup

1. **Clone the repository** (if applicable) or use the project directory:
   ```bash
   git clone <repository-url>
   cd ElevatED
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env.local` file in the root directory and add your Firebase and Gemini AI credentials:
   ```env
   # Firebase Config
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id

   # AI Processing
   GEMINI_API_KEY=your_gemini_api_key
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. **Open the app:**
   Navigate to [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

- `app/ (App Router)`
  - `(public)/`: Landing page and public-facing routes
  - `auth/`: Authentication flow (Login/Register)
  - `student/dashboard/`: Core student experience (Insights, Simulator, Skills, Profile, etc.)
  - `recruiter/dashboard/`: Recruiter screening interface
- `components/`: Reusable UI elements, Layout blocks, and functional components
- `lib/`: Firebase configurations, AI parsing logics, mock data utilities
- `store/`: Zustand state stores (`useAuthStore`)

## 📄 License

This project is licensed under the [MIT License](LICENSE).
