const {
  listarUsuarios,
  buscarUsuarioPorId,
  criarUsuario,
  atualizarUsuario,
  deletarUsuario,
  loginUsuario,
} = require("../controllers/usuarioController");

const parseBody = require("../utils/parseBody");

async function usuarioRoutes(req, res) {
  const urlParts = req.url.split("/");
  const method = req.method;

  if (urlParts[1] === "usuarios") {
    const id = urlParts[2];

    if (method === "POST" && id === "login") {
      const body = await parseBody(req);
      return loginUsuario(req, res, body);
    }

    if (method === "GET" && !id) return listarUsuarios(res);

    if (method === "GET" && id) return buscarUsuarioPorId(res, id);

    if (method === "POST") {
      const body = await parseBody(req);
      return criarUsuario(req, res, body);
    }

    if (method === "PUT" && id) {
      const body = await parseBody(req);
      return atualizarUsuario(req, res, id, body);
    }

    if (method === "DELETE" && id) {
      return deletarUsuario(res, id);
    }
  }

  res.writeHead(404);
  res.end(JSON.stringify({ error: "Rota não encontrada" }));
}

module.exports = usuarioRoutes;
