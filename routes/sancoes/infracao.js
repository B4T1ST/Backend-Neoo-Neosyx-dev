//carregando modulos
const sql           = require('mssql');
const express       = require('express');
const router        = express.Router();
const config        = require('../../config/config.json');
const { get } = require('../../lib/poolManager')
const connection = require('../../config/' + config.sancoes);

//Retorna infrações
router.get('/', function(req, res) {
  const {
    loginUsuario,
    matricula
  } = req.query     

  if (!loginUsuario) {
    res.status(400).json('loginUsuario não informado.')
  }

  if (!matricula) {
    res.status(400).json('loginUsuario não informado.')
  }

  retornaInfracoes(loginUsuario, matricula, res)
});

async function retornaInfracoes(loginUsuario, matricula, res){
  try {
    let pool = await get('BDDosimetria', connection)
      // Requisição do banco
      let result = await pool.request()
        //define os parametros
        .input('loginUsuario'         , sql.VarChar(200)  , loginUsuario)      
        .input('matricula'              , sql.VarChar(200)  , matricula) 

        //executa a procedure  
        .execute('s_Sancoes_Acompanhamento_Retorna_Infracoes')
    
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