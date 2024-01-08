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

//Rota que retorna os formulários da página principal(Visualização dos formulários)
router.get('/', function(req, res) {
    const {loginUsuario, pesquisa} = req.query 
    console.log(loginUsuario,pesquisa)

    if (!loginUsuario) {
        res.status(400).json('loginUsuario não informado.')
    }

    retornaForms (loginUsuario,pesquisa,res)
});

async function retornaForms(loginUsuario,pesquisa,res){
    try {
        // Requisição do banco
        let result = await global.conn.request()
            //define os parametros
            .input('loginUsuario'        , sql.VarChar(100) , loginUsuario ? loginUsuario : '')
            .input('pesquisa'        , sql.VarChar(100)         , pesquisa ? pesquisa : '')

            //executa a procedure  
            .execute('s_Retorna_Formularios_Monitoria')
        
        if (!result.recordsets) {
            res.status(500).json('Não foi possível retornar os formulários.')
        }

        //Puxando array com as informações dos formulários   
        let forms = result.recordset 

        //Criando variável de retorno com as informações finais dos formulários
        res.json(forms)

    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports = router