# Projekto kontekstas

## 1. Projekto paskirtis

Projektas yra React + Vite užduočių sekimo aplikacija „Mano užduotys“.

Pagrindinis tikslas – leisti vartotojui:
- matyti užduotis suskirstytas į kategorijas;
- pažymėti užduotis kaip atliktas;
- matyti kiek užduočių atlikta kiekvienoje kortelėje;
- matyti bendrą projekto progresą;
- pridėti naujas užduotis į pasirinktą kortelę.

---

## 2. Technologijos

- React
- Vite
- JavaScript / JSX
- CSS
- React `useState`
- Browser `crypto.randomUUID()` naujų užduočių ID generavimui

Papildomos bibliotekos šiuo metu nenaudojamos.

---

## 3. Dabartinė projekto struktūra

```text
src/
│
├── components/
│   ├── AddTask.jsx
│   ├── AddTask.css
│   ├── ProgressBar.jsx
│   ├── ProgressBar.css
│   ├── TaskCard.jsx
│   └── TaskCard.css
│
├── App.jsx
├── App.css
├── index.css
├── main.jsx
├── favicon.svg
└── logo.svg

Projekto šaknyje:

package.json
package-lock.json
vite.config.js
index.html
context.md
AGENTS.MD
.gitignore
