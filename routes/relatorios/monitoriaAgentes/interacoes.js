//carregando modulos
const sql = require('mssql');
const express = require('express');
const router = express.Router();
const config = require('../../../config/config.json');
const { get } = require('../../../lib/poolManager')
const connection = require('../../../config/' + config.monitoriaAgentes);

//Aplica alteração no status da sanção apartir das ações do Acompanhamento de Sanções
router.get('/', function (req, res) {
    const {
        almope,
        dataInicio,
        dataFim
    } = req.query

    if (!almope) {
        res.status(400).json('almope não informado.')
        return
    }


    retornaDados(almope, dataInicio, dataFim,  res)
});

async function retornaDados(almope, dataInicio, dataFim, res) {
    try {

        let pool = await get('BDNeooWebNeosyx', connection)
        // Requisição do banco
        let result = await pool.request()
            //define os parametros
            .input('almope', sql.VarChar, almope ? almope : '')
            .input('dataInicio', sql.DateTime, dataInicio)
            .input('dataFim', sql.DateTime, dataFim)
            
            .execute('s_Auditoria_Interacoes_Retorna_Time_Line')


        if (!result?.recordset) {
            res.status(500).json('Não foi possível retornar os dados.')
            return;
        }

        let retorno = result.recordsets[0].map(k => 
            ({
                dia: k.data,
                dados: result.recordsets[1].filter(i => i.data == k.data)
            })
        )
        console.log(result.recordsets)
        console.log(retorno)

        res.json(retorno)

    } catch (error) {
        res.status(500).json(error)
        console.log(error)
    }
}



module.exports = router