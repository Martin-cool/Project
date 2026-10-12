const BASE_URL = 'https://testapi.io/api/Martin-cool/resource/Martin';

// 1. Atvaizduoti (Gauti visas užduotis)
export const fetchTasks = async () => {
  const response = await fetch(BASE_URL);
  if (!response.ok) throw new Error('Klaida gaunant užduotis');
  const data = await response.json();
  return data.data || data; // Atitinkamai pagal testapi.io grąžinamą struktūrą
};

// 2. Pridėti naują užduotį
export const createTask = async (newTask) => {
  const response = await fetch(BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newTask),
  });
  if (!response.ok) throw new Error('Klaida pridedant užduotį');
  return await response.json();
};

// 3. Atnaujinti užduotį
export const updateTask = async (id, updatedTask) => {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedTask),
  });
  if (!response.ok) throw new Error('Klaida atnaujinant užduotį');
  return await response.json();
};

// 4. Ištrinti užduotį
export const deleteTask = async (id) => {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Klaida trinant užduotį');
  return true;
};