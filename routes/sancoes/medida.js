//carregando modulos
const sql           = require('mssql');
const express       = require('express');
const router        = express.Router();
const config        = require('../../config/config.json');
const { get } = require('../../lib/poolManager')
const connection = require('../../config/' + config.sancoes);

//Retorna Medidas
router.get('/', function(req, res) {
  const {
    loginUsuario, 
    cInfracao, 
    matricula
  } = req.query     

  if (!loginUsuario) {
    res.status(400).json('loginUsuario não informado.')
  }

  if (!cInfracao) {
    res.status(400).json('cInfracao não informado.')
  }

  if (!matricula) {
    res.status(400).json('matricula não informado.')
  }

  retornaMedidas(loginUsuario, cInfracao, matricula, res)
});

async function retornaMedidas(loginUsuario, cInfracao, matricula, res){
  try {
    let pool = await get('BDDosimetria', connection)
      // Requisição do banco
      let result = await pool.request()
        //define os parametros
        .input('loginUsuario'         , sql.VarChar(200)  , loginUsuario) 
        .input('matricula'            , sql.VarChar(200)  , matricula) 
        .input('codigoInfracao'       , sql.Int           , cInfracao)      

        //executa a procedure  
        .execute('s_Sancoes_Acompanhamento_Retorna_Medidas')
    
    if (!result.recordsets) {
        res.status(500).json('Não foi possível retornar os dados.')
    }

     
    let retorno = result.recordset 
    
    res.json(retorno)

  } catch (error) {
      res.status(500).json(error)
  }
}



module.exports = router