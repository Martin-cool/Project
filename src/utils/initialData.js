export function createInitialData() {
    const now = new Date().toISOString();
  
    return {
      version: 1,
  
      profile: {
        id: "local-user",
        name: "",
        email: "",
        createdAt: now,
        updatedAt: now,
      },
  
      categories: [],
  
      tasks: [],
  
      habits: [],
  
      habitLogs: [],
    };
  }