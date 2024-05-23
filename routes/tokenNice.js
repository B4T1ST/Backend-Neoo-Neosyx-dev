//carregando modulos
const sql = require("mssql");
const express = require("express");
const router = express.Router();
const config = require("../config/config.json");
const { get } = require("../lib/poolManager");
const connection = require("../config/" + config.monitoriaAgentes);

//Rota principal que retorna token
router.get("/", function (req, res) {
  retornaDadosToken(res);
});

//Rota envia token
router.post("/insere-token", function (req, res) {
  let token = req.body.token;
  let dataStatus = req.body.dataStatus;

  insereToken(token, dataStatus, res);
});

// Rota que verifica conexao do coletor
router.get("/aguarda-conexao-token", function (req, res) {
  let token = req.query.token;

  aguardaConexaoToken(token, res);
});

// Rota que retorna data atualizacao
router.get("/retorna-data-atualizacao", function (req, res) {
  retornaDataAtualizacao(res);
});

async function retornaDataAtualizacao(res) {
  try {
    let pool = await get("BDRechamadasGeral", connection);
    let result = await pool
      .request()
      .execute(
        "s_Monitoramento_Agentes_RPA_Nice_Retorna_Ultima_Atualizacao_Coletor"
      );

    let retorno = {
      field: result.recordset,
    };

    res.json(retorno);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}

async function aguardaConexaoToken(token, res) {
  let isConnected = false;
  const startTime = Date.now();
  const endTime = startTime + 5 * 60 * 1000;

  while (Date.now() < endTime) {
    try {
      let pool = await get("BDRechamadasGeral", connection);
      let result = await pool
        .request()
        .input("token", sql.VarChar(100), token)
        .execute(
          "s_Monitoramento_Agentes_RPA_Nice_Retorna_Status_Conexao_Coletor"
        );

      if (result.recordset.length > 0 && result.recordset[0].conectado === "true") {
        isConnected = true;
        break;
      }
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }

    await delay(2000);
  }

  res.json({ conectado: isConnected });
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function insereToken(token, dataStatus, res) {
  try {
    let pool = await get("BDRechamadasGeral", connection);
    let result = await pool
      .request()
      .input("token", sql.VarChar(100), token)
      .input("dataStatus", sql.DateTime, dataStatus)
      .execute("s_Monitoramento_Agentes_RPA_Nice_Atualiza_Token")
      .then((result) => res.json(result.recordset));
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}

async function retornaDadosToken(res) {
  try {
    let pool = await get("BDRechamadasGeral", connection);
    let result = await pool
      .request()
      .execute("s_Monitoramento_Agentes_RPA_Nice_Retorna_Status_Coletor");

    let retorno = {
      field: result.recordset,
    };

    res.json(retorno);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}

module.exports = router;
