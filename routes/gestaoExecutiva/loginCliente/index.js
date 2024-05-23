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
        almope
    } = req.query

    retornaDados(almope, res);
});
async function retornaDados(almope, res) {
    try {

        let pool = await get('BDRechamadasGeral', connection)
        let resultLoginCliente = await pool.request()
            .input('almope', sql.VarChar, almope)
            .execute('s_Gestao_Executiva_Retorna_Dados_Login_Cliente_dev')
        

        let retorno = {
            loginCliente: resultLoginCliente?.recordset

        };

        res.json(retorno);

    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};

module.exports = router