<div align="center">
  <h1>EdgePhone.AI</h1>

  <p>
    A futuristic AI smartphone interface — built with React, Vite, and Gemini API.<br/>
    Deployed on GitHub Pages in cloud-only mode for reliable web delivery.
  </p>

  <p>
    <img alt="React" src="https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=white" />
    <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-5.8-3178C6?style=flat-square&logo=typescript&logoColor=white" />
    <img alt="Vite" src="https://img.shields.io/badge/Vite-6-646CFF?style=flat-square&logo=vite&logoColor=white" />
    <img alt="Tailwind CSS" src="https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white" />
    <img alt="License" src="https://img.shields.io/badge/License-Apache_2.0-green?style=flat-square" />
  </p>
</div>

---

## Table of Contents

- [Description](#description)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Environment Variables](#environment-variables)
- [Deployment](#deployment)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

---

## Description

**EdgePhone.AI** is a fully interactive smartphone UI concept that demonstrates a modern AI-enabled mobile experience in the browser. It simulates a mobile operating system with an AI assistant, privacy-focused interface, and cloud-connected intelligence.

The app ships in **cloud-only inference mode** for GitHub Pages:

| Mode | Engine | Data |
|---|---|---|
| **Online (Cloud)** | Google Gemini 2.5 Flash API | Sent to Google Cloud |

---

## Features

- **Core Dashboard** — Live NPU load, power mode, memory, privacy score, and animated AI visualizer
- **AI Assistant** — Chat interface wired to Gemini 2.5 Flash (cloud)
- **Privacy Vault** — Permission monitor, hardware encryption stats, cross-site tracker counter
- **Mobile Services** — Dialer, messaging, gallery, browser shortcuts, recent calls log, and a monthly calendar
- **Notifications** — Priority-sorted system and security alerts
- **System Config** — Wi-Fi, Bluetooth, display, face unlock, fast charge, storage, and backup toggles
- **Realistic phone shell** — Dynamic island notch, side buttons, home indicator, and status bar — all responsive

---

## Tech Stack

| Layer | Technology |
|---|---|
| UI Framework | React 19 + TypeScript |
| Build Tool | Vite 6 |
| Styling | Tailwind CSS v4 (via `@tailwindcss/vite`) |
| Animations | Motion (Framer Motion) |
| Icons | Lucide React |
| AI Engine | Google Gemini 2.5 Flash REST API |
| Container | Docker + Nginx (Alpine) |
| Cloud Deploy | GitHub Pages via GitHub Actions |

---

## Prerequisites

Before you begin, make sure you have the following installed:

- **[Node.js](https://nodejs.org/)** v18 or higher
- **npm** v9 or higher (bundled with Node.js)
- A modern browser (Chrome, Edge, Safari, Firefox)
- A **Gemini API key** for cloud inference mode *(required)*

---

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/your-username/edgephone_v02.git
cd edgephone_v02
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Copy the example environment file and fill in your values:

```bash
cp .env.example .env
```

Then open `.env` and set your Gemini API key (see [Environment Variables](#environment-variables)).

### 4. Configure environment for online mode

Create a `.env` file from the template and set:

```env
VITE_GEMINI_API_KEY="your_gemini_api_key"
VITE_BASE_URL="/"
```

---

## Usage

### Start the development server

```bash
npm run dev
```

The app will be available at **[http://localhost:3000](http://localhost:3000)**.

### Build for production

```bash
npm run build
```

The compiled static assets will be output to the `dist/` directory.

### Preview the production build locally

```bash
npm run preview
```

### Type-check without emitting

```bash
npm run lint
```

---

### Runtime mode

The app runs in **online cloud mode only**. The AI Assistant sends prompts to Gemini 2.5 Flash using `VITE_GEMINI_API_KEY`.

---

## Environment Variables

Create a `.env` file in the project root (or copy `.env.example`):

```env
# Required for cloud AI mode
VITE_GEMINI_API_KEY="your_gemini_api_key"

# Base sub-path for GitHub Pages.
# For https://<user>.github.io/<repo>/ use /<repo>/
# For custom domain or root deployment use /
VITE_BASE_URL="/"
```

| Variable | Required | Description |
|---|---|---|
| `VITE_GEMINI_API_KEY` | Yes | Gemini API key used by the assistant |
| `VITE_BASE_URL` | Yes for Pages | Base path, e.g. `/edgephone_v03_Public_Gemma/` |

> **Security:** Never commit your `.env` file. It is already listed in `.gitignore`.

---

## Deployment

### Docker (local)

```bash
# Build the production bundle first
npm run build

# Build and run the Docker image
docker build -t edgephone-v02 .
docker run -p 8080:8080 edgephone-v02
```

Visit **[http://localhost:8080](http://localhost:8080)**.

### GitHub Pages (recommended)

This repository includes `.github/workflows/deploy.yml` that automatically deploys to GitHub Pages on pushes to `main`.

1. In GitHub repo settings, enable **Pages** with **GitHub Actions** as the source.
2. Add Actions secret `VITE_GEMINI_API_KEY`.
3. Add repository variable `VITE_BASE_URL`:
   - `/<repo>/` for project pages
   - `/` for root/custom domain
4. Push to `main` (or run the workflow manually via **Actions**).

---

## Project Structure

```
edgephone_v03_Public_Gemma/
├── public/
│   ├── favicon.png              # App logo / AI button icon
│   └── models/                  # Optional local assets
├── src/
│   ├── App.tsx                  # Full application — all tabs and components
│   ├── main.tsx                 # React entry point
│   └── index.css                # Tailwind v4 theme + global styles
├── .env.example                 # Environment variable template
├── .dockerignore
├── .gcloudignore
├── .github/workflows/deploy.yml # GitHub Pages deployment workflow
├── Dockerfile                   # Nginx static-serve image
├── index.html                   # Vite HTML entry
├── nginx.conf                   # Production Nginx config (SPA + caching + security)
├── package.json
├── tsconfig.json
└── vite.config.ts               # Vite config with Tailwind, React, and env injection
```

---

## Contributing

Contributions, issues, and feature requests are welcome!

### Getting started

1. **Fork** the repository
2. **Create** a feature branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Commit** your changes with a clear message:
   ```bash
   git commit -m "feat: improve cloud assistant UX"
   ```
4. **Push** to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```
5. **Open a Pull Request** against the `main` branch

### Guidelines

- Follow the existing code style (TypeScript strict, functional React components)
- Keep components co-located in `App.tsx` unless they grow large enough to warrant a dedicated file
- Do not commit the `.env` file, `node_modules/`, or `dist/`
- Write meaningful commit messages using [Conventional Commits](https://www.conventionalcommits.org/) (`feat:`, `fix:`, `chore:`, etc.)
- Open an issue first for large changes so we can discuss before you invest time coding

---

## License

Distributed under the **Apache 2.0 License**. See the [LICENSE](LICENSE) file for details.

---

<div align="center">
  <p>Built with React, Vite, and Gemini API for cloud-first AI experiences.</p>
</div>
