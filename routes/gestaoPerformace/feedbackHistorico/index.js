const sql = require('mssql');
const express = require('express');
const router = express.Router();
const config = require('../../../config/config.json');
const connection = require('../../../config/' + config.banco);
const { get } = require('../../../lib/poolManager')

//rota para retornar agentes
router.get('/agentes', function (req, res) {
    const {
        idCliente= "-1",
        idOperacao= "-1",
        idDiretor= "-1",
        idGerente= "-1",
        idCoordenador= "-1",
        idSupervisor= "-1",
        idOperador = "-1",
    } = req.query

    retornaDadosagente(idCliente, idOperacao, idDiretor, idGerente, idCoordenador, idSupervisor, idOperador, res);
});

async function retornaDadosagente(idCliente, idOperacao, idDiretor, idGerente, idCoordenador, idSupervisor, idOperador, res) {
    try {

        let pool = await get('BDRechamadasGeral', connection)
        // Requisição do banco
        let result = await pool.request()
            //define os parametros
            .input('idCliente', sql.VarChar, idCliente)
            .input('idOperacao', sql.VarChar, idOperacao)
            .input('idDiretor', sql.VarChar, idDiretor)      
            .input('idGerente', sql.VarChar, idGerente)  
            .input('idCoordenador', sql.VarChar, idCoordenador)
            .input('idSupervisor', sql.VarChar, idSupervisor)
            .input('idOperador', sql.VarChar, idOperador)
            .execute('s_Gestao_Performance_Retorna_Agentes_Supervisor')

        if (!result?.recordset) {
            res.status(500).json('Não foi possível retornar os dados.')
            return;
        }

        let retorno = result.recordset

        res.json(retorno)

    } catch (error) {
        res.status(500).json(error)
    }
}
// rota de historico
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
            .execute('s_Gestao_Performace_Retorna_Feedback_Historico')

        let retorno = {
            historicoFeedback: resultFeedBackHistorico.recordset
        };

        res.json(retorno);

    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};



router.get('/extracaoXlsx', function (req, res) {

    const {
        dataInicial,
        dataFinal,
        idCliente= "-1",
        idOperacao= "-1",
        idDiretor= "-1",
        idGerente= "-1",
        idCoordenador= "-1",
        idSupervisor= "-1",
        idOperador = "-1"
    } = req.query


    // const dataInicialParam = dataInicial === " " ? null : dataInicial;
    // const dataFinalParam = dataFinal === " " ? null : dataFinal;


    retornaDadosExtracao(dataInicial, dataFinal, idCliente, idOperacao, idDiretor, idGerente, idCoordenador, idSupervisor, idOperador, res);
});

async function retornaDadosExtracao(dataInicial, dataFinal, idCliente, idOperacao, idDiretor, idGerente, idCoordenador, idSupervisor, idOperador, res){
    try {
        let pool = await get('BDGamification', connection);

        let result = await pool.request()
        .input('dataInicial', sql.DateTime, dataInicial)
        .input('dataFinal', sql.DateTime, dataFinal)
        .input('idCliente', sql.VarChar, idCliente)
        .input('idOperacao', sql.VarChar, idOperacao)
        .input('idDiretor', sql.VarChar, idDiretor)
        .input('idGerente', sql.VarChar, idGerente)
        .input('idCoordenador', sql.VarChar, idCoordenador)
        .input('idSupervisor', sql.VarChar, idSupervisor)
        .input('idOperador', sql.VarChar, idOperador)
        .execute('s_Gestao_Performace_Retorna_Feedback_Historico_Xlsx')
        
        let retorno = result.recordset

        res.json(retorno);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

module.exports = router;