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

//Rota que desativa as coleções
router.delete('/', function(req, res) {
        //pega os parametros
        let loginUsuario    = req.body.loginUsuario;
        let cColecao        = req.body.cColecao;
    
        //função que retorna os dados no banco
        desativaColecoes(loginUsuario, cColecao, res)
});

function desativaColecoes(loginUsuario, cColecao, res){
    global.conn.request()
    //define os parametros
    .input('loginUsuario'   , sql.VarChar(200)  , loginUsuario)
    .input('cColecao'        , sql.VarChar(200)  , cColecao)
    //executa a procedure  
    .execute('s_Wiki_Desativa_Colecao')
        .then(result => {            
            res.json(result.recordset)
        })
        .catch(err => res.json(err));
}

//Rota que retorna as coleções
router.get('/', function(req, res) {
    //const loginUsuario = req.query.loginUsuario
    const {loginUsuario,cCollection,pesquisa} = req.query 
    console.log(loginUsuario,cCollection,pesquisa)

    if (!loginUsuario) {
        res.status(400).json('loginUsuario não informado.')
    }

    retornaColecoes(loginUsuario,cCollection,pesquisa,res)
});

async function retornaColecoes(loginUsuario,cCollection,pesquisa,res){
    try {
        // Requisição do banco
        let result = await global.conn.request()
            //define os parametros
            .input('loginUsuario'        , sql.VarChar(100) , loginUsuario ? loginUsuario : '')
            .input('cCollection'        , sql.Int          , cCollection ? cCollection : -1)
            .input('pesquisa'       , sql.VarChar , pesquisa ? pesquisa : '')
            //executa a procedure  
            .execute('s_Wiki_Retorna_Colecoes')
        
        if (!result.recordsets) {
            res.json(result)
        }

        //Puxando array com as informações das coleções   
        let colecoes = result.recordsets[0]
        //Puxando array com as informações dos usuarios que tem artigos criados dentro das coleções
        let usuariosArtigos = result.recordsets[1]

        //Criando variável de retorno com as informações finais das coleções
        let retorno = colecoes.map(colecao => {
            //Filtrando usuários que estão na coleção 
            let usuariosFilter = usuariosArtigos.filter(usuario => usuario.cColecao === colecao.codigo)
            return {
                codigo: colecao.codigo,
                nome: colecao.nome,
                descricao: colecao.descricao,
                urlImagem: colecao.urlImagem,
                qtdArtigos: colecao.qtdArtigos,
                usuarioArtigo: usuariosFilter
            }
        })
        res.json(retorno)
    } catch (err) {
        res.status(500).json(err)
    }
}

function insereColecao(loginUsuario, nome, descricao, urlImagem, res){
    global.conn.request()
        //define os parametros
        .input('loginUsuario'        , sql.VarChar(200), loginUsuario )
        .input('nome'                , sql.NVarChar(200), nome )
        .input('descricao'           , sql.NVarChar(1000), descricao )
        .input('urlImagem'           , sql.VarChar(2000), urlImagem )
        //executa a procedure  
        .execute('s_Wiki_Insere_Colecao')
        
        .then(result => {
            const retorno = {
                resultado : result.recordset
            }
            res.json(retorno)
        }).catch(err => res.json(err))       
}

//Rota que insere uma coleção
router.post('/', function(req, res) {
//req.body
    let loginUsuario = req.body.loginUsuario
    let nome = req.body.nome
    let descricao = req.body.descricao
    let urlImagem = req.body.urlImagem  

    insereColecao(loginUsuario, nome, descricao, urlImagem, res)
});

function editaColecao(loginUsuario, nome, descricao, urlImagem, codigo, res){
    global.conn.request()
        //define os parametros
        .input('loginUsuario'        , sql.VarChar(200), loginUsuario )
        .input('nome'                , sql.NVarChar(200), nome )
        .input('descricao'           , sql.NVarChar(1000), descricao )
        .input('urlImagem'           , sql.VarChar(1000), urlImagem )
        .input('codigo'           , sql.VarChar(200), codigo )
        //executa a procedure  
        .execute('s_Wiki_Edita_Colecao')
        
        .then(result => {
            const retorno = {
                resultado : result.recordset
            }
            res.json(retorno)
        }).catch(err => res.json(err))       
}

//Rota que edita uma coleção
router.put('/', function(req, res) {
//req.body
    let loginUsuario = req.body.loginUsuario
    let nome = req.body.nome
    let descricao = req.body.descricao
    let urlImagem = req.body.urlImagem 
    let codigo = req.body.codigo 

    editaColecao(loginUsuario, nome, descricao, urlImagem, codigo, res)
});


//exporta o router
module.exports = router;     