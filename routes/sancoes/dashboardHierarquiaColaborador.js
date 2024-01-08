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

  retornaDashHierarquiaColaborador(loginUsuario, parametro, res)
});

async function retornaDashHierarquiaColaborador(loginUsuario, parametro, res){
  try {
    let pool = await get('BDDosimetria', connection)
    // Requisição do banco
    let result = await pool.request()
      //define os parametros
      .input('loginUsuario'      , sql.VarChar(200)  , loginUsuario)      
      .input('parametro'         , sql.VarChar  , parametro)

      //executa a procedure  
      .execute('s_Sancoes_Dashboard_Retorna_Status_Hierarquia_Colaborador')
    
    if (!result.recordsets) {
        res.status(500).json('Não foi possível retornar os dados.')
    }



    //Puxando array com as informações das coleções   
    let retorno = [];

    result.recordset.forEach(item => {
      retorno.push(
        {
          nome: item.nome,
          qtdSancoes: item.aplicadasSucesso + item.prazoExcedido + item.ocorrenciaJustificada + item.pendenteSupervisor,
          categorias: [
            {
              label: 'Aplicadas com sucesso',
              value: item.aplicadasSucesso
            },
            {
              label: 'Prazo excedido',
              value: item.prazoExcedido
            },
            {
              label: 'Ocorrência justificada',
              value: item.ocorrenciaJustificada
            },
            {
              label: 'Pendente do supervisor',
              value: item.pendenteSupervisor
            },
          ]
        }
      );  
    });

    //Criando variável de retorno com as informações finais das coleções
    res.json(retorno)

  } catch (error) {
      res.status(500).json(error)
  }
}



module.exports = router