//carregando modulos
const sql           = require('mssql');
const express       = require('express');
const router        = express.Router();
const config        = require('../../config/config.json');
const utils         = require('../../lib/utils');
const connection    = require('../../config/' + config.banco);

//fazendo a conexão global
sql.connect(connection)
.then(conn => global.conn = conn)
.catch(err => console.log(err))

//Rota que desativa os artigos
router.delete('/', function(req, res) {
     //pega os parametros
     let loginUsuario    = req.body.loginUsuario;
     let cArtigo        = req.body.cArtigo;
 
     //função que retorna os dados no banco
     desativaArtigos(loginUsuario, cArtigo, res)
});

function desativaArtigos(loginUsuario, cArtigo, res){
    global.conn.request()
    //define os parametros
    .input('loginUsuario'   , sql.VarChar(200)  , loginUsuario)
    .input('cArtigo'        , sql.Int  , cArtigo)
    //executa a procedure  
    .execute('s_Wiki_Desativa_Artigo')
        .then(result => {            
            res.json(result.recordset)
        })
        .catch(err => res.json(err));
}

async function retornaArtigos(loginUsuario,cColecao, cArticle, pesquisa,res){
    try {
        if (cArticle) {

            // Requisição do banco
            let result = await global.conn.request()
                //define os parametros
                .input('loginUsuario'   , sql.VarChar(100) , loginUsuario ? loginUsuario : '')
                .input('cArtigo'        , sql.Int          , cArticle)
                
                //executa a procedure  
                .execute('s_Wiki_Retorna_Artigo')
            
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
                .input('pesquisa'       , sql.VarChar , pesquisa ? pesquisa : '')
                //executa a procedure  
                .execute('s_Wiki_Retorna_Artigos')
            
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

function insereArtigo(loginUsuario, nome, cCategorias, cColecoes, cPerfis, anonimo, descricao, conteudo, res){
    const tPerfis = new sql.Table() 
    const tColecoes = new sql.Table() 
    const tCategorias = new sql.Table() 

    // Columns must correspond with type we have created in database.
    tPerfis.columns.add('codigo', sql.Int)
    tColecoes.columns.add('codigo', sql.Int)
    tCategorias.columns.add('codigo', sql.Int)

    // Add rows
    cPerfis.map(codigo => tPerfis.rows.add(codigo))
    cColecoes.map(codigo => tColecoes.rows.add(codigo))
    cCategorias.map(codigo => tCategorias.rows.add(codigo))
    

    global.conn.request()
        //define os parametros
        .input('loginUsuario'        , sql.VarChar(200), loginUsuario )
        .input('nome'                , sql.VarChar(200), nome )
        .input('cCategorias'         , tCategorias )
        .input('cColecoes'           , tColecoes )
        .input('cPerfis'             , tPerfis )
        .input('anonimo'             , sql.Int, anonimo )
        .input('descricao'           , sql.VarChar(1000), descricao )
        .input('conteudo'           , sql.VarChar(10000), conteudo )
        //executa a procedure  
        .execute('s_Wiki_Insere_Artigo')
        
        .then(result => {
            const retorno = {
                resultado : result.recordset
            }
            res.json(retorno)
        }).catch(err => res.json(err))       
}

//Rota que insere um artigo
router.post('/', function(req, res) {
//req.body
    let loginUsuario = req.body.loginUsuario
    let nome = req.body.nome
    let cCategorias = req.body.cCategorias
    let cColecoes = req.body.cColecoes
    let cPerfis = req.body.cPerfis
    let anonimo = req.body.anonimo
    let descricao = req.body.descricao
    let conteudo = req.body.conteudo

    insereArtigo(loginUsuario, nome, cCategorias, cColecoes, cPerfis, anonimo, descricao, conteudo, res)
});

function editaArtigo(loginUsuario, nome, codigo, cCategorias, cColecoes, cPerfis, anonimo, descricao, conteudo, res){
    const tPerfis = new sql.Table() 
    const tColecoes = new sql.Table() 
    const tCategorias = new sql.Table() 

    // Columns must correspond with type we have created in database.
    tPerfis.columns.add('codigo', sql.Int)
    tColecoes.columns.add('codigo', sql.Int)
    tCategorias.columns.add('codigo', sql.Int)

    // Add rows
    cPerfis.map(codigo => tPerfis.rows.add(codigo))
    cColecoes.map(codigo => tColecoes.rows.add(codigo))
    cCategorias.map(codigo => tCategorias.rows.add(codigo))
    

    global.conn.request()
        //define os parametros
        .input('loginUsuario'        , sql.VarChar(200), loginUsuario )
        .input('nome'                , sql.VarChar(200), nome )
        .input('codigo'              , sql.Int, codigo )
        .input('cCategorias'         , tCategorias )
        .input('cColecoes'           , tColecoes )
        .input('cPerfis'             , tPerfis )
        .input('anonimo'             , sql.Int, anonimo )
        .input('descricao'           , sql.VarChar(1000), descricao )
        .input('conteudo'            , sql.VarChar(10000), conteudo )
        //executa a procedure  
        .execute('s_Wiki_Edita_Artigo')
        
        .then(result => {
            const retorno = {
                resultado : result.recordset
            }
            res.json(retorno)
        }).catch(err => res.json(err))       
}

//Rota que edita um artigo
router.put('/', function(req, res) {
    //req.body
    let loginUsuario = req.body.loginUsuario
    let nome = req.body.nome
    let codigo = req.body.codigo
    let cCategorias = req.body.cCategorias
    let cColecoes = req.body.cColecoes
    let cPerfis = req.body.cPerfis
    let anonimo = req.body.anonimo
    let descricao = req.body.descricao
    let conteudo = req.body.conteudo

    editaArtigo(loginUsuario, nome, codigo, cCategorias, cColecoes, cPerfis, anonimo, descricao, conteudo, res)
});
    
    
//exporta o router
module.exports = router;  