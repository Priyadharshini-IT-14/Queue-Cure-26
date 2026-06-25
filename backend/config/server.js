const express = require("express");
const path = require("path");

const queueRoutes = require("../routes/queueRoutes");
const authRoutes = require("../routes/authRoutes");
const analyticsRoutes = require("../routes/analyticsRoutes");
const logRoutes = require("../routes/logRoutes");
const adminRoutes = require("../routes/adminRoutes");

function createServer() {

  const app = express();

  const frontendPath = path.resolve(
    __dirname,
    "../../frontend"
  );

  console.log("Serving frontend from:", frontendPath);

  app.use(express.json());

  // Serve frontend including /src files
  app.use(express.static(frontendPath));


  // APIs
  app.use("/api/auth", authRoutes);
  app.use("/api/queue", queueRoutes);
  app.use("/api/analytics", analyticsRoutes);
  app.use("/api/logs", logRoutes);
  app.use("/api/admin", adminRoutes);


  // Frontend fallback ONLY
app.use((req, res) => {

  if (req.url.startsWith("/api")) {
    return res.status(404).json({
      message: "API not found"
    });
  }

  res.sendFile(
    path.join(frontendPath, "index.html")
  );

});


  return app;
}

module.exports = { createServer };
