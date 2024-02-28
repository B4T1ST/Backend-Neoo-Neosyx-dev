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
        "Supervisor",
        "Operacao",
        "Atendidas",
        "TMA",
        "quartilTMA",
        "Absenteísmo",
        "quartilAbsenteísmo",
        "Tempo Logado",
        "quartilTempo Logado",
        "Jackin",
        "quartilJackin",
        "Rechamadas 60m",
        "quartilRechamadas 60m",
        "Rechamadas 24h",
        "quartilRechamadas 24h",
        "Rechamadas 48h",
        "quartilRechamadas 48h",
        "Rechamadas 72h",
        "quartilRechamadas 72h",
        "Transferidas",
        "quartilTransferidas",
        "ShortCall 30s",
        "quartilShortCall 30s",
        "ShortCall 60s",
        "quartilShortCall 60s",
        "Desconexão",
        "quartilDesconexão",
        "id"
      ],
      value: [],
      colors: [],
    };
  
    const colorsMap = {}; 
  
    for (const item of microGestao) {
      const obj = {};
      for (const campo of result.field) {
        if (campo === "Operador") {
          obj.operador = item[campo];
        } else if (campo.startsWith("quartil")) {
          const valorCampo = item[campo];
          if (valorCampo !== null && valorCampo !== undefined) {
            const nomeCampo = campo.slice(7); 
            obj[`quartil${nomeCampo}`] = valorCampo;
            const corCampo =
              item[
                `cor${nomeCampo.charAt(0).toUpperCase()}${nomeCampo.slice(1)}`
              ];
            if (corCampo) {
              if (!colorsMap[obj.Operador]) {
                colorsMap[obj.Operador] = {};
              }
              colorsMap[obj.Operador][campo] = corCampo;
            }
          }
        } else {
          obj[campo.toLowerCase()] = item[campo];
        }
      }
      result.value.push(obj);
    }
  
    // Convertendo o mapa de cores para o formato desejado
    for (const operador in colorsMap) {
      const cores = colorsMap[operador];
      const colorObj = {};
      for (const campo in cores) {
        colorObj[campo] = cores[campo];
      }
      result.colors.push(colorObj);
    }
  
    return result;
  }







module.exports = router