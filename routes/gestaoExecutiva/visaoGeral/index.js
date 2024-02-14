//carregando modulos
const sql = require('mssql');
const express = require('express');
const router = express.Router();
const { get } = require('../../../lib/poolManager')
const config = require('../../../config/config.json');
const connection = require('../../../config/' + config.executiva);

router.get('/', function (req, res) {

    const {
        idCliente= "-1",
        idOperacao= "-1",
        idDiretor= "-1",
        idGerente= "-1",
        idCoordenador= "-1",
        idSupervisor= "-1",
        cIndicador,
    } = req.query

    retornaDados(idCliente, idOperacao, idDiretor, idGerente, idCoordenador, idSupervisor, cIndicador, res);
});

async function retornaDados(idCliente, idOperacao, idDiretor, idGerente, idCoordenador, idSupervisor, cIndicador,  res) {
    try {

        let pool = await get('BDRechamadasGeral', connection)

        let resultVisaoGeral = await pool.request()
            .input('idCliente', sql.VarChar, idCliente)
            .input('idOperacao', sql.VarChar, idOperacao)
            .input('idDiretor', sql.VarChar, idDiretor)
            .input('idGerente', sql.VarChar, idGerente)
            .input('idCoordenador', sql.VarChar, idCoordenador)
            .input('idSupervisor', sql.VarChar, idSupervisor)
            .execute('s_Gestao_Executiva_Retorna_Visao_Geral')



        let retorno = {
            visaoGeral: resultVisaoGeral?.recordset,
        };

        res.json(retorno);

    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports = router