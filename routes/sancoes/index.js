//carregando modulos
const sql = require('mssql');
const express = require('express');
const router = express.Router();
const config = require('../../config/config.json');
const { get } = require('../../lib/poolManager')
const connection = require('../../config/' + config.sancoes);
const dadosDummy = require('./dadosDummy.json')

//Chamo as subRotas
router.use('/importaSancao', require('./importaSancao'));
router.use('/acoes', require('./acoes'));
router.use('/dashboardData', require('./dashboardData'));
router.use('/dashboardHierarquia', require('./dashboardHierarquia'));
router.use('/dashboardHierarquiaColaborador', require('./dashboardHierarquiaColaborador'));

router.use('/filtros', require('./filtros'));
router.use('/modulo', require('./modulo'));
router.use('/infracao', require('./infracao'));
router.use('/matriculas', require('./matriculas'));
router.use('/medida', require('./medida'));
router.use('/motivoCancelamento', require('./motivoCancelamento'));
router.use('/autoSancao', require('./autoSancao'))

//Retorna dados do Acompanhamento de Sanções 
router.get('/', function (req, res) {
    const {
        loginUsuario,
        pesquisa,
        parametro,
        cMatricula,
        exportacao,
        almope
    } = req.query


    // if (almope) {

    //     const usuario = dadosDummy.sancoes.filter(item => item.almope_colaborador == almope)

    //     if (usuario?.length <= 0) {
    //         res.status(500).send('Nenhum usuário foi encontrado com esse almope')
    //         return
    //     }

    //     res.json(usuario[0])
    if(almope){      
        retornaBloqueioAlmope(almope, res)
        return
    }

    if (!loginUsuario) {
        res.status(400).json('loginUsuario não informado.')
        return
    }

    if (cMatricula) {
        retornaHistoricoSancao(loginUsuario, cMatricula, res)
    } else {

        if (!parametro) {
            res.status(400).json('parametro não informado.')
        }
        retornaSancoes(loginUsuario, pesquisa, parametro, exportacao, res)
    }


});

// **** ARQUIVO MODELO **** //
router.get('/retornaArquivoModelo', function(req, res) {
    const {
        loginUsuario
    } = req.body

    retornaArquivoModelo(loginUsuario, res)
})

async function retornaArquivoModelo(loginUsuario, res) {
    try {
        let pool = await get('BDDosimetria', connection)

        let result = await pool.request()
            .input('loginUsuario', sql.VarChar(200), loginUsuario)
            .execute('s_Sancoes_Retorna_Modelo_Arquivo')

            let retorno = result.recordset
            res.json(retorno)
    } catch(err) {
        res.status(500).json(err)
    }
}

router.post('/arquivoModelo', function (req, res) {
    const {
        loginUsuario,
        urlArquivo,
        nomeArquivo
    } = req.body

    addArquivoModelo(loginUsuario, urlArquivo, nomeArquivo, res)
})

async function addArquivoModelo(loginUsuario, urlArquivo, nomeArquivo, res) {
    try {
        let pool = await get('BDDosimetria', connection)

        let result = await pool.request()
            .input('loginUsuario', sql.VarChar(200), loginUsuario)
            .input('urlArquivo',   sql.VarChar,      urlArquivo)
            .input('nomeArquivo',  sql.VarChar,      nomeArquivo)

            .execute('s_Sancoes_Adiciona_Modelo_Arquivo')

            let retorno = result.recordset

            res.json(retorno)
    } catch(err) {
        res.status(500).json(err)
    }
}

router.get('/linhaTempo', function (req, res) {
    const {
        loginUsuario,
        cMatricula
    } = req.query

    retornaLinhaDoTempo(loginUsuario, cMatricula, res)
})

async function retornaLinhaDoTempo(loginUsuario, cMatricula, res) {
    try {
        let pool = await get('BDDosimetria', connection)
        // Requisição do banco
        let result = await pool.request()
            //define os parametros
            .input('loginUsuario', sql.VarChar(100), loginUsuario)
            .input('matricula', sql.VarChar(100), cMatricula)


            //executa a procedure  
            .execute('s_Sancoes_Acompanhamento_Retorna_LinhaTempo')

        if (!result.recordsets) {
            res.status(500).json('Não foi possível retornar os dados.')
        }

        let retorno = result.recordset

        res.json(retorno)

    } catch (error) {
        res.status(500).json(error)
    }
}

async function retornaHistoricoSancao(loginUsuario, cMatricula, res) {
    try {
        let pool = await get('BDDosimetria', connection)
        // Requisição do banco
        let result = await pool.request()
            //define os parametros
            .input('loginUsuario', sql.VarChar(100), loginUsuario)
            .input('matricula', sql.VarChar(100), cMatricula)


            //executa a procedure  
            .execute('s_Sancoes_Acompanhamento_Retorna_Historico_Sancoes')


        if (!result.recordsets) {
            res.status(500).json('Não foi possível retornar os dados.')
        }

        let retorno = result.recordset

        res.json(retorno)

    } catch (error) {
        res.status(500).json(error)
    }
}



async function retornaBloqueioAlmope(almope, res) {
    try {
        let pool = await get('BDDosimetria', connection)
        // Requisição do banco
        let result = await pool.request()
            //define os parametros
            .input('almope', sql.VarChar(100), almope)            
            
            //executa a procedure  
            .execute('s_Sancoes_Retorna_Bloqueio_Almope')

        if (!result.recordsets) {
            res.status(500).json('Não foi possível retornar os dados.')
        }

        let retorno = result.recordset

        console.log(retorno)

        res.json(retorno[0])

    } catch (error) {
        res.status(500).json(error)
    }
}

async function retornaSancoes(loginUsuario, pesquisa, parametro, exportacao, res) {


    try {
        let pool = await get('BDDosimetria', connection)
        // Requisição do banco
        let result = await pool.request()
            //define os parametros
            .input('loginUsuario', sql.VarChar(100), loginUsuario)
            .input('pesquisa', sql.VarChar(100), pesquisa ? pesquisa : '')
            .input('parametro', sql.VarChar, parametro)
            .input('exportacao', sql.Int, exportacao)

            //executa a procedure  
            .execute('s_Sancoes_Acompanhamento_Retorna_Sancoes')
            // console.log(result.recordsets)

        if (!result.recordsets) {
            res.status(500).json('Não foi possível retornar os dados.')
        }

        let retorno;

        if (exportacao == 1) {
            retorno = result.recordset
        } else {
            retorno = {
                rows: result.recordset
            }
        }

        console.log('testestestete')
        res.json(retorno)

    } catch (error) {
        res.status(500).json(error)
    }
}

//Insere Sanção 
router.post('/', function (req, res) {
    const {
        loginUsuario,
        matricula,
        cInfracao,
        dataInfracao,
        cMedida,
        dataMedida,
        observacao,
        descricaoSancao,
        urlArquivo,
        nomeArquivo
    } = req.body

    if (!loginUsuario) {
        res.status(400).json('loginUsuario não informado.')
    }

    if (!matricula) {
        res.status(400).json('matricula não informado.')
    }

    if (!cInfracao) {
        res.status(400).json('cInfracao não informado.')
    }

    if (!dataInfracao) {
        res.status(400).json('dataInfracao não informado.')
    }

    if (!cMedida) {
        res.status(400).json('cMedida não informado.')
    }

    // Data medida e opcional
    // if (!dataMedida) {
    //     res.status(400).json('dataMedida não informado.')
    // }

    insereSancoes(loginUsuario, matricula, cInfracao, dataInfracao, cMedida, dataMedida, observacao, descricaoSancao, urlArquivo, nomeArquivo, res)
});

async function insereSancoes(loginUsuario, matricula, cInfracao, dataInfracao, cMedida, dataMedida, observacao, descricaoSancao, urlArquivo, nomeArquivo, res) {
    try {
        let pool = await get('BDDosimetria', connection)
        // Requisição do banco
        let result = await pool.request()
            //define os parametros
            .input('loginUsuario', sql.VarChar(200), loginUsuario)
            .input('matricula', sql.VarChar(100), matricula)
            .input('codigoInfracao', sql.Int, cInfracao)
            .input('dataInfracao', sql.VarChar, dataInfracao)
            .input('codigoMedida', sql.Int, cMedida)
            .input('dataMedida', sql.VarChar, dataMedida ? dataMedida : null)
            .input('observacao', sql.VarChar, observacao ? observacao : '')
            .input('descricaoSancao', sql.VarChar, descricaoSancao ? descricaoSancao : '')
            .input('urlArquivo', sql.VarChar, urlArquivo ? urlArquivo : '')
            .input('nomeArquivo', sql.VarChar, nomeArquivo ? nomeArquivo : '')

            //executa a procedure  
            .execute('s_Sancoes_Acompanhamento_Insere_Sancao')

        if (!result.recordsets) {
            res.status(500).json('Não foi possível retornar os dados.')
        }

        let retorno = result.recordset

        res.json(retorno)

    } catch (error) {
        res.status(500).json(error)
    }
}

//Edita Sanção
router.put('/', function (req, res) {
    const {
        loginUsuario,
        codigo,
        matricula,
        cInfracao,
        dataInfracao,
        cMedida,
        dataMedida,
        observacao,
        descricaoSancao,
        urlArquivo,
        nomeArquivo
    } = req.body

    if (!codigo) {
        res.status(400).json('codigo não informado.')
    }

    if (!loginUsuario) {
        res.status(400).json('loginUsuario não informado.')
    }

    if (!matricula) {
        res.status(400).json('matricula não informado.')
    }

    if (!cInfracao) {
        res.status(400).json('cInfracao não informado.')
    }

    if (!dataInfracao) {
        res.status(400).json('dataInfracao não informado.')
    }

    if (!cMedida) {
        res.status(400).json('cMedida não informado.')
    }

    // if (!dataMedida) {
    //     res.status(400).json('dataMedida não informado.')
    // }

    editarSancao(loginUsuario, codigo, matricula, cInfracao, dataInfracao, cMedida, dataMedida, observacao, descricaoSancao, urlArquivo, nomeArquivo, res)
});

async function editarSancao(loginUsuario, codigo, matricula, cInfracao, dataInfracao, cMedida, dataMedida, observacao, descricaoSancao, urlArquivo, nomeArquivo, res) {
    try {
        let pool = await get('BDDosimetria', connection)
        // Requisição do banco
        let result = await pool.request()
            //define os parametros
            .input('loginUsuario', sql.VarChar(200), loginUsuario)
            .input('codigoSancao', sql.Int, codigo)
            .input('matricula', sql.VarChar(100), matricula)
            .input('codigoInfracao', sql.Int, cInfracao)
            .input('dataInfracao', sql.VarChar, dataInfracao)
            .input('codigoMedida', sql.Int, cMedida)
            .input('dataMedida', sql.VarChar, dataMedida)
            .input('observacao', sql.VarChar, observacao ? observacao : '')
            .input('descricaoSancao', sql.VarChar, descricaoSancao ? descricaoSancao : '')
            .input('urlArquivo', sql.VarChar, urlArquivo ? urlArquivo : '')
            .input('nomeArquivo', sql.VarChar, nomeArquivo ? nomeArquivo : '')

            //executa a procedure  
            .execute('s_Sancoes_Acompanhamento_Edita_Sancao')

        if (!result.recordsets) {
            res.status(500).json('Não foi possível retornar os dados.')
        }


        let retorno = result.recordset


        res.json(retorno)

    } catch (error) {
        res.status(500).json(error)
    }
}

//Deleta Sanção
router.delete('/', function (req, res) {
    const {
        loginUsuario,
        codigo
    } = req.body

    if (!loginUsuario) {
        res.status(400).json('loginUsuario não informado.')
    }

    if (!codigo) {
        res.status(400).json('codigo não informado.')
    }

    deletaSancao(loginUsuario, codigo, res)
});

async function deletaSancao(loginUsuario, codigo, res) {
    try {
        let pool = await get('BDDosimetria', connection)
        // Requisição do banco
        let result = await pool.request()
            //define os parametros
            .input('loginUsuario', sql.VarChar(100), loginUsuario)
            .input('codigoSancao', sql.Int, codigo)

            //executa a procedure
            .execute('s_Sancoes_Acompanhamento_Deleta_Sancao')

        if (!result.recordsets) {
            res.status(500).json('Não foi possível retornar os dados.')
        }


        let retorno = result.recordset


        res.json(retorno)

    } catch (error) {
        res.status(500).json(error)
    }
}
//exporta o router
module.exports = router;  