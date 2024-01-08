//carregando modulos
const sql           = require('mssql');
const express       = require('express');
const router        = express.Router();
const config        = require('../../config/config.json');
const { get } = require('../../lib/poolManager')
const connection = require('../../config/' + config.sancoes);

router.get('/', function(req, res) {
  const {
    loginUsuario,
    parametro
  } = req.query     

  if (!loginUsuario) {
    res.status(400).json('loginUsuario não informado.')
  }

  if (!parametro) {
    res.status(400).json('parametro não informado.')
  }

  retornaDashStatus(loginUsuario, parametro, res)
});

async function retornaDashStatus(loginUsuario, parametro, res){
  try {
      let pool = await get('BDDosimetria', connection)
      // Requisição do banco
      let result = await pool.request()
        //define os parametros
        .input('loginUsuario'      , sql.VarChar(200)  , loginUsuario)      
        .input('parametro'         , sql.VarChar  , parametro)

        //executa a procedure  
        .execute('s_Sancoes_Dashboard_Retorna_Status_Periodo')
    
    if (!result.recordsets) {
        res.status(500).json('Não foi possível retornar os dados.')
    }

    //Puxando array com as informações das coleções   
    let retorno = result.recordset 

    //Criando variável de retorno com as informações finais das coleções
    res.json(retorno)

  } catch (error) {
      res.status(500).json(error)
  }
}



module.exports = router