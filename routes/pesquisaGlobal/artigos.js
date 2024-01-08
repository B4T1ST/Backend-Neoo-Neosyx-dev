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

async function retornaArtigos(loginUsuario,cColecao, cArticle, pesquisa,res){
  try {
      if (cArticle) {

          // Requisição do banco
          let result = await global.conn.request()
              //define os parametros
              .input('loginUsuario'   , sql.VarChar(100) , loginUsuario ? loginUsuario : '')
              .input('cArtigo'        , sql.Int          , cArticle)
              
              //executa a procedure  
              .execute('s_Pesquisa_Global_Retorna_Artigos')
          
          if (!result.recordsets) {
              res.status(500).json('Não foi possível retornar o artigo.')
          }

          //Puxando array com as informações do Artigo  
          let artigo = {
              nome: result.recordsets[0][0]?.nome,
              descricao: result.recordsets[0][0]?.descricao,
              anonimo: result.recordsets[0][0]?.anonimo,
              conteudo: result.recordsets[0][0]?.conteudo,
              dataCriacao: result.recordsets[0][0]?.dataCriacao,
              nomeCriador: result.recordsets[0][0]?.nomeCriador,
              urlImagem: result.recordsets[0][0]?.urlImagem,
              cLoginCriador: result.recordsets[0][0]?.cLoginCriador,
              cCategorias: result.recordsets[1],
              cColecoes: result.recordsets[2],
              cPerfis: result.recordsets[3],
          }                

          //Criando variável de retorno com as informações finais do artigo.
          res.json(artigo)

      } else {

          // Requisição do banco
          let result = await global.conn.request()
              //define os parametros
              .input('loginUsuario'        , sql.VarChar(100) , loginUsuario ? loginUsuario : '')
              .input('cColecao'        , sql.Int          , cColecao ? cColecao : -1)
              .input('pesquisa'       , sql.NVarChar , pesquisa ? pesquisa : '')
              //executa a procedure  
              .execute('s_Pesquisa_Global_Retorna_Artigos')
          
          if (!result.recordsets) {
              res.status(500).json('Não foi possível retornar artigos.')
          }

          //Puxando array com as informações das coleções   
          let artigos = result.recordset

          //Criando variável de retorno com as informações finais das coleções
          res.json(artigos)

      }

  } catch (error) {
      res.status(500).json(error)
  }
}

//Rota que retorna os artigos
router.get('/', function(req, res) {
  const {loginUsuario,cCollection, cArticle, pesquisa} = req.query 
  console.log(loginUsuario,cCollection, cArticle, pesquisa)

  if (!loginUsuario) {
      res.status(400).json('loginUsuario não informado.')
  }

  retornaArtigos(loginUsuario,cCollection, cArticle, pesquisa, res)
});


module.exports = router