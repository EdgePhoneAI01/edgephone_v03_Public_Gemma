# Contributing to EdgePhone.AI

Thank you for considering contributing to **EdgePhone.AI**! 🎉  
Your time and effort help make this project better for everyone. Whether you are fixing a bug, suggesting a feature, or improving documentation, every contribution is valued and appreciated.

---

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How to Contribute](#how-to-contribute)
- [Pull Request Guidelines](#pull-request-guidelines)
- [Local Development Setup](#local-development-setup)

---

## Code of Conduct

All contributors are expected to engage with this project in a respectful and constructive manner. Please be kind, inclusive, and professional in all interactions — in issues, pull requests, code reviews, and discussions. Harassment or abusive behaviour of any kind will not be tolerated.

---

## How to Contribute

This project follows the **Fork and Pull Request** workflow. Direct pushes to the main repository are not permitted. Please follow the steps below.

### 1. Fork the Repository

Click the **Fork** button at the top-right of the [repository page](https://github.com/EdgePhoneAI01/edgephone_v03_Public_Gemma) to create your own copy of the project under your GitHub account.

### 2. Clone Your Fork Locally

```bash
git clone https://github.com/<your-username>/edgephone_v03_Public_Gemma.git
cd edgephone_v03_Public_Gemma
```

### 3. Add the Upstream Remote

Keep your fork in sync with the original repository by adding it as a remote:

```bash
git remote add upstream https://github.com/EdgePhoneAI01/edgephone_v03_Public_Gemma.git
```

To pull in the latest changes before starting work:

```bash
git fetch upstream
git merge upstream/main
```

### 4. Create a Feature Branch

Always work on a dedicated branch — **never commit directly to `main`**. Use a descriptive name that reflects the work being done:

```bash
# For new features
git checkout -b feature/add-login

# For bug fixes
git checkout -b bugfix/issue-123

# For documentation updates
git checkout -b docs/update-readme
```

### 5. Make Your Changes

Write clear, focused code. Keep each commit small and purposeful. Avoid mixing unrelated changes in a single branch.

### 6. Commit with a Clear Message

Use concise, descriptive commit messages. Follow the [Conventional Commits](https://www.conventionalcommits.org/) style where possible:

```bash
git commit -m "feat: add dark mode toggle to settings panel"
git commit -m "fix: resolve API key fallback not triggering in offline mode"
git commit -m "docs: update environment variable table in README"
```

**Commit message prefixes:**

| Prefix | When to use |
|--------|-------------|
| `feat:` | A new feature |
| `fix:` | A bug fix |
| `docs:` | Documentation changes only |
| `style:` | Formatting, whitespace — no logic change |
| `refactor:` | Code restructuring without behaviour change |
| `test:` | Adding or updating tests |
| `chore:` | Build process, dependency updates, tooling |

### 7. Push to Your Fork

```bash
git push origin feature/your-feature-name
```

### 8. Open a Pull Request

1. Navigate to your fork on GitHub.
2. Click **Compare & pull request**.
3. Set the **base repository** to `EdgePhoneAI01/edgephone_v03_Public_Gemma` and the **base branch** to `main`.
4. Fill in the PR template (title, description, related issues).
5. Submit the pull request for review.

---

## Pull Request Guidelines

To help reviewers merge your contribution quickly, please ensure your PR:

- **Has a clear title and description** explaining *what* changed and *why*.
- **Links to any related issues** using GitHub keywords (e.g., `Closes #42` or `Fixes #123`).
- **Keeps the scope focused** — one feature or fix per PR. Large, multi-purpose PRs are harder to review and more likely to be delayed.
- **Updates documentation** if your change affects public-facing behaviour, configuration, or API usage.
- **Does not expose secrets** — never commit API keys, tokens, passwords, or `.env` files. Use `.env.example` as a template.
- **Passes all checks** — ensure the TypeScript compiler reports no errors (`npm run lint`) and the project builds successfully (`npm run build`) before submitting.
- **Describes any breaking changes** clearly in the PR description, including migration steps if applicable.

---

## Local Development Setup

> **Prerequisites**
> - [Node.js](https://nodejs.org/) v18 or higher
> - npm v9 or higher (bundled with Node.js)
> - A modern browser (Chrome, Edge, Safari, or Firefox)
> - A **Gemini API key** for cloud inference mode

### Install Dependencies

```bash
npm install
```

### Configure Environment Variables

Copy the example environment file and fill in your values:

```bash
cp .env.example .env
```

Open `.env` and set your Gemini API key:

```env
VITE_GEMINI_API_KEY="your_gemini_api_key"
VITE_BASE_URL="/"
```

See the [Environment Variables](README.md#environment-variables) section of the README for a full list of available variables.

### Start the Development Server

```bash
npm run dev
```

The app will be available at [http://localhost:3000](http://localhost:3000).

### Type-check (Lint)

```bash
npm run lint
```

### Production Build

```bash
npm run build
```

---

*Thank you again for your contribution. Every improvement — large or small — makes EdgePhone.AI better for everyone.* 🚀
