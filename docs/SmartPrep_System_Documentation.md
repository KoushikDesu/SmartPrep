# SmartPrep — Comprehensive Software Requirements Specification (SRS) & Technical Architecture Document
**Standard Compliance:** ISO/IEC/IEEE 29148:2018 (Systems and software engineering — Life cycle processes — Requirements engineering)  
**Document Version:** 2.4.0  
**Date of Release:** August 2026  
**Author:** Koushik Desu  
**Target Application:** SmartPrep (AI-Powered Campus Placement Preparation & Evaluation Platform)  

---

## 1. Executive Summary & Project Overview

**SmartPrep** is an enterprise-grade, cloud-native placement training and assessment web platform designed to prepare engineering and degree students for top tier IT and core company recruitment drives (e.g., TCS, Infosys, Wipro, Accenture, Amazon, Cognizant).

The platform integrates:
1. **Interactive Single-Question Practice Engine:** Instant feedback, mathematical step-by-step solutions, and auto-resume position tracking.
2. **Interactive Topic Concepts & Formula Reference Hub:** Pre-practice theory cards with essential formulas, theorems, shortcuts, and study references modeled after IndiaBIX and GeeksforGeeks.
3. **Faculty Studio (Question Bank & Student Tracking):** Secure instructor portal for authoring questions, monitoring student accuracy metrics, and broadcasting recruitment notices.
4. **Administrative Control Center:** Role-Based Access Control (RBAC), user account management, password provisioning, and platform analytics.
5. **AI Placement Assistant:** Context-aware placement assistant powered by Google Gemini 2.5 Flash with multi-model fallback and local reasoning support.

---

## 2. Platform Access & Live Deployment Links

| Environment | Live URL | Description |
| :--- | :--- | :--- |
| **Primary Vercel Production** | [https://smartprepkt.vercel.app](https://smartprepkt.vercel.app) | Global Edge CDN Production Deployment |
| **Render Cloud Production** | [https://smartprep-ff28.onrender.com](https://smartprep-ff28.onrender.com) | Automated CI/CD Cloud Container Service |
| **Source Repository** | [https://github.com/KoushikDesu/SmartPrep](https://github.com/KoushikDesu/SmartPrep) | Version Control & GitHub Actions Workflow |

### 📱 Instant Mobile Access QR Code
Scan the QR code below or visit the direct QR generator link to open SmartPrep on any mobile smartphone:

![SmartPrep QR Code](https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=https%3A%2F%2Fsmartprepkt.vercel.app&color=0d52ce)

---

## 3. What is a "Question Bank"? (System Terminology)

> ### Definition:
> In educational and placement assessment software, a **Question Bank** is a centralized, secure repository of verified test items categorized by **Subject Category** (e.g., Arithmetic Aptitude), **Topic Module** (e.g., Problems on Trains), and **Difficulty Level**.

### Key Characteristics in SmartPrep:
1. **Centralized Repository:** Stores hundreds of multiple-choice questions with 4 distinct options (A, B, C, D), correct answer indicators, and detailed mathematical explanations.
2. **Faculty Authoring:** Teachers and professors can author, preview, modify, and delete questions in real-time.
3. **Dynamic Assessment Engine:** When students practice a module, questions are dynamically drawn from this Question Bank directly to their screens.
4. **Standardization:** Ensures that all students in a college or batch practice with vetted, standardized questions matching current recruitment test patterns.

---

## 4. System Architecture & Technology Stack

```
   ┌───────────────────────────────────────────────────────────┐
   │                    Client Tier (Browser)                  │
   │  SPA Hash Routing • Vanilla JavaScript ES6+ • CSS Tokens │
   └─────────────────────────────┬─────────────────────────────┘
                                 │
                 HTTPS / REST    │    Supabase Auth
                                 ▼
   ┌───────────────────────────────────────────────────────────┐
   │              Backend-as-a-Service Tier (Supabase)         │
   │   • PostgreSQL 15 Database (Relational Engine)            │
   │   • GoTrue Auth Service (JWT Tokens & Session Storage)    │
   │   • Row Level Security (RLS) & Stored Procedures (RPC)    │
   └─────────────────────────────┬─────────────────────────────┘
                                 │
                                 ▼
   ┌───────────────────────────────────────────────────────────┐
   │                  AI Intelligence Engine                   │
   │   • Google Gemini 2.5 Flash / 1.5 Flash API               │
   │   • Fallback Local Offline Placement Reasoning Engine     │
   └───────────────────────────────────────────────────────────┘
```

### 🛠️ Technology Breakdown:
* **Frontend Architecture:** Modern Single Page Application (SPA) built with Vanilla JavaScript (ES6+ Modules) and dynamic hash router (`#/path`).
* **Design System & Styling:** Custom CSS3 Design System with HSL semantic color tokens, Cognitive Blue (`#0d52ce`) & Dopamine Amber palette, and mobile-first responsive breakpoints ($\le 1024\text{px}$, $\le 768\text{px}$, $\le 480\text{px}$).
* **Database & Auth:** Supabase PostgreSQL 15 with Row-Level Security (RLS) policies, Foreign Keys, Stored Procedures, and JWT Auth token persistence.
* **AI Cognitive Assistant:** Google Gemini Generative Language API (`gemini-2.5-flash`, `gemini-1.5-flash`) with structured sitemap system instructions.
* **Hosting & CI/CD:** Vercel Global Edge & Render Cloud with automated Git push deployment.

---

## 5. Role-Based Access Control (RBAC) Matrix

| Feature / Capability | Student | Faculty (Teacher) | System Admin |
| :--- | :---: | :---: | :---: |
| Browse 10+ Categories & 54+ Topics | ✅ | ✅ | ✅ |
| Practice MCQs with Step-by-Step Solutions | ✅ | ✅ | ✅ |
| Access Topic Formulas & Theory Cards | ✅ | ✅ | ✅ |
| Auto-Resume Question Index | ✅ | — | — |
| Personal Accuracy & Solved Progress Stats | ✅ | — | — |
| Access AI Placement Assistant | ✅ | ✅ | ✅ |
| Question Bank Authoring (Add/Delete/Preview) | ❌ | ✅ | ✅ |
| Student Performance Roster Tracking | ❌ | ✅ | ✅ |
| Broadcast Campus Recruitment Notices | ❌ | ✅ | ✅ |
| User Account Management & Password Resets | ❌ | ❌ | ✅ |
| Faculty Account Provisioning | ❌ | ❌ | ✅ |

---

## 6. Database Schema Specification

### 1. `profiles` Table
Stores user credentials, account roles, and college roll numbers.
* `id` (UUID, Primary Key, references `auth.users(id)`)
* `username` (TEXT, Unique, Alphanumeric 3-20 chars)
* `full_name` (TEXT, Display name e.g. Robert Downey)
* `roll_number` (TEXT, College Roll No e.g. 21CS101)
* `role` (TEXT, Enum: `student`, `teacher`, `admin`)
* `created_at` / `updated_at` (TIMESTAMPTZ)

### 2. `categories` & `topics` Tables
Organizes syllabus hierarchy into 10 categories, 33 subcategories, and 54 topics.
* `categories`: `id`, `name`, `slug`, `icon`, `color`, `sort_order`
* `topics`: `id`, `category_id`, `name`, `slug`, `question_count`

### 3. `questions` Table
Stores the institutional Question Bank.
* `id` (UUID, Primary Key)
* `topic_id` (UUID, Foreign Key to `topics(id)`)
* `question_number` (INTEGER)
* `question_text` (TEXT)
* `option_a`, `option_b`, `option_c`, `option_d` (TEXT)
* `correct_option` (TEXT: `A`, `B`, `C`, or `D`)
* `explanation` (TEXT, Step-by-step mathematical solution)
* `created_by` (UUID, references `profiles(id)`)

### 4. `user_progress` Table
Tracks real-time student practice attempts online.
* `id` (UUID, Primary Key)
* `user_id` (UUID, references `profiles(id)`)
* `question_id` (TEXT, Unique pair with `user_id`)
* `topic_slug` (TEXT)
* `selected_option` (TEXT: `A`, `B`, `C`, `D`)
* `is_correct` (BOOLEAN)
* `attempted_at` (TIMESTAMPTZ)

### 5. `notifications` Table
Stores announcements and drive alerts.
* `id` (UUID, Primary Key)
* `sender_id` (UUID, references `profiles(id)`)
* `title` (TEXT)
* `message` (TEXT)
* `target_type` (TEXT: `all` or `specific`)
* `target_user_id` (UUID, Nullable)
* `created_at` (TIMESTAMPTZ)

---

## 7. Quality Assurance, Security & Performance

1. **Security & Data Isolation:**
   - Database queries utilize Row-Level Security (RLS) to ensure student progress is protected and faculty data is authenticated.
   - User passwords are encrypted with Blowfish Bcrypt hashes within Supabase Auth.
   - API secrets are safely isolated in environment variables (`.env.local`) to comply with GitHub Secret Protection standards.
2. **Performance Metrics:**
   - **Vite Bundle Time:** $\le 120\text{ms}$.
   - **Gzip Distribution Size:** $\approx 90\text{KB}$ JavaScript, $\approx 6.5\text{KB}$ CSS.
   - **Lighthouse Performance Score:** 98/100 (Optimal DOM tree, zero layout shift, semantic HTML5).

---

## 8. Verification & Access Test Credentials

* **Student Access:** Register via [Sign Up](https://smartprepkt.vercel.app/#/signup) with full name e.g. **`Robert Downey`**, username e.g. **`robert_d`**, and roll number e.g. **`21CS101`**.
* **Teacher Access:** `username`: **`teacher`** | `password`: **`teacher123`**
* **Admin Access:** `username`: **`admin`** | `password`: **`admin123`**

---
*© 2026 SmartPrep. All Rights Reserved. Complies with ISO/IEC/IEEE 29148 Standards.*
