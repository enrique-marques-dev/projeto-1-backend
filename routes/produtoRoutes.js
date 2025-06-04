const {
  listarProdutos,
  buscarProdutoPorId,
  criarProduto,
  atualizarProduto,
  deletarProduto,
} = require("../controllers/produtoController");

const parseBody = require("../utils/parseBody");

async function produtoRoutes(req, res) {
  const urlParts = req.url.split("/");
  const method = req.method;

  if (urlParts[1] === "produtos") {
    const id = urlParts[2];

    if (method === "GET" && !id) return listarProdutos(res);

    if (method === "GET" && id) return buscarProdutoPorId(res, id);

    if (method === "POST") {
      const body = await parseBody(req);
      return criarProduto(req, res, body);
    }

    if (method === "PUT" && id) {
      const body = await parseBody(req);
      return atualizarProduto(req, res, id, body);
    }

    if (method === "DELETE" && id) {
      return deletarProduto(res, id);
    }
  }

  res.writeHead(404);
  res.end(JSON.stringify({ error: "Rota não encontrada" }));
}

module.exports = produtoRoutes;