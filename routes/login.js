//carregando modulos
const express           = require('express');
const passport          = require('passport');
const router            = express.Router();
const sql               = require('mssql');
const config            = require('../config/config.json');
const connection        = require('../config/' + config.banco);
const authJWT           = require('../lib/authJWT.js');
const ActiveDirectory   = require('activedirectory');


//fazendo a conexão global
sql.connect(connection)
.then(conn => global.conn = conn)
.catch(err => console.log(`erro conexao sql.connect:` + err))

router.post('/autenticaUsuario', function(req, res) {

    //pega os parametros
    let loginUsuario    = req.body.loginUsuario;
    let senha           = req.body.senha

    //faz a verificação
    verificaUsuario(loginUsuario, senha, res)
    
    // Autenticação Azure ainda não será utilizada
    // if(!res){
    //     const data = querystring.stringify({
    //         password    : senha,
    //         username    : loginUsuario,
    //         client_id   : '891d3bfc-29dd-46b0-93ed-57fce1f0fa0d',
    //         scope       : 'https://graph.microsoft.com/.default',
    //         grant_type  : 'password'
    //     });
        
    //     axios.post("https://login.microsoftonline.com/65ec7abe-1f64-4610-b985-16720f866fcf/oauth2/v2.0/token", data)
    //     .then(function (response) {
    //         res.send(true)
    //     })
    //     .catch(function (error) {
    //         console.log(error);
    //     });
    // }


})

router.post('/desconectaUsuario', function(req, res){

    //pega os parametros
    let loginUsuario    = req.body.loginUsuario;
    let token           = req.body.token;
    
    desconectaUsuario(loginUsuario, token, res)
})

router.post('/verificaToken', function(req, res){

    //pega os parametros
    let token   = req.body.token

    verificaToken(token, res)
})

router.get('/verificaTokenApiChat', async (req, res) => {

    const { token } = req.query

    
    res.json(await authJWT.verificaTokenApiChat(token))    
})

router.post('/redefinirSenha', function(req, res) {

    let loginUsuario = req.body.loginUsuario
    let novaSenha    = req.body.novaSenha

    redefinirSenha(loginUsuario, novaSenha, res)
})

function verificaUsuario(loginUsuario, senha, res){
    global.conn.request()
        //defina os parametros
        .input('loginUsuario', sql.VarChar(200), loginUsuario)
        .execute('s_Retorna_Login_Ativo')
        .then(async result => {
            try{
                const cLogin = result.recordset[0]
                const usuario = result.recordset[1]
                const retornoLDAP = await autenticaUsuarioLDAP(loginUsuario, senha)
                

                console.log(retornoLDAP)

                if(retornoLDAP){
                    const retornoToken = await geraToken(loginUsuario, cLogin, res)
                    console.log(`> retornoLDAP if condition`)
                    res.json({        
                        usuario,                  
                        token: retornoToken.recordset[0].token
                    });   
                } else {
                    const retornoBanco = await autenticaUsuario(loginUsuario, senha, res)
                    console.log(`> retornoLDAP ELSE condition`)
                    console.log(retornoBanco)

                    if(!retornoBanco){
                        res.status(500).json(null)
                        return
                    }

                    res.json({
                        usuario: retornoBanco.usuario,
                        token : retornoBanco.token
                    })
                }

            } catch(error) {
                console.log(`> catch ERROR try condition`)
                res.json(null)
                console.error("Error :" + error);
                return
                
            }
        })
        .catch(err => res.json(err));
}

async function autenticaUsuario(loginUsuario, senha, res){
    const result = await global.conn.request()
    //define os parametros
    .input('loginUsuario'     , sql.VarChar(200), loginUsuario)
    .input('senha'            , sql.VarChar(200), senha)
    //executa a procedure  
    .execute('s_NSX_Verifica_Login')
    try{
        const usuario = result.recordset[0]
        const retornoToken = await geraToken(loginUsuario, usuario.codigo, res)
        
        console.log(usuario)
        console.log(retornoToken)
        return {                            
            usuario,
            token: retornoToken.recordset[0].token
        };                  

    }catch(error) {
        console.error("Error :" + error);
        return null
        // res.json(null)
        
    }
}

function redefinirSenha(loginUsuario, novaSenha, res) {
    global.conn.request()
        .input('loginUsuario', sql.VarChar(100), loginUsuario)
        .input('novaSenha',    sql.VarChar(sql.MAX), novaSenha)
        .execute('s_Login_Redefinir_Senha')
            .then(result => {
                console.log(result)
                res.json(result.recordset[0])
            })
}

function desconectaUsuario(loginUsuario, token, res){
    let buff = new Buffer(token, 'base64');
    let decode = buff.toString('ascii');
    unixTimestamp = decode.substring(decode.indexOf("exp") + 5,(decode.indexOf(",\"sub")))
    global.conn.request()
    //define os parametros
    .input('loginUsuario',      sql.VarChar(200),  loginUsuario)
    .input('token',             sql.VarChar(8000), token)
    .input('unixTimestamp',     sql.VarChar(200),  unixTimestamp)
    //executa a procedure  
    .execute('s_NSX_Insere_JWT_Token_Blacklist')
    .then(result => res.json(result.recordset.length <= 0 ? null : result.recordset[0]))            
    .catch(err => res.json(err))    
}

function autenticaUsuarioLDAP(loginUsuario, senha){
    var config = {
        url: 'ldap://172.16.254.18',
        baseDN: 'dc=almavivadobrasil,dc=com, dc=br'
    };
    var ad = new ActiveDirectory(config);
    var username = loginUsuario.trim() + '@almavivadobrasil.com.br';
    var password = senha;
    // Authenticate
    return new Promise((resolve, reject) => {
        ad.authenticate(username, password, function(err, auth) {
         if(err){
           resolve(false)
           return;
         }
   
         if(auth){
           resolve(true)
         }else{
           resolve(false)
         }          
       });
   });
   
   


}

async function geraToken(loginUsuario, cLogin, res){
        const token = authJWT.geraToken(loginUsuario);

        return await global.conn.request()
        //define os parametros
        .input('cLogin'     , sql.Int, cLogin)
        .input('token'      , sql.VarChar(8000), token)
        //executa a procedure  
        .execute('s_NSX_Insere_JWT_Token')

}

function verificaToken(token, res) {
    global.conn.request()
    //define os parametros
    .input('token', sql.VarChar(8000), token)
    //executa a procedure  
    .execute('s_NSX_Verifica_JWT_Token')
    .then(result => res.json(result.recordset.length <= 0 ? null : result.recordset[0]))            
    .catch(err => res.json(err))
}



//exporta o router
module.exports = router;