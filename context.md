„Mano užduotys" / Habit Tracker -- projekto kontekstas
1. Projekto paskirtis
„Mano užduotys" -- React + Vite aplikacija, skirta vienkartinėms
užduotims ir pasikartojantiems įpročiams stebėti. Aplikacijoje galima
valdyti kategorijų korteles, užduočių būsenas, įpročių atlikimo
istoriją, profilį ir progreso statistiką.
Numatyta architektūra: vienas naudotojas, duomenys saugomi tik
naršyklėje naudojant localStorage. Šiai versijai nereikia backend
serverio, SQL duomenų bazės ar REST API.
Pastaba: ankstesnėje projekto versijoje buvo naudojamas TestAPI. Prieš
pašalinant šią integraciją, reikia patikrinti, ar joje yra duomenų,
kuriuos būtina perkelti į localStorage.

2. Technologijos
- Framework / bundler: React, Vite
- Kalba: JavaScript / JSX
- Stiliai: CSS, atskiri komponentų CSS failai
- Būsenos valdymas: React useState, useEffect
- Duomenų saugojimas: localStorage
- ID generavimas: crypto.randomUUID()
- Datos: ISO 8601 datos ir laiko žymos; kalendorinėms dienoms --
  YYYY-MM-DD
3. Projekto struktūra
Esami failai:
src/
├── components/
│   ├── AddTask.jsx
│   ├── AddTask.css
│   ├── Profile.jsx
│   ├── Profile.css
│   ├── ProgressBar.jsx
│   ├── ProgressBar.css
│   ├── TaskCard.jsx
│   └── TaskCard.css
├── App.jsx
├── App.css
├── index.css
├── main.jsx
├── favicon.svg
└── logo.svg
Rekomenduojami nauji failai:
src/
├── components/
│   ├── AddHabit.jsx
│   └── HabitCard.jsx
└── utils/
    ├── storage.js
    ├── initialData.js
    ├── taskService.js
    ├── habitService.js
    └── statistics.js
Failus pridėti palaipsniui. Prieš keičiant esamus komponentus,
patikrinti dabartinę jų struktūrą ir naudojamus laukus.
4. Pagrindiniai duomenų objektai
Visa aplikacijos būsena saugoma viename versijuotame JSON dokumente,
naudojant localStorage raktą habit-tracker-data-v1.
{
  version: 1,
  profile: {},
  categories: [],
  tasks: [],
  habits: [],
  habitLogs: []
}
4.1. profile
Vieno vietinio naudotojo profilis.
  Laukas        Tipas          Aprašymas
  id          string         Fiksuotas ID, pvz., local-user
  name        string         Naudotojo vardas
  email       string         Neprivalomas el. paštas
  createdAt   ISO datetime   Sukūrimo laikas
  updatedAt   ISO datetime   Paskutinio pakeitimo laikas
Atskira naudotojų lentelė nereikalinga, nes naudojamas vienas profilis
ir nėra prisijungimo sistemos.
4.2. categories
Kortelės, grupuojančios užduotis ir įpročius.
  Laukas          Tipas                Aprašymas
  id            UUID string          Unikalus ID
  name          string               Privalomas pavadinimas
  description   string arba null   Aprašymas
  color         string               CSS spalva arba HEX reikšmė
  createdAt     ISO datetime         Sukūrimo laikas
  updatedAt     ISO datetime         Paskutinio pakeitimo laikas
4.3. tasks
Vienkartinės užduotys.
  Laukas          Tipas                      Aprašymas
  id            UUID string                Unikalus ID
  categoryId    string                     Egzistuojančios kategorijos ID
  title         string                     Privalomas pavadinimas
  description   string arba null         Papildoma informacija
  status        enum                       todo, in_progress arba done
  dueDate       YYYY-MM-DD arba null   Terminas
  completedAt   ISO datetime arba null   Užbaigimo laikas
  createdAt     ISO datetime               Sukūrimo laikas
  updatedAt     ISO datetime               Paskutinio pakeitimo laikas
Kai užduoties būsena tampa done, completedAt nustatomas į dabartinį
laiką. Jei užduotis vėl atidaroma, completedAt nustatomas į null.
4.4. habits
Pasikartojantys įpročiai.
  Laukas                  Tipas                   Aprašymas
  id                    UUID string             Unikalus ID
  categoryId            string                  Egzistuojančios
                                                  kategorijos ID
  name                  string                  Privalomas pavadinimas
  description           string arba null      Aprašymas
  frequency             enum                    daily arba weekly
  weekDays              number\(\)              Savaitės dienos pagal
                                                  Date.getDay(): 0 --
                                                  sekmadienis, 1 --
                                                  pirmadienis, ..., 6 --
                                                  šeštadienis
  targetPerPeriod       integer                 Tikslas per laikotarpį,
                                                  bent 1
  startDate             YYYY-MM-DD            Pradžios data
  endDate               YYYY-MM-DD arba       Neprivaloma pabaigos
                          null                  data
  isActive              boolean                 Ar įprotis aktyvus
  createdAt             ISO datetime            Sukūrimo laikas
  updatedAt             ISO datetime            Paskutinio pakeitimo
                                              laikas
Pavyzdžiai: - Kasdien skaityti: frequency: "daily",
targetPerPeriod: 1. - Sportuoti tris kartus per savaitę:
frequency: "weekly", targetPerPeriod: 3. - weekDays naudojamas,
jei parenkamos konkrečios savaitės dienos. Jei tikslas yra kelis kartus
per savaitę be fiksuotų dienų, galima naudoti tuščią masyvą.
4.5. habitLogs
Įpročių atlikimo istorija.
  Laukas        Tipas                Aprašymas
  id          UUID string          Unikalus ID
  habitId     string               Egzistuojančio įpročio ID
  logDate     YYYY-MM-DD         Kalendorinė atlikimo diena
  status      enum                 completed arba skipped
  value       number arba null   Pasirenkamas atliktas kiekis
  note        string arba null   Pasirenkama pastaba
  createdAt   ISO datetime         Sukūrimo laikas
  updatedAt   ISO datetime         Paskutinio pakeitimo laikas
Vienam įpročiui leidžiamas tik vienas įrašas per dieną. Jei tos dienos
įrašas jau egzistuoja, jis atnaujinamas, o ne dubliuojamas. missed
įrašai nekuriami -- praleista diena nustatoma pagal grafiką ir tai, kad
nėra atlikimo įrašo.
5. Ryšiai ir duomenų vientisumas
- Viena kategorija gali turėti daug užduočių.
- Viena kategorija gali turėti daug įpročių.
- Vienas įprotis gali turėti daug istorijos įrašų.
- Kiekvieno task.categoryId ir habit.categoryId reikšmė turi
  nurodyti egzistuojančią kategoriją.
- Kiekvieno habitLog.habitId reikšmė turi nurodyti egzistuojantį
  įprotį.
- Visi ID turi būti unikalūs savo objektų kolekcijoje.
- Ištrinant įprotį, ištrinami ir jo habitLogs įrašai.
- Ištrinant kategoriją, prieš patvirtinimą naudotojui parodoma, kad
  bus ištrintos susietos užduotys, įpročiai ir jų istorija.
- Jei istoriją reikia išsaugoti, kategoriją geriau archyvuoti, o ne
  ištrinti.
Kadangi localStorage neturi duomenų bazės užsienio raktų, šias
taisykles turi tikrinti aplikacijos funkcijos.
6. CRUD operacijos
Rekomenduojamos funkcijos:
// Kategorijos
addCategory(data);
updateCategory(id, changes);
deleteCategory(id);

// Užduotys
addTask(data);
updateTask(id, changes);
deleteTask(id);

// Įpročiai
addHabit(data);
updateHabit(id, changes);
deleteHabit(id);

// Įpročių istorija
upsertHabitLog(habitId, logDate, data);
getHabitLogs(habitId, fromDate, toDate);
deleteHabitLog(id);
upsertHabitLog atnaujina esamą įrašo porą habitId + logDate arba
sukuria naują, jei tokio įrašo nėra.
Profilio operacijos: - Nuskaityti profilį. - Atnaujinti vardą ir el.
paštą. - Atstatyti pradinius profilio duomenis, jei naudotojas to
aiškiai paprašo.
7. localStorage taisyklės
- Naudoti vieną raktą: habit-tracker-data-v1.
- Prieš naudojant duomenis, patikrinti JSON sintaksę, version ir
  pagrindinių kolekcijų tipus.
- Papildomai validuoti laukus, enum reikšmes, ID unikalumą ir ryšius.
- Jei duomenų nėra, sukurti pradinę būseną.
- Jei duomenys sugadinti, automatiškai jų neperrašyti tuščiais
  duomenimis.
- Gaudyti JSON.parse ir localStorage.setItem klaidas.
- Jei saugykla pilna (QuotaExceededError), parodyti aiškų pranešimą
  ir pasiūlyti eksportuoti atsarginę kopiją.
- Svarstyti JSON eksportą ir importą kaip atsarginės kopijos priemonę.
- localStorage duomenys nėra šifruoti ir automatiškai
  nesinchronizuojami tarp įrenginių.
8. Klaidų valdymas
  Klaidos kodas           Priežastis              Veiksmas
  VALIDATION_ERROR      Netinkami arba          Rodyti klaidą formoje
                          trūkstami laukai        
  CATEGORY_NOT_FOUND    Nėra nurodytos          Neleisti išsaugoti
                          kategorijos             
  HABIT_NOT_FOUND       Nėra nurodyto įpročio   Atšaukti istorijos
                                                  operaciją
  DUPLICATE_LOG         Dubliuojamas tos pačios Atnaujinti esamą įrašą
                          dienos įrašas           
  DATA_LOAD_FAILED      Sugadintas JSON arba    Išsaugoti galimybę
                          neteisinga struktūra    atkurti duomenis,
                                                  neperrašyti
                                                  automatiškai
  DATA_SAVE_FAILED      Nepavyko išsaugoti      Rodyti perspėjimą,
                                                  leisti bandyti dar
                                                  kartą
  STORAGE_FULL          Nepakanka vietos        Pasiūlyti eksportą ir
                                                  peržiūrėti saugomus
                                              duomenis
Kadangi naudojama vietinė saugykla, HTTP būsenų kodai nėra taikomi.
Klaidas pateikti per aiškius aplikacijos klaidų kodus ir vartotojui
suprantamus pranešimus.
9. Validacijos taisyklės
1. Pavadinimai po trim() negali būti tušti.
2. id turi būti unikalus.
3. categoryId ir habitId turi rodyti egzistuojančius objektus.
4. status ir frequency turi atitikti leistinas reikšmes.
5. targetPerPeriod turi būti teigiamas sveikasis skaičius.
6. startDate negali būti vėlesnė už endDate.
7. logDate turi būti galiojanti kalendorinė data ir negali būti
   ankstesnė už įpročio pradžią.
8. Vienam įpročiui negali būti daugiau nei vieno istorijos įrašo tai
   pačiai dienai.
9. Skaičiuojant įpročio statistiką, atsižvelgti į aktyvumo laikotarpį,
   grafiką ir tikslą.
10. Kalendorines datas saugoti kaip YYYY-MM-DD, o ne konvertuoti į UTC
    laiko žymas.
10. Progreso skaičiavimas
Vienkartinių užduočių progresas
progresas = atliktų užduočių skaičius / visų užduočių skaičius × 100
Jei užduočių nėra, rodyti 0 %. Į skaičiavimą įtraukti tik pasirinktą
kategoriją arba visą aplikaciją pagal rodomą progreso juostą.
Įpročių statistika
- Atlikimų skaičius per pasirinktą laikotarpį.
- Atlikimo procentas pagal suplanuotus atlikimus.
- Dabartinė ir ilgiausia atlikimų seka (streak).
- Pasiektų savaitinių ar dienos tikslų skaičius.
Procento vardiklis turi būti suplanuotų atlikimų skaičius, o ne visos
kalendorinės dienos. Pavyzdžiui, įpročiui „sportuoti 3 kartus per
savaitę" savaitės tikslas yra 3 atlikimai.
11. React integracija
- App.jsx valdo bendrą data būseną ir navigaciją.
- TaskCard.jsx rodo vienkartines užduotis ir jų būsenas.
- AddTask.jsx sukuria užduotis.
- HabitCard.jsx rodo įprotį ir jo dienos atlikimo veiksmą.
- AddHabit.jsx sukuria įprotį.
- ProgressBar.jsx rodo apskaičiuotą progresą.
- Profile.jsx rodo profilio informaciją ir iš tasks, habits,
  habitLogs apskaičiuotą statistiką.
- storage.js atsako už duomenų nuskaitymą ir išsaugojimą.
- taskService.js ir habitService.js atsako už CRUD ir validaciją.
- statistics.js atsako už progreso, atlikimo procentų ir sekų
  skaičiavimą.
Duomenis išsaugoti po sėkmingos validacijos. Jei išsaugojimas
nepavyksta, parodyti perspėjimą -- vien React būsenos atnaujinimas
negarantuoja, kad duomenys išliks perkrovus puslapį.
12. Testavimo kontrolinis sąrašas
- [ ] Sukurti užduotį, perkrauti puslapį ir patikrinti, ar duomenys
  išliko.
- [ ] Sukurti, redaguoti, užbaigti ir ištrinti užduotį.
- [ ] Sukurti įprotį ir užregistruoti dienos atlikimą.
- [ ] Pakartotinai registruoti tą patį įprotį tą pačią dieną -- neturi
  atsirasti dublikatas.
- [ ] Patikrinti tuščius pavadinimus, netinkamas datas ir
  neegzistuojančius ID.
- [ ] Patikrinti kategorijos ištrynimo patvirtinimą ir susijusių
  duomenų tvarkymą.
- [ ] Patikrinti sugadinto JSON scenarijų -- duomenys neturi būti
  automatiškai perrašyti.
- [ ] Patikrinti, kaip aplikacija praneša apie nesėkmingą išsaugojimą.
- [ ] Patikrinti savaitės grafiką, laiko juostos ir kalendorinių dienų
  ribas.
- [ ] Patikrinti progreso skaičiavimą, kai nėra užduočių ar suplanuotų
  įpročių.
13. Migracija iš ankstesnės versijos
Ankstesnė projekto versija naudojo TestAPI. Prieš išjungiant REST API:
1. Patikrinti, kokie duomenys išsaugoti TestAPI.
2. Eksportuoti reikalingas užduotis ir korteles.
3. Susieti senus laukus su naujais (cards → categories, užduočių
   masyvai → tasks).
4. Patikrinti ID ir duomenų vientisumą.
5. Įrašyti validuotus duomenis į localStorage.
6. Patikrinti, ar aplikacija veikia be tinklo.
7. Tik patvirtinus migraciją pašalinti nebereikalingą API kodą.
Šis dokumentas aprašo siūlomą tikslinę architektūrą. Faktinį
suderinamumą su esamais komponentais reikia patikrinti pagal dabartinį
kodo turinį.