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
    top,
  } = req.query     

  if (!loginUsuario) {
    res.status(400).json('loginUsuario não informado.')
    return
  }

  if (!pesquisa) {
    res.status(400).json('pesquisa não informada.')
    return
  }


  pesquisaPosts(loginUsuario, pesquisa, top,  res)
});

async function pesquisaPosts(loginUsuario, pesquisa, top, res){
  let retorno;
  global.conn.request()
  //define os parametros
  .input('loginUsuario'         , sql.VarChar(200)  , loginUsuario) 
  .input('pesquisa'            ,  sql.NVarChar       , pesquisa)
  .input('top'                  , sql.Int           , top ? top : 30)

  //executa a procedure  
  .execute('s_Pesquisa_Global_Retorna_Posts')
  .then(async result => {
    try{
        //faz um map nos itens do recordset
        const final = result.recordset.map(async item => {
            //insere o campo comentário
            const arrayComentarios = await retornaComentariosPost(loginUsuario, item.codigo, res)
            const arrayWorkspaces  = await retornaPostWorkspaces(loginUsuario, item.codigo, res)
            const arrayHashtags    = await retornaHashtagsPost(loginUsuario, item.codigo, res)      
            
            return {                            
                ...item,
                comentarios : arrayComentarios,   
                workspaces : arrayWorkspaces,
                hashtags : arrayHashtags
            };                  
        })

        //retorna o json com os seus requests asincronos               
        retorno = await Promise.all(final)
        res.json((retorno.length > 0) ? retorno : [])
    }catch(error) {
        res.json(null)
        console.error("Error :" + error);
    }
    
})
.catch(err => res.json(err));
}

async function retornaComentariosPost(loginUsuario, codigoPost, res){
  let promise = new Promise(function (resolve, reject){
      global.conn.request()
      //define os parametros
      .input('loginUsuario'     , sql.VarChar(200), loginUsuario)
      .input('codigoPost'       , sql.Int         , codigoPost)
      //executa a procedure  
      .execute('s_WorkMedia_Feed_Retorna_Comentario')
          .then(result => {
              resolve(result.recordset)                
          })
          .catch(err => {
              res.json(err)
              resolve(err)
          })      
  })
      return promise   
}

async function retornaPostWorkspaces(loginUsuario, cPost, res){
  let promise = new Promise(function (resolve, reject){
      global.conn.request()
      //define os parametros
      .input('loginUsuario'     , sql.VarChar(200), loginUsuario)
      .input('cPost'            , sql.Int         , cPost)
      //executa a procedure  
      .execute('s_Retorna_Post_Workspaces')
          .then(result => {
              resolve(result.recordset)                
          })
          .catch(err => {
              res.json(err)
              resolve(err)
          })      
  })
      return promise   
}

async function retornaHashtagsPost(loginUsuario, cPost, res){
  let promise = new Promise(function (resolve, reject){
  global.conn.request()
      //define os parametros
      .input('loginUsuario'   , sql.VarChar(100)  , loginUsuario)
      .input('cPost'          , sql.Int           , cPost)
      //executa a procedure  
      .execute('s_Retorna_Post_Hashtags')
          .then(result => {
              resolve(result.recordset)                
          })
          .catch(err => {
              res.json(err)
              resolve(err)
          })
  })    
      return promise
}



module.exports = router