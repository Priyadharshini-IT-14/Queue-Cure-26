function requireRole(role) {
  return (req, res, next) => {
    const userRole = req.headers["x-user-role"];
    if (userRole !== role) {
      res.status(403).json({ message: `${role} access required.` });
      return;
    }
    next();
  };
}

module.exports = { requireRole };
