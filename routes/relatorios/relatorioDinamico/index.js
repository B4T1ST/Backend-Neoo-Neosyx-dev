//carregando modulos
const sql = require('mssql');
const express = require('express');
const router = express.Router();
const config = require('../../../config/config.json');
const { get } = require('../../../lib/poolManager')
const connection = require('../../../config/' + config.banco);



//Retorna dados do COP Tabela
router.get('/', function (req, res) {
    const {
        loginUsuario,
        codigo,
        filtro,
    } = req.query

    if (!loginUsuario && !codigo) {
        res.status(400).json('loginUsuario não informado.')
        return
    }

    if (codigo) {
        retornaRelatorioDinamico(loginUsuario, codigo, filtro, res)
    } else {
        res.status(400).json('codigo não informado.')
        return
    }
});

async function retornaRelatorioDinamico(loginUsuario, codigo, filtro, res) {
    let retorno;
    let parametro = filtro;
    global.conn.request()
    //define os parametros
    .input('loginUsuario'         , sql.VarChar(200)  , loginUsuario) 
    .input('codigo'                  , sql.Int           , codigo)
  
    //executa a procedure  
    .execute('s_Retorna_Relatorio_Web_Dinamico')
    .then(async result => {
      try{
          //faz um map nos itens do recordset
          const final = result.recordset.map(async item => {
              const relatorio = result.recordsets[0];
              const columns = result.recordsets[1].map(item => item);
              const arrayLinhas = await retornaLinhas(loginUsuario, parametro, item.procRetorno, res)
              return {
                  relatorio: relatorio,
                  columns: columns,
                  rows: arrayLinhas
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

async function retornaLinhas(loginUsuario, parametro, proc, res){
    let promise = new Promise(function (resolve, reject){
        global.conn.request()
        //define os parametros
        .input('loginUsuario', sql.VarChar(100), loginUsuario)
        .input('parametro', sql.VarChar(1000), parametro )
        //executa a procedure  
        .execute(`${proc}`)
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

router.get('/filtro', function (req, res) {
    const {
        loginUsuario,
        codigo
    } = req.query

    if (!loginUsuario && !codigo) {
        res.status(400).json('loginUsuario não informado.')
        return
    }

    if (codigo) {
        retornaFiltro(loginUsuario, codigo, res)
    } else {
        res.status(400).json('codigo não informado.')
        return
    }
});

async function retornaFiltro(loginUsuario, codigo, res) {
    let retorno;
    global.conn.request()
    //define os parametros
    .input('loginUsuario'         , sql.VarChar(200)  , loginUsuario) 
    .input('codigo'                  , sql.Int           , codigo)
  
    //executa a procedure  
    .execute('s_Retorna_Filtro_Relatorio_Web_Dinamico')
    .then(async result => {
      try{
          //faz um map nos itens do recordset
          const final = result.recordset.map(async item => {
                const options = item.procFiltro.length > 0 && await retornaOpcoes(loginUsuario, item.procFiltro, res)
                return {
                  ...item,
                  selectOptions: options
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

async function retornaOpcoes(loginUsuario, proc, res){
    let promise = new Promise(function (resolve, reject){
        let codigo;
        global.conn.request()
        //define os parametros
        .input('loginUsuario', sql.VarChar(100), loginUsuario)
        .input('codigo', sql.Int, codigo )
        //executa a procedure  
        .execute(`${proc}`)
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

router.get('/filtro/parametro', function (req, res) {
    const {
        loginUsuario,
        codigo
    } = req.query

    if (!loginUsuario && !codigo) {
        res.status(400).json('loginUsuario não informado.')
        return
    }

    if (codigo) {
        retornaFiltroParametro(loginUsuario, codigo, res)
    } else {
        res.status(400).json('codigo não informado.')
        return
    }
});

async function retornaFiltroParametro(loginUsuario, codigo, res){
    try {
      // Requisição do banco
      let result = await global.conn.request()
          //define os parametros
          .input('loginUsuario'         , sql.VarChar(200)  , loginUsuario) 
          .input('codigo'            ,  sql.Int       , codigo)    
  
          //executa a procedure  
          .execute('s_Retorna_Parametro_Filtro_Relatorio_Web_Dinamico')
      
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

//exporta o router
module.exports = router;  