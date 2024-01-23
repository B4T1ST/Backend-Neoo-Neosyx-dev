//carregando modulos
const sql = require('mssql');
const express = require('express');
const router = express.Router();
const config = require('../../../config/config.json');
const { get } = require('../../../lib/poolManager')
const connection = require('../../../config/' + config.banco);

router.get('/', function (req, res) {

    const {
        idGerente= "-1",
        idCoordenador= "-1",
        idSupervisor= "-1",
        idOperador = "-1",
    } = req.query

    retornaDadosRocoins(idGerente, idCoordenador, idSupervisor, idOperador,  res);
});
async function retornaDadosRocoins(idGerente, idCoordenador, idSupervisor, idOperador,  res) {
    try {

        let pool = await get('BDRechamadasGeral', connection)


        let resultRocoins = await pool.request()
            .input('idGerente', sql.VarChar, idGerente)
            .input('idCoordenador', sql.VarChar, idCoordenador)
            .input('idSupervisor', sql.VarChar, idSupervisor)
            .input('idOperador', sql.VarChar, idOperador)
            .execute('s_Gestao_Performance_Retorna_Dados_Rocoins')


        let retorno = {
            rocoins:resultRocoins?.recordset
        };

        res.json(retorno);

    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};
module.exports = router