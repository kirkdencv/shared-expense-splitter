# Contributing Guidelines

Thanks for helping build this project! To keep our work organized and smooth, follow these steps every time you contribute.

---

## 📌 Branch Structure

| Branch      | Purpose                                   |
| ----------- | ----------------------------------------- |
| `main`      | ✅ Always deployable, stable code          |
| `dev`       | ✅ Active development branch               |
| `feature/*` | ✅ Short-lived branches for specific tasks |

---

## 📌 Workflow

**1️⃣ Pull latest `dev`**

```bash
git checkout dev
git pull origin dev
```

**2️⃣ Create a new branch from `dev`**

```bash
git checkout -b feature/your-task-name
```

✅ Use clear, descriptive names:

* `feature/signup-page`
* `feature/expenses-api`
* `fix/typo-in-header`

**3️⃣ Do your work**

* Commit often with clear messages:

```bash
git add .
git commit -m "Add signup page markup"
```

**4️⃣ Push your branch**

```bash
git push -u origin feature/your-task-name
```

**5️⃣ Open a Pull Request (PR)**

* Base branch → `dev`
* Compare branch → your feature branch
* Link related Issue: `Closes #5`
* Add a clear title and description: what you did, why, screenshots if needed.
* Request at least 1 reviewer.

**6️⃣ PR rules**

✅ Get at least 1 approval before merging.
✅ Fix merge conflicts if they appear.
✅ After merge → delete your feature branch.

---

## 📌 Merging Rules

* 🚫 Never push directly to `main` or `dev`.
* ✅ Always use a PR.
* ✅ Keep `main` always deployable.

---

## 📌 Keep your local up to date

Before starting new work:

```bash
git checkout dev
git pull origin dev
```

---

## 📌 Solving Merge Conflicts

If you see conflict markers:

```
<<<<<<< HEAD
your version
=======
their version
>>>>>>> dev
```

* Decide what to keep.
* Remove `<<<<<<<`, `=======`, `>>>>>>>` lines.
* Save file, then:

```bash
git add .
git commit
```

Push again:

```bash
git push
```

---

## 📌 Project Board & Issues

* Every task should have an **Issue**.
* Link PRs to Issues (`Closes #number`).
* Use the Project Board:

  * `To do → In progress → Review → Done`

---

## ✅ Thanks for contributing!

Good teamwork keeps our project clean, stable, and fun for everyone 🚀
