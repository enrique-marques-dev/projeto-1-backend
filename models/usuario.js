const { connect } = require("../database/db");

class Usuario {
  constructor({ nome, email, senha }) {
    if (!nome || !email || !senha) {
      throw new Error("Todos os campos (nome, email, senha) são obrigatórios");
    }
    this.nome = nome;
    this.email = email;
    this.senha = senha;
  }

  async inserir() {
    const { db, client } = await connect();
    try {
      const result = await db.collection("usuarios").insertOne({
        nome: this.nome,
        email: this.email,
        senha: this.senha,
      });
      return result.insertedId;
    } finally {
      await client.close();
    }
  }

  static async listarTodos() {
    const { db, client } = await connect();
    try {
      return await db
        .collection("usuarios")
        .find({}, { projection: { senha: 0 } })
        .toArray();
    } finally {
      await client.close();
    }
  }

  static async buscarPorId(id) {
    const { db, client } = await connect();
    const { ObjectId } = require("mongodb");
    try {
      return await db
        .collection("usuarios")
        .findOne({ _id: new ObjectId(id) }, { projection: { senha: 0 } });
    } finally {
      await client.close();
    }
  }

  static async atualizar(id, dados) {
    const { db, client } = await connect();
    const { ObjectId } = require("mongodb");
    try {
      await db
        .collection("usuarios")
        .updateOne({ _id: new ObjectId(id) }, { $set: dados });
    } finally {
      await client.close();
    }
  }

  static async deletar(id) {
    const { db, client } = await connect();
    const { ObjectId } = require("mongodb");
    try {
      await db.collection("usuarios").deleteOne({ _id: new ObjectId(id) });
    } finally {
      await client.close();
    }
  }

  static async autenticar(email, senha) {
    const { db, client } = await connect();
    try {
      const usuario = await db.collection("usuarios").findOne({ email, senha });
      if (!usuario) return null;
      return { id: usuario._id, nome: usuario.nome, email: usuario.email };
    } finally {
      await client.close();
    }
  }
}

module.exports = Usuario;
