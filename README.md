<div align="center">
  <h1>EdgePhone.AI</h1>

  <p>
    A futuristic, on-device AI smartphone interface — built with React, Vite, and MediaPipe.<br/>
    All intelligence runs locally on a Neural Processing Unit. Your data never leaves the device.
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

**EdgePhone.AI** is a fully interactive smartphone UI concept that demonstrates the future of **on-device AI**. It simulates a mobile operating system where a Neural Processing Unit (NPU) handles all AI inference — from voice translation and image recognition to real-time semantic search — without ever sending data to the cloud.

The app ships with a **dual inference mode**:

| Mode | Engine | Data |
|---|---|---|
| **Local (Edge)** | MediaPipe LLM / Gemma 2B (WebGPU, runs in-browser) | Stays 100% on-device |
| **Hybrid (Cloud)** | Google Gemini 2.5 Flash API | Sent to Google Cloud |

Users can toggle between modes at runtime. Local mode requires downloading the Gemma 2B model binary (~1.3 GB) once — after that it runs entirely offline.

---

## Features

- **Core Dashboard** — Live NPU load, power mode, memory, privacy score, and animated AI visualizer
- **AI Assistant** — Chat interface wired to either on-device Gemma 2B (MediaPipe WebGPU) or Gemini 2.5 Flash (cloud)
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
| On-device AI | MediaPipe Tasks GenAI + Gemma 2B INT4 |
| Cloud AI | Google Gemini 2.5 Flash REST API |
| Container | Docker + Nginx (Alpine) |
| Cloud Deploy | Google Cloud Run via Cloud Build |

---

## Prerequisites

Before you begin, make sure you have the following installed:

- **[Node.js](https://nodejs.org/)** v18 or higher
- **npm** v9 or higher (bundled with Node.js)
- A modern browser with **WebGPU support** (Chrome 113+, Edge 113+) for local AI mode
- A **Gemini API key** for cloud/hybrid mode *(optional)*

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

### 4. (Optional) Add the local AI model

To use the fully offline mode, download the **Gemma 2B IT GPU INT4** model binary from [Kaggle](https://www.kaggle.com/models/google/gemma/tfLite/gemma-2b-it-gpu-int4) and place it at:

```
public/models/gemma-2b-it-gpu-int4.bin
```

> **Why Gemma 2B IT GPU INT4?**
> This is the confirmed-working variant for MediaPipe's `LlmInference` API in the browser. It offers several advantages for edge deployment:
> - ✅ **Proven MediaPipe / LiteRT `.bin` compatibility** — loads directly via `@mediapipe/tasks-genai`
> - ✅ **Small footprint (~1.3 GB)** — fits comfortably in browser GPU memory on most devices (2 GB+ VRAM)
> - ✅ **Fully offline after first download** — zero cloud dependency, 100% on-device privacy
> - ✅ **Fast WebGPU inference** — instruction-tuned and INT4 quantized for low-latency responses
> - ✅ **Stable, mature model** — well-tested across Chrome 113+ and Edge 113+
>
> **Upgrade path:** This will be updated to **Gemma 4 E2B** once the TFLite / LiteRT `.bin` variant is officially published on Kaggle.
> Google will announce availability via [ai.google.dev/edge](https://ai.google.dev/edge).
> The model file is ~1.3 GB and is excluded from version control via `.gitignore`. Without it the app falls back gracefully and prompts you to add it.

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

### Switching AI modes at runtime

Once the app is open, use the **mode chip** in the top-right corner (or the **ONLINE / LOCAL** toggle inside the Dashboard hero card) to switch between:

- **Local** — Gemma 2B running entirely in your browser via WebGPU
- **Hybrid** — Google Gemini 2.5 Flash via the cloud

The AI Assistant tab will reflect the active mode and show live status (model loading, ready, or error).

---

## Environment Variables

Create a `.env` file in the project root (or copy `.env.example`):

```env
# Required for Gemini AI cloud mode
VITE_GEMINI_API_KEY="your_gemini_api_key"

# The URL where this app is hosted (used for self-referential links & OAuth)
APP_URL="http://localhost:3000"
```

| Variable | Required | Description |
|---|---|---|
| `VITE_GEMINI_API_KEY` | For cloud mode | Your Gemini API key |
| `APP_URL` | For deployment | Public URL of the hosted app |

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

### Google Cloud Run (via Cloud Build)

The project includes a `cloudbuild.yaml` pipeline that:

1. Builds the Nginx Docker image using the pre-built `dist/`
2. Pushes the image to **Google Artifact Registry**
3. Deploys to **Cloud Run** (Europe West 1, port 8080, auto-scaling 0–10)

```bash
gcloud builds submit \
  --config=cloudbuild.yaml \
  --substitutions=_REGION=europe-west1,_REPO=edgephone,_TAG=$(git rev-parse --short HEAD) \
  .
```

Ensure your GCP project has Cloud Build, Artifact Registry, and Cloud Run APIs enabled, and that the Cloud Build service account has the required IAM roles.

---

## Project Structure

```
edgephone_v02/
├── public/
│   ├── favicon.png              # App logo / AI button icon
│   └── models/                  # Drop Gemma model binary here (gitignored)
│       └── gemma-2b-it-gpu-int4.bin
├── src/
│   ├── App.tsx                  # Full application — all tabs and components
│   ├── main.tsx                 # React entry point
│   └── index.css                # Tailwind v4 theme + global styles
├── .env.example                 # Environment variable template
├── .dockerignore
├── .gcloudignore
├── cloudbuild.yaml              # GCP Cloud Build pipeline
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
   git commit -m "feat: add on-device speech recognition"
   ```
4. **Push** to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```
5. **Open a Pull Request** against the `main` branch

### Guidelines

- Follow the existing code style (TypeScript strict, functional React components)
- Keep components co-located in `App.tsx` unless they grow large enough to warrant a dedicated file
- Do not commit the `.env` file, `node_modules/`, `dist/`, or any model binary files
- Write meaningful commit messages using [Conventional Commits](https://www.conventionalcommits.org/) (`feat:`, `fix:`, `chore:`, etc.)
- Open an issue first for large changes so we can discuss before you invest time coding

---

## License

Distributed under the **Apache 2.0 License**. See the [LICENSE](LICENSE) file for details.

---

<div align="center">
  <p>Built with React, Vite, MediaPipe, and a vision for private-by-default AI.</p>
</div>
