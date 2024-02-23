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
        idCliente = '-1',
        idOperacao = '-1',
        idDiretor= '-1',
        idGerente= '-1',
        idCoordenador= '-1',
        idSupervisor= '-1',
        idOperador = '-1',
        cComparativo = 1,
    } = req.query

    retornaDadosPausa(dataInicial, dataFinal, idCliente, idOperacao, idDiretor, idGerente, idCoordenador, idSupervisor, idOperador,  cComparativo, res);
});
async function retornaDadosPausa(dataInicial, dataFinal, idCliente, idOperacao, idDiretor, idGerente, idCoordenador, idSupervisor, idOperador,  cComparativo, res) {
    try {

        let pool = await get('BDRechamadasGeral', connection)
        // Requisição do banco
        let result = await pool.request()
            .input('dataInicial', sql.DateTime, dataInicial)
            .input('dataFinal', sql.DateTime, dataFinal)
            .input('idGerente', sql.VarChar, idGerente)
            .input('idCoordenador', sql.VarChar, idCoordenador)
            .input('idSupervisor', sql.VarChar, idSupervisor)
            .input('idOperador', sql.VarChar, idOperador)
            .execute('s_Gestao_Performance_Retorna_Pausas')


        if (!result?.recordset) {
            res.status(500).json('Não foi possível retornar os dados.')
            return;
        }

        let retorno = result.recordset

        res.json(retorno)

    } catch (error) {
        res.status(500).json(error)
    }
};
module.exports = router