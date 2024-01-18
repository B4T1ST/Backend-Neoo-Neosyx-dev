const sql = require('mssql');
const express = require('express');
const router = express.Router();
const config = require('../../config/config.json');
const connection = require('../../config/' + config.banco);
const { get } = require('../../lib/poolManager')

//rota para retornar agentes
router.get('/agentes', function (req, res) {
    const {
        idOperador
    } = req.query



    retornaDadosagente(idOperador,  res)
});

async function retornaDadosagente(idOperador, res) {
    try {

        let pool = await get('BDRechamadasGeral', connection)
        // Requisição do banco
        let result = await pool.request()
            //define os parametros
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
        idCliente,
        idOperacao,
        idDiretor,
        idGerente,
        idCoordenador,
        idSupervisor,
        idOperador,
        cComparativo = 1,
        cIndicador,
        almopeResponsavel,
        isFirstRendering
    } = req.query


    const dataInicialParam = dataInicial === " " ? null : dataInicial;
    const dataFinalParam = dataFinal === " " ? null : dataFinal;

    retornaDados(dataInicial, dataFinal, idCliente, idOperacao, idDiretor, idGerente, idCoordenador, idSupervisor, idOperador, cComparativo, cIndicador, almopeResponsavel, isFirstRendering, dataInicialParam, dataFinalParam, res);
});

async function retornaDados(dataInicialParam, dataFinalParam, idCliente, idOperacao, idDiretor, idGerente, idCoordenador, idSupervisor, idOperador, cComparativo, cIndicador, almopeResponsavel, isFirstRendering, dataInicialParam, dataFinalParam, res) {
    try {
        let pool = await get('BDGamification', connection);
        console.log('Procedura retorna historico primeira request');

        // Requisição do banco
        let resultFeedBackHistorico = await pool.request()
            .input('idGerente', sql.VarChar, idGerente)  
            .input('idCoordenador', sql.VarChar, idCoordenador)
            .input('idSupervisor', sql.VarChar, idSupervisor)
            .input('idOperador', sql.VarChar, idOperador)
            .input('dataInicial', sql.DateTime, dataInicialParam)
            .input('dataFinal', sql.DateTime, dataFinalParam)
            .execute('s_Gestao_Performace_Retorna_Feedback_Historico')

        let retorno = {
            feedbackHistorico: resultFeedBackHistorico.recordset
        };

        res.json(retorno);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

router.get('/extracaoXlsx', function (req, res) {

    const {
        almope
    } = req.query


    retornaDadosExtracao(almope, res)
});

async function retornaDadosExtracao(almope, res){
    try {
        let pool = await get('BDGamification', connection);
        console.log('Procedura retorna historico primeira request');

        let resultFeedBackHistoricoExtracao = await pool.request()

            .input('almope', sql.VarChar, almope)
            .execute('s_Sup_Digital_Retorna_Feedback_Historico_Xlsx')
        
        let retorno = {
            feedbackHistoricoExtracao: resultFeedBackHistoricoExtracao.recordset
        };

        res.json(retorno);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

module.exports = router;