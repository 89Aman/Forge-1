# 🎓 SkillSnap: The Antigravity of Hiring

**Tagline:** *Defying the gravity of traditional gatekeeping with AI-verified skill proof.*

---

## 🌌 The "Antigravity" Theme
Traditional hiring is weighed down by heavy, outdated systems. Degree bias, resume keywords, and expensive certifications create massive "gravity" that holds talented self-taught developers down.

**SkillSnap provides the lift.** By using **Google Gemini** and **Cloud SQL** to create a friction-less, weightless verification layer, we allow talent to rise purely on merit. We don't care about your pedigree; we only care about your code.

---

## 💡 The Problem
You've learned Python. You've built projects. But "Self-taught" often gets filtered out by ATS systems.
* **Trust Gap:** Employers don't trust self-claims.
* **Cost Barrier:** Real certifications cost hundreds of dollars.
* **Opacity:** A "Passed" badge doesn't show *how* you solved the problem.

## 🛠️ The Solution
**SkillSnap** is a digital skill assessment platform where competence speaks louder than claims.
1.  **Code:** Users solve live algorithmic challenges in a secure sandbox.
2.  **Verify:** The backend validates functionality (Pass/Fail) instantly.
3.  **Audit:** **Google Gemini AI** acts as a Senior Engineer, reviewing the code for Big-O complexity and style.
4.  **Proof:** We mint a verifiable certificate stored on **Google Cloud SQL**, containing the *exact code snapshot* the user wrote.

---

## ⚙️ How It Works (Architecture)

### 1. The Frontend (The Face)
* **Tech:** **Angular 19** + **Tailwind CSS**
* **Role:** Provides a slick, hacker-themed IDE. It uses **Angular Standalone Components** for speed and **Google Fonts (JetBrains Mono)** for readability.

### 2. The Backend (The Engine)
* **Tech:** **Python FastAPI**
* **Role:** A high-performance async REST API. It routes code execution requests and manages certificate minting.

### 3. The Intelligence (Google Tech)
* **Tech:** **Google Gemini 1.5 Flash** (via `google-generativeai`)
* **Role:** Analyzes successful code submissions to assign "RPG-style" badges (e.g., "Python Ninja", "Spaghetti Chef") and estimates time complexity.

### 4. The Truth (Database)
* **Tech:** **Google Cloud SQL (MySQL)**
* **Role:** Acts as the immutable ledger. Unlike a local DB, this cloud instance ensures that verification links work globally and data is persistent.

### 5. The Safety
* **Tech:** **Piston API**
* **Role:** Isolated Docker containers run the user's untrusted code to prevent server attacks.

---

## 🚀 Key Features
* **🛡️ Anti-Cheat Verification:** We don't just say "Pass". We show the employer the code. If a candidate used AI to generate nonsense, the snapshot reveals it.
* **🤖 AI Code Review:** Instant feedback on code quality, not just correctness.
* **☁️ Cloud Native:** Built to scale on Google Cloud infrastructure.

---

## 📋 Run Instructions

### Prerequisites
* Node.js (v18+)
* Python (v3.10+)
* Google Cloud SQL Instance (Active)

### 1. Backend
```bash
cd backend
pip install -r requirements.txt
# Ensure API Keys and DB Credentials are set in main.py
uvicorn main:app --reload --port 8080