const Produto = require("../models/produto");

async function listarProdutos(res) {
  const produtos = await Produto.listarTodos();
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(produtos));
}

async function buscarProdutoPorId(res, id) {
  try {
    const produto = await Produto.buscarPorId(id);
    if (!produto) throw new Error();
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(produto));
  } catch {
    res.writeHead(404);
    res.end(JSON.stringify({ error: "Produto não encontrado" }));
  }
}

async function criarProduto(req, res, body) {
  try {
    const produto = new Produto(body);
    const id = await produto.inserir();
    res.writeHead(201, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Produto criado", id }));
  } catch {
    res.writeHead(500);
    res.end(JSON.stringify({ error: "Erro ao criar produto" }));
  }
}

async function atualizarProduto(req, res, id, body) {
  try {
    await Produto.atualizar(id, body);
    res.writeHead(200);
    res.end(JSON.stringify({ message: "Produto atualizado" }));
  } catch {
    res.writeHead(500);
    res.end(JSON.stringify({ error: "Erro ao atualizar produto" }));
  }
}

async function deletarProduto(res, id) {
  try {
    await Produto.deletar(id);
    res.writeHead(200);
    res.end(JSON.stringify({ message: "Produto deletado" }));
  } catch {
    res.writeHead(500);
    res.end(JSON.stringify({ error: "Erro ao deletar produto" }));
  }
}

module.exports = {
  listarProdutos,
  buscarProdutoPorId,
  criarProduto,
  atualizarProduto,
  deletarProduto,
};