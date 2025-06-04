const Loja = require("../models/loja");

async function listarLojas(res) {
  const lojas = await Loja.listarTodas();
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(lojas));
}

async function buscarLojaPorId(res, id) {
  try {
    const loja = await Loja.buscarPorId(id);
    if (!loja) throw new Error();
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(loja));
  } catch {
    res.writeHead(404);
    res.end(JSON.stringify({ error: "Loja não encontrada" }));
  }
}

async function criarLoja(req, res, body) {
  try {
    const loja = new Loja(body);
    const id = await loja.inserir();
    res.writeHead(201, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Loja criada", id }));
  } catch {
    res.writeHead(500);
    res.end(JSON.stringify({ error: "Erro ao criar loja" }));
  }
}

async function atualizarLoja(req, res, id, body) {
  try {
    await Loja.atualizar(id, body);
    res.writeHead(200);
    res.end(JSON.stringify({ message: "Loja atualizada" }));
  } catch {
    res.writeHead(500);
    res.end(JSON.stringify({ error: "Erro ao atualizar loja" }));
  }
}

async function deletarLoja(res, id) {
  try {
    await Loja.deletar(id);
    res.writeHead(200);
    res.end(JSON.stringify({ message: "Loja deletada" }));
  } catch {
    res.writeHead(500);
    res.end(JSON.stringify({ error: "Erro ao deletar loja" }));
  }
}

module.exports = {
  listarLojas,
  buscarLojaPorId,
  criarLoja,
  atualizarLoja,
  deletarLoja,
};
