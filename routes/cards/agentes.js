//carregando modulos
const sql = require('mssql');
const express = require('express');
const router = express.Router();
const { get } = require('../../lib/poolManager')
const config = require('../../config/config.json');
const connection = require('../../config/' + config.banco);

//Aplica alteração no status da sanção apartir das ações do Acompanhamento de Sanções
router.get('/agentes', function (req, res) {
    const {
        idOperador
    } = req.query

    retornaDadosagente(idOperador,  res)
});

async function retornaDadosagente(idOperador, res) {
    try {

        let pool = await get('BDRechamadasGeral', connection)
        // Requisição do banco
        let result = await pool.request()
            //define os parametros
            .input('idOperador', sql.VarChar, idOperador)
            
            .execute('s_Gestao_Performance_Retorna_Agentes_Supervisor')


        if (!result?.recordset) {
            res.status(500).json('Não foi possível retornar os dados.')
            return;
        }

        let retorno = result.recordset

        res.json(retorno)

    } catch (error) {
        res.status(500).json(error)
    }
};
module.exports = router