const Loja = require("./models/loja");

async function testarInsercao() {
  const loja = new Loja("Cidade Canção", "55.555.555/0001-55", "cidadecancao@gmail.com", "(43) 99189-5220");
  await loja.inserir();
}

testarInsercao();