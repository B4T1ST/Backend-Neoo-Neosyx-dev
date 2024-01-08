//carregando modulos
const sql           = require('mssql');
const express       = require('express');
const router        = express.Router();
const utils         = require('../lib/utils');
const config        = require('../config/config.json');
const connection    = require('../config/' + config.banco);


//fazendo a conexão global
sql.connect(connection)
.then(conn => global.conn = conn)
.catch(err => console.log(err))


router.get('/retornaSidebar', function(req, res) {

    //pega os parametros
    let loginUsuario    = req.query.loginUsuario;
    

    retornaSidebar(loginUsuario, res)
})

function retornaSidebar(loginUsuario, res){
    global.conn.request()
    //define os parametros
    .input('loginUsuario'     , sql.VarChar(200), loginUsuario)
    //executa a procedure  
    .execute('s_Retorna_Itens_Sidebar')
    .then(result => res.json(result.recordset))            
    .catch(err => res.json(err))
}

router.get('/retornaWorkspacesUsuario', function(req, res) {
    
    //pega os parametros
    let loginUsuario  = req.query.loginUsuario;    

    //função que retorna os dados no banco
    retornaWorkspacesUsuario(loginUsuario, res);

});

function retornaWorkspacesUsuario(loginUsuario, res){
    global.conn.request()
        //define os parametros
        .input('loginUsuario'   , sql.VarChar(100)  , loginUsuario)
        //executa a procedure  
        .execute('s_WorkMedia_Retorna_Workspaces_Usuario')
            .then(result => res.json(result.recordset))
            .catch(err => res.json(err));
}



//exporta o router
module.exports = router;