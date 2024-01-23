//carregando modulos
const sql = require('mssql');
const express = require('express');
const router = express.Router();
const config = require('../../../config/config.json');
const { get } = require('../../../lib/poolManager')
const connection = require('../../../config/' + config.banco);

router.get('/', function (req, res) {
    const {
        almope
    } = req.query

    retornaDadosUsuario(almope,  res)
});

async function retornaDadosUsuario(almope, res) {
    try {

        let pool = await get('BDRechamadasGeral', connection)
        let resultColaborador = await pool.request()
            .input('almope', sql.VarChar, almope)
            .execute('s_Gestao_Performance_Retorna_Dados_Colaborador')

        let retorno = {
            cargo: resultColaborador?.recordset
        }

        res.json(retorno)

    } catch (error) {
        res.status(500).json(error)
    }
};

module.exports = router