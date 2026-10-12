const STORAGE_KEY = "habit-tracker-data-v1";

export function loadData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);

    if (raw === null) {
      return null;
    }

    const data = JSON.parse(raw);

    if (
      !data ||
      data.version !== 1 ||
      !data.profile ||
      !Array.isArray(data.categories) ||
      !Array.isArray(data.tasks) ||
      !Array.isArray(data.habits) ||
      !Array.isArray(data.habitLogs)
    ) {
      throw new Error("INVALID_DATA");
    }

    return data;
  } catch (error) {
    console.error("Nepavyko įkelti duomenų:", error);
    throw new Error("DATA_LOAD_FAILED");
  }
}

export function saveData(data) {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(data)
    );
  } catch (error) {
    console.error("Nepavyko išsaugoti duomenų:", error);

    if (error?.name === "QuotaExceededError") {
      throw new Error("STORAGE_FULL");
    }

    throw new Error("DATA_SAVE_FAILED");
  }
}