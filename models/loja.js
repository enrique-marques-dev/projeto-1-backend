const { ObjectId } = require("mongodb");
const { connect } = require("../database/db");

class Loja {
  constructor({ nome, cnpj, email, telefone }) {
    this.nome = nome;
    this.cnpj = cnpj;
    this.email = email;
    this.telefone = telefone;
  }

  static async listarTodas() {
    const { db, client } = await connect();
    const lojas = await db.collection("lojas").find().toArray();
    client.close();
    return lojas;
  }

  static async buscarPorId(id) {
    const { db, client } = await connect();
    const loja = await db
      .collection("lojas")
      .findOne({ _id: new ObjectId(id) });
    client.close();
    return loja;
  }

  async inserir() {
    const { db, client } = await connect();
    const result = await db.collection("lojas").insertOne(this);
    client.close();
    return result.insertedId;
  }

  static async atualizar(id, dadosAtualizados) {
    const { db, client } = await connect();
    await db
      .collection("lojas")
      .updateOne({ _id: new ObjectId(id) }, { $set: dadosAtualizados });
    client.close();
  }

  static async deletar(id) {
    const { db, client } = await connect();
    await db.collection("lojas").deleteOne({ _id: new ObjectId(id) });
    client.close();
  }
}

module.exports = Loja;
