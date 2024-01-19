//carregando modulos
const sql = require('mssql');
const express = require('express');
const router = express.Router();
const config = require('../../config/config.json');
const { get } = require('../../lib/poolManager')
const connection = require('../../config/' + config.banco);


//rota para obter feedback
router.get('/', function (req, res) {

    const {
        idOperador,
    } = req.query

    retornaDadosFeedback(idOperador, res)
});
async function retornaDadosFeedback(idOperador, res) {
    try {

        let pool = await get('BDRechamadasGeral', connection)
        console.log('procedura retorna cards orimeira request')
        // Requisição do banco
        let resultFeedback = await pool.request()
            //define os parametros
            .input('idOperador', sql.VarChar, idOperador)
            .execute('s_Sup_Digital_Retorna_Feedback_Popup')    

        let retorno = {
         
            feedback: await Promise.all (resultFeedback.recordset?.map(async i =>{
               
                if(!i.positivo){
                    let resultMotivos = await pool.request()
                    //define os parametros
                        .input('cFeedback', sql.Int, i.id)
                        .execute('s_Sup_Digital_Retorna_Motivo_Feedback') 
                    console.log(resultMotivos)
                    i.motivos = resultMotivos.recordset
                    return i
                
                }else{
                    return i
                }

            })),
        }

        res.json(retorno)

    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

// Rota de update nos feedback
router.put('/atualizafeedback', function (req, res) {
    const {
        cFeedback,
        cMotivo,
    } = req.body;

    if (!cFeedback && !cMotivo) {
        res.status(400).json('cFeedback e cMotivo é obrigatório.');
        return;
    }

    atualizaFeedback(cFeedback, cMotivo, res);

});

async function atualizaFeedback(cFeedback, cMotivo, res) {
    try {
        let pool = await get('BDRechamadasGeral', connection);

        // Requisição do banco para a stored procedure
        let resultUpdate = await pool.request()
            .input('cFeedback', sql.Int, cFeedback)
            .input('cMotivo', sql.Int, cMotivo)
            .execute('s_Sup_Digital_Atualiza_Feedback_Historico');

        // Resultado da stored procedure
        let retorno = {
            update: resultUpdate?.recordset,
        };

        res.json(retorno);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};

module.exports = router;
