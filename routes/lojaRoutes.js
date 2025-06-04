const {
  listarLojas,
  buscarLojaPorId,
  criarLoja,
  atualizarLoja,
  deletarLoja,
} = require("../controllers/lojaControllers");
const parseBody = require("../utils/parseBody");

async function lojaRoutes(req, res) {
  const urlParts = req.url.split("/");
  const method = req.method;

  if (urlParts[1] === "lojas") {
    const id = urlParts[2];

    if (method === "GET" && !id) return listarLojas(res);
    if (method === "GET" && id) return buscarLojaPorId(res, id);

    if (method === "POST") {
      const body = await parseBody(req);
      return criarLoja(req, res, body);
    }

    if (method === "PUT" && id) {
      const body = await parseBody(req);
      return atualizarLoja(req, res, id, body);
    }

    if (method === "DELETE" && id) {
      return deletarLoja(res, id);
    }
  }

  res.writeHead(404);
  res.end(JSON.stringify({ error: "Rota não encontrada" }));
}

module.exports = lojaRoutes;
