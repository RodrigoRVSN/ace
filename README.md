# 👕 Receiving a email of hotter promotions every day

![image](https://github.com/RodrigoRVSN/ace/assets/75763403/a244a191-dcb9-4813-bdd4-03b08b67d120)


<br>

___
## 🔨 Tools:

- NextJS
- Typescript
- ESLint (Code Pattern)
- Prettier (Formatter)
- Husky (Pre-commit)
- Vitest (Unit/Integration Test)
- Cypress (Test E2E)
- Bun
___
## 🤺 How to use:


```bash
git clone https://github.com/rodrigorvsn/next-boilerplate-bunny.git
```

```bash
bun install
```

```bash
bun dev
```

```bash
bun test
```

```bash
bun test:cov
```

```bash
bun lint
```

```bash
bun cy:run
```

```bash
bun cy:open
```

___
## 🤖 Auto-formatting on save:

Inside `/.vscode/settings.json` we set prettier as the default formatter, and also set `editor.codeActionsOnSave` to run:

- **Lint:** `"source.fixAll.eslint"`
- **Format:** `"source.fixAll.format"`

___
## ✅ Checking standards pre-commit:

Using [husky](https://www.npmjs.com/package/husky) we can check all of our style standards to make sure our git commits are up to par. Check those checks out at [`.husky/pre-commit`](.husky/pre-commit)
