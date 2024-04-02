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
        exportacao = "0"
    } = req.query

    if (!dataInicial) {
        res.status(400).json('Parâmetro dataInicial não informado.')
        return
    }

    if (!dataFinal) {
        res.status(400).json('Parâmetro dataFinal não informado.')
        return
    }

    retornaDadosTabela(
        dataInicial, 
        dataFinal, 
        idCliente, 
        idOperacao, 
        idDiretor, 
        idGerente, 
        idCoordenador, 
        idSupervisor, 
        idOperador, 
        exportacao,
        res
    )
});

async function retornaDadosTabela(dataInicial, dataFinal, idCliente, idOperacao, idDiretor, idGerente, idCoordenador, idSupervisor, idOperador, exportacao, res) {
    try {

        let pool = await get('BDRechamadasGeral', connection)
        // Requisição do banco
        let result = await pool.request()
            //define os parametros
            .input('dataInicial',   sql.DateTime,       dataInicial)
            .input('dataFinal',     sql.DateTime,       dataFinal)
            .input('idCliente',     sql.VarChar(100),   idCliente)
            .input('idOperacao',    sql.VarChar(100),   idOperacao)
            .input('idDiretor',     sql.VarChar(100),   idDiretor)
            .input('idGerente',     sql.VarChar(100),   idGerente)
            .input('idCoordenador', sql.VarChar(100),   idCoordenador)
            .input('idSupervisor',  sql.VarChar(100),   idSupervisor)
            .input('idOperador',    sql.VarChar(100),   idOperador)
            .input('exportacao',    sql.Int,            exportacao)
            .execute('s_Gestao_Performance_Extrato_Roccoins_Retorna_Dados_Tabela')    

        let retorno = result.recordset
         
        res.json(retorno)

    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

module.exports = router;
