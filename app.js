const http = require("http");
const lojaRoutes = require("./routes/lojaRoutes");
const usuarioRoutes = require("./routes/usuarioRoutes");

const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "application/json");

  if (req.url.startsWith("/lojas")) {
    return lojaRoutes(req, res);
  }

  if (req.url.startsWith("/usuarios")) {
    return usuarioRoutes(req, res);
  }

  res.writeHead(404);
  res.end(JSON.stringify({ error: "Rota não encontrada" }));
});

server.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});
