const { createServer } = require("./backend/config/server");

const port = Number(process.env.PORT || 4173);
const app = createServer();

app.listen(port, () => {
  console.log(`QueueCure Pro is running at http://localhost:${port}`);
});
