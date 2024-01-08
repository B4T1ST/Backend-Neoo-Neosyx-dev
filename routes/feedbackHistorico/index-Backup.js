const sql = require('mssql');
const express = require('express');
const router = express.Router();
const config = require('../../config/config.json');
const connection = require('../../config/' + config.banco);
const { get } = require('../../lib/poolManager')

//rota para retornar agentes
router.get('/agentes', function (req, res) {
    const {
        almope,
    } = req.query

    if (!almope) {
        res.status(400).json('almope não informado.')
        return
    }


    retornaDadosagente(almope,  res)
});

async function retornaDadosagente(almope, res) {
    try {

        let pool = await get('BDRechamadasGeral', connection)
        // Requisição do banco
        let result = await pool.request()
            //define os parametros
            .input('almope', sql.VarChar, almope)
            
            .execute('s_Monitoramento_Agentes_Retorna_Agentes_Supervisor')


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
        almope,
        dataInicial,
        dataFinal,
    } = req.query


    retornaDados(almope, dataInicial, dataFinal, res)
});

async function retornaDados(almope, dataInicial, dataFinal, res){
    try {
        let pool = await get('BDGamification', connection);
        console.log('Procedura retorna historico primeira request');

        // Requisição do banco
        let resultFeedBackHistorico = await pool.request()
            // Define os parâmetros
            .input('almope', sql.VarChar, almope)
            .input('dataInicial', sql.VarChar(10), dataInicial)
            .input('dataFinal', sql.VarChar(10), dataFinal)
            .execute('s_Sup_Digital_Retorna_Feedback_Historico_V3')
        
        // Retorna o primeiro conjunto de resultados (index 0)
        let retorno = {
            feedbackHistorico: resultFeedBackHistorico.recordset
        };

        res.json(retorno);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

module.exports = router;