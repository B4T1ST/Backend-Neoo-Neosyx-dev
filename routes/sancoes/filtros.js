//carregando modulos
const sql           = require('mssql');
const express       = require('express');
const router        = express.Router();
const config        = require('../../config/config.json');
const { get } = require('../../lib/poolManager')
const connection = require('../../config/' + config.sancoes);

//Retorna Informações para o Filtro
router.get('/', function(req, res) {
  const {
    loginUsuario, 
    cRelatorio
  } = req.query     

  if (!loginUsuario) {
    res.status(400).json('loginUsuario não informado.')
  }

  if (!cRelatorio) {
    res.status(400).json('cRelatorio não informado.')
  }

  retornaFiltro(loginUsuario, cRelatorio, res)
});

async function retornaFiltro(loginUsuario, cRelatorio, res){
  try {
    let pool = await get('BDDosimetria', connection)
      // Requisição do banco
      let result = await pool.request()
        //define os parametros
        .input('loginUsuario'         , sql.VarChar(200)  , loginUsuario)  
        .input('cRelatorio'           , sql.Int  , cRelatorio)      

        //executa a procedure  
        .execute('s_Sancoes_Retorna_Filtros_Relatorio')
    
    if (!result.recordsets) {
        res.status(500).json('Não foi possível retornar os dados.')
    }

    let campanhas     = result.recordsets[0]
    let sites         = result.recordsets[1]
    let clientes      = result.recordsets[2]
    let infracoes     = result.recordsets[3]
    let medidas       = result.recordsets[4]
    let status        = result.recordsets[5]
    let hierarquia    = result.recordsets[6]

    // let sites = result.recordsets[0]
    // let clientes = result.recordsets[1]
    // let campanhas = result.recordsets[2]
    // let medidas = result.recordsets[3]
    // let infracoes = result.recordsets[4]
    // let situacoes = result.recordsets[5]
    // let gerentes = result.recordsets[6]
    // let coordenadores = result.recordsets[7]
    // let supervisores = result.recordsets[8]

    const retorno = {
      campanhas    
      ,sites        
      ,clientes     
      ,infracoes    
      ,medidas      
      ,status       
      ,hierarquia
    }
    
    res.json(retorno)

  } catch (error) {
      res.status(500).json(error)
  }
}



module.exports = router