//carregando modulos
const sql = require("mssql");
const express = require("express");
const router = express.Router();
const config = require("../../../config/config.json");
const { get } = require("../../../lib/poolManager");
const connection = require("../../../config/" + config.executiva);

router.get("/relatorio-contato", function (req, res) {
  const {
    almope,
    dataInicial,
    dataFinal
  } = req.query;

  retornaDadosRelatorioContato(
    almope,
    dataInicial,
    dataFinal,
    res
  );
});

router.get("/relatorio-justificativa", function (req, res) {
  const {
    almope,
    dataInicial,
    dataFinal
  } = req.query;

  retornaDadosRelatorioJustificativa(
    almope,
    dataInicial,
    dataFinal,
    res
  );
});

router.get("/relatorio-semanal", function (req, res) {
  const {
    almope,
    dataInicial,
    dataFinal
  } = req.query;

  retornaDadosRelatorioSemanal(
    almope,
    dataInicial,
    dataFinal,
    res
  );
});

router.get("/relatorio-justificativa-supervisor", function (req, res) {
  const {
    almope,
    dataInicial,
    dataFinal
  } = req.query;

  retornaDadosRelatorioJustificativaSupervisor(
    almope,
    dataInicial,
    dataFinal,
    res
  );
});

async function retornaDadosRelatorioSemanal(almope, dataInicial, dataFinal, res) {
  try {
    let pool = await get("BDRechamadasGeral", connection);
    let resultRelatorio = await pool
      .request()
      .input("almope", sql.VarChar, almope)
      .input("dataInicial", sql.DateTime, dataInicial)
      .input("dataFinal", sql.DateTime, dataFinal)
      .execute("s_Gestao_Executiva_Retorna_ABS_Relatorio_Semanal");

    let retorno = {
      relatorio: transformarDatasABS(resultRelatorio?.recordset),
    };

    res.json(retorno);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}

async function retornaDadosRelatorioJustificativa(almope, dataInicial, dataFinal, res) {
  try {
    let pool = await get("BDRechamadasGeral", connection);
    let resultRelatorio = await pool
      .request()
      .input("almope", sql.VarChar, almope)
      .input("dataInicial", sql.DateTime, dataInicial)
      .input("dataFinal", sql.DateTime, dataFinal)
      .execute("s_Gestao_Executiva_Retorna_ABS_Relatorio_Justificativa");

    let recordset = resultRelatorio?.recordset;

    if (!recordset || recordset.length === 0) {
      res.json({ columns: [], data: [] });
      return;
    }

    let columns = Object.keys(recordset[0])?.map((key) => ({
      field: key,
      headerName: key.charAt(0).toUpperCase() + key.slice(1),
      width: 150,
    }));

    let data = recordset?.map((row, index) => ({
      id: index,
      ...row,
    }));

    let retorno = {
      columns: columns.map(col => col.field),
      data: data,
    };

    let resultFinal = {
      relatorio: retorno
    }

    res.json(resultFinal);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}

async function retornaDadosRelatorioJustificativaSupervisor(almope, dataInicial, dataFinal, res) {
  try {
    let pool = await get("BDRechamadasGeral", connection);
    let resultRelatorio = await pool
      .request()
      .input("almope", sql.VarChar, almope)
      .input("dataInicial", sql.DateTime, dataInicial)
      .input("dataFinal", sql.DateTime, dataFinal)
      .execute("s_Gestao_Executiva_Retorna_ABS_Relatorio_Justificativa_Supervisor");

    let recordset = resultRelatorio?.recordset;

    if (!recordset || recordset.length === 0) {
      res.json({ columns: [], data: [] });
      return;
    }

    let columns = Object.keys(recordset[0])?.map((key) => ({
      field: key,
      headerName: key.charAt(0).toUpperCase() + key.slice(1),
      width: 150,
    }));

    let data = recordset?.map((row, index) => ({
      id: index,
      ...row,
    }));

    let retorno = {
      columns: columns.map(col => col.field),
      data: data,
    };

    let resultFinal = {
      relatorio: retorno
    }

    res.json(resultFinal);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}

async function retornaDadosRelatorioContato(
  almope,
  dataInicial,
  dataFinal,
  res
) {
  try {
    let pool = await get("BDRechamadasGeral", connection);
    let resultRelatorio = await pool
      .request()
      .input("almope", sql.VarChar, almope)
      .input("dataInicial", sql.DateTime, dataInicial)
      .input("dataFinal", sql.DateTime, dataFinal)
      .execute("s_Gestao_Executiva_Retorna_ABS_Relatorio_Contato");

    let retorno = {
      relatorio: transformarDatasABS(resultRelatorio?.recordset),
    };

    res.json(retorno);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}

function transformarDatasABS(abs) {
  const result = {
    keys: ["id", "nome", "supervisor", ...Object.keys(abs[0]).filter(key => key.startsWith("data"))],
    data: abs.map(item => ({
      id: item.id,
      nome: item.nome,
      supervisor: item.supervisor,
      ...Object.fromEntries(Object.entries(item)
        .filter(([key]) => key.startsWith("data"))
        .map(([key, value]) => [`data${key.slice(4)}`, value || '0%']))
    }))
  };
  return result;
}

module.exports = router;
