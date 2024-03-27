//carregando modulos
const sql = require('mssql');
const express = require('express');
const router = express.Router();
const config = require('../../../config/config.json');
const { get } = require('../../../lib/poolManager')
const connection = require('../../../config/' + config.executiva);

//Rota principal
router.get('/', function (req, res) {

    const {
        idCliente= "-1",
        idOperacao= "-1",
        idDiretor= "-1",
        idGerente= "-1",
        idCoordenador= "-1",
        idSupervisor= "-1",
        idOperador = "-1",
        cIndicador = '|-1|',
    } = req.query

    retornaDados(idCliente, idOperacao, idDiretor, idGerente, idCoordenador, idSupervisor, idOperador, cIndicador,  res);
});
async function retornaDados(idCliente, idOperacao, idDiretor, idGerente, idCoordenador, idSupervisor, idOperador, cIndicador, res) {
     try {

        let pool = await get('BDRechamadasGeral', connection)
        let resultIndicador = await pool.request()
            .input('idCliente', sql.VarChar, idCliente)
            .input('idOperacao', sql.VarChar, idOperacao)
            .input('idDiretor', sql.VarChar, idDiretor)
            .input('idGerente', sql.VarChar, idGerente)
            .input('idCoordenador', sql.VarChar, idCoordenador)
            .input('idSupervisor', sql.VarChar, idSupervisor)
            .input('idOperador', sql.VarChar, idOperador)
            .input('codigoIndicador', sql.VarChar, cIndicador)
            .execute('s_Gestao_Executiva_Retorna_Indicadores_v2')
        

        let retorno = {
            indicadores: resultIndicador?.recordset

        };

        res.json(retorno);

    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};

module.exports = router