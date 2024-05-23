//carregando modulos
const sql = require('mssql');
const express = require('express');
const router = express.Router();
const { get } = require('../../../lib/poolManager')
const config = require('../../../config/config.json');
const connection = require('../../../config/' + config.banco);

router.get('/interacoes', function (req, res) {
    
    const {
        almope,
        dataInicial,
        dataFinal,
        isCrescente,
        pesquisa
    } = req.query

    retornaDadosInteracoes(almope, dataInicial, dataFinal, isCrescente, pesquisa, res);
});

router.get('/acessos', function (req, res) {
    
    const {
        almope,
        dataInicial,
        dataFinal,
        isCrescente,
        pesquisa
    } = req.query

    retornaDadosAcessos(almope, dataInicial, dataFinal, isCrescente, pesquisa, res);
});

async function retornaDadosInteracoes(almope, dataInicial, dataFinal, isCrescente, pesquisa, res) {
    try {
        let pool = await get('BDRechamadasGeral', connection)
            let result = await pool.request()
                .input('almope',        sql.VarChar(100),   almope)
                .input('dataInicial',   sql.DateTime,       dataInicial)
                .input('dataFinal',     sql.DateTime,       dataFinal)
                .input('isCrescente',   sql.Bit,            isCrescente)
                .input('pesquisa',      sql.VarChar,        pesquisa)
                .execute('s_Auditoria_Interacoes_Retorna_Relatorio_Interacoes') 
            
        let retorno = result.recordset;

        res.json(retorno);

    } catch (error) {
        res.status(500).json(error)
    }
}

async function retornaDadosAcessos(almope, dataInicial, dataFinal, isCrescente, pesquisa, res) {
    try {
        let pool = await get('BDRechamadasGeral', connection)
            let result = await pool.request()
                .input('almope',        sql.VarChar(100),   almope)
                .input('dataInicial',   sql.DateTime,       dataInicial)
                .input('dataFinal',     sql.DateTime,       dataFinal)
                .input('isCrescente',   sql.Bit,            isCrescente)
                .input('pesquisa',      sql.VarChar,        pesquisa)
                .execute('s_Auditoria_Interacoes_Retorna_Relatorio_Acessos') 
            
        let retorno = result.recordset;

        res.json(retorno);

    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports = router