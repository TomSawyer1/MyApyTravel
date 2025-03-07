const app = require("./app.js");
require("dotenv").config();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`);
});

app.use((req, res, next) => {
  console.log(`🔍 Requête reçue: ${req.method} ${req.url}`);
  next();
});

