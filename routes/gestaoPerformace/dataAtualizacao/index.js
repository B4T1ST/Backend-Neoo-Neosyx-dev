//carregando modulos
const sql = require('mssql');
const express = require('express');
const router = express.Router();
const config = require('../../../config/config.json');
const { get } = require('../../../lib/poolManager')
const connection = require('../../../config/' + config.banco);

//Rota principal
router.get('/', function (req, res) {

    const {
        dataInicial,
        dataFinal,
    } = req.query

    retornaDadosDataAtualizacao(dataInicial, dataFinal, res);
});
async function retornaDadosDataAtualizacao(dataInicial, dataFinal, res) {
    try {

        let pool = await get('BDRechamadasGeral', connection)

        let resultDataAtualizacao = await pool.request()
            .input('dataInicial', sql.DateTime, dataInicial)
            .input('dataFinal', sql.DateTime, dataFinal)
            .execute('s_Sup_Digital_Retorna_Data_Atualizacao')

        let retorno = {
            dataAtualizacao: resultDataAtualizacao.recordset,
        };

        res.json(retorno);

    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};
module.exports = router