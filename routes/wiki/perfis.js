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
router.get('/', function(req, res) {
    const {loginUsuario,codigo} = req.query 
    console.log(loginUsuario,codigo)

    if (!loginUsuario) {
        res.status(400).json('loginUsuario não informado.')
    }

    retornaPerfis (loginUsuario,codigo,res)
});

async function retornaPerfis(loginUsuario,codigo,res){
    try {
        // Requisição do banco
        let result = await global.conn.request()
            //define os parametros
            .input('loginUsuario'        , sql.VarChar(100) , loginUsuario ? loginUsuario : '')
            .input('codigo'        , sql.Int          , codigo ? codigo : -1)

            //executa a procedure  
            .execute('s_Wiki_Retorna_Perfis')
        
        if (!result.recordsets) {
            res.status(500).json('Não foi possível retornar categorias.')
        }

        //Puxando array com as informações das coleções   
        let perfis = result.recordset 

        //Criando variável de retorno com as informações finais das coleções
        res.json(perfis)

    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports = router