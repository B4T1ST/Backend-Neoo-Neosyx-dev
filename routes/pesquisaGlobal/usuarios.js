//carregando modulos
const sql           = require('mssql');
const express       = require('express');
const router        = express.Router();
const config        = require('../../config/config.json');
const connection    = require('../../config/' + config.banco);

//fazendo a conexão global
sql.connect(connection)
.then(conn => global.conn = conn)
.catch(err => console.log(err))

//Retorna Medidas
router.get('/', function(req, res) {
  const {
    loginUsuario, 
    pesquisa, 
  } = req.query     

  if (!loginUsuario) {
    res.status(400).json('loginUsuario não informado.')
    return
  }

  if (!pesquisa) {
    res.status(400).json('pesquisa não informada.')
    return
  }


  pesquisaUsuario(loginUsuario, pesquisa, res)
});

async function pesquisaUsuario(loginUsuario, pesquisa, res){
  try {
    // Requisição do banco
    let result = await global.conn.request()
        //define os parametros
        .input('loginUsuario'         , sql.VarChar(200)  , loginUsuario) 
        .input('pesquisa'            ,  sql.NVarChar       , pesquisa)    

        //executa a procedure  
        .execute('s_Pesquisa_Global_Retorna_Usuarios')
    
    if (!result.recordsets) {
        res.status(500).json('Não foi possível retornar os dados.')
        return
    }

     
    let retorno = result.recordset 
    
    res.json(retorno)

  } catch (error) {
      res.status(500).json(error)
      return
  }
}

module.exports = router