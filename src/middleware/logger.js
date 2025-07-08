export const logEvent = (event, data) => {
  const log = {
    timestamp: new Date().toISOString(),
    event,
    data
  };

  // Simulate sending to logging system
  const logs = JSON.parse(localStorage.getItem("logs")) || [];
  logs.push(log);
  localStorage.setItem("logs", JSON.stringify(logs));
};
