# Projekto kontekstas (context.md)

Žymėjimas: **[kodas]** – patvirtinta pateiktais failais; **[nuotrauka]** – matyta tik ekrano nuotraukoje (dalinai); **[nepatvirtinta]** – duomenų nėra.

## 1. Apžvalga

- Pavadinimas `package.json`: `project`, versija `0.0.0`, `private: true` **[kodas]**
- Programa: užduočių sekimo puslapis „Mano užduotys“ su trimis kortelėmis (Planavimas, Vykdymas, Užbaigimas) ir bendro progreso juosta **[kodas]**
- Sąsajos kalba: lietuvių **[kodas]**
- Tikslas / paskirtis (asmeninis, mokymosi, komercinis): **[nepatvirtinta]**
- Paskelbimo vieta ir nuoroda: **[nepatvirtinta]**
- Plėtros planai: **[nepatvirtinta]**

## 2. Technologijos

| Dalykas | Reikšmė |
|---|---|
| Karkasas | React `^18.0.0`, react-dom `^18.0.0` |
| Įrankis | Vite `^2.9.15` |
| Vite įskiepis | `@vitejs/plugin-react` `^1.3.0` |
| Tipai | `@types/react`, `@types/react-dom` `^18.0.0` (TypeScript nenaudojamas, failai `.jsx`) |
| Kitos bibliotekos | nėra (jokio maršrutizavimo, būsenos valdymo bibliotekos ar UI bibliotekos) |

Nurodytos tik versijų ribos iš `package.json`. Tikrosios įdiegtos versijos: **[nepatvirtinta]** (`package-lock.json` neperžiūrėtas).

Scripts: `npm run dev` (`vite`), `npm run build` (`vite build`), `npm run preview` (`vite preview`) **[kodas]**.

`vite.config.js`: tik `defineConfig` su `react()` įskiepiu **[nuotrauka]**.

## 3. Failų struktūra **[nuotrauka]**

```
project/
├─ node_modules/
├─ src/
│  ├─ components/
│  │  ├─ ProgressBar.jsx / ProgressBar.css
│  │  └─ TaskCard.jsx / TaskCard.css
│  ├─ App.css
│  ├─ App.jsx
│  ├─ favicon.svg
│  ├─ index.css
│  ├─ logo.svg
│  └─ main.jsx
├─ .gitignore
├─ index.html
├─ package-lock.json
├─ package.json
└─ vite.config.js
```

## 4. Įėjimo taškai

- `index.html`: `lang="en"`, `<title>Vite App</title>`, `<div id="root">`, įkelia `/src/main.jsx` **[nuotrauka]**
- `main.jsx`: `ReactDOM.createRoot(...).render(<React.StrictMode><App /></React.StrictMode>)`, importuoja `index.css` **[nuotrauka]**

## 5. Komponentai ir duomenų srautas

### App.jsx **[kodas]**
- Laiko būseną `cards` (`useState`), pradinės reikšmės yra konstanta `initialCards` tame pačiame faile.
- `toggleTask(cardId, taskId)` pakeičia vienos užduoties `completed` reikšmę nekeisdama kitų (nekeičia esamų objektų, naudoja `map`).
- `totalTasks` ir `completedTasks` skaičiuojami `reduce` iš `cards` kiekvieno atvaizdavimo metu.
- Atvaizduoja: `<header>` su pavadinimu, `<section className="cards-grid">` su `TaskCard` kiekvienai kortelei, `<ProgressBar>`.
- Importuoja `App.css`.

### Duomenų modelis **[kodas]**
```js
card = { id: string, title: string, description: string,
         tasks: [{ id: number, title: string, completed: boolean }] }
```
Kortelių `id`: `planning`, `execution`, `completion`. Kiekvienoje yra po 3 užduotis, iš viso 9, visos pradžioje `completed: false`. Užduočių `id` (1–3) kartojasi skirtingose kortelėse, todėl užduotis identifikuojama pora `cardId + taskId`.

### TaskCard.jsx **[kodas]**
- Props: `card`, `onToggle(cardId, taskId)`.
- Rodo pavadinimą, aprašą, skaitiklį `atlikta/viso` ir užduočių sąrašą.
- Kiekviena užduotis: `<label>` su paslėptu `<input type="checkbox">` ir pasirinktiniu `.custom-checkbox` (rodo „✓“, kai atlikta). Atlikta užduotis gauna klasę `completed` (perbraukimas, pilkesnis tekstas).

### ProgressBar.jsx **[kodas]**
- Props: `completed`, `total`.
- Procentai: `Math.round(completed / total * 100)`, kai `total > 0`, kitaip 0.
- Rodo „Atlikta X iš Y užduočių“, procentus ir juostą su `role="progressbar"` bei `aria-valuenow/min/max`.

## 6. Stiliai

- Kiekvienas komponentas turi savo `.css` failą, importuojamą to komponento `.jsx` faile **[kodas]**.
- Tamsi tema: fonas `#171b24`, kortelės `#232936`, rėmeliai `#343d4c`, tekstas `#f1f5f9`, akcentai `#34d399` (progresas) ir `#60a5fa` (pažymėtas langelis) **[kodas]**.
- `index.css`: `box-sizing: border-box`, `min-width: 320px`, sisteminis šriftų rinkinys, fonas `#171b24`, `button`/`input` paveldi šriftą (matyta tik iki 25 eilutės) **[nuotrauka]**.
- `App.css`: tinklelis iš 3 stulpelių (tarpai 20px, maks. plotis 1100px). Ties 850px – 2 stulpeliai, ties 560px – 1 stulpelis **[nuotrauka, failas neįkeltas]**.
- Pritaikyta `prefers-reduced-motion` progreso juostoje, `:focus-visible` pažymėjimo langeliui **[kodas]**.

## 7. Dabartinė elgsena

- Progresas **neišsaugomas**: būsena yra tik atmintyje (`useState`), `localStorage` ar serveris nenaudojami (peržiūrėtame kode jų nėra). Perkrovus puslapį viskas grįžta į pradinę būseną.
- Užduočių pridėti, ištrinti ar redaguoti negalima, tik pažymėti kaip atliktas.

## 8. Pastebėjimai (reikia patikrinti naršyklėje)

1. `index.html`: `lang="en"` ir pavadinimas `Vite App`, nors sąsaja lietuviška.
2. `.task-item input` yra `position: absolute`, bet `.task-item` neturi `position: relative` (iš CSS kodo). Įtaka išvaizdai ar prieinamumui netikrinta.
3. `logo.svg` neimportuojamas peržiūrėtuose failuose (`App.jsx`, `main.jsx`, komponentuose). Ar naudojamas kitur: **[nepatvirtinta]**.
4. Vite 2.x ir plugin-react 1.x yra senesnės versijos nei dabartinės. Ar tai problema, priklauso nuo tikrai įdiegtų versijų ir poreikio atnaujinti: **[nepatvirtinta]**.

## 9. Neperžiūrėta

- `App.css` (pilnas failas), `index.css` (po 25 eilutės), `.gitignore`, `package-lock.json`, `favicon.svg`, `logo.svg`.
- Hostingas, nuoroda, testai, Git istorija.

## 10. Pokalbių žurnalas

| Data | Pakeitimai |
|---|---|
| 2026-10-01 | Sukurta pirma versija iš `package.json`, `App.jsx`, `TaskCard`, `ProgressBar` failų ir ekrano nuotraukų. |
