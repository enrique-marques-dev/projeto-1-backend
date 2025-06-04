const Produto = require("../models/produto");
const { logErro } = require("../utils/logger");

async function listarProdutos(res) {
  try {
    const produtos = await Produto.listarTodos();
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(produtos));
  } catch (err) {
    logErro(`Erro ao listar produtos: ${err.message}`);
    res.writeHead(500);
    res.end(JSON.stringify({ error: "Erro ao listar produtos" }));
  }
}

async function buscarProdutoPorId(res, id) {
  try {
    const produto = await Produto.buscarPorId(id);
    if (!produto) throw new Error("Produto não encontrado");
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(produto));
  } catch (err) {
    logErro(`Erro ao buscar produto ${id}: ${err.message}`);
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
  } catch (err) {
    logErro(`Erro ao criar produto: ${err.message}`);
    res.writeHead(500);
    res.end(JSON.stringify({ error: "Erro ao criar produto" }));
  }
}

async function atualizarProduto(req, res, id, body) {
  try {
    await Produto.atualizar(id, body);
    res.writeHead(200);
    res.end(JSON.stringify({ message: "Produto atualizado" }));
  } catch (err) {
    logErro(`Erro ao atualizar produto ${id}: ${err.message}`);
    res.writeHead(500);
    res.end(JSON.stringify({ error: "Erro ao atualizar produto" }));
  }
}

async function deletarProduto(res, id) {
  try {
    await Produto.deletar(id);
    res.writeHead(200);
    res.end(JSON.stringify({ message: "Produto deletado" }));
  } catch (err) {
    logErro(`Erro ao deletar produto ${id}: ${err.message}`);
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
