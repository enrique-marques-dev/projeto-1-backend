const { connect } = require("../database/db");
const { ObjectId } = require("mongodb");

class Produto {
  constructor({ nome, descricao, preco, estoque }) {
    if (!nome || !descricao || preco == null || estoque == null) {
      throw new Error(
        "Todos os campos (nome, descricao, preco, estoque) são obrigatórios"
      );
    }
    this.nome = nome;
    this.descricao = descricao;
    this.preco = preco;
    this.estoque = estoque;
  }

  async inserir() {
    const { db, client } = await connect();
    try {
      const result = await db.collection("produtos").insertOne({
        nome: this.nome,
        descricao: this.descricao,
        preco: this.preco,
        estoque: this.estoque,
      });
      return result.insertedId;
    } finally {
      await client.close();
    }
  }

  static async listarTodos() {
    const { db, client } = await connect();
    try {
      return await db.collection("produtos").find().toArray();
    } finally {
      await client.close();
    }
  }

  static async buscarPorId(id) {
    const { db, client } = await connect();
    try {
      return await db.collection("produtos").findOne({ _id: new ObjectId(id) });
    } finally {
      await client.close();
    }
  }

  static async atualizar(id, dados) {
    const { db, client } = await connect();
    try {
      await db
        .collection("produtos")
        .updateOne({ _id: new ObjectId(id) }, { $set: dados });
    } finally {
      await client.close();
    }
  }

  static async deletar(id) {
    const { db, client } = await connect();
    try {
      await db.collection("produtos").deleteOne({ _id: new ObjectId(id) });
    } finally {
      await client.close();
    }
  }
}

module.exports = Produto;
