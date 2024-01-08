//carregando modulos
const sql           = require('mssql');
const express       = require('express');
const router        = express.Router();
// const config        = require('../../config/config.json')
// const utils         = require('../../lib/utils')
const config        = require('../../config/config.json');
const utils         = require('../../lib/utils');
const { b64DecodeUnicode } = require('../../lib/utils');
const connection    = require('../../config/' + config.banco);
const crypto = require('crypto');

//fazendo a conexão global
sql.connect(connection)
.then(conn => global.conn = conn)
.catch(err => console.log(err))

// retorna relatório World Clouds
// router.use('/wordsCloudPesquisa', require('./wordsCloudPesquisa'));

// retorna relatórios pela pesquisa global
// router.use('/pesquisaGlobalRelatorios', require('./pesquisaGlobalRelatorios'));

router.use('/monitoriaAgentes', require('./monitoriaAgentes'))
router.use('/monitoriaLideranca', require('./monitoriaLideranca'))   

//retorno do relatório
router.get('/retornaRelatorios', function(req, res) {

    //pega os parametros
    let loginUsuario    = req.query.loginUsuario;
    let pesquisa        = req.query.pesquisa;

    retornaRelatorios(loginUsuario, pesquisa, res)
})

router.use('/acompanhamentoCentralizado', require('./acompanhamentoCentralizado'));
router.use('/relatorioDinamico', require('./relatorioDinamico'));

router.post('/insereItemFavorito', function(req, res) {

    //pega os parametros
    let loginUsuario    = req.body.loginUsuario;
    let cItem           = req.body.cItem;


    //função que retorna os dados no banco
    insereItemFavorito(loginUsuario, cItem, res)
})


router.get('/retornaRelatorioDisparos', function(req, res) {
    let loginUsuario    = req.query.loginUsuario;
    let parametro       = req.query.parametro;

    retornaRelatorioDisparos(loginUsuario, parametro, res)
})

router.get('/dashboardRetencao', function(req, res) {
     
    //pega os parametros
     let loginUsuario    = req.query.loginUsuario; 
     let parametro       = req.query.parametro;
 
     //função que retorna os dados no banco
     retornaDashboardRetencao(loginUsuario, parametro, res)
});

router.get('/dashboardRetencao/detalhe', function(req, res) {
    
    //pega os parametros
    let loginUsuario    = req.query.loginUsuario;
    let codigoQuiz      = req.query.codigoQuiz; 
    let parametro       = req.query.parametro;


    //função que retorna os dados no banco
    retornaDashboardRetencaoDetalhe(loginUsuario, codigoQuiz, parametro, res)
});

router.get('/dashboardRetencao/detalhe/usuariosResposta', function(req, res) {
    //pega os parametros
    let loginUsuario    = req.query.loginUsuario;
    let codigoResposta     = req.query.codigoResposta;

    //função que retorna os dados no banco
    retornaUsuariosResposta(loginUsuario, codigoResposta, res)
});


router.put('/dashboardRetencao/detalhe/editaQuiz', function(req, res) {
    //pega os parametros
    let loginUsuario    = req.body.loginUsuario;
    let cQuiz           = req.body.cQuiz;
    let titulo          = req.body.titulo;
    let dataInicial     = req.body.dataInicial;
    let dataFinal       = req.body.dataFinal;

    //função que retorna os dados no banco
    editaQuiz(loginUsuario, cQuiz, titulo, dataInicial, dataFinal, res)
})

router.get('/dashboardEngajamento', function(req, res) {
    //pega os parametros
    let loginUsuario    = req.query.loginUsuario;
    let parametro       = req.query.parametro;

    //função que retorna os dados no banco
    retornaDashboardEngajamento(loginUsuario, parametro, res)
});

router.get('/dashboardEngajamento/retornaWorkspaces', function (req, res) {
    let loginUsuario = req.query.loginUsuario;
  
    //função que retorna os dados no banco
    retornaWorkspacesDashboardEngajamento(loginUsuario, res)
})

//Davi Dacalhau Working from here
router.get('/dashboardEngajamento/retornaVisualizadores', function (req, res) {

    //pega os parametros
    let loginUsuario = req.query.loginUsuario;
    let cPost = req.query.cPost;

    //função que retorna os dados no banco
    retornaVisualizadoresDashboardEngajamento(loginUsuario, cPost, res)
})

router.get('/dashboardEngajamento/retornaPromotores', function (req, res) {

    //pega os parametros
    let loginUsuario = req.query.loginUsuario;
    let cPost = req.query.cPost;

    //função que retorna os dados no banco
    retornaPromotoresDashboardEngajamento(loginUsuario, cPost, res)
})

router.get('/dashboardEngajamento/retornaComentadores', function (req, res) {
    
    //pega os parametros
    let loginUsuario    = req.query.loginUsuario;
    let cPost           = req.query.cPost;

    //função que retorna os dados no banco
    retornaComentadoresDashboardEngajamento(loginUsuario, cPost, res)
})

router.get('/dashboardEngajamento/retornaUsuariosAlcancados', function (req, res) {

    //pega os parametros
    let loginUsuario    = req.query.loginUsuario;
    let cPost           = req.query.cPost;

    //função que retorna os dados no banco
    retornaUsuariosAlcancadosDashboardEngajamento(loginUsuario, cPost, res)
})
//Davi Dacalhau Working til here

router.get('/cadastroPalavras/retornaPalavrasProibidas', function (req, res) {
    
    //pega os parametros
    let loginUsuario    = req.query.loginUsuario;
    let pesquisa        = req.query.pesquisa ? req.query.pesquisa : '';

    //função que retorna os dados no banco
    retornaPalavrasProibidas(loginUsuario, pesquisa, res)
})

router.post('/cadastroPalavras/inserePalavrasProibidas', function (req, res) {

    //pega os parametros
    let loginUsuario    = req.body.loginUsuario;
    let palavra         = req.body.palavra;
  
    //função que retorna os dados no banco
    inserePalavrasProibidas(loginUsuario, palavra, res)
})

router.delete('/cadastroPalavras/removePalavrasProibidas', function(req, res) {
    
    //pega os parametros
    let loginUsuario    = req.body.loginUsuario;
    let cPalavra        = req.body.cPalavra;

    //função que retorna os dados no banco
    removePalavrasProibidas(loginUsuario, cPalavra, res)
})


router.get('/cadastroPermissionamento/retornaPalavrasProibidas', function(req, res) {
    
    //pega os parametros
    let loginUsuario    = req.body.loginUsuario;
    let cPalavra        = req.body.cPalavra;

    //função que retorna os dados no banco
    removePalavrasProibidas(loginUsuario, cPalavra, res)
})

router.get('/cadastroPermissionamento/retornaPerfil', function(req, res) {
   
    //pega os parametros
    let loginUsuario    = req.query.loginUsuario;
    let pesquisa        = req.query.pesquisa;

    //função que retorna os dados no banco
    retornaPerfil(loginUsuario, pesquisa, res)
})

router.post('/cadastroPermissionamento/inserePerfil', function(req, res) {
    
    //pega os parametros
    let loginUsuario        = req.body.loginUsuario;
    let nomePerfil         = req.body.nomePerfil;

    //função que retorna os dados no banco
    inserePerfil(loginUsuario, nomePerfil, res)
})

router.post('/cadastroPermissionamento/editaPerfil', function(req, res) {
    
    //pega os parametros
    let loginUsuario        = req.body.loginUsuario;
    let cPerfil             = req.body.cPerfil;
    let nomePerfil          = req.body.nomePerfil;
    //função que retorna os dados no banco
    editaPerfil(loginUsuario, cPerfil, nomePerfil, res)
})

router.delete('/cadastroPermissionamento/removePerfil', function(req, res) {
    
    //pega os parametros
    let loginUsuario        = req.body.loginUsuario;
    let cPerfil             = req.body.cPerfil;
  
    //função que retorna os dados no banco
    removePerfil(loginUsuario, cPerfil, res)
})

router.get('/cadastroPermissionamento/retornaPermissao', function(req, res) {
    
    //pega os parametros
    let loginUsuario    = req.query.loginUsuario;
    let cPerfil         = req.query.cPerfil;

    //função que retorna os dados no banco
    retornaPermissao(loginUsuario, cPerfil, res)
})

router.post('/cadastroPermissionamento/inserePermissao', function(req, res) {
    
    //pega os parametros
    let loginUsuario        = req.body.loginUsuario;
    let cPerfil             = req.body.cPerfil;
    let cPermissao          = utils.arrayToPipe(req.body.cPermissao);

    //função que retorna os dados no banco
    inserePermissao(loginUsuario, cPerfil, cPermissao, res)
})

router.get('/exportacaoConversa/retornaUsuario', function(req, res) {

    //pega os parametros
    let loginUsuario        = req.query.loginUsuario;
    let pesquisa            = req.query.pesquisa;

    //função que retorna os dados no banco
    retornaUsuario(loginUsuario, pesquisa, res)
})

router.get('/exportacaoConversa/retornaConversaUsuario', function(req, res) {

    //pega os parametros
    let loginUsuario        = req.query.loginUsuario;
    let cLogin              = req.query.cLogin;
    let pesquisa            = req.query.pesquisa;

    //função que retorna os dados no banco
    retornaConversaUsuario(loginUsuario, cLogin, pesquisa, res)
})

router.get('/exportacaoConversa/extraiConversa', function(req, res) {

    //pega os parametros
    let loginUsuario        = req.query.loginUsuario;
    let cLogin              = req.query.cLogin;
    let cConversa           = req.query.cConversa;
    let exportaApagadas     = req.query.exportaApagadas;

    //função que retorna os dados no banco
    extraiConversa(loginUsuario, cLogin, cConversa,exportaApagadas, res)
})

router.get('/acompanhamentoDeAcessos', function (req, res) {
    const {
        parametro,
        pesquisa
    } = req.query

    retornaStatus(parametro, pesquisa, res)

});

router.get('/retornaSupervisorAuditoria', function (req, res) {
    const {
        almope
    } = req.query

    retornaSupervisorAuditoria(almope, res)
});

router.get('/retornaCardsAuditoria', function (req, res) {
    const {
        almope,
        dataInicial,
        dataFinal
    } = req.query

    retornaCardsAuditoria(almope, dataInicial, dataFinal, res)
});

router.get('/retornaUsuariosAuditoria', function (req, res) {
    const {
        almope,
        dataInicial,
        dataFinal
    } = req.query

    retornaUsuariosAuditoria(almope, dataInicial, dataFinal, res)
});

router.get('/retornaRelatorioAuditoria', function (req, res) {
    const {
        almope,
        dataInicio,
        dataFim,
        isCrescente,
        pesquisa
    } = req.query

    

    retornaRelatorioAuditoria(almope, dataInicio, dataFim, isCrescente,pesquisa, res)
});

router.get('/retornaGraficoTeiaAuditoria', function (req, res) {
    const {
        almope,
        dataInicial,
        dataFinal
    } = req.query

    retornaGraficoTeiaAuditoria(almope, dataInicial, dataFinal, res)
});

router.get('/retornaGraficoCurvoAuditoria', function (req, res) {
    const {
        almope,
        dataInicial,
        dataFinal
    } = req.query

    retornaGraficoCurvoAuditoria(almope, dataInicial, dataFinal, res)
});

function retornaGraficoCurvoAuditoria(almope, dataInicial, dataFinal, res){
    global.conn.request()
        //define os parametros
        .input('almope'       , sql.VarChar(200)   , almope ? almope : '')
        .input('dataInicial'         , sql.DateTime   , dataInicial)
        .input('dataFinal'         , sql.DateTime   , dataFinal)
        //executa a procedure  
        .execute('s_Auditoria_Retorna_Grafico_Curvo')
            .then(result => {
                try{        
                    //retorna o json com os seus requests asincronos   
                    retorno = {
                        dias: result?.recordsets[0],
                        acessos: result?.recordsets[1]   
                    }           
                    res.json((retorno.length === 0) ? null : retorno);
                }catch(error) {
                    console.error("Error :" + error);
                    res.status(500).json(error);
                    return;
                }
            })
            .catch(err => res.status(500).json(err));
}

function retornaGraficoTeiaAuditoria(almope, dataInicial, dataFinal, res){
    global.conn.request()
        //define os parametros
        .input('almope'       , sql.VarChar(200)   , almope ? almope : '')
        .input('dataInicial'         , sql.DateTime   , dataInicial)
        .input('dataFinal'         , sql.DateTime   , dataFinal)
        //executa a procedure  
        .execute('s_Auditoria_Retorna_Grafico_Teia')
            .then(result => {
                try{        
                    //retorna o json com os seus requests asincronos               
                    retorno = result?.recordset
                    res.json((retorno.length === 0) ? null : retorno)
                }catch(error) {
                    console.error("Error :" + error);
                    res.status(500).json(error);
                    return;
                }
            })
            .catch(err => res.status(500).json(err));
}


function retornaRelatorioAuditoria(almope, dataInicio, dataFim, isCrescente, pesquisa,res){
    
    global.conn.request()
        //define os parametros
        .input('almope'       , sql.VarChar(200)   , almope ? almope : '')
        .input('dataInicial'         , sql.DateTime   , new Date(dataInicio.split("/").reverse().join("-")).toISOString())
        .input('dataFinal'         , sql.DateTime   , new Date(dataFim.split("/").reverse().join("-")).toISOString())
        .input('isCrescente'         , sql.Bit   , isCrescente)
        .input('pesquisa'         , sql.VarChar(1000) , pesquisa)
        //executa a procedure  
        .execute('s_Auditoria_Interacoes_Retorna_Relatorio_Auditoria')
            .then(result => {
                try{        
                    //retorna o json com os seus requests asincronos               
                    retorno = result?.recordset
                    res.json((retorno.length === 0) ? null : retorno)
                }catch(error) {
                    console.error("Error :" + error);
                    res.status(500).json(error);
                    return;
                }
            })
            .catch(err => res.status(500).json(err));
}

function retornaUsuariosAuditoria(almope, dataInicial, dataFinal, res){
    global.conn.request()
        //define os parametros
        .input('almope'       , sql.VarChar(200)   , almope ? almope : '')
        .input('dataInicial'         , sql.DateTime   , dataInicial)
        .input('dataFinal'         , sql.DateTime   , dataFinal)
        //executa a procedure  
        .execute('s_Auditoria_Log_Top_Interacoes')
            .then(result => {
                try{        
                    //retorna o json com os seus requests asincronos   
                    retorno = {
                        mais: result?.recordsets[0],
                        menos: result?.recordsets[1]   
                    }           
                    res.json((retorno.length === 0) ? null : retorno);
                }catch(error) {
                    console.error("Error :" + error);
                    res.status(500).json(error);
                    return;
                }
            })
            .catch(err => res.status(500).json(err));
}

function retornaCardsAuditoria(almope, dataInicial, dataFinal, res){
    global.conn.request()
        //define os parametros
        .input('almope'       , sql.VarChar(200)   , almope ? almope : '')
        .input('dataInicial'         , sql.DateTime   , dataInicial)
        .input('dataFinal'         , sql.DateTime   , dataFinal)
        //executa a procedure  
        .execute('s_Auditoria_Retorna_Cards')
            .then(result => {
                try{        
                    //retorna o json com os seus requests asincronos               
                    retorno = result?.recordset
                    res.json((retorno.length === 0) ? null : retorno)
                }catch(error) {
                    console.error("Error :" + error);
                    res.status(500).json(error);
                    return;
                }
            })
            .catch(err => res.status(500).json(err));
}


function retornaSupervisorAuditoria(almope, res){
    global.conn.request()
        //define os parametros
        .input('almope'       , sql.VarChar(200)   , almope ? almope : '')
        //executa a procedure  
        .execute('s_Auditoria_Retorna_Filtro_Supervisor')
            .then(result => {
                try{        
                    //retorna o json com os seus requests asincronos               
                    retorno = result?.recordset
                    res.json((retorno.length === 0) ? null : retorno)
                }catch(error) {
                    console.error("Error :" + error);
                    res.status(500).json(error);
                    return;
                }
            })
            .catch(err => res.status(500).json(err));
}


function retornaStatus(parametro, pesquisa, res){
    global.conn.request()
        //define os parametros
        // .input('loginUsuario'       , sql.VarChar(200)   , loginUsuario)
        .input('parametro'          , sql.VarChar        , parametro)
        .input('pesquisa'           , sql.VarChar(999)   , pesquisa)
        //executa a procedure  
        .execute('s_Relatorios_Retorna_Acompanhamento_Acessos')
            .then(result => {
                try{        
                    //retorna o json com os seus requests asincronos               
                    retorno = result?.recordset
                    res.json((retorno.length === 0) ? null : retorno)
                }catch(error) {
                    console.error("Error :" + error);
                    res.status(500).json(error);
                    return;
                }
            })
            .catch(err => res.status(500).json(err));
  }
  

function returnEncryptedURL(url) {

    const security_key = 'd354dada0f396449c5c5ecf22b92af5f';
    const iv = 'ce1b6a9835659787';
    const cipher = crypto.createCipheriv('aes-256-cbc', security_key, iv);

    let encryptedLink = cipher.update(url, 'utf-8', 'hex');
    encryptedLink += cipher.final('hex');
    return encryptedLink.toString()
}

//executa procedure
function retornaRelatorios(loginUsuario, pesquisa, res) {

    global.conn.request()
        //define os parametros
        .input('loginUsuario', sql.VarChar(100), loginUsuario)
        .input('pesquisa', sql.VarChar(8000), pesquisa)
        //executa a procedure  
        .execute('s_Retorna_Menu_Item')
        .then(result => {
            result.recordset.forEach(item => {
                if (item.toCrypto) {
                    item.url = returnEncryptedURL(item.url)
                }
            });
            res.json(result.recordset)
        })
        .catch(err => res.json(err));
}

function insereItemFavorito(loginUsuario, cItem, res) {
    global.conn.request()
        //define os parametros
        .input('loginUsuario', sql.VarChar(100), loginUsuario)
        .input('cItem', sql.Int, cItem)
        //executa a procedure  
        .execute('s_NSX_Favorita_Item')
        .then(result => res.json(result.recordset))
        .catch(err => res.json(err));
}

function retornaDashboardRetencao(loginUsuario, parametro, res) {
    global.conn.request()
        //define os parametros
        .input('loginUsuario', sql.VarChar(200), loginUsuario)
        .input('parametro', sql.VarChar(9000), parametro)
        //executa a procedure
        .execute('s_Relatorios_Retorna_Dashboard_Retencao')
        .then(result => res.json(result.recordset))
        .catch(err => res.json(err));
}

function retornaDashboardRetencaoDetalhe(loginUsuario, codigoQuiz, parametro, res) {
    global.conn.request()
        //define os parametros
        .input('loginUsuario', sql.VarChar(200), loginUsuario)
        .input('codigoQuiz', sql.Int, codigoQuiz)
        .input('parametro', sql.VarChar(9000), parametro)

        //executa a procedure
        .execute('s_Relatorios_Retorna_Dashboard_Retencao_Detalhe')
        .then(async result => {
            try {
                const retorno = await {
                    codigo: result.recordset[0].codigo,
                    titulo: result.recordset[0].titulo,
                    anonimo: result.recordset[0].anonimo,
                    dataInicial: result.recordset[0].dataInicial,
                    dataFinal: result.recordset[0].dataFinal,
                    dataInicialReal: result.recordset[0].dataInicialReal,
                    dataFinalReal: result.recordset[0].dataFinalReal,
                    dados: {
                        grafico: await retornaValoresGraficoDashboardRetencao(result.recordset[0].codigo, loginUsuario),
                        perguntas: await retornaPerguntasDashboardRetencao(result.recordset[0].codigo, loginUsuario)
                    }
                }
                res.json(await retorno)
            } catch (error) {
                console.error("Error :" + error);
            }
        })
        .catch(err => res.json(err));
}

async function retornaValoresGraficoDashboardRetencao(codigo, loginUsuario) {
    let promise = new Promise(function (resolve, reject) {
        global.conn.request()
            //define os parametros
            .input('loginUsuario', sql.VarChar(200), loginUsuario)
            .input('codigoQuiz', sql.Int, codigo)
            //executa a procedure  
            .execute('s_Relatorios_Retorna_Grafico_Dashboard_Retencao')
            .then(result => {
                resolve(result.recordset)
            })
            .catch(err => {
                // res.json(err)
                resolve(err)
            })
    })
    return promise
}


async function retornaWorkspacesDashboardRetencao(codigo, loginUsuario) {
    let promise = new Promise(function (resolve, reject) {
        global.conn.request()
            //define os parametros
            .input('loginUsuario', sql.VarChar(200), loginUsuario)
            .input('cQuiz', sql.Int, codigo)
            //executa a procedure  
            .execute('s_Retorna_Quiz_Workspaces')
            .then(async result => {
                resolve(result.recordset)
            })
            .catch(err => {
                resolve(err)
            })
    })
    return promise
}

async function retornaPerguntasDashboardRetencao(codigo, loginUsuario) {
    let promise = new Promise(function (resolve, reject) {
        global.conn.request()
            //define os parametros
            .input('loginUsuario', sql.VarChar(200), loginUsuario)
            .input('codigoQuiz', sql.Int, codigo)
            //executa a procedure  
            .execute('s_Relatorios_Retorna_Perguntas_Dashboard_Retencao')
            .then(async result => {
                const final = await result.recordset.map(async item => {
                    //insere o campo comentário
                    const arrayRespostas = await retornaRespostasDashboardRetencao(item.codigo, loginUsuario)

                    return {
                        ...item,
                        respostas: arrayRespostas
                    };
                })
                resolve(await Promise.all(final))
            })
            .catch(err => {
                resolve(err)
            })
    })
    return promise
}

async function retornaRespostasDashboardRetencao(codigo, loginUsuario) {
    let promise = new Promise(function (resolve, reject) {
        global.conn.request()
            //define os parametros
            .input('loginUsuario', sql.VarChar(200), loginUsuario)
            .input('codigoPergunta', sql.Int, codigo)
            //executa a procedure  
            .execute('s_Relatorios_Retorna_Respostas_Dashboard_Retencao')
            .then(result => {
                resolve(result.recordset)
            })
            .catch(err => {
                resolve(err)
            })
    })
    return promise
}

function retornaUsuariosResposta(loginUsuario, codigoResposta, res) {
    global.conn.request()
        //define os parametros
        .input('loginUsuario', sql.VarChar(100), loginUsuario)
        .input('codigoResposta', sql.Int, codigoResposta)
        //executa a procedure  
        .execute('s_Relatorios_Retorna_Usuarios_Resposta')
        .then(result => res.json(result.recordset))
        .catch(err => res.json(err));
}

function editaQuiz(loginUsuario, cQuiz, titulo, dataInicial, dataFinal, res) {
    global.conn.request()
        //define os parametros
        .input('loginUsuario', sql.VarChar(200), loginUsuario)
        .input('cQuiz', sql.Int, cQuiz)
        .input('titulo', sql.VarChar(300), titulo)
        .input('dataInicial', sql.DateTime, dataInicial)
        .input('dataFinal', sql.DateTime, dataFinal)

        //executa a procedure
        .execute('s_Workmedia_Edita_Quiz')
        .then(result => res.json(result.recordset))
        .catch(err => res.json(err));
}

function retornaDashboardEngajamento(loginUsuario, parametro, res) {
    global.conn.request()
        //define os parametros
        .input('loginUsuario', sql.VarChar(100), loginUsuario)
        .input('parametro', sql.VarChar(9000), parametro)
        //executa a procedure  
        .execute('s_Relatorios_Retorna_Dashboard_Engajamento')
        .then(result => {
            const retorno = {
                rows: result.recordset
            }
            res.json(retorno)
        })
        .catch(err => res.json(err));
}

function retornaRelatorioDisparos(loginUsuario, parametro, res) {
    global.conn.request()
        .input('loginUsuario', sql.VarChar(100), loginUsuario)
        .input('parametro', sql.VarChar(9000), parametro)
        .execute('s_Relatorios_Retorna_Relatorio_Disparos')
        .then(result => {
            const retorno = {
                rows: result.recordset
            }
            res.json(retorno)
        }).catch(err => res.json(err));
}

function retornaWorkspacesDashboardEngajamento(loginUsuario, res) {
    global.conn.request()
        //define os parametros
        .input('loginUsuario', sql.VarChar(200), loginUsuario)
        //executa a procedure  
        .execute('s_Retorna_Workspaces')
        .then(result => {
            res.json(result.recordset)
        })
        .catch(err => res.json(err));
}

//Davi Dacalhau Working from here
function retornaVisualizadoresDashboardEngajamento(loginUsuario, cPost, res) {
    global.conn.request()
        //define os parametros
        .input('loginUsuario', sql.VarChar(200), loginUsuario)
        .input('codigoPost', sql.Int, cPost)
        //executa a procedure  
        .execute('s_Dashboard_Engajamento_Retorna_Quem_Visualizou')
        .then(result => {
            res.json(result.recordset)
        })
        .catch(err => res.json(err));
}


function retornaPromotoresDashboardEngajamento(loginUsuario, cPost, res) {
    global.conn.request()
        //define os parametros
        .input('loginUsuario', sql.VarChar(200), loginUsuario)
        .input('codigoPost', sql.Int, cPost)
        //executa a procedure  
        .execute('s_Dashboard_Engajamento_Retorna_Quem_Promoveu')
        .then(result => {
            res.json(result.recordset)
        })
        .catch(err => res.json(err));
}

function retornaComentadoresDashboardEngajamento(loginUsuario, cPost, res) {
    global.conn.request()
        //define os parametros
        .input('loginUsuario', sql.VarChar(200), loginUsuario)
        .input('codigoPost', sql.Int, cPost)
        //executa a procedure  
        .execute('s_Dashboard_Engajamento_Retorna_Quem_Comentou')
        .then(result => {
            res.json(result.recordset)
        })
        .catch(err => res.json(err));
}

function retornaUsuariosAlcancadosDashboardEngajamento(loginUsuario, cPost, res) {
    global.conn.request()
        //define os parametros
        .input('loginUsuario', sql.VarChar(200), loginUsuario)
        .input('codigoPost', sql.Int, cPost)
        //executa a procedure  
        .execute('s_Dashboard_Engajamento_Retorna_Usuarios_Alcancados')
        .then(result => {
            res.json(result.recordset)
        })
        .catch(err => res.json(err));
}
//Davi Dacalhau Working til here

function retornaPalavrasProibidas(loginUsuario, pesquisa, res) {
    global.conn.request()
        //define os parametros
        .input('loginUsuario', sql.VarChar(200), loginUsuario)
        .input('pesquisa', sql.VarChar(8000), pesquisa)
        //executa a procedure  
        .execute('s_Retorna_Palavras_Proibidas')
        .then(result => {
            res.json(result.recordset)
        })
        .catch(err => res.json(err));
}

function inserePalavrasProibidas(loginUsuario, palavra, res) {
    global.conn.request()
        //define os parametros
        .input('loginUsuario', sql.VarChar(200), loginUsuario)
        .input('palavra', sql.VarChar(200), palavra)
        //executa a procedure  
        .execute('s_Insere_Palavra_Proibida')
        .then(result => {
            res.json(result.recordset)
        })
        .catch(err => res.json(err));
}

function removePalavrasProibidas(loginUsuario, cPalavra, res) {
    global.conn.request()
        //define os parametros
        .input('loginUsuario', sql.VarChar(200), loginUsuario)
        .input('cPalavra', sql.VarChar(200), cPalavra)
        //executa a procedure  
        .execute('s_Remove_Palavra_Proibida')
        .then(result => {
            res.json(result.recordset)
        })
        .catch(err => res.json(err));
}

function retornaPerfil(loginUsuario, pesquisa, res) {
    global.conn.request()
        //define os parametros
        .input('loginUsuario', sql.VarChar(200), loginUsuario)
        .input('pesquisa', sql.VarChar(8000), pesquisa)
        //executa a procedure  
        .execute('s_Cadastro_Perfil_Permissao_Retorna_Perfil_Web')
        .then(result => {
            res.json(result.recordset)
        })
        .catch(err => res.json(err));
}

function inserePerfil(loginUsuario, nomePerfil, res) {
    global.conn.request()
        //define os parametros
        .input('loginUsuario', sql.VarChar(200), loginUsuario)
        .input('nomePerfil', sql.VarChar(200), nomePerfil)
        //executa a procedure  
        .execute('s_Cadastro_Perfil_Insere_Perfil_Web')
        .then(result => {
            res.json(result.recordset)
        })
        .catch(err => res.json(err));
}

function editaPerfil(loginUsuario, cPerfil, nomePerfil, res) {
    global.conn.request()
        //define os parametros
        .input('loginUsuario', sql.VarChar(200), loginUsuario)
        .input('cPerfil', sql.Int, cPerfil)
        .input('nomePerfil', sql.VarChar(200), nomePerfil)
        //executa a procedure  
        .execute('s_Cadastro_Perfil_Edita_Perfil')
        .then(result => {
            res.json(result.recordset)
        })
        .catch(err => res.json(err));
}

function removePerfil(loginUsuario, cPerfil, res) {
    global.conn.request()
        //define os parametros
        .input('loginUsuario', sql.VarChar(200), loginUsuario)
        .input('cPerfil', sql.Int, cPerfil)
        //executa a procedure  
        .execute('s_Cadastro_Perfil_Remove_Perfil')
        .then(result => {
            res.json(result.recordset)
        })
        .catch(err => res.json(err));
}

function retornaPermissao(loginUsuario, cPerfil, res) {
    global.conn.request()
        //define os parametros
        .input('loginUsuario', sql.VarChar(200), loginUsuario)
        .input('cPerfil', sql.Int, cPerfil)
        //executa a procedure  
        .execute('s_Cadastro_Perfil_Permissao_Retorna_Lista_Permissoes_Web')
        .then(result => {
            res.json(result.recordset)
        })
        .catch(err => res.json(err));
}

function inserePermissao(loginUsuario, cPerfil, cPermissao, res) {
    global.conn.request()
        //define os parametros
        .input('loginUsuario', sql.VarChar(200), loginUsuario)
        .input('cPerfil', sql.Int, cPerfil)
        .input('cPermissao', sql.VarChar(8000), cPermissao)
        //executa a procedure  
        .execute('s_Cadastro_Perfil_Permissao_Insere_Permissao_Web')
        .then(result => {
            res.json(result.recordset)
        })
        .catch(err => res.json(err));
}

function retornaUsuario(loginUsuario, pesquisa, res) {
    global.conn.request()
        //define os parametros
        .input('loginUsuario', sql.VarChar(200), loginUsuario)
        .input('pesquisa', sql.VarChar(8000), pesquisa)
        //executa a procedure  
        .execute('s_Exportacao_Conversa_Retorna_Usuario_Web')
        .then(result => {
            res.json(result.recordset)
        })
        .catch(err => res.json(err));
}

function retornaConversaUsuario(loginUsuario, cLogin, pesquisa, res) {
    global.conn.request()
        //define os parametros
        .input('loginUsuario', sql.VarChar(200), loginUsuario)
        .input('cLogin', sql.Int, cLogin)
        .input('pesquisa', sql.VarChar(8000), pesquisa)
        //executa a procedure  
        .execute('s_Exportacao_Conversa_Retorna_Conversas_Por_Usuario_Web')
        .then(result => {
            res.json(result.recordset)
        })
        .catch(err => res.json(err));
}

function extraiConversa(loginUsuario, cLogin, cConversa, exportaApagadas, res) {
    global.conn.request()
        //define os parametros
        .input('loginUsuario', sql.VarChar(200), loginUsuario)
        .input('cLogin', sql.Int, cLogin)
        .input('cConversa', sql.Int, cConversa)
        .input('exportaApagadas', sql.Bit, exportaApagadas)
        //executa a procedure  
        .execute('s_Exportacao_Conversa_Extrai_Mensagens')
        .then(result => {
            let dados = result.recordset;

            res.json(
                dados.map((item, index) => {
                    return {
                        ...item,
                        mensagem: index > 0 ? Buffer.from(item.mensagem, 'base64').toString('utf8') : item.mensagem,
                    }
                })
            )
        })
        .catch(err => {
            res.json(res.status(500).send(err))
            console.log(err)
        });
}

//Marley Working here

router.get('/dashboardArtigos', function (req, res) {

    //pega os parametros
    let loginUsuario = req.query.loginUsuario;
    let parametro = req.query.parametro;

    //função que retorna os dados no banco
    retornaDashboardArtigos(loginUsuario, parametro, res)
});

router.get('/dashboardArtigos/retornaVisualizadores', function (req, res) {

    //pega os parametros
    let loginUsuario = req.query.loginUsuario;
    let cArtigo = req.query.cArtigo;

    //função que retorna os dados no banco
    retornaVisualizadoresDashboardArtigos(loginUsuario, cArtigo, res)
})

router.get('/dashboardArtigos/retornaAvaliacoes', function (req, res) {

    //pega os parametros
    let loginUsuario = req.query.loginUsuario;
    let cArtigo = req.query.cArtigo;

    //função que retorna os dados no banco
    retornaAvaliadoresDashboardArtigos(loginUsuario, cArtigo, res)
})

//Rota que retorna o artigo
router.get('/dashboardArtigos/retornaArtigo', function (req, res) {
    const { loginUsuario, cArtigo } = req.query
    console.log(loginUsuario, cArtigo)

    if (!loginUsuario) {
        res.status(400).json('loginUsuario não informado.')
    }

    retornaArtigoDashboard(loginUsuario, cArtigo, res)
});

function retornaAvaliadoresDashboardArtigos(loginUsuario, cArtigo, res) {
    global.conn.request()
        //define os parametros
        .input('loginUsuario', sql.VarChar(200), loginUsuario)
        .input('cArtigo', sql.Int, cArtigo)
        //executa a procedure  
        .execute('s_Wiki_Retorna_Relatorio_Artigos_Avaliacoes')
        .then(result => {
            res.json(result.recordset)
        })
        .catch(err => res.json(err));
}

function retornaVisualizadoresDashboardArtigos(loginUsuario, cArtigo, res) {
    global.conn.request()
        //define os parametros
        .input('loginUsuario', sql.VarChar(200), loginUsuario)
        .input('cArtigo', sql.Int, cArtigo)
        //executa a procedure  
        .execute('s_Wiki_Retorna_Relatorio_Artigos_Visualizadores')
        .then(result => {
            res.json(result.recordset)
        })
        .catch(err => res.json(err));
}

function retornaDashboardArtigos(loginUsuario, parametro, res) {
    global.conn.request()
        //define os parametros
        .input('loginUsuario', sql.VarChar(100), loginUsuario)
        .input('parametro', sql.VarChar(9000), parametro)
        //executa a procedure  
        .execute('s_Wiki_Retorna_Relatorio_Artigos')
        .then(result => {
            const retorno = {
                rows: result.recordset
            }
            res.json(retorno)
        })
        .catch(err => res.json(err));
}

async function retornaArtigoDashboard(loginUsuario, cArtigo, res) {
    try {
        // Requisição do banco
        let result = await global.conn.request()
            //define os parametros
            .input('loginUsuario', sql.VarChar(100), loginUsuario ? loginUsuario : '')
            .input('cArtigo', sql.Int, cArtigo)

            //executa a procedure  
            .execute('s_Wiki_Retorna_Artigo')

        if (!result.recordsets) {
            res.status(500).json('Não foi possível retornar o artigo.')
        }

        //Puxando array com as informações do Artigo  
        let artigo = {
            nome: result.recordsets[0][0]?.nome,
            conteudo: result.recordsets[0][0]?.conteudo,
            dataCriacao: result.recordsets[0][0]?.dataCriacao,
            nomeCriador: result.recordsets[0][0]?.nomeCriador,
            urlImagem: result.recordsets[0][0]?.urlImagem,
        }

        //Criando variável de retorno com as informações finais do artigo.
        res.json(artigo)
        console.log(artigo)
    } catch (error) {
        res.status(500).json(error)
    }
}

//Marley Working til here
//exporta o router
module.exports = router;     