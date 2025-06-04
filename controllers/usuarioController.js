const Usuario = require("../models/usuario");
const { logErro } = require("../utils/logger");

async function listarUsuarios(res) {
  try {
    const usuarios = await Usuario.listarTodos();
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(usuarios));
  } catch (err) {
    logErro(`Erro ao listar usuários: ${err.message}`);
    res.writeHead(500);
    res.end(JSON.stringify({ error: "Erro ao listar usuários" }));
  }
}

async function buscarUsuarioPorId(res, id) {
  try {
    const usuario = await Usuario.buscarPorId(id);
    if (!usuario) throw new Error("Usuário não encontrado");
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(usuario));
  } catch (err) {
    logErro(`Erro ao buscar usuário ${id}: ${err.message}`);
    res.writeHead(404);
    res.end(JSON.stringify({ error: "Usuário não encontrado" }));
  }
}

async function criarUsuario(req, res, body) {
  try {
    const usuario = new Usuario(body);
    const id = await usuario.inserir();
    res.writeHead(201, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Usuário criado", id }));
  } catch (err) {
    logErro(`Erro ao criar usuário: ${err.message}`);
    res.writeHead(400);
    res.end(JSON.stringify({ error: err.message || "Erro ao criar usuário" }));
  }
}

async function atualizarUsuario(req, res, id, body) {
  try {
    await Usuario.atualizar(id, body);
    res.writeHead(200);
    res.end(JSON.stringify({ message: "Usuário atualizado" }));
  } catch (err) {
    logErro(`Erro ao atualizar usuário ${id}: ${err.message}`);
    res.writeHead(500);
    res.end(JSON.stringify({ error: "Erro ao atualizar usuário" }));
  }
}

async function deletarUsuario(res, id) {
  try {
    await Usuario.deletar(id);
    res.writeHead(200);
    res.end(JSON.stringify({ message: "Usuário deletado" }));
  } catch (err) {
    logErro(`Erro ao deletar usuário ${id}: ${err.message}`);
    res.writeHead(500);
    res.end(JSON.stringify({ error: "Erro ao deletar usuário" }));
  }
}

async function loginUsuario(req, res, body) {
  try {
    const { email, senha } = body;
    if (!email || !senha) {
      res.writeHead(400);
      return res.end(
        JSON.stringify({ error: "Email e senha são obrigatórios" })
      );
    }

    const usuario = await Usuario.autenticar(email, senha);
    if (!usuario) {
      res.writeHead(401);
      return res.end(JSON.stringify({ error: "Credenciais inválidas" }));
    }

    res.writeHead(200);
    res.end(JSON.stringify({ message: "Login bem-sucedido", usuario }));
  } catch (err) {
    logErro(`Erro ao autenticar usuário: ${err.message}`);
    res.writeHead(500);
    res.end(JSON.stringify({ error: "Erro ao autenticar usuário" }));
  }
}

module.exports = {
  listarUsuarios,
  buscarUsuarioPorId,
  criarUsuario,
  atualizarUsuario,
  deletarUsuario,
  loginUsuario,
};
