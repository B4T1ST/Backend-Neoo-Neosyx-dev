//carregando modulos
const sql = require('mssql');
const express = require('express');
const router = express.Router();
const config = require('../../../config/config.json');
const { get } = require('../../../lib/poolManager')
const connection = require('../../../config/' + config.banco);

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
        pageNumber,
        pageSize
    } = req.query


    const dataInicialParam = dataInicial === " " ? null : dataInicial;
    const dataFinalParam = dataFinal === " " ? null : dataFinal;

    retornaDadosHistoricoFeedback(dataInicial, dataFinal, idCliente, idOperacao, idDiretor, idGerente, idCoordenador, idSupervisor, idOperador, pageNumber, pageSize, dataInicialParam, dataFinalParam, res);
});
async function retornaDadosHistoricoFeedback(dataInicial, dataFinal, idCliente, idOperacao, idDiretor, idGerente, idCoordenador, idSupervisor, idOperador, pageNumber, pageSize, dataInicialParam, dataFinalParam, res) {
    try {

        let pool = await get('BDRechamadasGeral', connection)
         let resultFeedBackHistorico = await pool.request()
            .input('idCliente', sql.VarChar, idCliente)
            .input('idOperacao', sql.VarChar, idOperacao)
            .input('idDiretor', sql.VarChar, idDiretor)      
            .input('idGerente', sql.VarChar, idGerente)  
            .input('idCoordenador', sql.VarChar, idCoordenador)
            .input('idSupervisor', sql.VarChar, idSupervisor)
            .input('idOperador', sql.VarChar, idOperador)
            .input('dataInicial', sql.DateTime, dataInicialParam)
            .input('dataFinal', sql.DateTime, dataFinalParam)
            .input('pageNumber', sql.Int, pageNumber)
            .input('pageSize', sql.Int, pageSize)
            .execute('s_Gestao_Performace_Retorna_Feedback_Painel')

        let retorno = {
            historicoFeedback: resultFeedBackHistorico.recordset
        };

        res.json(retorno);

    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};
module.exports = router