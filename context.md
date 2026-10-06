# Projekto Kontekstas: Mano užduotys

## 1. Projekto paskirtis
„Mano užduotys“ – tai React + Vite užduočių sekimo aplikacija su profilio valdymo funkcija.

**Pagrindinės funkcijos:**
- Užduočių rodymas suskirsčius jas į kategorijas.
- Užduočių žymėjimas kaip atliktų/neatliktų.
- Progresavimo rodymas atskirose kortelėse ir bendroje projekto eigos juostoje (`ProgressBar`).
- Naujų užduočių įtraukimas į pasirinktą kategoriją.
- **Profilio puslapis (Vaizdas):**
  - Vartotojo informacijos (vardo, el. pašto) rodymas ir redagavimas.
  - Dinaminė veiklos statistika (bendras užduočių skaičius, atliktos užduotys, atlikimo procentas).
  - Navigacija tarp Užduočių ir Profilio vaizdų nenaudojant išorinių maršrutizavimo bibliotekų.

---

## 2. Technologijos
- **Framework / Bundler:** React, Vite
- **Kalba / Formatas:** JavaScript / JSX
- **Stiliai:** CSS (atskiri CSS failai kiekvienam komponentui)
- **Būsenos valdymas:** React `useState`
- **ID generavimas:** Browser `crypto.randomUUID()`

---

## 3. Projekto struktūra

```text
src/
│
├── components/
│   ├── AddTask.jsx
│   ├── AddTask.css
│   ├── Profile.jsx       # Profilio ir statistikos komponentas
│   ├── Profile.css       # Profilio komponento stiliai
│   ├── ProgressBar.jsx
│   ├── ProgressBar.css
│   ├── TaskCard.jsx
│   └── TaskCard.css
│
├── App.jsx               # Pagrindinis komponentas (valdo navigaciją, tasks ir user būsenas)
├── App.css               # Aplikacijos ir navigacijos stiliai
├── index.css
├── main.jsx
├── favicon.svg
└── logo.svg

Projekto šaknyje:
package.json
package-lock.json
vite.config.js
index.html
context.md                # Projekto dokumentacija
AGENTS.MD
.gitignore