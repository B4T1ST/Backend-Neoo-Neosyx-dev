//carregando modulos
const sql = require('mssql');
const express = require('express');
const router = express.Router();
const { get } = require('../../../lib/poolManager')
const config = require('../../../config/config.json');
const connection = require('../../../config/' + config.executiva);

router.get('/', function (req, res) {

    const {
        dataInicial,
        dataFinal,
        idCliente= "-1",
        idOperacao= "-1",
        idDiretor= "-1",
        idGerente= "-1",
        idCoordenador= "-1",
        idSupervisor= "-1",
        idOperador = "-1",
    } = req.query

    retornaDados(dataInicial, dataFinal, idCliente, idOperacao, idDiretor, idGerente, idCoordenador, idSupervisor, idOperador, res);
});

async function retornaDados(dataInicial, dataFinal, idCliente, idOperacao, idDiretor, idGerente, idCoordenador, idSupervisor, idOperador, res) {
    try {

        let pool = await get('BDRechamadasGeral', connection)

        let resultMicroGestao = await pool.request()
            .input('dataInicial', sql.DateTime, dataInicial)
            .input('dataFinal', sql.DateTime, dataFinal)
            .input('idCliente', sql.VarChar, idCliente)
            .input('idOperacao', sql.VarChar, idOperacao)
            .input('idDiretor', sql.VarChar, idDiretor)
            .input('idGerente', sql.VarChar, idGerente)
            .input('idCoordenador', sql.VarChar, idCoordenador)
            .input('idSupervisor', sql.VarChar, idSupervisor)
            .input('idOperador', sql.VarChar, idOperador)
            .execute('s_Gestao_Executiva_Retorna_Micro_Gestao')

        let retorno = {
            MicroGestao: transformarMicroGestao(resultMicroGestao?.recordset)
        };

        res.json(retorno)

    } catch (error) {
        res.status(500).json(error);
    }
}


function transformarMicroGestao(microGestao) {
    const result = {
      field: [
        "operador",
        "supervisor",
        "operacao",
        "atendidas",
        "tempo logado",
        "quartiltempo logado",
        "tma",
        "quartiltma",
        "absenteísmo",
        "quartilabsenteísmo",
        "jackin",
        "quartiljackin",
        "rechamadas 60m",
        "quartilrechamadas 60m",
        "rechamadas 24h",
        "quartilrechamadas 24h",
        "rechamadas 48h",
        "quartilrechamadas 48h",
        "rechamadas 72h",
        "quartilrechamadas 72h",
        "rechamadas 168h",
        "quartilrechamadas 168h",
        "transferidas",
        "quartiltransferidas",
        "shortcall 30s",
        "quartilshortcall 30s",
        "shortcall 60s",
        "quartilshortcall 60s",
        "desconexão",
        "quartildesconexão",
        "id"
      ],
      value: [],
      colors: [],
    };
  
    const colorsMap = {};

    for (const item of microGestao) {
      const obj = { operador: item["operador"] };
      const colorObj = {};
  
      for (const campo of result.field) {
        if (campo.startsWith("quartil")) {
          const valorCampo = item[campo];
          if (valorCampo !== null && valorCampo !== undefined) {
            const nomeCampo = campo.slice(7);
            obj[`quartil${nomeCampo}`] = valorCampo;
      
            const corCampo = item[`cor${nomeCampo}`];
            if (corCampo) {
              colorObj[`quartil${nomeCampo}`] = corCampo; // Use nomeCampo here
            }
          }
        } else {
          obj[campo.toLowerCase()] = item[campo];
        }
      }
  
      result.value.push(obj);
  
      if (Object.keys(colorObj).length > 0) {
        colorsMap[obj.operador] = colorObj;
      }
    }
  
    // Convertendo o mapa de cores para o formato desejado
    for (const operador in colorsMap) {
      result.colors.push(colorsMap[operador]);
    }
  
    return result;
  }







module.exports = router