const authService = require("../services/authService");

function login(req, res) {
  const user = authService.login(req.body.email, req.body.password);
  if (!user) {
    res.status(401).json({ message: "Invalid login details" });
    return;
  }

  res.json(user);
}

module.exports = { login };
