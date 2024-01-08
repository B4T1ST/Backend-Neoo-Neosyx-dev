//carregando modulos
const sql = require('mssql');
const express = require('express');
const router = express.Router();
const config = require('../../config/config.json');
const { get } = require('../../lib/poolManager')
const connection = require('../../config/' + config.banco);

//fazendo a conexão global
sql.connect(connection)
.then(conn => global.conn = conn)
.catch(err => console.log(err))

//rota que retorna clientes
router.get('/clientes', function(req, res) {
    const {loginUsuario, pesquisa} = req.query 

    if (!loginUsuario) {
        res.status(400).json('loginUsuario não informado.')
    }

    retornaClientes(loginUsuario, pesquisa,res)
});

router.get('/operacao', function(req, res) {
    const {loginUsuario, pesquisa} = req.query 

    if (!loginUsuario) {
        res.status(400).json('loginUsuario não informado.')
    }

    retornaOperacao(loginUsuario, pesquisa, res)
});

router.get('/cards', function(req, res) {
    const {loginUsuario, parametro} = req.query 

    if (!loginUsuario) {
        res.status(400).json('loginUsuario não informado.')
    }

    retornaCards(loginUsuario, parametro, res)
});

router.get('/cesta', function(req, res) {
    const {loginUsuario, parametro} = req.query 

    if (!loginUsuario) {
        res.status(400).json('loginUsuario não informado.')
    }

    retornaCesta(loginUsuario, parametro, res)
});

router.get('/barraProgresso', function(req, res) {
    const {loginUsuario, parametro} = req.query 

    if (!loginUsuario) {
        res.status(400).json('loginUsuario não informado.')
    }

    retornaBarraProgresso(loginUsuario, parametro, res)
});

router.get('/tabelaIndicadores', function(req, res) {
    const {loginUsuario, parametro} = req.query 

    if (!loginUsuario) {
        res.status(400).json('loginUsuario não informado.')
    }

    retornaTabelaIndicadores(loginUsuario, parametro, res)
});

router.get('/filtroIndicadores', function(req, res) {
    const {loginUsuario, codigo} = req.query 

    if (!loginUsuario) {
        res.status(400).json('loginUsuario não informado.')
    }

    retornaFiltroIndicadores(loginUsuario, codigo, res)
});

async function retornaClientes(loginUsuario, pesquisa,res){
    try {
        // Requisição do banco
        let result = await global.conn.request()
            //define os parametros
            .input('loginUsuario'        , sql.VarChar(100) , loginUsuario ? loginUsuario : '')
            .input('pesquisa'        , sql.VarChar(1000)          , pesquisa ? pesquisa : '')

            //executa a procedure  
            .execute('s_Retorna_Clientes_MVP')
        
        if (!result.recordsets) {
            res.status(500).json('Não foi possível retornar categorias.')
        }

        //Puxando array com as informações das coleções   
        let categorias = result.recordset 

        //Criando variável de retorno com as informações finais das coleções
        res.json(categorias)

    } catch (error) {
        res.status(500).json(error)
    }
}

async function retornaOperacao(loginUsuario, pesquisa,res){
    try {
        // Requisição do banco
        let result = await global.conn.request()
            //define os parametros
            .input('loginUsuario'        , sql.VarChar(100) , loginUsuario ? loginUsuario : '')
            .input('pesquisa'        , sql.VarChar(1000)          , pesquisa ? pesquisa : '')

            //executa a procedure  
            .execute('s_Retorna_Operacoes_MVP')
        
        if (!result.recordsets) {
            res.status(500).json('Não foi possível retornar categorias.')
        }

        //Puxando array com as informações das coleções   
        let categorias = result.recordset 

        //Criando variável de retorno com as informações finais das coleções
        res.json(categorias)

    } catch (error) {
        res.status(500).json(error)
    }
}

async function retornaCards(loginUsuario, parametro,res){
    try {
        // Requisição do banco
        let result = await global.conn.request()
            //define os parametros
            .input('loginUsuario'        , sql.VarChar(100) , loginUsuario ? loginUsuario : '')
            .input('parametro'        , sql.VarChar(1000)          , parametro ? parametro : '')

            //executa a procedure  
            .execute('s_Retorna_Painel_Indicadores_MVP')
        
        if (!result.recordsets) {
            res.status(500).json('Não foi possível retornar categorias.')
        }

        //Puxando array com as informações das coleções   
        let categorias = result.recordset 

        //Criando variável de retorno com as informações finais das coleções
        res.json(categorias)
        console.log(categorias)

    } catch (error) {
        res.status(500).json(error)
    }
}

async function retornaCesta(loginUsuario, parametro,res){
    try {
        // Requisição do banco
        let result = await global.conn.request()
            //define os parametros
            .input('loginUsuario'        , sql.VarChar(100) , loginUsuario ? loginUsuario : '')
            .input('parametro'        , sql.VarChar(1000)          , parametro ? parametro : '')

            //executa a procedure  
            .execute('s_Retorna_Cesta_Quartil_MVP')
        
        if (!result.recordsets) {
            res.status(500).json('Não foi possível retornar categorias.')
        }

        //Puxando array com as informações das coleções   
        let categorias = result.recordset[0]

        //Criando variável de retorno com as informações finais das coleções
        res.json(categorias)

    } catch (error) {
        res.status(500).json(error)
    }
}

async function retornaBarraProgresso(loginUsuario, parametro,res){
    try {
        // Requisição do banco
        let result = await global.conn.request()
            //define os parametros
            .input('loginUsuario'        , sql.VarChar(100) , loginUsuario ? loginUsuario : '')
            .input('parametro'        , sql.VarChar(1000)          , parametro ? parametro : '')

            //executa a procedure  
            .execute('s_Retorna_Barra_Progresso_MVP')
        
        if (!result.recordsets) {
            res.status(500).json('Não foi possível retornar categorias.')
        }

        //Puxando array com as informações das coleções   
        let categorias = result.recordset 

        //Criando variável de retorno com as informações finais das coleções
        res.json(categorias)

    } catch (error) {
        res.status(500).json(error)
    }
}

async function retornaTabelaIndicadores(loginUsuario, parametro,res){
    try {
        // Requisição do banco
        let result = await global.conn.request()
            //define os parametros
            .input('loginUsuario'        , sql.VarChar(100) , loginUsuario ? loginUsuario : '')
            .input('parametro'        , sql.VarChar(1000)          , parametro ? parametro : '')

            //executa a procedure  
            .execute('s_Retorna_Tabela_Indicadores_MVP')
        
        if (!result.recordsets) {
            res.status(500).json('Não foi possível retornar categorias.')
        }

        //Puxando array com as informações das coleções   
        let categorias = result.recordset 

        //Criando variável de retorno com as informações finais das coleções
        res.json(categorias)

    } catch (error) {
        res.status(500).json(error)
    }
}

async function retornaFiltroIndicadores(loginUsuario, codigo,res){
    try {
        // Requisição do banco
        let result = await global.conn.request()
            //define os parametros
            .input('loginUsuario'        , sql.VarChar(100) , loginUsuario ? loginUsuario : '')
            .input('codigo'        , sql.Int          , codigo ? codigo : 1)
//executa a procedure  
            .execute('s_Retorna_Filtro_Padrao_Indicadores_MVP')
        
            console.log(result,'resuklt')
        if (!result.recordsets) {
            res.status(500).json('Não foi possível retornar categorias.')
            return
        }

        //Puxando array com as informações das coleções   
        let categorias = result.recordset 

        //Criando variável de retorno com as informações finais das coleções
        res.json(categorias)
        console.log(categorias)

    } catch (error) {
        res.status(500).json(error) 
    }
}


//exporta o router
module.exports = router;