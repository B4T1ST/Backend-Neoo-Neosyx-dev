//carregando modulos
const sql = require('mssql');
const express = require('express');
const router = express.Router();
const config = require('../../../config/config.json');
const { get } = require('../../../lib/poolManager')
const connection = require('../../../config/' + config.executiva);

//Rota principal
router.get('/', function (req, res) {

    retornaDados(res);
});
async function retornaDados(res) {
    try {

        let pool = await get('BDRechamadasGeral', connection)
        let resultIndicador = await pool.request()
            .execute('s_Gestao_Executiva_Retorna_Indicadores')
        

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