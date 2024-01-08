//carregando modulos
const sql = require('mssql');
const express = require('express');
const router = express.Router();
const config = require('../../../config/config.json');
const { get } = require('../../../lib/poolManager')
const connection = require('../../../config/' + config.banco);



//Retorna dados do COP Tabela
router.get('/tabela', function (req, res) {
    const {
        loginUsuario,
        cMercado,
    } = req.query

    if (!loginUsuario && !cMercado) {
        res.status(400).json('loginUsuario não informado.')
        return
    }

    if (cMercado) {
        retornaAcompanhamentoCentralizado(loginUsuario, cMercado, res)
    } else {
        res.status(400).json('cMercado não informado.')
        return
    }
});

//Retorna dados do COP Ponteiro
router.get('/ponteiro', function (req, res) {
    const {
        loginUsuario,
        cMercado,
    } = req.query

    if (!loginUsuario && !cMercado) {
        res.status(400).json('loginUsuario não informado.')
        return
    }

    if (cMercado) {
        retornaPonteiroAcompanhamentoCentralizado(loginUsuario, cMercado, res)
    } else {
        res.status(400).json('cMercado não informado.')
        return
    }
});

//Retorna dados do COP Cards
router.get('/cards', function (req, res) {
    const {
        loginUsuario,
    } = req.query

    if (!loginUsuario) {
        res.status(400).json('loginUsuario não informado.')
        return
    }

    retornaCardsAcompanhamentoCentralizado(loginUsuario, res)

});


//Retorna dados do COP Grafico Claro BR
router.get('/mapa-claro', function (req, res) {
    const {
        loginUsuario,
        cMercado,
    } = req.query

    if (!loginUsuario && !cMercado) {
        res.status(400).json('loginUsuario não informado.')
        return
    }

    retornaMapaClaroAcompanhamentoCentralizado(loginUsuario, cMercado, res)

});

//Retorna dados do COP Grafico UFs BR
router.get('/mapa-uf', function (req, res) {
    const {
        loginUsuario,
        cMercado,
    } = req.query

    if (!loginUsuario && !cMercado) {
        res.status(400).json('loginUsuario não informado.')
        return
    }

    retornaMapaUfAcompanhamentoCentralizado(loginUsuario, cMercado, res)

});

//Retorna dados do COP Tabela Analitica
router.get('/tabela-analitica', function (req, res) {
    const {
        loginUsuario,
    } = req.query

    if (!loginUsuario) {
        res.status(400).json('loginUsuario não informado.')
        return
    }

    retornaTabelaAnaliticaAcompanhamentoCentralizado(loginUsuario, res)

});

async function retornaAcompanhamentoCentralizado(loginUsuario, cMercado, res) {


    try {
        let pool = await get('BDNeooWebNeosyx', connection)
        // Requisição do banco
        let resultTabela = await pool.request()
            //define os parametros
            .input('loginUsuario', sql.VarChar(100), loginUsuario)
            .input('cMercado', sql.Int, cMercado)


            //executa a procedure  
            .execute('s_Retorna_COP_Tabela_Aging')

        let resultTabelas = resultTabela.recordsets[0]
        let resultTabelaContent = resultTabela.recordsets[1]

        if (!resultTabela.recordsets) {
            res.status(500).json('Não foi possível retornar os dados.')
            return
        }

        let retorno = resultTabelas.map(tabelas => {
            //Filtrando usuários que estão na coleção 
            let tabelasFilter = resultTabelaContent.filter(tabela => tabela.nome === tabelas.nome)
            return {     
                codigo: tabelas.codigo,
                nome: tabelas.nome,
                conteudo: tabelasFilter,
            }
        })

        res.json(retorno)

    } catch (error) {
        res.status(500).json(error)
    }
}

async function retornaCardsAcompanhamentoCentralizado(loginUsuario, res) {
    try {
        let pool = await get('BDNeooWebNeosyx', connection)
        // Requisição do banco
        let resultCards = await pool.request()
            //define os parametros
            .input('loginUsuario', sql.VarChar(100), loginUsuario)

            //executa a procedure  
            .execute('s_Retorna_COP_Cards_Aging')

        if (!resultCards.recordsets) {
            res.status(500).json('Não foi possível retornar os dados.')
            return
        }

        let retorno = {
            cards: resultCards.recordset
        }

        res.json(retorno)

    } catch (error) {
        res.status(500).json(error)
    }
}

async function retornaPonteiroAcompanhamentoCentralizado(loginUsuario, cMercado, res) {
    try {
        let pool = await get('BDNeooWebNeosyx', connection)
        // Requisição do banco
        let resultPonteiro = await pool.request()
            //define os parametros
            .input('loginUsuario', sql.VarChar(100), loginUsuario)
            .input('cMercado', sql.Int, cMercado)

            //executa a procedure  
            .execute('s_Retorna_COP_Grafico_Ponteiro')

        if (!resultPonteiro.recordsets) {
            res.status(500).json('Não foi possível retornar os dados.')
            return
        }

        let retorno = {
            ponteiro: resultPonteiro.recordsets[0]
        }

        res.json(retorno)

    } catch (error) {
        res.status(500).json(error)
    }
}

async function retornaMapaClaroAcompanhamentoCentralizado(loginUsuario, cMercado, res) {
    try {
        let pool = await get('BDNeooWebNeosyx', connection)
        // Requisição do banco
        let resultMapaClaro = await pool.request()
            //define os parametros
            .input('loginUsuario', sql.VarChar(100), loginUsuario)
            .input('cMercado', sql.Int, cMercado)

            //executa a procedure  
            .execute('s_Retorna_COP_Grafico_Claro_Mapas')

        if (!resultMapaClaro.recordsets) {
            res.status(500).json('Não foi possível retornar os dados.')
            return
        }

        let retorno = {
            conteudo: resultMapaClaro.recordsets[0]
        }

        res.json(retorno)

    } catch (error) {
        res.status(500).json(error)
    }
}

async function retornaMapaUfAcompanhamentoCentralizado(loginUsuario, cMercado, res) {
    try {
        let pool = await get('BDNeooWebNeosyx', connection)
        // Requisição do banco
        let resultMapaUfs = await pool.request()
            //define os parametros
            .input('loginUsuario', sql.VarChar(100), loginUsuario)
            .input('cMercado', sql.Int, cMercado)

            //executa a procedure  
            .execute('s_Retorna_COP_Grafico_UF_Mapas')

        if (!resultMapaUfs.recordsets) {
            res.status(500).json('Não foi possível retornar os dados.')
            return
        }

        let retorno = {
            conteudo: resultMapaUfs.recordsets[0]
        }

        res.json(retorno)

    } catch (error) {
        res.status(500).json(error)
    }
}

async function retornaTabelaAnaliticaAcompanhamentoCentralizado(loginUsuario, res) {
    try {
        let pool = await get('BDNeooWebNeosyx', connection)
        // Requisição do banco
        let resultTabelaAnalitica = await pool.request()
            //define os parametros
            .input('loginUsuario', sql.VarChar(100), loginUsuario)

            //executa a procedure  
            .execute('s_Retorna_COP_Tabela_Analitica')

        if (!resultTabelaAnalitica.recordsets) {
            res.status(500).json('Não foi possível retornar os dados.')
            return
        }

        let retorno = resultTabelaAnalitica.recordset
        

        res.json(retorno)

    } catch (error) {
        res.status(500).json(error)
    }
}


//exporta o router
module.exports = router;  