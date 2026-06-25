const fs = require("fs");
const path = require("path");

const dataDir = path.join(__dirname, "..", "data");
const databasePath = path.join(dataDir, "database.json");

const defaultPasswordHash = "5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8";

function createDefaultDatabase() {
  return {
    nextTokenNumber: 1,
    patients: [],
    logs: [],
    consultations: [],
    sessions: {},
    users: [
      { name: "Front Desk", email: "receptionist@test.com", passwordHash: defaultPasswordHash, role: "receptionist" },
      { name: "Dr Kumar", email: "doctor@test.com", passwordHash: defaultPasswordHash, role: "doctor" },
      { name: "Clinic Admin", email: "admin@test.com", passwordHash: defaultPasswordHash, role: "admin" }
    ]
  };
}

function ensureDatabaseFile() {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  if (!fs.existsSync(databasePath)) {
    saveDatabase(createDefaultDatabase());
  }
}

function normalizeDatabase(data) {
  const defaults = createDefaultDatabase();
  return {
    ...defaults,
    ...data,
    patients: Array.isArray(data.patients) ? data.patients : defaults.patients,
    logs: Array.isArray(data.logs) ? data.logs : defaults.logs,
    consultations: Array.isArray(data.consultations) ? data.consultations : defaults.consultations,
    users: Array.isArray(data.users) && data.users.length ? data.users : defaults.users,
    sessions: {}
  };
}

function loadDatabase() {
  ensureDatabaseFile();

  try {
    const fileData = JSON.parse(fs.readFileSync(databasePath, "utf8"));
    return normalizeDatabase(fileData);
  } catch (error) {
    const fallback = createDefaultDatabase();
    saveDatabase(fallback);
    return fallback;
  }
}

function saveDatabase(data) {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  const persistedData = {
    ...data,
    sessions: {}
  };

  fs.writeFileSync(databasePath, JSON.stringify(persistedData, null, 2));
}

module.exports = { loadDatabase, saveDatabase, databasePath };
