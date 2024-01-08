//carregando modulos
const sql           = require('mssql');
const express       = require('express');
const router        = express.Router();
const config        = require('../../config/config.json');
const { get } = require('../../lib/poolManager')
const connection = require('../../config/' + config.sancoes);

// Retorna os itens da tela principal do módulo de sanções
router.get('/', function(req, res) {
    const {loginUsuario, pesquisa} = req.query     

    if (!loginUsuario) {
        res.status(400).json('loginUsuario não informado.')
    }

    retornaModuloItens(loginUsuario,pesquisa,res)
});

async function retornaModuloItens(loginUsuario,pesquisa,res){
    try {
        // Requisição do banco
        let result = await global.conn.request()
            //define os parametros
            .input('loginUsuario'        , sql.VarChar(100) , loginUsuario)
            .input('pesquisa'            , sql.VarChar , pesquisa ? pesquisa : '')

            
            //executa a procedure  
            .execute('s_Sancoes_Retorna_Modulo_Itens')
        
        if (!result.recordsets) {
            res.status(500).json('Não foi possível retornar os dados.')
        }
         
        let retorno = result.recordset 
        
        res.json(retorno)

    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports = router