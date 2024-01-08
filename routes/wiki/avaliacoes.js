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


router.post('/', function(req, res) {
    //req.body
    let loginUsuario = req.body.loginUsuario
    let cArtigo = req.body.cArtigo
    let util = req.body.util

    insereAvaliacao(loginUsuario, cArtigo, util, res)
}); 

function insereAvaliacao(loginUsuario, cArtigo, util, res){
    global.conn.request()
        //define os parametros
        .input('loginUsuario'        , sql.VarChar(200), loginUsuario )
        .input('cArtigo'                , sql.Int, cArtigo )
        .input('util'                , sql.Int, util )
        //executa a procedure  
        .execute('s_Wiki_Insere_Avaliacao')
        
        .then(result => {
            const retorno = {
                resultado : result.recordset
            }
            res.json(retorno)
        }).catch(err => res.json(err))       
}

function insereDetalhamento(loginUsuario, cArtigo, detalhamento, res){
    global.conn.request()
        //define os parametros
        .input('loginUsuario'        , sql.VarChar(200), loginUsuario )
        .input('cArtigo'             , sql.VarChar(200), cArtigo )
        .input('detalhamento'        , sql.VarChar(1000), detalhamento )
        //executa a procedure  
        .execute('s_Wiki_Insere_Detalhamento_Avaliacao')
        
        .then(result => {
            const retorno = {
                resultado : result.recordset
            }
            res.json(retorno)
        }).catch(err => res.json(err))       
}

//Rota que insere detalhamento
router.put('/', function(req, res) {
    //req.body
        let loginUsuario = req.body.loginUsuario
        let cArtigo = req.body.cArtigo
        let detalhamento = req.body.detalhamento
    
        insereDetalhamento(loginUsuario, cArtigo, detalhamento, res)
    });

module.exports = router