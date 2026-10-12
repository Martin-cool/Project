import { useEffect, useState } from "react";
import { loadData, saveData } from "./utils/storage";
import { createInitialData } from "./utils/initialData";

export default function App() {
  const [data, setData] = useState(() => {
    try {
      return loadData() ?? createInitialData();
    } catch {
      return null;
    }
  });

  const [storageError, setStorageError] = useState(false);

  useEffect(() => {
    if (!data) return;

    try {
      saveData(data);
      setStorageError(false);
    } catch {
      setStorageError(true);
    }
  }, [data]);

  if (!data) {
    return (
      <main>
        <h1>Nepavyko įkelti duomenų</h1>
        <p>
          Duomenys nebuvo automatiškai ištrinti.
          Patikrink saugyklą arba atkurk atsarginę kopiją.
        </p>
      </main>
    );
  }

  return (
    <main>
      {storageError && (
        <p role="alert">
          Nepavyko išsaugoti pakeitimų.
          Patikrink naršyklės saugyklą.
        </p>
      )}

      {/* Čia pateikiami aplikacijos komponentai */}
    </main>
  );
}