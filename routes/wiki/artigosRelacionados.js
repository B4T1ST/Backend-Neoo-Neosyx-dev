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

router.get('/', function(req, res) {
    const {loginUsuario, cArtigo} = req.query 
    console.log(loginUsuario, cArtigo,res)

    if (!loginUsuario) {
        res.status(400).json('loginUsuario não informado.')
    }

    retornaArtigosRelacionados(loginUsuario, cArtigo,res)
});

async function retornaArtigosRelacionados(loginUsuario, cArtigo,res){
    try {
            // Requisição do banco
            let result = await global.conn.request()
                //define os parametros
                .input('loginUsuario'   , sql.VarChar(100) , loginUsuario ? loginUsuario : '')
                .input('cArtigo'        , sql.Int          , cArtigo)
                
                //executa a procedure  
                .execute('s_Wiki_Retorna_Artigos_Relacionados')
            
            if (!result.recordsets) {
                res.status(500).json('Não foi possível retornar os artigos relacionados.')
            }

            //Puxando array com as informações do Artigo  
            let artigosRelacionados = result.recordset             

            //Criando variável de retorno com as informações finais do artigo.
            res.json(artigosRelacionados)

        } catch (error) {
         res.status(500).json(error)
    }
}

//exporta o router
module.exports = router; 