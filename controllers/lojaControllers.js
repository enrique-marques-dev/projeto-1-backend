const Loja = require("../models/loja");
const { logErro } = require("../utils/logger");

async function listarLojas(res) {
  try {
    const lojas = await Loja.listarTodas();
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(lojas));
  } catch (err) {
    logErro(`Erro ao listar lojas: ${err.message}`);
    res.writeHead(500);
    res.end(JSON.stringify({ error: "Erro ao listar lojas" }));
  }
}

async function buscarLojaPorId(res, id) {
  try {
    const loja = await Loja.buscarPorId(id);
    if (!loja) throw new Error("Loja não encontrada");
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(loja));
  } catch (err) {
    logErro(`Erro ao buscar loja ${id}: ${err.message}`);
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
  } catch (err) {
    logErro(`Erro ao criar loja: ${err.message}`);
    res.writeHead(500);
    res.end(JSON.stringify({ error: "Erro ao criar loja" }));
  }
}

async function atualizarLoja(req, res, id, body) {
  try {
    await Loja.atualizar(id, body);
    res.writeHead(200);
    res.end(JSON.stringify({ message: "Loja atualizada" }));
  } catch (err) {
    logErro(`Erro ao atualizar loja ${id}: ${err.message}`);
    res.writeHead(500);
    res.end(JSON.stringify({ error: "Erro ao atualizar loja" }));
  }
}

async function deletarLoja(res, id) {
  try {
    await Loja.deletar(id);
    res.writeHead(200);
    res.end(JSON.stringify({ message: "Loja deletada" }));
  } catch (err) {
    logErro(`Erro ao deletar loja ${id}: ${err.message}`);
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
