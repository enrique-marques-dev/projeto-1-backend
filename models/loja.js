const { connect } = require("../database/db");

class Loja {
  constructor(nome, cnpj, email, telefone) {
    this.nome = nome;
    this.cnpj = cnpj;
    this.email = email;
    this.telefone = telefone;
  }

  async inserir() {
    try {
      const { db, client } = await connect();
      const result = await db.collection("lojas").insertOne(this);
      console.log("Loja inserida:", result.insertedId);
      client.close();
    } catch (error) {
      console.log("Erro ao inserir a loja:", error);
    }
  }
}

module.exports = Loja;
