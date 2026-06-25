const store = require("../models/clinicStore");
const crypto = require("crypto");

function hashPassword(password) {
  return crypto.createHash("sha256").update(String(password || "")).digest("hex");
}

function login(email, password) {
  const user = store.users.find((item) => item.email === email && item.passwordHash === hashPassword(password));
  if (!user) return null;

  const sessionToken = crypto.randomBytes(24).toString("hex");
  store.sessions[sessionToken] = {
    email: user.email,
    role: user.role,
    createdAt: new Date().toISOString()
  };

  return {
    name: user.name,
    email: user.email,
    role: user.role,
    token: sessionToken
  };
}

module.exports = { login };
