# Husky Setup - Optional Git Hooks

This guide shows how to set up **Husky** to automatically lint and format code before committing.

---

## 🤔 Should You Use Husky?

### ✅ Benefits

- **Prevents bad commits** - Catches linting errors before they reach the repo
- **Automatic formatting** - Code is always formatted consistently
- **Team consistency** - Everyone's code follows the same standards
- **CI/CD savings** - Fewer failed builds from linting errors

### ⚠️ Considerations

- **Slower commits** - Linting takes a few seconds
- **Learning curve** - Team needs to understand Git hooks
- **CI still needed** - Don't rely solely on client-side hooks

### 💡 Recommendation

**Use Husky if:**

- Working in a team
- Want to enforce standards automatically
- Okay with slightly slower commits

**Skip Husky if:**

- Solo developer (can run `npm run lint` manually)
- Prefer faster commits
- Already have CI/CD that enforces linting

---

## 📦 Installation

### 1. Install Dependencies

```bash
cd ves-site
npm install --save-dev husky lint-staged
```

**What these do:**

- **husky** - Manages Git hooks
- **lint-staged** - Runs commands only on staged files (faster)

### 2. Initialize Husky

```bash
npx husky init
npm install
```

This creates:

- `.husky/` directory with Git hooks
- `prepare` script in `package.json`

### 3. Configure lint-staged

Add to `package.json`:

```json
{
  "lint-staged": {
    "*.{js,jsx,ts,tsx}": ["eslint --fix", "prettier --write"],
    "*.{json,css,md,mdx}": ["prettier --write"]
  }
}
```

This tells lint-staged:

- For JS/TS files: Run ESLint, then Prettier
- For other files: Just run Prettier

### 4. Create Pre-Commit Hook

```bash
echo "npx lint-staged" > .husky/pre-commit
```

Or manually create `.husky/pre-commit`:

```bash
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npx lint-staged
```

### 5. Test It

```bash
# Make a change
echo "const test = 'hello'" >> test.js

# Stage it
git add test.js

# Commit (Husky will run automatically)
git commit -m "test: husky setup"

# You should see:
# ✔ Preparing lint-staged...
# ✔ Running tasks for staged files...
# ✔ Applying modifications from tasks...
# ✔ Cleaning up temporary files...
```

---

## 🎯 What Gets Checked

### Before Commit (Pre-Commit Hook)

**TypeScript/JavaScript files:**

1. ESLint fixes auto-fixable issues
2. Prettier formats code
3. Changes are automatically staged

**Other files (JSON, CSS, Markdown):**

1. Prettier formats code
2. Changes are automatically staged

**If errors can't be fixed automatically:**

- Commit is blocked
- You see error messages
- Fix manually and try again

---

## 🛠️ Configuration

### Full package.json Example

```json
{
  "name": "ves-site",
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "format": "prettier --write \"**/*.{ts,tsx,js,jsx,json,css,md,mdx}\"",
    "prepare": "husky"
  },
  "devDependencies": {
    "husky": "^9.1.7",
    "lint-staged": "^16.2.6",
    "eslint": "^8.57.1",
    "prettier": "^3.3.3"
  },
  "lint-staged": {
    "*.{js,jsx,ts,tsx}": ["eslint --fix", "prettier --write"],
    "*.{json,css,md,mdx}": ["prettier --write"]
  }
}
```

### Customizing lint-staged

**Run tests before commit:**

```json
{
  "lint-staged": {
    "*.{js,jsx,ts,tsx}": [
      "eslint --fix",
      "prettier --write",
      "npm run test:related"
    ]
  }
}
```

**Check TypeScript types:**

```json
{
  "lint-staged": {
    "*.{ts,tsx}": ["bash -c 'tsc --noEmit'", "eslint --fix", "prettier --write"]
  }
}
```

**Add file size check:**

```json
{
  "lint-staged": {
    "*.{js,jsx,ts,tsx}": ["eslint --fix", "prettier --write"],
    "*.{jpg,jpeg,png}": [
      "bash -c 'ls -lh $0 | awk \"{if (\\$5 > 500000) exit 1}\"'"
    ]
  }
}
```

---

## 🎭 Other Git Hooks

### Commit Message Hook (commit-msg)

Enforce commit message format:

```bash
echo 'npx --no -- commitlint --edit ${1}' > .husky/commit-msg
```

Install commitlint:

```bash
npm install --save-dev @commitlint/cli @commitlint/config-conventional
```

Create `commitlint.config.js`:

```javascript
module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [
      2,
      "always",
      [
        "feat", // New feature
        "fix", // Bug fix
        "docs", // Documentation
        "style", // Formatting
        "refactor", // Code refactoring
        "test", // Tests
        "chore", // Maintenance
      ],
    ],
  },
};
```

**Usage:**

```bash
# ✅ Valid
git commit -m "feat: add contact form"
git commit -m "fix: resolve navbar bug"

# ❌ Invalid
git commit -m "added new feature"  # Missing type
git commit -m "update stuff"       # Not descriptive
```

### Pre-Push Hook

Run tests before pushing:

```bash
echo 'npm run test' > .husky/pre-push
```

Or build to ensure no errors:

```bash
echo 'npm run build' > .husky/pre-push
```

### Post-Checkout Hook

Install dependencies after switching branches:

```bash
cat > .husky/post-checkout << 'EOF'
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

# Check if package.json changed
if git diff HEAD@{1} HEAD --name-only | grep -q "package.json"; then
  echo "📦 package.json changed, running npm install..."
  npm install
fi
EOF
```

---

## 🚫 Bypassing Hooks

### Skip Pre-Commit Hook

```bash
git commit -m "emergency fix" --no-verify
```

**Use sparingly!** Only for emergencies.

### Skip Specific Files

Add to `.lintstagedrc.js`:

```javascript
module.exports = {
  "*.{js,jsx,ts,tsx}": (files) => {
    const filteredFiles = files.filter((file) => !file.includes("generated"));
    return [
      `eslint --fix ${filteredFiles.join(" ")}`,
      `prettier --write ${filteredFiles.join(" ")}`,
    ];
  },
};
```

---

## 🐛 Troubleshooting

### "Husky command not found"

**Fix:**

```bash
rm -rf .husky
npx husky init
npm install
```

### "Hook not executable"

**Fix:**

```bash
chmod +x .husky/pre-commit
```

### "lint-staged takes too long"

**Optimize:**

```json
{
  "lint-staged": {
    "*.{js,jsx,ts,tsx}": ["eslint --fix --max-warnings=0", "prettier --write"]
  }
}
```

Or only lint changed files:

```json
{
  "lint-staged": {
    "*.{js,jsx,ts,tsx}": ["eslint --fix --cache", "prettier --write --cache"]
  }
}
```

### "Hooks don't run"

1. **Check Husky is installed:**

   ```bash
   npm run prepare
   ```

2. **Verify Git hooks are installed:**

   ```bash
   ls -la .git/hooks/
   # Should see pre-commit, etc.
   ```

3. **Check hook file exists:**
   ```bash
   cat .husky/pre-commit
   ```

### "ESLint errors block commit"

**Option 1:** Fix the errors

```bash
npm run lint -- --fix
git add .
git commit -m "fix: resolve linting errors"
```

**Option 2:** Allow warnings

```json
{
  "lint-staged": {
    "*.{js,jsx,ts,tsx}": ["eslint --fix --max-warnings=10"]
  }
}
```

**Option 3:** Skip hook (not recommended)

```bash
git commit --no-verify
```

---

## 📊 Performance Optimization

### Use ESLint Cache

```json
{
  "lint-staged": {
    "*.{js,jsx,ts,tsx}": ["eslint --fix --cache --cache-location .eslintcache"]
  }
}
```

Add to `.gitignore`:

```
.eslintcache
```

### Use Prettier Cache

```json
{
  "lint-staged": {
    "*.{js,jsx,ts,tsx}": [
      "prettier --write --cache --cache-location .prettiercache"
    ]
  }
}
```

### Parallel Execution

```bash
npm install --save-dev concurrently
```

```json
{
  "lint-staged": {
    "*.{js,jsx,ts,tsx}": ["concurrently \"eslint --fix\" \"prettier --write\""]
  }
}
```

---

## 🔄 Uninstalling Husky

If you decide not to use Husky:

```bash
# 1. Remove packages
npm uninstall husky lint-staged

# 2. Remove configuration from package.json
# Delete "lint-staged" and "prepare" script

# 3. Remove hooks
rm -rf .husky

# 4. Clean Git hooks
rm .git/hooks/pre-commit
rm .git/hooks/commit-msg
# etc.
```

---

## 📚 Resources

- [Husky Documentation](https://typicode.github.io/husky/)
- [lint-staged Documentation](https://github.com/okonet/lint-staged)
- [commitlint Documentation](https://commitlint.js.org/)

---

## ✅ Summary

**With Husky:**

```bash
git commit -m "feat: add new feature"
# → Automatically runs ESLint
# → Automatically runs Prettier
# → Fixes auto-fixable issues
# → Commit proceeds if no errors
```

**Without Husky:**

```bash
npm run lint -- --fix
npm run format
git add .
git commit -m "feat: add new feature"
```

Choose what works best for your workflow! 🚀
