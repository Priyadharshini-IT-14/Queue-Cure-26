const store = require("../models/clinicStore");
const { saveDatabase } = require("../config/database");
const { displayTime } = require("../utils/time");

function addLog({ user = "System", role = "system", action }) {
  const log = {
    user,
    role,
    action,
    time: displayTime(),
    timestamp: new Date().toISOString()
  };

  store.logs.unshift(log);
  saveDatabase(store);
  return log;
}

function getLogs() {
  return store.logs;
}

module.exports = { addLog, getLogs };
