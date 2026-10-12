export function getTaskProgress(tasks) {
    if (tasks.length === 0) return 0;
  
    const completed = tasks.filter(
      (task) => task.status === "done"
    ).length;
  
    return Math.round((completed / tasks.length) * 100);
  }
  
  export function getHabitCompletionRate(
    habit,
    logs,
    fromDate,
    toDate
  ) {
    const eligibleLogs = logs.filter(
      (log) =>
        log.habitId === habit.id &&
        log.logDate >= fromDate &&
        log.logDate <= toDate
    );
  
    const completed = eligibleLogs.filter(
      (log) => log.status === "completed"
    ).length;
  
    const skipped = eligibleLogs.filter(
      (log) => log.status === "skipped"
    ).length;
  
    const recorded = completed + skipped;
  
    return {
      completed,
      skipped,
      recorded,
    };
  }