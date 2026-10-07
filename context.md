# Projekto Kontekstas: Mano užduotys

## 1. Projekto paskirtis
„Mano užduotys“ – tai React + Vite užduočių sekimo aplikacija su kortelių (kategorijų) ir profilio valdymo funkcija.

**Pagrindinės funkcijos:**
- Užduočių rodymas suskirsčius jas į atskiras korteles/kategorijas (`TaskCard`).
- Užduočių atlikimo būsenos keitimas (`onToggle`).
- Progresavimo rodymas kortelėse ir bendroje projekto eigos juostoje (`ProgressBar`).
- Naujų užduočių pridėjimas į konkrečią kortelę (`onAddTask`).
- **Profilio puslapis (Vaizdas):**
  - Vartotojo informacijos (vardo, el. pašto) atvaizdavimas ir redagavimas.
  - Dinaminė veiklos statistika, apskaičiuojama iš visų kortelių užduočių masyvo (`cards`).
  - Navigacija tarp „Užduotys“ ir „Profilis“ vaizdų nenaudojant išorinių maršrutizavimo bibliotekų.

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
│   ├── AddTask.jsx       # Naujos užduoties įvesties forma kortelėje
│   ├── AddTask.css
│   ├── Profile.jsx       # Profilio ir veiklos statistikos komponentas
│   ├── Profile.css       # Profilio komponento stiliai
│   ├── ProgressBar.jsx   # Bendro projekto progreso juosta
│   ├── ProgressBar.css
│   ├── TaskCard.jsx      # Vienos kategorijos/kortelės komponentas
│   └── TaskCard.css
│
├── App.jsx               # Pagrindinis komponentas (valdo navigaciją, cards ir user būsenas)
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