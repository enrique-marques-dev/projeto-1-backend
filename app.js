const http = require("http");
const lojaRoutes = require("./routes/lojaRoutes");

const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "application/json");
  lojaRoutes(req, res);
});

server.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});
