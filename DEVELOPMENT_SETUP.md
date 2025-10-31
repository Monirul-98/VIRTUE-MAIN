# Development Setup Summary

Complete guide to code quality, formatting, and environment configuration for the VES website.

---

## ✅ What's Configured

### 1. ESLint (Code Linting) ✅

**Configuration:** `.eslintrc.json`

**Features:**

- ✅ Next.js best practices
- ✅ TypeScript rules
- ✅ Prettier integration (no conflicts)
- ✅ React Hooks validation
- ✅ Import order enforcement
- ✅ Unused variable detection
- ✅ Console statement warnings

**Run:**

```bash
npm run lint              # Check for issues
npm run lint -- --fix     # Auto-fix issues
```

**Example output:**

```
✔ No ESLint errors found
⚠ 85 warnings (import order, unused vars, etc.)
```

### 2. Prettier (Code Formatting) ✅

**Configuration:** `.prettierrc`

**Settings:**

- Semi-colons: Yes
- Single quotes: No
- Print width: 80
- Tab width: 2 spaces
- Trailing commas: ES5
- Arrow parens: Always
- Line endings: LF

**Run:**

```bash
npm run format            # Format all files
```

**Ignore:** `.prettierignore` (node_modules, .next, etc.)

### 3. Environment Variables ✅

**Files:**

- `.env.example` - Template for environment variables
- `ENV_SETUP.md` - Complete environment variables guide

**Key variables:**

```env
NEXT_PUBLIC_SITE_URL=https://virtueenclosures.com.au
EMAIL_FROM=info@virtueenclosures.com.au
RESEND_API_KEY=re_xxxx
```

**Setup:**

```bash
cp .env.example .env.local
# Edit .env.local with your values
```

### 4. Git Hooks (Optional) 📋

**Setup Guide:** `HUSKY_SETUP.md`

**To enable:**

```bash
npm install --save-dev husky lint-staged
npx husky init
```

**What it does:**

- Automatically runs ESLint + Prettier before commit
- Blocks commits with errors
- Only checks staged files (fast)

---

## 🚀 Quick Start

### First Time Setup

```bash
# 1. Install dependencies
npm install

# 2. Set up environment (optional)
cp .env.example .env.local
# Edit .env.local with your values

# 3. Start development
npm run dev
```

### Before Committing

```bash
# Format code
npm run format

# Check for errors
npm run lint

# Fix auto-fixable errors
npm run lint -- --fix

# Commit
git add .
git commit -m "feat: your changes"
```

**Or with Husky:** Just commit normally, hooks run automatically!

---

## 📜 Available Scripts

```bash
# Development
npm run dev              # Start dev server (http://localhost:3000)

# Build
npm run build            # Build for production
npm run start            # Preview production build

# Code Quality
npm run lint             # Run ESLint
npm run lint -- --fix    # Auto-fix ESLint errors
npm run format           # Format with Prettier

# Sitemap
npm run postbuild        # Generate sitemap (auto after build)
```

---

## 🎯 Code Quality Standards

### Import Organization

Imports are automatically organized by ESLint:

```typescript
// 1. Built-in modules
import { useState } from "react";
import Link from "next/link";

// 2. External packages
import { motion } from "framer-motion";
import clsx from "clsx";

// 3. Internal modules (alphabetically)
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { generateSEO } from "@/lib/seo";
```

### TypeScript Rules

- **`any` types:** Warning (use specific types when possible)
- **Unused vars:** Warning (prefix with `_` if intentional)
- **Console logs:** Warning (use `console.warn` or `console.error`)

### React Best Practices

- **Hooks rules:** Error (must follow React rules)
- **Exhaustive deps:** Warning (check useEffect dependencies)
- **Unescaped entities:** Off (allowed in JSX)

---

## ⚙️ IDE Setup

### VS Code (Recommended)

Install extensions:

- **ESLint** - dbaeumer.vscode-eslint
- **Prettier** - esbenp.prettier-vscode
- **Tailwind CSS IntelliSense** - bradlc.vscode-tailwindcss

**Settings:** `.vscode/settings.json`

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "typescript",
    "typescriptreact"
  ]
}
```

### WebStorm / IntelliJ

1. **Enable ESLint:**
   - Settings → Languages & Frameworks → JavaScript → Code Quality Tools → ESLint
   - Check "Automatic ESLint configuration"
   - Check "Run eslint --fix on save"

2. **Enable Prettier:**
   - Settings → Languages & Frameworks → JavaScript → Prettier
   - Check "On save"
   - Check "On code reformat"

---

## 🐛 Troubleshooting

### ESLint Errors

**"Import order violation"**

- Run `npm run lint -- --fix` to auto-fix

**"Unexpected any"**

- Replace `any` with specific types or interfaces

**"Unused variable"**

- Remove unused code or prefix with `_` if needed:
  ```typescript
  const _unusedVar = "ok"; // No warning
  ```

### Prettier Issues

**"File not formatted"**

- Run `npm run format`
- Check `.prettierignore` if file is being ignored

**"Conflicting rules with ESLint"**

- Already configured! ESLint extends `prettier` to disable conflicts

### Environment Variables

**"Variable undefined"**

- Restart dev server after changing `.env.local`
- Check variable name (case-sensitive)
- Use `NEXT_PUBLIC_` prefix for client-side variables

---

## 📊 Current Status

### Linting Results

```bash
npm run lint
```

**Output:**

- ✅ 0 errors
- ⚠️ ~85 warnings (mostly import order and type warnings)
- 🎯 All code compiles and runs correctly

**Warnings are OK!** They're guidelines, not blockers.

### Auto-Fixable Issues

Most warnings can be auto-fixed:

```bash
npm run lint -- --fix
npm run format
```

This will fix:

- Import order
- Code formatting
- Spacing issues

### Manual Fixes Needed

Some warnings require manual attention:

- TypeScript `any` types → Add proper types
- Unused variables → Remove or prefix with `_`
- Console statements → Use `console.warn()` or remove

---

## 🎨 Code Style Guide

### File Naming

```
components/
  MyComponent.tsx       ← PascalCase
  my-utility.ts         ← kebab-case

lib/
  utils.ts              ← kebab-case
  seo.ts                ← kebab-case

app/
  page.tsx              ← Next.js convention
  layout.tsx            ← Next.js convention
  [slug]/               ← Dynamic routes
```

### Component Structure

```typescript
// 1. Imports
import { useState } from 'react';
import { Button } from '@/components/ui/button';

// 2. Types
interface MyComponentProps {
  title: string;
  onClick?: () => void;
}

// 3. Component
export function MyComponent({ title, onClick }: MyComponentProps) {
  // Hooks
  const [isOpen, setIsOpen] = useState(false);

  // Handlers
  const handleClick = () => {
    setIsOpen(!isOpen);
    onClick?.();
  };

  // Render
  return (
    <div>
      <h2>{title}</h2>
      <Button onClick={handleClick}>Toggle</Button>
    </div>
  );
}
```

### Tailwind Classes

Use `cn()` utility for conditional classes:

```typescript
import { cn } from '@/lib/utils';

<div
  className={cn(
    "base-classes",
    isActive && "active-classes",
    isError && "error-classes",
    className // Allow override
  )}
>
```

---

## 📚 Documentation

| File                                   | Purpose                               |
| -------------------------------------- | ------------------------------------- |
| **README.md**                          | Project overview, setup, architecture |
| **ENV_SETUP.md**                       | Environment variables guide           |
| **HUSKY_SETUP.md**                     | Git hooks setup (optional)            |
| **DEVELOPMENT_SETUP.md**               | This file - dev setup summary         |
| **SEO_IMPLEMENTATION_GUIDE.md**        | SEO system documentation              |
| **LIGHTHOUSE_OPTIMIZATION_SUMMARY.md** | Performance details                   |
| **QUICK_START_SEO.md**                 | Quick SEO reference                   |

---

## ✅ Pre-Commit Checklist

Before committing:

1. [ ] Code formats correctly (`npm run format`)
2. [ ] No ESLint errors (`npm run lint`)
3. [ ] TypeScript compiles (`npm run build`)
4. [ ] Changes tested locally (`npm run dev`)
5. [ ] Commit message is descriptive
6. [ ] No sensitive data in code

**With Husky:** Steps 1-2 run automatically! ✨

---

## 🤝 Team Guidelines

### For New Developers

1. **Read README.md** - Understand the project
2. **Run setup:**
   ```bash
   npm install
   npm run dev
   ```
3. **Install IDE extensions** (ESLint, Prettier)
4. **Optional:** Set up Husky for auto-linting

### For Existing Developers

- **Pull latest changes:** `git pull`
- **Install dependencies:** `npm install` (if package.json changed)
- **Run linting:** `npm run lint -- --fix`
- **Format code:** `npm run format`

### For Code Reviews

Check that:

- [ ] Code is formatted (Prettier)
- [ ] No ESLint errors
- [ ] TypeScript types are correct
- [ ] Tests pass (if applicable)
- [ ] Changes are documented

---

## 🔧 Advanced Configuration

### Custom ESLint Rules

Edit `.eslintrc.json`:

```json
{
  "rules": {
    "no-console": ["error", { "allow": ["warn", "error"] }],
    "react/prop-types": "off",
    "custom-rule": "warn"
  }
}
```

### Custom Prettier Config

Edit `.prettierrc`:

```json
{
  "semi": true,
  "singleQuote": true,
  "printWidth": 100
}
```

### Disable Rules Per File

```typescript
/* eslint-disable no-console */
console.log("Debug info");
/* eslint-enable no-console */

// Or for single line:
console.log("Debug"); // eslint-disable-line no-console
```

---

## 🎯 Summary

**Current Setup:**
✅ ESLint configured with Next.js + TypeScript + Prettier  
✅ Prettier configured with consistent formatting  
✅ Environment variables template ready  
✅ Import order enforcement  
✅ TypeScript strict mode  
✅ Zero linter errors (only warnings)

**Optional:**
📋 Husky for automatic pre-commit linting (see HUSKY_SETUP.md)

**To use:**

```bash
npm run lint    # Check code
npm run format  # Format code
npm run dev     # Start development
```

**Everything is ready for productive development!** 🚀
