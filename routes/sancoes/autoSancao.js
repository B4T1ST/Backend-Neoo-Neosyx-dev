//carregando modulos
const sql           = require('mssql');
const express       = require('express');
const router        = express.Router();
const config        = require('../../config/config.json');
const { get } = require('../../lib/poolManager')
const connection = require('../../config/' + config.sancoes);

//Aplica alteração no status da sanção apartir das ações do Acompanhamento de Sanções
router.post('/', function(req, res) {
  const {
    loginUsuario, 
    cColaborador
  } = req.body     

  if (!loginUsuario) {
    res.status(400).json('loginUsuario não informado.')
  }

  if (!cColaborador) {
    res.status(400).json('cColaborador não informado.')
  }

  executarAcao(loginUsuario, cColaborador, res)
});

async function executarAcao(loginUsuario, cColaborador, res){
  try {
    // Requisição do banco
    let result = await global.conn.request()
      //define os parametros
      .input('loginUsuario', sql.VarChar(200), loginUsuario)
      .input('cColaborador', sql.Int, cColaborador)

      //executa a procedure  
      .execute('s_Sancoes_Acompanhamento_Insere_Sancao_Supervisor')

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