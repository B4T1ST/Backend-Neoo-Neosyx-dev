//carregando modulos
const sql           = require('mssql');
const express       = require('express');
const router        = express.Router();
const config        = require('../config/config.json');
const connection    = require('../config/' + config.banco);
const utils         = require('../lib/utils');
const VerificaPalavrao = require('../lib/verificaPalavrao');

//fazendo a conexão global
sql.connect(connection)
   .then(conn => global.conn = conn)
   .catch(err => console.log(err))


//página inicial
// router.get('/', function(req, res, next) {

//   res.render('index', { title: 'Express' });
// });

router.get('/testaAtividade', function (req, res) {

    res.json({funcionando : true})
    
})

/* ROTAS SOBRE */

router.get('/sobre/retornaVersao', function(req, res) {
    
    //pega os parametros
    let loginUsuario = req.query.loginUsuario;

    //função que retorna os dados no banco
    retornaVersao(loginUsuario, res);

}); 

router.get('/retornaPostUnico', function(req, res) {

    //pega os parametros
    let loginUsuario    = req.query.loginUsuario;
    let cPost           = req.query.cPost;

    //faz a verificação
    retornaPostUnico(loginUsuario, cPost, res);

});

router.get('/sobre/retornaConteudos', function(req, res) {
    
    //pega os parametros
    let loginUsuario    = req.query.loginUsuario ? req.query.loginUsuario : '';

    //faz a verificação
    retornaConteudos(loginUsuario, res);

});

router.get('/sobre/retornaPaginas', function(req, res) {

    //pega os parametros
    let loginUsuario    = req.query.loginUsuario;
    let cConteudo       = req.query.cConteudo;

    //faz a verificação
    retornaPaginas(loginUsuario, cConteudo, res);

});



/* ROTAS FEED */

//retorno dos posts

// router.get('/feed/texto', function(req, res) {

//     //pega os parametros
//     let texto           = req.query.texto;

    
//     res.json(VerificaPalavrao.retornaStringCensurado(texto));
// });

router.get('/feed/verificaDataUsuario', function(req, res) {

    //pega os parametros
    let loginUsuario     = req.query.loginUsuario;

    //faz a verificação
    verificaDataUsuario(loginUsuario, res)
})

router.get('/feed/verificaDataResponsavel', function(req,res) {
    
    //pega os parametros
    let loginUsuario     = req.query.loginUsuario;

    //faz a verificação
    verificaDataResponsavel(loginUsuario, res)
})

router.get('/feed/retornaPosts', function(req, res) {
    
    //pega os parametros
    let loginUsuario     = req.query.loginUsuario;
    let top              = req.query.top;
    let ultimoCodigoPost = req.query.ultimoCodigoPost;
    let usuario          = req.query.usuario;
    let cWorkspace       = req.query.cWorkspace;
    let cHashtag         = req.query.cHashtag;
    let onlyFixados      = req.query.onlyFixados;    

     //ajusta variavel de cUsuario
     if (typeof usuario === "undefined"){

        //seta vazio
        usuario = "-1";
    }

    //ajusta a variavel de cWorkspace
    if (typeof cWorkspace === "undefined"){

        //seta vazio
        cWorkspace = "-1";
    }

    //ajusta a variavel de cHashtag
    if (typeof cHashtag === "undefined"){

        //seta vazio
        cHashtag = "-1";
    }

    if (typeof onlyFixados === "undefined"){

        //seta vazio
        onlyFixados = "0";
    }

    //função que retorna os dados no banco
    retornaPosts(loginUsuario, top, ultimoCodigoPost, usuario, cWorkspace, cHashtag, onlyFixados, res);

});

//retorno da pesquisa no feed
router.get('/feed/retornaPesquisa', function(req, res) {

    //pega os parametros
    let loginUsuario    = req.query.loginUsuario;
    let pesquisa        = req.query.pesquisa;

    //função que retorna os dados no banco
    retornaPesquisa(loginUsuario, pesquisa, res);

});

//retorno dos posts
// router.get('/feed/retornaPostQuiz', function(req, res) {
    
//     //pega os parametros
//     let loginUsuario     = req.query.loginUsuario;
//     let cPost            = req.query.cPost;

//     //função que retorna os dados no banco
//     retornaPostQuiz(loginUsuario, cPost, res);

// });

router.get('/feed/retornaQuiz', function(req, res) {
    
    //pega os parametros
    let loginUsuario     = req.query.loginUsuario;
    let cQuiz            = req.query.cQuiz;

    //função que retorna os dados no banco
    retornaQuiz(loginUsuario, cQuiz, res);

});


router.get('/feed/retornaQuizesPendentes', function(req, res) {
    
    //pega os parametros
    let loginUsuario = req.query.loginUsuario;

    //função que retorna os dados no banco
    retornaQuizesPendentes(loginUsuario, res);

});

//atualiza posts
router.get('/feed/atualizaPosts', function(req, res) {
    
    //pega os parametros
    let loginUsuario        = req.query.loginUsuario;
    let top                 = req.query.top;
    let primeiroCodigoPost  = req.query.primeiroCodigoPost;
    let cUsuario            = req.query.cUsuario;
    let cWorkspace          = req.query.cWorkspace;
    let cHashtag            = req.query.cHashtag;

    //ajusta variavel de cUsuario
    if (typeof cUsuario === "undefined"){

        //seta vazio
        cUsuario = "-1";
    }

    //ajusta a variavel de cWorkspace
    if (typeof cWorkspace === "undefined"){

        //seta vazio
        cWorkspace = "-1";
    }

    //ajusta a variavel de cHashtag
    if (typeof cHashtag === "undefined"){

        //seta vazio
        cHashtag = "-1";
    } 
    
    
    //executa o retorno
    atualizaPosts(loginUsuario, top, primeiroCodigoPost, cUsuario, cWorkspace, cHashtag, res);

});

router.get('/feed/retornaQuizTema', function(req, res) {
    
    //pega os parametros
    let loginUsuario  = req.query.loginUsuario;
    

    //função que retorna os dados no banco
    retornaQuizTema(loginUsuario, res);

});

//retorna comentarios
router.get('/feed/retornaComentarios', function(req, res) {
    
    //pega os parametros
    let loginUsuario    = req.query.loginUsuario;
    let codigoPost      = req.query.codigoPost;

    //função que retorna os dados no banco
    retornaComentarios(loginUsuario, codigoPost, res);

});


//insere post de texto, video e imagem
router.post('/feed/inserePost', function(req, res) {
    if(!VerificaPalavrao.existe(req.body.legenda)) {
        //pega os parametros
        let loginUsuario    = req.body.loginUsuario;
        let cWorkspaces     = utils.arrayToPipe(req.body.cWorkspaces);
        let hashtags        = req.body.hashtags ? utils.arrayToPipe(req.body.hashtags): -1;
        let legenda         = req.body.legenda;
        let urlMidia        = req.body.urlMidia;
        let cTipoPost       = req.body.cTipoPost;
        let priorizado      = req.body.priorizado;

        //faz a insercao
        inserePost(loginUsuario, cWorkspaces, hashtags, legenda, urlMidia, cTipoPost, priorizado, res);
    } else {
        res.json({
            resultado: false,
            mensagem: VerificaPalavrao.retornaPalavroes(req.body.legenda)
        })
    }
});

//deleta post
router.delete('/feed/deletaPost', function(req, res) {

    //pega os parametros
    let loginUsuario    = req.body.loginUsuario;
    let cPost           = req.body.cPost;

    //faz a insercao
    deletaPost(loginUsuario, cPost, res);

});

//reporta post
router.post('/feed/reportaPost', function(req, res) {

    //pega os parametros
    let loginUsuario    = req.body.loginUsuario;
    let cPost           = req.body.cPost;
    let mensagem        = req.body.mensagem;

    //ajusta variavel de mensagem
    if (typeof mensagem === "undefined"){

        //seta vazio
        mensagem = "-1";
    }

    //faz a insercao
    reportaPost(loginUsuario, cPost, mensagem, res);

});

//insere post de texto, video e imagem
router.post('/feed/fixaPost', function(req, res) {

    //pega os parametros
    let loginUsuario    = req.body.loginUsuario;
    let cPost           = req.body.cPost;

    //faz a insercao
    fixaPost(loginUsuario, cPost, res);
});

router.post('/feed/insereQuiz', async function(req, res) {    

    //pega os parametros
    let loginUsuario    = req.body.loginUsuario;
    let titulo          = req.body.titulo;
    let cTema           = req.body.cTema;
    let respAnonimas    = req.body.respAnonimas;
    let dataInicial     = req.body.dataInicial;
    let dataFinal       = req.body.dataFinal;
    let perguntas       = req.body.perguntas;
    let cWorkspaces     = req.body.cWorkspaces;
    
    cWorkspaces = cWorkspaces.join('|') /**O problema ta aqui */

    async function inserir() { 
        //insere o post do quiz e retorna o codigo
        const cQuiz = await insereQuiz(loginUsuario, titulo, cTema, cWorkspaces, respAnonimas, dataInicial, dataFinal, res);        
        perguntas.forEach( async pergunta => {
            const cQuizPergunta = await inserePerguntasQuiz(loginUsuario, cQuiz, pergunta.pergunta, res)            
            pergunta.respostas.forEach(resposta => {
                insereRespostasQuiz(loginUsuario, cQuizPergunta, resposta.resposta, resposta.correta, res)
            })
        })    
        
        return cQuiz ? {"result":'Inserido com sucesso'} : {'result':'Erro ao inserir'};
    }
    //executa a funcao
    const mensagem = await inserir();    
    res.json(mensagem);
});


//insere post de texto
router.post('/feed/respondeQuiz', function(req, res) {

    //pega os parametros
    let loginUsuario  = req.body.loginUsuario;
    let cResposta     = req.body.cResposta;

    respondeQuiz(loginUsuario, cResposta, res);      

});


//insere post de texto
router.post('/feed/insereComentario', function(req, res) {

    if(!VerificaPalavrao.existe(req.body.texto)) {
        //pega os parametros
        let loginUsuario    = req.body.loginUsuario;
        let texto           = req.body.texto;
        let cPost           = req.body.cPost;

        //faz a insercao
        insereComentario(loginUsuario, texto, cPost, res);
    } else {
        res.json({
            resultado: false,
            mensagem: VerificaPalavrao.retornaPalavroes(req.body.texto)
        })
    }

});

//deleta post
router.delete('/feed/deletaComentario', function(req, res) {

    //pega os parametros
    let loginUsuario    = req.query.loginUsuario;
    let cComentario     = req.query.cComentario;

    //faz a insercao
    deletaComentario(loginUsuario, cComentario, res);

});

//insere post de texto
router.post('/feed/promover', function(req, res) {

    
    //pega os parametros
    let promoveu      = req.body.promoveu;
    let loginUsuario  = req.body.loginUsuario;
    let cPost         = req.body.cPost;

    if (promoveu) {
        //faz a insercao
        inserePromocao(loginUsuario, cPost, res);
    } else {
        removePromocao(loginUsuario, cPost, res);    
    }

});

router.get('/feed/retornaQuemPromoveu', function(req, res) {

    
    //pega os parametros
    let loginUsuario  = req.query.loginUsuario;
    let cPost         = req.query.cPost;

    retornaQuemPromoveu(loginUsuario, cPost, res);

});

router.get('/feed/retornaWorkspacesUsuario', function(req, res) {
    
    //pega os parametros
    let loginUsuario  = req.query.loginUsuario;
    

    //função que retorna os dados no banco
    retornaWorkspacesUsuario(loginUsuario, res);

});


router.post('/feed/visualizaPost', function(req, res) {
    
    //pega os parametros
    let loginUsuario  = req.body.loginUsuario;
    let cPost         = req.body.cPost;
    

    //função que retorna os dados no banco
    visualizaPost(loginUsuario, cPost, res);

});

/* FIM ROTAS FEED */

/* ROTAS PERFIL */

//retorno das informações do perfil
router.get('/perfil/retornaPerfil', function(req, res) {
    
    //pega os parametros
    let loginUsuario    = req.query.loginUsuario;
    let usuario         = req.query.usuario;

    //função que retorna os dados no banco
    retornaPerfil(loginUsuario, usuario, res);

});

//retorno das informações da hashtag
router.get('/perfil/retornaPerfilHashtag', function(req, res) {
    
    //pega os parametros
    let loginUsuario    = req.query.loginUsuario;
    let cHashtag        = req.query.cHashtag;

    //função que retorna os dados no banco
    retornaPerfilHashtag(loginUsuario, cHashtag, res);

});

//retorno das informações da workspace
router.get('/perfil/retornaPerfilWorkspace', function(req, res) {
    
    //pega os parametros
    let loginUsuario    = req.query.loginUsuario;
    let cWorkspace      = req.query.cWorkspace;

    //função que retorna os dados no banco
    retornaPerfilWorkspace(loginUsuario, cWorkspace, res);

});

//segue o usuário
router.post('/perfil/seguirUsuario', function(req, res) {

    //pega os parametros
    let loginUsuario    = req.body.loginUsuario;
    let usuario         = req.body.usuario;
    let seguiu          = req.body.seguiu; //se true, insere o seguindo, se false, remove.

    if (seguiu)
        //faz a insercao
        insereSeguidor(loginUsuario, usuario, res)
    else
        removeSeguidor(loginUsuario, usuario, res)


});

//solicita conexão com usuário
router.post('/perfil/solicitaConexao', function(req, res) {

    //pega os parametros
    let loginUsuario    = req.body.loginUsuario;
    let usuario         = req.body.usuario;
    let solicitou       = req.body.solicitou;

    if (solicitou)
        //faz a insercao
        insereSolicitacao(loginUsuario, usuario, res)
    else
        cancelaSolicitacao(loginUsuario, usuario, res)


});

//deleta a conexão com o usuário
router.delete('/perfil/deletaConexao', function(req, res) {

    //pega os parametros
    let loginUsuario    = req.body.loginUsuario;
    let usuario         = req.body.usuario;

    deletaConexao(loginUsuario, usuario, res)

});

//aceita ou recusa solicitação de conexão com usuário
router.post('/perfil/aceitaSolicitacao', function(req, res) {

    //pega os parametros
    let loginUsuario    = req.body.loginUsuario;
    let usuario         = req.body.usuario;
    let aceitou         = req.body.aceitou;

    if (aceitou)
        //faz a insercao
        aceitaSolicitacao(loginUsuario, usuario, res)
    else
        rejeitaSolicitacao(loginUsuario, usuario, res)

});


/* FIM ROTAS PERFIL */

//retorno dos Ambiente
router.get('/consultas/retornaAmbiente', function(req, res) {
    
    //pega os parametros
    let loginUsuario    = req.query.loginUsuario;
    let pesquisa        = req.query.pesquisa;

     //ajusta variavel de pesquisa
     if (typeof pesquisa === "undefined"){

        //seta vazio
        pesquisa = "";
    }

    //função que retorna os dados no banco
    retornaListaAmbiente(loginUsuario, pesquisa, res);

});

//retorno dos Módulos
router.get('/consultas/retornaModulo', function(req, res) {
    
//pega os parametros
    let loginUsuario    = req.query.loginUsuario;
    let pesquisa        = req.query.pesquisa;
    let codigoAmbiente  = req.query.codigoAmbiente;

     //ajusta variavel de pesquisa
     if (typeof pesquisa === "undefined"){

        //seta vazio
        pesquisa = "";
    }

    //função que retorna os dados no banco
    retornaListaModulo(loginUsuario, pesquisa, codigoAmbiente, res);

});

//retorno dos Menus
router.get('/consultas/retornaMenu', function(req, res) {
    
    //pega os parametros
    let loginUsuario    = req.query.loginUsuario;
    let pesquisa        = req.query.pesquisa;
    let codigoModulo    = req.query.codigoModulo;

     //ajusta variavel de pesquisa
     if (typeof pesquisa === "undefined"){

        //seta vazio
        pesquisa = "";
    }
   
    //função que retorna os dados no banco
    retornaListaMenu(loginUsuario, pesquisa, codigoModulo, res);

});

//retorno dos Itens
router.get('/consultas/retornaItem', function(req, res) {
    
    //pega os parametro
    let loginUsuario    = req.query.loginUsuario;
    let pesquisa        = req.query.pesquisa;
    let codigoMenu      = req.query.codigoMenu;
   
    //ajusta variavel de pesquisa
    if (typeof pesquisa === "undefined"){

        //seta vazio
        pesquisa = "";
    }
 
    //função que retorna os dados no banco
    retornaListaItem(loginUsuario, pesquisa, codigoMenu, res);

});

//retorna itens de configuração
router.get('/consultas/retornaConfiguracaoItem', function(req, res) {
   
    //pega os parametros
    let loginUsuario    = req.query.loginUsuario;
    let pesquisa        = req.query.pesquisa;

    //ajusta variavel de pesquisa
    if (typeof pesquisa === "undefined"){

        //seta vazio
        pesquisa = "";
    }

    //faz a edicacao
    retornaListaConfiguracaoItem(loginUsuario, pesquisa, res);

});

//retorno dos Favoritos
router.get('/consultas/retornaFavorito', function(req, res) {
    
    //pega os parametro
    let loginUsuario    = req.query.loginUsuario;
    let pesquisa        = req.query.pesquisa;
   
    //ajusta variavel de pesquisa
    if (typeof pesquisa === "undefined"){

        //seta vazio
        pesquisa = "";
    }
 
    //função que retorna os dados no banco
    retornaListaFavorito(loginUsuario, pesquisa, res);

});

//retorno dos Recentes
router.get('/consultas/retornaRecente', function(req, res) {
    
    //pega os parametro
    let loginUsuario    = req.query.loginUsuario;
    let pesquisa        = req.query.pesquisa;
   
    //ajusta variavel de pesquisa
    if (typeof pesquisa === "undefined"){

        //seta vazio
        pesquisa = "";
    }
 
    //função que retorna os dados no banco
    retornaListaRecente(loginUsuario, pesquisa, res);

});

//retorno da Sidebar
router.get('/consultas/retornaSidebar', function(req, res) {
    
    //pega os parametros
    let loginUsuario    = req.query.loginUsuario;
    

    //função que retorna os dados no banco
    retornaListaSideBar(loginUsuario, res);

});

//atualiza os favoritos
router.post('/consultas/atualizaItemFavorito', function(req, res) {
   
    //pega os parametros
    let loginUsuario    = req.body.loginUsuario;
    let codigoItem      = req.body.codigoItem;

    //faz a edicacao
    atualizaItemFavorito(loginUsuario, codigoItem, res);

});


//atualiza os itens recentes
router.post('/consultas/atualizaItemRecente', function(req, res) {
   
    //pega os parametros
    let loginUsuario    = req.body.loginUsuario;
    let codigoItem      = req.body.codigoItem;

    //faz a edicacao
    atualizaItemRecente(loginUsuario, codigoItem, res);

});

/* FUNÇÕES SOBRE */

function retornaVersao(loginUsuario, res){
    let retorno;
    global.conn.request()
        //define os parametros
        .input('loginUsuario', sql.VarChar(200) , loginUsuario)
        //executa a procedure  
        .execute('s_Retorna_Versao')
        .then(result =>res.json(result.recordset[0]))
        .catch(err => res.json(err));
}

function retornaPostUnico(loginUsuario, cPost, res){
    let retorno;
    global.conn.request()
        //define os parametros
        .input('loginUsuario'     , sql.VarChar(200) , loginUsuario)
        .input('cPost'            , sql.Int          , cPost)

        //executa a procedure  
        .execute('s_Retorna_Post_Unico')
        .then(async result => {
            try{
                //faz um map nos itens do recordset
                const final = result.recordset.map(async item => {
                    //insere o campo comentário
                    const arrayComentarios = await retornaComentariosPost(loginUsuario, item.codigo, res)
                    const arrayWorkspaces  = await retornaPostWorkspaces(loginUsuario, item.codigo, res)
                    const arrayHashtags    = await retornaHashtagsPost(loginUsuario, item.codigo, res)      
                    
                    return {                            
                        ...item,
                        comentarios : arrayComentarios,   
                        workspaces : arrayWorkspaces,
                        hashtags : arrayHashtags
                    };                  
                })

                //retorna o json com os seus requests asincronos               
                retorno = await Promise.all(final)
                res.json((retorno.length > 0) ? retorno[0] : [])
            }catch(error) {
                res.json(null)
                console.error("Error :" + error);
            }
            
        })
        .catch(err => res.json(err));
}

function retornaConteudos(loginUsuario, res){
    global.conn.request()
        //define os parametros
        .input('loginUsuario', sql.VarChar(200) , loginUsuario)
        //executa a procedure  
        .execute('s_Retorna_Conteudos')
        .then(result =>res.json(result.recordset))
        .catch(err => res.json(err));
}

function retornaPaginas(loginUsuario, cConteudo, res){
    global.conn.request()
        //define os parametros
        .input('loginUsuario', sql.VarChar(200) , loginUsuario)
        .input('cConteudo', sql.Int , cConteudo)
        //executa a procedure  
        .execute('s_Retorna_Conteudo_Paginas')
        .then(result =>res.json(result.recordset))
        .catch(err => res.json(err));
}

/* FUNÇÕES FEED */

//executa a procedure
function verificaDataUsuario(loginUsuario, res){
    global.conn.request()
    //define os parametros
    .input('loginUsuario'     , sql.VarChar(200), loginUsuario)
    //executa a procedure  
    .execute('s_Verifica_Data_Usuario')
    .then(result => res.json(
        result.recordset[0] && result.recordset[0].msg ? result.recordset[0] : null
    ))            
    .catch(err => res.json(err))      
    
}

function verificaDataResponsavel(loginUsuario, res){
    global.conn.request()
    //define os parametros
    .input('loginUsuario'     , sql.VarChar(200), loginUsuario)
    //executa a procedure  
    .execute('s_Verifica_Data_Responsavel')
    .then(result => res.json(result.recordset))            
    .catch(err => res.json(err))      
    
}

function retornaPosts(loginUsuario, top, ultimoCodigoPost, usuario, cWorkspace, cHashtag, onlyFixados, res){
    let retorno;
    global.conn.request()
        //define os parametros
        .input('loginUsuario'     , sql.VarChar(200) , loginUsuario)
        .input('top'              , sql.Int          , top)
        .input('ultimoCodigoPost' , sql.Int          , ultimoCodigoPost)
        .input('usuario'          , sql.VarChar(1000), usuario)
        .input('cWorkspace'       , sql.Int          , cWorkspace)
        .input('cHashtag'         , sql.VarChar(300) , cHashtag)
        .input('onlyFixados'      , sql.VarChar(300) , onlyFixados)
        //executa a procedure  
        .execute('s_WorkMedia_Retorna_Post')
        .then(async result => {
            try{
                //faz um map nos itens do recordset
                const final = result.recordset.map(async item => {
                    //insere o campo comentário
                    const arrayComentarios = await retornaComentariosPost(loginUsuario, item.codigo, res)
                    const arrayWorkspaces  = await retornaPostWorkspaces(loginUsuario, item.codigo, res)
                    const arrayHashtags    = await retornaHashtagsPost(loginUsuario, item.codigo, res)      
                    
                    return {                            
                        ...item,
                        comentarios : arrayComentarios,   
                        workspaces : arrayWorkspaces,
                        hashtags : arrayHashtags
                    };                  
                })

                //retorna o json com os seus requests asincronos               
                retorno = await Promise.all(final)
                res.json((retorno.length > 0) ? retorno : [])
            }catch(error) {
                res.json(null)
                console.error("Error :" + error);
            }
            
        })
        .catch(err => res.json(err));
}

//executa procedure
async function retornaComentariosPost(loginUsuario, codigoPost, res){
    let promise = new Promise(function (resolve, reject){
        global.conn.request()
        //define os parametros
        .input('loginUsuario'     , sql.VarChar(200), loginUsuario)
        .input('codigoPost'       , sql.Int         , codigoPost)
        //executa a procedure  
        .execute('s_WorkMedia_Feed_Retorna_Comentario')
            .then(result => {
                resolve(result.recordset)                
            })
            .catch(err => {
                res.json(err)
                resolve(err)
            })      
    })
        return promise   
}

//executa procedure
async function retornaPostWorkspaces(loginUsuario, cPost, res){
    let promise = new Promise(function (resolve, reject){
        global.conn.request()
        //define os parametros
        .input('loginUsuario'     , sql.VarChar(200), loginUsuario)
        .input('cPost'            , sql.Int         , cPost)
        //executa a procedure  
        .execute('s_Retorna_Post_Workspaces')
            .then(result => {
                resolve(result.recordset)                
            })
            .catch(err => {
                res.json(err)
                resolve(err)
            })      
    })
        return promise   
}

//executa procedure
async function retornaHashtagsPost(loginUsuario, cPost, res){
    let promise = new Promise(function (resolve, reject){
    global.conn.request()
        //define os parametros
        .input('loginUsuario'   , sql.VarChar(100)  , loginUsuario)
        .input('cPost'          , sql.Int           , cPost)
        //executa a procedure  
        .execute('s_Retorna_Post_Hashtags')
            .then(result => {
                resolve(result.recordset)                
            })
            .catch(err => {
                res.json(err)
                resolve(err)
            })
    })    
        return promise
}


function retornaPesquisa(loginUsuario, pesquisa, res){
    global.conn.request()
    //define os parametros
    .input('loginUsuario'     , sql.VarChar(200), loginUsuario)
    .input('pesquisa'         , sql.VarChar(200), pesquisa)
    //executa a procedure  
    .execute('s_WorkMedia_Feed_Retorna_Pesquisa')
    .then(result => res.json(result.recordset))            
    .catch(err => res.json(err))      
}

// executa procedure
// function retornaPostQuiz(loginUsuario, cPost, res){
//     let retorno;
//     global.conn.request()
//         //define os parametros
//         .input('loginUsuario'     , sql.VarChar(200) , loginUsuario)
//         .input('cPost'            , sql.Int          , cPost)
//         //executa a procedure  
//         .execute('s_WorkMedia_Retorna_Post_Quiz')
//         .then(async result => {
//             try{
//                 //faz um map nos itens do recordset
//                 const final = result.recordset.map(async quiz => {
//                     //insere o campo comentário
//                     let arrayPerguntas = await retornaQuizPerguntas(loginUsuario, quiz.codigo, res)  
                    
//                     // let promise = new Promise(function (resolve, reject){
//                         // resolve(
//                             const tempArrayFinal = arrayPerguntas.map(async (pergunta, index) => {
//                                 const arrayRespostas = await retornaQuizRespostas(loginUsuario, pergunta.codigo, res)  

//                                 return{
//                                     ...pergunta,
//                                     respostas: arrayRespostas
//                                 }
                                
//                             })
//                         // )
//                     // })

//                     return {                            
//                         ...quiz,
//                         perguntas : await Promise.all(tempArrayFinal)                           
//                     };                        
//                 })

//                 //retorna o json com os seus requests asincronos               
//                 retorno = await Promise.all(final)
//                 res.json((retorno.length === 0) ? null : retorno)
//             }catch(error) {
//                 console.error("Error :" + error);
//             }
            
//         })
//         .catch(err => res.json(err));
// }

function retornaQuiz(loginUsuario, cQuiz, res){
    global.conn.request()
    //define os parametros
    .input('loginUsuario'     , sql.VarChar(200), loginUsuario)
    .input('cQuiz'            , sql.VarChar(200), cQuiz)
    //executa a procedure  
    .execute('s_WorkMedia_Retorna_Quiz')           
    .then(async result => {
        try{
            //faz um map nos itens do recordset
            const final = result.recordset.map(async quiz => {
                //insere o campo comentário
                let arrayPerguntas = await retornaQuizPerguntas(loginUsuario, quiz.codigo, res)  
                let arrayWorkspaces = await retornaQuizWorkspaces(loginUsuario, quiz.codigo, res)
                                
                const tempArrayFinal = arrayPerguntas.map(async (pergunta, index) => {
                    const arrayRespostas = await retornaQuizRespostas(loginUsuario, pergunta.codigo, res)  

                    return{
                        ...pergunta,
                        respostas: arrayRespostas                        
                    }
                    
                })                

                return {                            
                    ...quiz,
                    perguntas : await Promise.all(tempArrayFinal),
                    workspaces: await Promise.all(arrayWorkspaces)
                };                        
            })

            //retorna o json com os seus requests asincronos               
            retorno = await Promise.all(final)
            res.json((retorno.length === 0) ? null : retorno[0])
        }catch(error) {
            console.error("Error :" + error);
        }
        
    })
    .catch(err => res.json(err));
}

//executa procedure
async function retornaQuizWorkspaces(loginUsuario, cQuiz, res){
    let promise = new Promise(function (resolve, reject){
        global.conn.request()
        //define os parametros
        .input('loginUsuario'     , sql.VarChar(200), loginUsuario)
        .input('cQuiz'            , sql.Int         , cQuiz)
        //executa a procedure  
        .execute('s_Retorna_Quiz_Workspaces')
            .then(result => {
                resolve(result.recordset)                
            })
            .catch(err => {
                res.json(err)
                resolve(err)
            })      
    })
        return promise   
}

//executa procedure
async function retornaQuizPerguntas(loginUsuario, cQuiz, res){
    let promise = new Promise(function (resolve, reject){
        global.conn.request()
        //define os parametros
        .input('loginUsuario', sql.VarChar(200), loginUsuario)
        .input('cQuiz'       , sql.Int         , cQuiz)
        //executa a procedure  
        .execute('s_WorkMedia_Retorna_Quiz_Perguntas')
            .then(result => {
                resolve(result.recordset)                
            })
            .catch(err => {
                res.json(err)
                resolve(err)
            })      
    })
    return promise
}

//executa procedure
async function retornaQuizRespostas(loginUsuario, cPergunta, res){
    let promise = new Promise(function (resolve, reject){
        global.conn.request()
        //define os parametros
        .input('loginUsuario', sql.VarChar(200), loginUsuario)
        .input('cPergunta'   , sql.Int         , cPergunta)
        //executa a procedure  
        .execute('s_WorkMedia_Retorna_Quiz_Respostas')
            .then(result => {
                resolve(result.recordset)                
            })
            .catch(err => {
                res.json(err)
                resolve(err)
            })      
    })
    return promise  
}

function retornaQuizesPendentes(loginUsuario, res){
    global.conn.request()
    //define os parametros
    .input('loginUsuario'     , sql.VarChar(200), loginUsuario)
    //executa a procedure  
    .execute('s_Retorna_Quizes_Pendentes')
    .then(result => res.json(result.recordset.length > 0 ? result.recordset.map(item => item.cQuiz): null))           
    .catch(err => res.json(err))      
}

//executa procedure
function atualizaPosts(loginUsuario, top, primeiroCodigoPost, cUsuario, cWorkspace, cHashtag, res){
    let retorno;
    global.conn.request()
    //define os parametros
    .input('loginUsuario'      , sql.VarChar(200) , loginUsuario)
    .input('top'               , sql.Int          , top)
    .input('primeiroCodigoPost', sql.Int          , primeiroCodigoPost)
    .input('cUsuario'          , sql.VarChar(1000), cUsuario)
    .input('cWorkspace'        , sql.Int          , cWorkspace)
    .input('cHashtag'          , sql.VarChar(300) , cHashtag)
    //executa a procedure
    .execute('s_WorkMedia_Retorna_Posts_Novos')
    .then(async result => {
        try{
            //faz um map nos itens do recordset
            const final = result.recordset.map(async item => {
                //insere o campo comentário
                const arrayComentarios = await retornaComentariosPost(loginUsuario, item.codigo, res)
                const arrayWorkspaces  = await retornaPostWorkspaces(loginUsuario, item.codigo, res)
                const arrayHashtags    = await retornaHashtagsPost(loginUsuario, item.codigo, res)        

                return {                            
                    ...item,
                    comentarios : arrayComentarios,   
                    workspaces : arrayWorkspaces,
                    hashtags : arrayHashtags
                };                        
            })

            //retorna o json com os seus requests asincronos               
            retorno = await Promise.all(final)
            res.json((retorno.length === 0) ? null : retorno)
        }catch(error) {
            console.error("Error :" + error);
        }
        
    })
    .catch(err => res.json(err));
}

//executa procedure
function retornaComentarios(loginUsuario, codigoPost, res){
    global.conn.request()
    //define os parametros
    .input('loginUsuario'     , sql.VarChar(200), loginUsuario)
    .input('codigoPost'       , sql.Int         , codigoPost)
    //executa a procedure  
    .execute('s_WorkMedia_Feed_Retorna_Comentario')
    .then(result => res.json(result.recordset))            
    .catch(err => res.json(err))      
}


//executa procedure
function inserePost(loginUsuario, cWorkspaces, hashtags, legenda, urlMidia, cTipoPost, priorizado, res){

    global.conn.request()
        //define os parametros
        .input('loginUsuario'       , sql.VarChar(100)  , loginUsuario)
        .input('cWorkspaces'        , sql.VarChar(9000) , cWorkspaces)
        .input('hashtags'           , sql.VarChar(9000) , hashtags)
        .input('legenda'            , sql.NVarChar(9000), legenda)
        .input('urlMidia'           , sql.VarChar(1000) , urlMidia)
        .input('cTipoPost'          , sql.Int           , cTipoPost)
        .input('priorizado'         , sql.Bit           , priorizado)
        //executa a procedure  
        .execute('s_WorkMedia_Post_Insere_Post')
            .then(result => {
                result.recordset[0].resultado = !!result.recordset[0].resultado
                res.json(result.recordset[0])
            })
            .catch(err => res.json(err));
}

//executa procedure
function deletaPost(loginUsuario, cPost, res){    
    global.conn.request()
        //define os parametros
        .input('loginUsuario'       , sql.VarChar(100) , loginUsuario)
        .input('cPost'              , sql.Int          , cPost)
        //executa a procedure  
        .execute('s_WorkMedia_Post_Deleta_Post')
            .then(result =>res.json(result.recordset[0]))
            .catch(err => res.json(err));
}

function reportaPost(loginUsuario, cPost, mensagem, res){
    global.conn.request()
        //define os parametros
        .input('loginUsuario'       , sql.VarChar(100) , loginUsuario)
        .input('cPost'              , sql.Int          , cPost)
        .input('mensagem'           , sql.VarChar(200) , mensagem)
        //executa a procedure  
        .execute('s_WorkMedia_Post_Insere_Report')
            .then(result =>res.json(result.recordset[0]))
            .catch(err => res.json(err));
}

function fixaPost(loginUsuario, cPost, res){
    global.conn.request()
        //define os parametros
        .input('loginUsuario'       , sql.VarChar(100) , loginUsuario)
        .input('cPost'              , sql.Int          , cPost)
        //executa a procedure  
        .execute('s_WorkMedia_Fixa_Desafixa_Post')
            .then(result =>res.json(result.recordset[0]))
            .catch(err => res.json(err));
}

// async function inserePostQuiz(loginUsuario, titulo, cTema, respAnonimas, cPost, res){
//     let promise = new Promise(function (resolve, reject){
//         global.conn.request()
//             //define os parametros
//             .input('loginUsuario', sql.VarChar(200), loginUsuario)
//             .input('titulo'      , sql.VarChar(500), titulo)
//             .input('cTema'       , sql.Int         , cTema)
//             .input('respAnonimas', sql.Bit         , respAnonimas)
//             .input('cPost'       , sql.Int         , cPost)
//             //executa a procedure  
//             .execute('s_WorkMedia_Insere_Post_Quiz')
//                 .then(result => {
//                     resolve(
//                         result.recordset[0].retorno

//                     )
//                 })
//                 .catch(err => {
//                     // res.json(err)
//                     resolve(err)
//                 });
//     })
//     return promise
// }

async function insereQuiz(loginUsuario, titulo, cTema, cWorkspaces, respAnonimas, dataInicial, dataFinal, res){
    let promise = new Promise(function (resolve, reject){
        global.conn.request()
            //define os parametros
            .input('loginUsuario', sql.VarChar(200) , loginUsuario)
            .input('titulo'      , sql.VarChar(500) , titulo)
            .input('cTema'       , sql.Int          , cTema)
            .input('dataInicial' , sql.DateTime     , dataInicial)
            .input('dataFinal'   , sql.DateTime     , dataFinal)
            .input('respAnonimas', sql.Bit          , respAnonimas)
            .input('cWorkspaces' , sql.VarChar(9000), cWorkspaces)
            //executa a procedure  
            .execute('s_WorkMedia_Insere_Quiz')
                .then(result => {
                    resolve(
                        result.recordset[0].retorno 
                    )
                })
                .catch(err => {
                    // res.json(err)
                    resolve(err)
                });
    })
    // ).catch(err => {
    //     throw new Error(err);
    //   });
    return promise
}

async function inserePerguntasQuiz(loginUsuario, cQuiz, pergunta, res){
    let promise = new Promise(function (resolve, reject){
        global.conn.request()
            //define os parametros
            .input('loginUsuario', sql.VarChar(200) , loginUsuario)
            .input('pergunta'    , sql.VarChar(9000), pergunta)
            .input('cQuiz'       , sql.Int          , cQuiz)            
            //executa a procedure  
            .execute('s_WorkMedia_Insere_Quiz_Perguntas')
                .then(result => {
                    resolve(
                        result.recordset[0].retorno
                    )
                })
                .catch(err => {
                    // res.json(err)
                    resolve(err)
                });
    })
    // ).catch(err => {
    //     throw new Error(err);
    //   });
    return promise
}

function insereRespostasQuiz(loginUsuario, cQuizPergunta, resposta, respostaCorreta, res){
    // var promise = new Promise(function (resolve, reject){
        global.conn.request()
            //define os parametros
            .input('loginUsuario'   , sql.VarChar(200) , loginUsuario)
            .input('resposta'       , sql.VarChar(9000), resposta)
            .input('respostaCorreta', sql.Bit          , respostaCorreta)
            .input('cPergunta'      , sql.Int          , cQuizPergunta)            
            //executa a procedure  
            .execute('s_WorkMedia_Insere_Quiz_Respostas')
                .then(result => {
                    // resolve(
                        // console.log(result.recordset[0])
                        // res.json(result.recordset[0])
                    // )
                })
                .catch(err => {
                    // res.json(err)
                    // resolve(err)
                });
    // })
    // return promise
}

function retornaQuizTema(loginUsuario, res){
    global.conn.request()
        //define os parametros
        .input('loginUsuario'       , sql.VarChar(100) , loginUsuario)
        //executa a procedure  
        .execute('s_WorkMedia_Retorna_Quiz_Tema')
            .then(result => res.json(result.recordset))
            .catch(err => res.json(err));
}

function respondeQuiz(loginUsuario, cResposta, res){
    global.conn.request()
        //define os parametros
        .input('loginUsuario'       , sql.VarChar(100) , loginUsuario)
        .input('cResposta'              , sql.Int          , cResposta)
        //executa a procedure  
        .execute('s_WorkMedia_Insere_Quiz_Resposta_Login')
            .then(result => res.json(result.recordset[0]))
            .catch(err => res.json(err));
}

function insereComentario(loginUsuario, texto, cPost, res){
    global.conn.request()
        //define os parametros
        .input('loginUsuario'       , sql.VarChar(100) , loginUsuario)
        .input('texto'              , sql.NVarChar(9000), texto)
        .input('cPost'              , sql.Int          , cPost)
        //executa a procedure  
        .execute('s_WorkMedia_Feed_Insere_Comentario')
            .then(result => res.json(result.recordset[0]))
            .catch(err => res.json(err));
}

//executa procedure
function deletaComentario(loginUsuario, cComentario, res){    
    global.conn.request()
        //define os parametros
        .input('loginUsuario'       , sql.VarChar(100) , loginUsuario)
        .input('cComentario'        , sql.Int          , cComentario)
        //executa a procedure  
        .execute('s_WorkMedia_Post_Deleta_Comentario')
            .then(result =>res.json(result.recordset[0]))
            .catch(err => res.json(err));
}

function inserePromocao(loginUsuario, cPost, res){
    global.conn.request()
        //define os parametros
        .input('loginUsuario'       , sql.VarChar(100) , loginUsuario)
        .input('cPost'              , sql.Int          , cPost)
        //executa a procedure  
        .execute('s_WorkMedia_Feed_Insere_Promocao')
            .then(result => res.json(result.recordset[0]))
            .catch(err => res.json(err));
}

function removePromocao(loginUsuario, cPost, res){
    global.conn.request()
        //define os parametros
        .input('loginUsuario'       , sql.VarChar(100) , loginUsuario)
        .input('cPost'              , sql.Int          , cPost)
        //executa a procedure  
        .execute('s_WorkMedia_Feed_Deleta_Promocao')
            .then(result => res.json(result.recordset[0]))
            .catch(err => res.json(err));
}

function retornaQuemPromoveu(loginUsuario, cPost, res){
    global.conn.request()
        //define os parametros
        .input('loginUsuario'       , sql.VarChar(100) , loginUsuario)
        .input('cPost'              , sql.Int          , cPost)
        //executa a procedure  
        .execute('s_WorkMedia_Retorna_Quem_Promoveu')
            .then(result => res.json(result.recordset))
            .catch(err => res.json(err));
}

function retornaWorkspacesUsuario(loginUsuario, res){
    global.conn.request()
        //define os parametros
        .input('loginUsuario'   , sql.VarChar(100)  , loginUsuario)
        //executa a procedure  
        .execute('s_WorkMedia_Retorna_Workspaces_Usuario')
            .then(result => res.json(result.recordset))
            .catch(err => res.json(err));
}


function visualizaPost(loginUsuario, cPost, res){
    global.conn.request()
        //define os parametros
        .input('loginUsuario'   , sql.VarChar(100)  , loginUsuario)
        .input('cPost'          , sql.Int           , cPost)
        //executa a procedure  
        .execute('s_Visualiza_Post')
            .then(result => res.json(result.recordset))
            .catch(err => res.json(err));
}

/* FIM FUNÇÕES FEED */

/* FUNÇÕES PERFIL */

//executa procedure
function retornaPerfil(loginUsuario, usuario, res){
    global.conn.request()
        //define os parametros
        .input('loginUsuario', sql.VarChar(100), loginUsuario)
        .input('usuario'     , sql.VarChar(100), usuario)
        //executa a procedure  
        .execute('s_WorkMedia_Retorna_Perfil')
            .then(result => res.json(result.recordset[0]))
            .catch(err => res.json(err));
}

function retornaPerfilHashtag(loginUsuario, cHashtag, res){
    global.conn.request()
        //define os parametros
        .input('loginUsuario', sql.VarChar(100), loginUsuario)
        .input('cHashtag'    , sql.Int         , cHashtag)
        //executa a procedure  
        .execute('s_WorkMedia_Retorna_Perfil_Hashtag')
            .then(result => res.json(result.recordset[0]))
            .catch(err => res.json(err));
}

function retornaPerfilWorkspace(loginUsuario, cWorkspace, res){
    global.conn.request()
        //define os parametros
        .input('loginUsuario', sql.VarChar(100), loginUsuario)
        .input('cWorkspace'  , sql.Int         , cWorkspace)
        //executa a procedure  
        .execute('s_WorkMedia_Retorna_Perfil_Workspace')
            .then(result => res.json(result.recordset[0]))
            .catch(err => res.json(err));
}

function insereSeguidor(loginUsuario, usuario, res){
    global.conn.request()
        //define os parametros
        .input('loginUsuarioPrimario'  , sql.VarChar(200), loginUsuario)
        .input('loginUsuarioSecundario', sql.VarChar(200), usuario)
        //executa a procedure  
        .execute('s_WorkMedia_Profile_Insere_Seguidor')
            .then(result => res.json(result.recordset[0]))
            .catch(err => res.json(err));
}

function removeSeguidor(loginUsuario, usuario, res){
    global.conn.request()
        //define os parametros
        .input('loginUsuarioPrimario'  , sql.VarChar(200), loginUsuario)
        .input('loginUsuarioSecundario', sql.VarChar(200), usuario)
        //executa a procedure  
        .execute('s_WorkMedia_Profile_Deleta_Seguidor')
            .then(result => res.json(result.recordset[0]))
            .catch(err => res.json(err));
}

function insereSolicitacao(loginUsuario, usuario, res){
    global.conn.request()
        //define os parametros
        .input('loginUsuarioPrimario'  , sql.VarChar(200), loginUsuario)
        .input('loginUsuarioSecundario', sql.VarChar(200), usuario)
        //executa a procedure  
        .execute('s_WorkMedia_Profile_Insere_Solicitacao_Conexao')
            .then(result => res.json(result.recordset[0]))
            .catch(err => res.json(err));
}

function cancelaSolicitacao(loginUsuario, usuario, res){
    global.conn.request()
        //define os parametros
        .input('loginUsuarioPrimario'  , sql.VarChar(200), loginUsuario)
        .input('loginUsuarioSecundario', sql.VarChar(200), usuario)
        //executa a procedure  
        .execute('s_WorkMedia_Profile_Deleta_Solicitacao_Conexao_Unica')
            .then(result => res.json(result.recordset[0]))
            .catch(err => res.json(err));
}

function aceitaSolicitacao(loginUsuario, usuario, res){
    global.conn.request()
        //define os parametros
        .input('loginUsuarioPrimario'  , sql.VarChar(200), usuario)
        .input('loginUsuarioSecundario', sql.VarChar(200), loginUsuario)
        //executa a procedure  
        .execute('s_WorkMedia_Profile_Aceita_Conexao')
            .then(result => res.json(result.recordset[0]))
            .catch(err => res.json(err));
}

function rejeitaSolicitacao(loginUsuario, usuario, res){
    global.conn.request()
        //define os parametros
        .input('loginUsuarioPrimario'  , sql.VarChar(200), usuario)
        .input('loginUsuarioSecundario', sql.VarChar(200), loginUsuario)
        //executa a procedure  
        .execute('s_WorkMedia_Profile_Rejeita_Solicitacao_Conexao')
            .then(result => res.json(result.recordset[0]))
            .catch(err => res.json(err));
}

function deletaConexao(loginUsuario, usuario, res){
    global.conn.request()
        //define os parametros
        .input('loginUsuarioPrimario'  , sql.VarChar(200), loginUsuario)
        .input('loginUsuarioSecundario', sql.VarChar(200), usuario)
        //executa a procedure  
        .execute('s_WorkMedia_Profile_Deleta_Conexao')
            .then(result => res.json(result.recordset[0]))
            .catch(err => res.json(err));
}

/* FIM FUNÇÕES PERFIL */

//executa procedure
function retornaListaAmbiente(loginUsuario, pesquisa, res){
    global.conn.request()
        //define os parametros
        .input('loginUsuario'   , sql.VarChar(100)  , loginUsuario)
        .input('pesquisa'       , sql.VarChar(500)  , pesquisa)
        //executa a procedure  
        .execute('s_Relatorios_Retorna_Lista_Ambiente')
            .then(result => res.json(result.recordset))
            .catch(err => res.json(err));
}

//executa procedure
function retornaListaModulo(loginUsuario, pesquisa, codigoAmbiente, res){
    global.conn.request()
        //define os parametros
        .input('loginUsuario'   , sql.VarChar(100)  , loginUsuario)
        .input('pesquisa'       , sql.VarChar(500)  , pesquisa)      
        .input('codigoAmbiente' , sql.Int           , codigoAmbiente)        
        //executa a procedure
        .execute('s_Relatorios_Retorna_Lista_Modulo')
            .then(result => res.json(result.recordset))
            .catch(err => res.json(err));
}

//executa procedure
function retornaListaMenu(loginUsuario, pesquisa, codigoModulo, res){
    global.conn.request()
        //define os parametros
        .input('loginUsuario'   , sql.VarChar(100)  , loginUsuario)
        .input('pesquisa'       , sql.VarChar(500)  , pesquisa)        
        .input('codigoModulo'   , sql.Int           , codigoModulo)        
        //executa a procedure
        .execute('s_Relatorios_Retorna_Lista_Menu')
            .then(result => res.json(result.recordset))
            .catch(err => res.json(err));
}

//executa procedure
function retornaListaItem(loginUsuario, pesquisa, codigoModulo, res){
    global.conn.request()
        //define os parametros
        .input('loginUsuario'   , sql.VarChar(100)  , loginUsuario)
        .input('pesquisa'       , sql.VarChar(500)  , pesquisa)       
        .input('codigoMenu'     , sql.Int           , codigoModulo)        
        //executa a procedure
        .execute('s_Relatorios_Retorna_Lista_Item')
            .then(result => res.json(result.recordset))
            .catch(err => res.json(err));
}

//executa procedure
function retornaListaConfiguracaoItem(loginUsuario, pesquisa, res){
    global.conn.request()
        //define os parametros
        .input('loginUsuario', sql.VarChar(100)  , loginUsuario)    
        .input('pesquisa'    , sql.VarChar(100)  , pesquisa)   
        //executa a procedure
        .execute('s_Relatorios_Retorna_Lista_Configuracao_Item')
            .then(result => res.json(result.recordset))
            .catch(err => res.json(err));
}

//executa procedure
function retornaListaSideBar(loginUsuario, res){
    global.conn.request()
        //define os parametros
        .input('loginUsuario'   , sql.VarChar(100)  , loginUsuario)
        //executa a procedure
        .execute('s_Relatorios_Retorna_Lista_Sidebar')
            .then(result => res.json(result.recordset))
            .catch(err => res.json(err));
}

//executa procedure
function retornaListaFavorito(loginUsuario, pesquisa, res){
    global.conn.request()
        //define os parametros
        .input('loginUsuario'   , sql.VarChar(100)  , loginUsuario)
        .input('pesquisa'       , sql.VarChar(500)  , pesquisa)       
        //executa a procedure
        .execute('s_Relatorios_Retorna_Lista_Item_Favorito') 
            .then(result => res.json(result.recordset))
            .catch(err => res.json(err));
}

//executa procedure
function retornaListaRecente(loginUsuario, pesquisa, res){
    global.conn.request()
        //define os parametros
        .input('loginUsuario'   , sql.VarChar(100)  , loginUsuario)
        .input('pesquisa'       , sql.VarChar(500)  , pesquisa)       
        //executa a procedure
        .execute('s_Relatorios_Retorna_Lista_Item_Recente')
            .then(result => res.json(result.recordset))
            .catch(err => res.json(err));
}

//executa procedure
function atualizaItemFavorito(loginUsuario, codigoItem, res){
    global.conn.request()
        //define os parametros
        .input('loginUsuario'   , sql.VarChar(100)  , loginUsuario)
        .input('codigoItem'     , sql.Int           , codigoItem)
        //executa a procedure
        .execute('s_Relatorios_Atualiza_Item_Favorito')
            .then(result => res.json(result.recordset[0]))
            .catch(err => res.json(err));
}


//executa procedure
function atualizaItemRecente(loginUsuario, codigoItem, res){
    global.conn.request()
        //define os parametros
        .input('loginUsuario'   , sql.VarChar(100)  , loginUsuario)
        .input('codigoItem'     , sql.Int           , codigoItem)
        //executa a procedure
        .execute('s_Relatorios_Atualiza_Item_Recente')
            .then(result => res.json(result.recordset[0]))
            .catch(err => res.json(err));
}

//exporta o router
module.exports = router;
