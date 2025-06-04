const fs = require("fs");
const path = require("path");

function logErro(mensagem) {
  const data = new Date().toISOString();
  const log = `[${data}] ${mensagem}\n`;
  fs.appendFileSync(path.join(__dirname, "../logs/erros.log"), log);
}

module.exports = { logErro };
