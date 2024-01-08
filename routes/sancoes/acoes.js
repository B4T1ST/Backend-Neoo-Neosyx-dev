//carregando modulos
const sql           = require('mssql');
const express       = require('express');
const router        = express.Router();
const config        = require('../../config/config.json');
const { get } = require('../../lib/poolManager')
const connection = require('../../config/' + config.sancoes);

//Aplica alteração no status da sanção apartir das ações do Acompanhamento de Sanções
router.put('/', function(req, res) {
  const {
    loginUsuario, 
    codigo, 
    acao, 
    observacao,
    cMotivoCancelamento,
  } = req.body     

  if (!codigo) {
    res.status(400).json('codigo não informado.')
  }

  if (!loginUsuario) {
    res.status(400).json('loginUsuario não informado.')
  }

  if (!acao) {
    res.status(400).json('acao não informado.')
  }

  executarAcao(loginUsuario, codigo, acao, observacao, cMotivoCancelamento, res)
});

async function executarAcao(loginUsuario, codigo, acao, observacao, cMotivoCancelamento, res){
  try {
    const procs = {
      aprovar: 's_Sancoes_Acompanhamento_Aprova_Sancao',
      cancelar: 's_Sancoes_Acompanhamento_Cancela_Sancao',
      desfazerCancelamento: 's_Sancoes_Acompanhamento_Desfaz_Cancelamento_Sancao'    
    }

    let pool = await get('BDDosimetria', connection)
    // Requisição do banco
    let result = await pool.request()
      //define os parametros
      .input('loginUsuario'         , sql.VarChar(200)  , loginUsuario)
      .input('codigoSancao'               , sql.Int           , codigo);
    
    if(acao == "desfazerCancelamento") {
        result.input('observacao'           , sql.VarChar       , observacao ? observacao : '')
    }
    if(acao == "cancelar") {
        result.input('codigoMotivoCancelamento'  , sql.Int           , cMotivoCancelamento ? cMotivoCancelamento : '')   
    }
    
    //executa a procedure  
    result = await result.execute(procs[acao])
    
    if (!result.recordset) {
        res.status(500).json('Não foi possível retornar os dados.')
    }
     
    let retorno = result.recordset 

    res.json(retorno)

  } catch (error) {
      res.status(500).json(error)
  }
}



module.exports = router