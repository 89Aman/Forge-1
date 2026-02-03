# 🎓 SkillSnap: The Antigravity of Hiring

<div align="center">

![SkillSnap](https://img.shields.io/badge/SkillSnap-AI%20Verified-blueviolet?style=for-the-badge)
![Python](https://img.shields.io/badge/Python-3.10+-blue?style=flat-square&logo=python)
![Angular](https://img.shields.io/badge/Angular-19-red?style=flat-square&logo=angular)
![Google Cloud](https://img.shields.io/badge/Google%20Cloud-SQL-blue?style=flat-square&logo=google-cloud)
![Gemini AI](https://img.shields.io/badge/Gemini-1.5%20Flash-purple?style=flat-square&logo=google)

**Defying the gravity of traditional gatekeeping with AI-verified skill proof.**

[Demo](#-quick-start) • [Features](#-key-features) • [Architecture](#️-architecture) • [API Docs](#-api-documentation)

</div>

## 🌌 The "Antigravity" Theme

![SkillSnap Demo](https://github.com/89Aman/SkillSnap/blob/main/image.png)

Traditional hiring is weighed down by heavy, outdated systems. Degree bias, resume keywords, and expensive certifications create massive "gravity" that holds talented self-taught developers down.

**SkillSnap provides the lift.** By using **Google Gemini** and **Cloud SQL** to create a friction-less, weightless verification layer, we allow talent to rise purely on merit. We don't care about your pedigree; we only care about your code.

---

## 💡 The Problem

You've learned Python. You've built projects. But "Self-taught" often gets filtered out by ATS systems.

| Problem | Impact |
|---------|--------|
| **🔒 Trust Gap** | Employers don't trust self-claims |
| **💰 Cost Barrier** | Real certifications cost hundreds of dollars |
| **🔍 Opacity** | A "Passed" badge doesn't show *how* you solved the problem |

## 🛠️ The Solution

**SkillSnap** is a digital skill assessment platform where competence speaks louder than claims.

```
1. 💻 CODE    → Users solve live algorithmic challenges in a secure sandbox
2. ✅ VERIFY  → The backend validates functionality (Pass/Fail) instantly
3. 🤖 AUDIT   → Google Gemini AI reviews code for Big-O complexity and style
4. 🏆 PROOF   → We mint a verifiable certificate with the exact code snapshot
```

---

## 🚀 Key Features

- **🛡️ Anti-Cheat Verification** — We don't just say "Pass". We show the employer the code.
- **🤖 AI Code Review** — Instant feedback on code quality with RPG-style badges
- **☁️ Cloud Native** — Built to scale on Google Cloud infrastructure
- **🎮 RPG Badges** — Earn titles like "Python Ninja" or "Algorithm Wizard"

---

## ⚙️ Architecture

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   Angular 19    │────▶│   FastAPI       │────▶│  Cloud SQL      │
│   + Tailwind    │     │   Backend       │     │  (MySQL)        │
└─────────────────┘     └────────┬────────┘     └─────────────────┘
                                 │
                    ┌────────────┴────────────┐
                    ▼                         ▼
           ┌─────────────────┐     ┌─────────────────┐
           │  Piston API     │     │  Gemini 1.5     │
           │  (Code Runner)  │     │  (AI Audit)     │
           └─────────────────┘     └─────────────────┘
```

| Component | Technology | Purpose |
|-----------|------------|---------|
| Frontend | Angular 19 + Tailwind | Hacker-themed IDE with JetBrains Mono font |
| Backend | Python FastAPI | High-performance async REST API |
| AI | Google Gemini 1.5 Flash | Code analysis and badge assignment |
| Database | Google Cloud SQL (MySQL) | Immutable certificate storage |
| Sandbox | Piston API | Isolated Docker containers for code execution |

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** v18+
- **Python** v3.10+
- **Google Cloud SQL** Instance (Active)
- **Gemini API Key**

### 1. Backend Setup

```bash
cd backend

# Install dependencies
pip install -r requirements.txt

# Set environment variables (create .env file or export)
export GEMINI_API_KEY="your-gemini-api-key"
export DB_HOST="your-cloud-sql-ip"
export DB_USER="root"
export DB_PASS="your-password"
export DB_NAME="skillsnap"

# Run the server
uvicorn main:app --reload --port 8080
```

### 2. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install --legacy-peer-deps

# Start development server
npm start
# Forge-1
