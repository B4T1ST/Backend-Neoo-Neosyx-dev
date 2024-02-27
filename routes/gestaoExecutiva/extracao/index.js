//carregando modulos
const sql = require('mssql');
const express = require('express');
const router = express.Router();
const { get } = require('../../../lib/poolManager')
const config = require('../../../config/config.json');
const connection = require('../../../config/' + config.executiva);

router.get('/', function (req, res) {

    const {
        idCliente = '-1',
        idOperacao= '-1',
        idDiretor= '-1',
        idGerente= '-1',
        idCoordenador= '-1',
        idSupervisor= '-1',
        idOperador= '-1',
        dataInicial,
        dataFinal
    } = req.query

    retornaDadosExtracao(dataInicial, dataFinal,idCliente, idOperacao, idDiretor, idGerente, idCoordenador, idSupervisor, idOperador, res)
});
async function retornaDadosExtracao(dataInicial, dataFinal,idCliente, idOperacao, idDiretor, idGerente, idCoordenador, idSupervisor, idOperador, res) {
    try {

        let pool = await get('BDRechamadasGeral', connection)
        // Requisição do banco
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
            .execute('s_Gestao_Executiva_Retorna_Extracao_Tabela_Xlsx_Agrupada')


        let retorno = result.recordset

        res.json(retorno)

    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports = router