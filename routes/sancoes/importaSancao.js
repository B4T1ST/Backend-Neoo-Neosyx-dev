//carregando modulos
const sql           = require('mssql');
const express       = require('express');
const router        = express.Router();
const config        = require('../../config/config.json');

const { get } = require('../../lib/poolManager')
const connection = require('../../config/' + config.sancoes);


//Retorna infrações
router.post('/', async function(req, res) {
  const {
    loginUsuario,
    listaSancoes
  } = req.body     

  if (!loginUsuario) {
    res.status(400).json('loginUsuario não informado.')
  }

  let result = true;

  //insere as sanções na buffer
  listaSancoes.map(async (sancao) => {        

    //se nao der erro
    if (result) {
      const retorno = await importaSancao (
        loginUsuario, 
        sancao.matricula, 
        sancao.infracao, 
        sancao.dataInfracao, 
        sancao.medida, 
        sancao.dataMedida, 
        sancao.observacao,
        1, 
        res
      )
      result = retorno.result;
    }
  })
  
  if (!result) {
    res.status(400).json('erro ao realizar a importação, por favor verifique o arquivo e tente novamente.')
    return;
  } else {
    //insere da buffer na tabela definitiva
    const retorno = await importaSancao(loginUsuario, '', '', '', '', '', '', 2, res)
    console.log(retorno)
    res.json(retorno)
  }
  
});

async function importaSancao(loginUsuario, matricula, infracao, dataInfracao, medida, dataMedida, observacao, buffer, res) {
  try {
    let pool = await get('BDDosimetria', connection)
      // Requisição do banco
    let result = await pool.request()
      //define os parametros
      .input('loginUsuario', sql.VarChar(200), loginUsuario)  
      .input('matricula', sql.VarChar(100), matricula)
      .input('infracao', sql.VarChar(1000), infracao)
      .input('dataInfracao', sql.VarChar(15), dataInfracao)
      .input('medida', sql.VarChar(1000), medida)
      .input('dataMedida', sql.VarChar(15), dataMedida)
      .input('observacao', sql.VarChar, observacao ? observacao : '')
      .input('urlArquivo', sql.VarChar, '')
      .input('nomeArquivo', sql.VarChar, '')    
      .input('buffer', sql.Int, buffer)

      //executa a procedure
      .execute('s_Sancoes_Acompanhamento_Importa_Sancao')
    
    if (!result.recordsets) {
        res.status(500).json('Não foi possível retornar os dados.')
        return
    }
     
    let retorno = result.recordset[0]
    
    return retorno

  } catch (error) {
      res.status(500).json(error)
      return
  }
}

module.exports = router