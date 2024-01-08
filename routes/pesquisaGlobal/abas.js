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
  } = req.query     

  if (!loginUsuario) {
    res.status(400).json('loginUsuario não informado.')
    return
  }



  pesquisaUsuario(loginUsuario, res)
});

async function pesquisaUsuario(loginUsuario, res){
  try {
    // Requisição do banco
    let result = await global.conn.request()
        //define os parametros
        .input('loginUsuario'         , sql.VarChar(200)  , loginUsuario)   

        //executa a procedure  
        .execute('s_Pesquisa_Global_Retorna_Abas')
    
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