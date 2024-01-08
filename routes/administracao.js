//carregando modulos
const sql           = require('mssql');
const express       = require('express');
const router        = express.Router();
const utils         = require('../lib/utils');
const config        = require('../config/config.json');
const connection    = require('../config/' + config.banco);


//fazendo a conexão global
sql.connect(connection)
   .then(conn => global.conn = conn)
   .catch(err => console.log(err))


//página inicial
// router.get('/', function(req, res, next) {

//   res.render('index', { title: 'Express' });
// });

router.get('/retornaPermissoes', function(req, res) {
   
    //pega os parametros
    let loginUsuario    = req.query.loginUsuario;

    //realiza o retorno
    retornaPermissoes(loginUsuario, res);

});

/* ROTAS ABA CONFIGURAÇÃO */

//retorna configurações
router.get('/retornaConfiguracoes', function(req, res) {
    
    //pega os parametros
    let loginUsuario    = req.query.loginUsuario;

    //função que retorna os dados no banco
    retornaConfiguracoes(loginUsuario, res);

});

//edita configuracoes
router.post('/editaConfiguracoes', function(req, res) {
   
    //pega os parametros
    let loginUsuario    = req.body.loginUsuario;
    let urlImagem       = req.body.urlImagem;
    let cEscolaridade   = req.body.cEscolaridade;
    let nomeSocial      = req.body.nomeSocial;
    let formacao        = req.body.formacao;
    let sobreMim        = req.body.sobreMim;
    let telefone        = req.body.telefone;
    let senha           = '';
    let novaSenha       = '';
    let email           = req.body.email;

    // console.log(req.body.cEscolaridade)

    //faz a edicao
    editaConfiguracoes(loginUsuario, urlImagem, nomeSocial, formacao, sobreMim, cEscolaridade, telefone, senha, novaSenha, email, res);

});

router.post('/alteraCapaPerfil', function(req, res) {
   
    //pega os parametros
    let loginUsuario    = req.body.loginUsuario;
    let url             = req.body.url;

    //faz a edicao
    alteraCapaPerfil(loginUsuario, url, res);

});

/* FIM ROTAS ABA CONFIGURAÇÃO */

//insere o login
router.post('/insereLogin', function(req, res) {

    //pega os parametros
    let loginUsuario    = req.body.loginUsuario;
    let login           = req.body.login;
    let nome            = req.body.nome;
    let cargo           = req.body.cargo;
    let email           = req.body.email;
    let telefone        = req.body.telefone;
    let senha           = req.body.senha;
    let urlImagemPerfil = req.body.urlImagemPerfil;
   // let cPerfil         = req.body.cPerfil;

    //transforma o array em string pipeada
    //cPerfil = utils.arrayObjCodeToPipe(cPerfil);

    //faz a insercao
    insereLogin(loginUsuario, login, nome, cargo, email, telefone, senha, urlImagemPerfil, null, res);

});

//edita o login
router.post('/editaLogin', function(req, res) {
   
    //pega os parametros
    let loginUsuario    = req.body.loginUsuario;
    let codigo          = req.body.codigo;
    let login           = req.body.login;
    let nome            = req.body.nome;
    let cargo           = req.body.cargo;
    let email           = req.body.email;
    let telefone        = req.body.telefone;
    let senha           = req.body.senha;
    let urlImagemPerfil = req.body.urlImagemPerfil;
    let cPerfil         = req.body.cPerfil;

    //transforma o array em string pipeada
    cPerfil = utils.arrayObjCodeToPipe(cPerfil);

    //faz a edicao
    editaLogin(loginUsuario, codigo, login, nome, cargo, email, telefone, senha, urlImagemPerfil, cPerfil, res);

});

//desativa o login
router.post('/desativaLogin', function(req, res) {
   
    //pega os parametros
    let loginUsuario    = req.body.loginUsuario;
    let codigo          = req.body.codigo;
 
    //faz a insercao
    desativaLogin(loginUsuario, codigo, res);

});

//retorna os logins
router.get('/retornaLogin', function(req, res) {
   
    //pega os parametros
    let loginUsuario    = req.query.loginUsuario;
    let pesquisa        = req.query.pesquisa;

    //ajusta variavel de pesquisa
    if (typeof pesquisa === "undefined"){

        //seta vazio
        pesquisa = "";
    }
 
    //faz a insercao
    retornaLogin(loginUsuario, pesquisa, res);

});

//insere o perfil
router.post('/inserePerfil', function(req, res) {
   
    //pega os parametros
    let loginUsuario    = req.body.loginUsuario;
    let nome            = req.body.nome;
    let cModulo         = req.body.cModulo;
    let cItem           = req.body.cItem;
    let cSidebar        = req.body.cSidebar;
    let cLogin          = req.body.cLogin;

    cModulo  = utils.arrayObjCodeToPipe(cModulo);
    cItem    = utils.arrayObjCodeToPipe(cItem);
    cSidebar = utils.arrayObjCodeToPipe(cSidebar);
    cLogin   = utils.arrayObjCodeToPipe(cLogin);

    //faz a insercao
    inserePerfil(loginUsuario, nome, cModulo, cItem, cSidebar, cLogin, res);

});

//edita o perfil
router.post('/editaPerfil', function(req, res) {
   
    //pega os parametros
    let loginUsuario    = req.body.loginUsuario;
    let codigo          = req.body.codigo;
    let nome            = req.body.nome;
    let cModulo         = req.body.cModulo;
    let cItem           = req.body.cItem;
    let cSidebar        = req.body.cSidebar;
    let cLogin          = req.body.cLogin;

    cModulo  = utils.arrayObjCodeToPipe(cModulo);
    cItem    = utils.arrayObjCodeToPipe(cItem);
    cSidebar = utils.arrayObjCodeToPipe(cSidebar);
    cLogin   = utils.arrayObjCodeToPipe(cLogin);

    //faz a edicacao
    editaPerfil(loginUsuario, codigo, nome, cModulo, cItem, cSidebar, cLogin, res);

});

//desativa o perfil
router.post('/desativaPerfil', function(req, res) {
   
    //pega os parametros
    let loginUsuario    = req.body.loginUsuario;
    let codigo          = req.body.codigo;
 
    //faz a insercao
    desativaPerfil(loginUsuario, codigo, res);

});

//retorna os logins
router.get('/retornaPerfil', function(req, res) {
   
    //pega os parametros
    let loginUsuario    = req.query.loginUsuario;
    let pesquisa        = req.query.pesquisa;

    //ajusta variavel de pesquisa
    if (typeof pesquisa === "undefined"){

        //seta vazio
        pesquisa = "";
    }
 
    //faz a insercao
    retornaPerfil(loginUsuario, pesquisa, res);

});

router.get('/workspaces/retornaWorkspace', function(req, res) {
   
    //pega os parametros
    let loginUsuario    = req.query.loginUsuario;
    let pesquisa       = req.query.pesquisa;
    
 
    //faz a insercao
    retornaWorkspace(loginUsuario, pesquisa, res);

});

router.get('/workspaces/retornaWorkspaceUsuarios', function(req, res) {
   
    //pega os parametros
    let loginUsuario    = req.query.loginUsuario;
    let cWorkspace       = req.query.cWorkspace;
    
 
    //faz a insercao
    retornaWorkspaceUsuarios(loginUsuario, cWorkspace, res);

});


router.post('/workspaces/insereWorkspace', function(req, res) {
   
    //pega os parametros
    let loginUsuario    = req.body.loginUsuario;
    let nome            = req.body.nome;
    let urlImagem       = req.body.urlImagem ? req.body.urlImagem : '';
    let descricao       = req.body.descricao;
     
    //faz a insercao
    insereWorkspace(loginUsuario, nome, urlImagem, descricao, res);

});

router.post('/workspaces/alteraWorkspace', function(req, res) {
   
    //pega os parametros
    let loginUsuario    = req.body.loginUsuario;
    let cWorkspace      = req.body.cWorkspace;
    let nome            = req.body.nome;
    let urlImagem       = req.body.urlImagem;
    let descricao       = req.body.descricao;
 
    //faz a insercao
    alteraWorkspace(loginUsuario, cWorkspace, nome, urlImagem, descricao, res);

});

router.post('/workspaces/desativaWorkspace', function(req, res) {
   
    //pega os parametros
    let loginUsuario    = req.body.loginUsuario;
    let cWorkspace      = req.body.cWorkspace;
 
    //faz a insercao
    desativaWorkspace(loginUsuario, cWorkspace, res);

});

router.post('/workspaces/atribuiUsuario', function(req, res) {
   
    //pega os parametros
    let loginUsuario    = req.body.loginUsuario;
    let cWorkspace      = req.body.cWorkspace;
    let cLogin          = utils.arrayToPipe(req.body.cLogin);
 
    //faz a insercao
    atribuiUsuario(loginUsuario, cWorkspace, cLogin, res);

});

router.get('/cadastroUsuarios/retornaUsuario', function(req, res) {
   
    //pega os parametros
    let loginUsuario    = req.query.loginUsuario;
    let pesquisa        = req.query.pesquisa;
    let top             = req.query.top;
    let ultimoCodigo    = req.query.ultimoCodigo;
    let inativo         = req.query.inativo == 1 ? true : false;
 
    //faz a insercao
    retornaUsuario(loginUsuario, pesquisa, top, ultimoCodigo, inativo, res);

});

router.get('/cadastroUsuarios/exportaUsuarios', function (req, res) {

    console.log(req.query.loginUsuario)
    //pega os parametros
    let loginUsuario    = req.query.loginUsuario;
    let pesquisa        = req.query.pesquisa;

    //faz a insercao
    exportaUsuario(loginUsuario, pesquisa, res);
});


router.post('/cadastroUsuarios/insereUsuario', function(req, res) {
   
    //pega os parametros
    let loginUsuario        = req.body.loginUsuario;
    let nome                = req.body.nome;
    let login               = req.body.login;
    let matricula           = req.body.matricula;
    let dataNascimento      = req.body.dataNascimento;
    let dataAdmissao        = req.body.dataAdmissao;
    let email               = req.body.email;
    let telefone            = req.body.telefone;
    let cargo               = req.body.cargo;
    let cPerfil             = req.body.cPerfil;
    let cResponsavel        = req.body.cResponsavel;
    let cEstrutura            = req.body.cEstrutura;
    let cArea               = req.body.cArea;
    let cStatus             = req.body.cStatus;
    let cEscolaridade       = req.body.cEscolaridade;
    let urlImagemPerfil     = req.body.urlImagemPerfil;
    let nomeSocial          = req.body.nomeSocial;
    let sobreMim            = req.body.sobreMim;
    let formacao            = req.body.formacao;
 
    //faz a insercao
    insereUsuario(loginUsuario, nome, login, matricula, dataNascimento, dataAdmissao,
        email, telefone, cargo, cPerfil, cResponsavel, cEstrutura, cArea, cStatus, cEscolaridade, urlImagemPerfil, nomeSocial, sobreMim, formacao, res);

});

router.post('/cadastroUsuarios/importaUsuarios', async function(req, res) {
   
    //pega os parametros
    let loginUsuario        = req.body.loginUsuario;
    let listaUsuarios       = req.body.listaUsuarios;

    var results = await Promise.all(listaUsuarios.map(async (usuario, index) => {        

        if(usuario.login && usuario.login.length > 0){    
            console.log(usuario)           
            await importaUsuarios(loginUsuario, usuario.nome, usuario.login, usuario.matricula, usuario.dataNascimento, usuario.dataAdmissao,
                usuario.email, usuario.telefone, usuario.cargoTrabalho, usuario.perfil, usuario.responsavel, usuario.estrutura, 
                usuario.area, usuario.status, usuario.escolaridade, usuario.urlImagemPerfil, 
                usuario.nomeSocial, usuario.sobreMim, usuario.formacao, res);
        }
        
        if(index === listaUsuarios.length - 1)
            res.json("Dados Inseridos")
    }));            
});

router.post('/cadastroUsuarios/editaUsuario', function(req, res) {
   
    //pega os parametros
    let loginUsuario        = req.body.loginUsuario;
    let cLogin              = req.body.cLogin;            
    let nome                = req.body.nome;    
    let login               = req.body.login;
    let matricula           = req.body.matricula;
    let dataNascimento      = req.body.dataNascimento;
    let dataAdmissao        = req.body.dataAdmissao;
    let email               = req.body.email;
    let telefone            = req.body.telefone;
    let cargo               = req.body.cargo;
    let cPerfil             = req.body.cPerfil;
    let cResponsavel        = req.body.cResponsavel;
    let cEstrutura            = req.body.cEstrutura;
    let cArea               = req.body.cArea;
    let cStatus             = req.body.cStatus;
    let cEscolaridade       = req.body.cEscolaridade;
    let urlImagemPerfil     = req.body.urlImagemPerfil;
    let nomeSocial          = req.body.nomeSocial;
    let sobreMim            = req.body.sobreMim;
    let formacao            = req.body.formacao;
 
    //faz a insercao
    editaUsuario(loginUsuario, cLogin, nome, login, matricula, dataNascimento, dataAdmissao,
        email, telefone, cargo, cPerfil, cResponsavel, cEstrutura, cArea, cStatus, cEscolaridade, urlImagemPerfil, nomeSocial, sobreMim, formacao, res);

});

router.delete('/cadastroUsuarios/removeUsuario', function(req, res) {
   
    //pega os parametros
    let loginUsuario    = req.body.loginUsuario;
    let cLoginUsuario   = req.body.cLoginUsuario;
 
    //faz a insercao
    removeUsuario(loginUsuario, cLoginUsuario, res);

});

router.get('/retornaListaInformacoes', function(req, res) {
    //pega os parametros
    let loginUsuario = req.query.loginUsuario;
 
    //faz a insercao
    retornaListaInformacoes(loginUsuario, res);

});

router.get('cadastroUsuarios/retornaEsteira', function(req, res) {
   
    //pega os parametros
    let loginUsuario = req.query.loginUsuario;
 
    //faz a insercao
    retornaEsteira(loginUsuario, res);

});

router.get('cadastroUsuarios/retornaPerfil', function(req, res) {
   
    //pega os parametros
    let loginUsuario = req.query.loginUsuario;
 
    //faz a insercao
    retornaPerfil(loginUsuario, res);

});

router.get('cadastroUsuarios/retornaStatus', function(req, res) {
   
    //pega os parametros
    let loginUsuario = req.query.loginUsuario;
 
    //faz a insercao
    retornaStatus(loginUsuario, res);

});

router.get('cadastroUsuarios/retornaResponsavel', function(req, res) {
   
    //pega os parametros
    let loginUsuario = req.query.loginUsuario;
 
    //faz a insercao
    retornaResponsavel(loginUsuario, res);

});

router.get('cadastroUsuarios/retornaArea', function(req, res) {
   
    //pega os parametros
    let loginUsuario = req.query.loginUsuario;
 
    //faz a insercao
    retornaArea(loginUsuario, res);

});

//executa procedure
function retornaPermissoes(loginUsuario, res){
    global.conn.request()
        //define os parametros
        .input('loginUsuario'       , sql.VarChar(200)  , loginUsuario)
        //executa a procedure  
        .execute('s_Retorna_Permissoes_Usuario')
            .then(result => {
                
                let objRetorno = {};

                if (result.recordset) {
                    // console.log(result.recordset)
                    result.recordset.map(item => {
                        objRetorno[item.nomeVariavel] = item.ativo
                    })
                    res.json(objRetorno)

                } else  
                    res.json(objRetorno)    
            })
            .catch(err => res.json(err));
}

/* FUNÇÕES ABA CONFIGURAÇÃO */

//executa procedure
function retornaConfiguracoes(loginUsuario, res){    
    global.conn.request()
        //define os parametros
        .input('loginUsuario', sql.VarChar(200), loginUsuario)
        //executa a procedure
        .execute('s_Configuracao_Retorna_Perfil_Usuario')
            .then(result => res.json(result.recordset[0]))
            .catch(err => res.json(err));
}

//executa procedure
function editaConfiguracoes(loginUsuario, urlImagem, nomeSocial, formacao, sobreMim, cEscolaridade, telefone, senha, novaSenha, email, res){
    global.conn.request()
        //define os parametros
        .input('loginUsuario'       , sql.VarChar(200)  , loginUsuario)
        .input('urlImagem'          , sql.VarChar(8000) , urlImagem)
        .input('telefone'           , sql.VarChar(100)  , telefone)
        .input('senha'              , sql.VarChar(100)  , senha)
        .input('novaSenha'          , sql.VarChar(100)  , novaSenha)
        .input('email'              , sql.VarChar(100)  , email)        
        .input('cEscolaridade'      , sql.Int           , cEscolaridade)    
        .input('nomeSocial'         , sql.VarChar(100)  , nomeSocial)
        .input('sobreMim'           , sql.VarChar(8000) , sobreMim)
        .input('formacao'           , sql.VarChar(200)  , formacao)
        //executa a procedure  
        .execute('s_Configuracao_Edita_Perfil_Usuario')
            .then(result => {
                if (result.recordset[0]) {
                    const retorno = {
                        usuario: {
                            loginUsuario: result.recordset[0].login,
                            nome: result.recordset[0].nome,
                            email: result.recordset[0].email,
                            urlImagemPerfil: result.recordset[0].urlImagemPerfil,
                        },
                        resultado: result.recordset[0].resultado ? result.recordset[0].resultado : true,
                        msg: result.recordset[0].msg ? result.recordset[0].msg : 'Usuário editado com sucesso'
                    }
                    console.log(result.recordset[0])
                    res.json(retorno)
                }
                
            })
            .catch(err => res.json(err));
}

function alteraCapaPerfil(loginUsuario, url, res){
    global.conn.request()
        //define os parametros
        .input('loginUsuario'       , sql.VarChar(200)  , loginUsuario)
        .input('url'                , sql.VarChar(8000) , url)
        //executa a procedure  
        .execute('s_Workmedia_Altera_Capa_Perfil')
            .then(result => res.json(result.recordset[0]))
            .catch(err => res.json(err));
}

/* FIM FUNÇÕES ABA CONFIGURAÇÃO */

//executa procedure
function insereLogin(loginUsuario, login, nome, cargo, email, telefone, senha, urlImagemPerfil, cPerfil, res){
    global.conn.request()
        //define os parametros
        .input('loginUsuario'       , sql.VarChar(100), loginUsuario)
        .input('login'              , sql.VarChar(50) , login)
        .input('nome'               , sql.VarChar(150), nome)
        .input('cargo'              , sql.VarChar(150), cargo)
        .input('email'              , sql.VarChar(100), email)
        .input('telefone'           , sql.VarChar(100), telefone)
        .input('senha'              , sql.VarChar(50) , senha)
        .input('urlImagemPerfil'    , sql.VarChar(-1) , urlImagemPerfil)
        .input('cPerfil'            , sql.VarChar(-1) , cPerfil)
        //executa a procedure  
        .execute('s_Administracao_Insere_Login')
            .then(result => res.json(result.recordset[0]))
            .catch(err => res.json(err));
}

//executa procedure
function editaLogin(loginUsuario, codigo, login, nome, cargo, email, telefone, senha, urlImagemPerfil, cPerfil, res){
    global.conn.request()
        //define os parametros
        .input('loginUsuario'       , sql.VarChar(100)  , loginUsuario)
        .input('codigo'             , sql.Int           , codigo)
        .input('login'              , sql.VarChar(50)   , login)
        .input('nome'               , sql.VarChar(150)  , nome)
        .input('cargo'              , sql.VarChar(150)  , cargo)
        .input('email'              , sql.VarChar(100)  , email)
        .input('telefone'           , sql.VarChar(100)  , telefone)
        .input('senha'              , sql.VarChar(50)   , senha)
        .input('urlImagemPerfil'    , sql.VarChar(-1)   , urlImagemPerfil)
        .input('cPerfil'            , sql.VarChar(-1)   , cPerfil)
        //executa a procedure  
        .execute('s_Administracao_Edita_Login')
            .then(result => res.json(result.recordset[0]))
            .catch(err => res.json(err));
}

//executa procedure
function desativaLogin(loginUsuario, codigo, res){
    global.conn.request()
        //define os parametros
        .input('loginUsuario'       , sql.VarChar(100)  , loginUsuario)
        .input('codigo'             , sql.Int           , codigo)
        //executa a procedure  
        .execute('s_Administracao_Desativa_Login')
            .then(result => res.json(result.recordset[0]))
            .catch(err => res.json(err));
}

//executa procedure
function retornaLogin(loginUsuario, pesquisa, res){
    global.conn.request()
        //define os parametros
        .input('loginUsuario', sql.VarChar(100)  , loginUsuario)
        .input('pesquisa'    , sql.VarChar(100)   , pesquisa)
        //executa a procedure  
        .execute('s_Administracao_Retorna_Login')
            .then(result => {
                //faz um map nos itens do recordset
                result.recordset.map(function(item) {
                    //muda o campo cPerfil para um objeto com os detalhers
                    /* 
                        item.perfil = [
                            {codigo: 1, nome: 'perfil1'},
                            {codigo: 2, nome: 'perfil2'},
                            {codigo: 3, nome: 'perfil3'},
                            {codigo: 4, nome: 'perfil4'},
                        ]
                    */
                    item.perfil = utils.mesclaArrayTriplo(
                        [                 
                            utils.pipeToArray(item.cPerfil),
                            utils.pipeToArray(item.labelPerfil),
                            utils.pipeToArray(item.valuePerfil)
                        ]
                    );
                    delete item.cPerfil;  
                    delete item.labelPerfil;
                    delete item.valuePerfil;
                    // console.log(item);
                })
                
                //retorna o json
                res.json(result.recordset)
            })
            .catch(err => res.json(err));
}

//executa procedure
function inserePerfil(loginUsuario, nome, cModulo, cItem, cSidebar, cLogin, res){
    global.conn.request()
        //define os parametros
        .input('loginUsuario'       , sql.VarChar(100) , loginUsuario)
        .input('nome'               , sql.VarChar(150) , nome)
        .input('cModulo'            , sql.VarChar(-1)  , cModulo)
        .input('cItem'              , sql.VarChar(-1)  , cItem)
        .input('cSidebar'           , sql.VarChar(-1)  , cSidebar)
        .input('cLogin'             , sql.VarChar(-1)  , cLogin)
        //executa a procedure  
        .execute('s_Administracao_Insere_Perfil')
            .then(result => res.json(result.recordset[0]))
            .catch(err => res.json(err));
}

//executa procedure
function editaPerfil(loginUsuario, codigo, nome, cModulo, cItem, cSidebar, cLogin, res){
    global.conn.request()
        //define os parametros
        .input('loginUsuario'       , sql.VarChar(100)  , loginUsuario)
        .input('codigo'             , sql.Int           , codigo)
        .input('nome'               , sql.VarChar(150)  , nome)
        .input('cModulo'            , sql.VarChar(-1)  , cModulo)
        .input('cItem'              , sql.VarChar(-1)  , cItem)
        .input('cSidebar'           , sql.VarChar(-1)  , cSidebar)
        .input('cLogin'             , sql.VarChar(-1)  , cLogin)
        //executa a procedure  
        .execute('s_Administracao_Edita_Perfil')
            .then(result => res.json(result.recordset[0]))
            .catch(err => res.json(err));
}


//executa procedure
function desativaPerfil(loginUsuario, codigo, res){
    global.conn.request()
        //define os parametros
        .input('loginUsuario'       , sql.VarChar(100)  , loginUsuario)
        .input('codigo'             , sql.Int           , codigo)
        //executa a procedure  
        .execute('s_Administracao_Desativa_Perfil')
            .then(result => res.json(result.recordset[0]))
            .catch(err => res.json(err));
}

//executa procedure
function retornaPerfil(loginUsuario, pesquisa, res){
    global.conn.request()
        //define os parametros
        .input('loginUsuario', sql.VarChar(100)  , loginUsuario)
        .input('pesquisa'    , sql.VarChar(100)   , pesquisa)
        //executa a procedure  
        .execute('s_Administracao_Retorna_Perfil')
            .then(result => {
                //faz um map nos itens do recordset
                result.recordset.map(function(item) {
                    //prepara os modulos
                    item.modulo = utils.mesclaArrays(
                        [                 
                            utils.pipeToArray(item.cModulo),
                            utils.pipeToArray(item.nomeModulo)
                        ]
                    );
                    delete item.cModulo;  
                    delete item.nomeModulo;
                    //prepara os itens
                    item.item = utils.mesclaArrays(
                        [                 
                            utils.pipeToArray(item.cItem),
                            utils.pipeToArray(item.nomeItem)
                        ]
                    );
                    delete item.cItem;  
                    delete item.nomeItem;
                    //prepara os sidebars
                    item.sidebar = utils.mesclaArrays(
                        [                 
                            utils.pipeToArray(item.cSidebar),
                            utils.pipeToArray(item.nomeSidebar)
                        ]
                    );
                    delete item.cSidebar;  
                    delete item.nomeSidebar;
                    //prepara os logins
                    item.login = utils.mesclaArrays(
                        [                 
                            utils.pipeToArray(item.cLogin),
                            utils.pipeToArray(item.nomeLogin)
                        ]
                    );
                    delete item.cLogin;  
                    delete item.nomeLogin;
                })
                //retorna o json
                res.json(result.recordset)
            })
            .catch(err => res.json(err));
}

function retornaWorkspace(loginUsuario, pesquisa, res){
    global.conn.request()
        //define os parametros
        .input('loginUsuario'       , sql.VarChar(200)   , loginUsuario)
        .input('pesquisa'          , sql.VarChar(8000)  , pesquisa)
        //executa a procedure  
        .execute('s_WorkMedia_Retorna_Workspace_NSX')
            .then(result => res.json(result.recordset))
            .catch(err => res.json(err));
}

function retornaWorkspaceUsuarios(loginUsuario, cWorkspace, res){
        global.conn.request()
            //define os parametros
            .input('loginUsuario'   , sql.VarChar(200)  , loginUsuario)
            .input('cWorkspace'     , sql.Int           , cWorkspace)         
            //executa a procedure  
            .execute('s_WorkMedia_Retorna_Usuarios_Workspace_NSX')
            .then(result => res.json(result.recordset))
            .catch(err => res.json(err));
}

function insereWorkspace(loginUsuario, nome, urlImagem, descricao, res){
    global.conn.request()
        //define os parametros
        .input('loginUsuario'       , sql.VarChar(200)   , loginUsuario)
        .input('nome'               , sql.VarChar(200)   , nome)
        .input('urlImagem'          , sql.VarChar(8000)  , urlImagem)
        .input('descricao'          , sql.VarChar(8000)  , descricao)
        //executa a procedure  
        .execute('s_WorkMedia_Insere_Workspace_NSX')
            .then(result => res.json(result.recordset[0]))
            .catch(err => res.json(err));
}

function alteraWorkspace(loginUsuario, cWorkspace, nome, urlImagem, descricao, res){
    global.conn.request()
        //define os parametros
        .input('loginUsuario'       , sql.VarChar(200)   , loginUsuario)
        .input('cWorkspace'         , sql.Int            , cWorkspace)
        .input('nome'               , sql.VarChar(200)   , nome)
        .input('urlImagem'          , sql.VarChar(8000)  , urlImagem)
        .input('descricao'          , sql.VarChar(8000)  , descricao)
        //executa a procedure  
        .execute('s_WorkMedia_Altera_Workspace_NSX')
            .then(result => res.json(result.recordset[0]))
            .catch(err => res.json(err));
}

function desativaWorkspace(loginUsuario, cWorkspace, res){
    global.conn.request()
        //define os parametros
        .input('loginUsuario'       , sql.VarChar(100) , loginUsuario)
        .input('cWorkspace'         , sql.Int          , cWorkspace)
        //executa a procedure  
        .execute('s_WorkMedia_Desativa_Workspace_NSX')
            .then(result =>res.json(result.recordset[0]))
            .catch(err => res.json(err));
}

function atribuiUsuario(loginUsuario, cWorkspace, cLogin, res){
    global.conn.request()
        //define os parametros
        .input('loginUsuario'       , sql.VarChar(100) , loginUsuario)
        .input('cWorkspace'         , sql.Int          , cWorkspace)
        .input('cLogin'             , sql.VarChar(8000), cLogin)
        //executa a procedure  
        .execute('s_WorkMedia_Atribui_Usuario_Workspace_NSX')
            .then(result =>res.json(result.recordset[0]))
            .catch(err => res.json(err));
}

function retornaUsuario(loginUsuario, pesquisa, top, ultimoCodigo, inativo, res){
    global.conn.request()
        //define os parametros
        .input('loginUsuario'       , sql.VarChar(200)   , loginUsuario)
        .input('pesquisa'           , sql.VarChar(8000)  , pesquisa)
        .input('top'                , sql.Int            , top)
        .input('ultimoCodigo'       , sql.Int            , ultimoCodigo)
        .input('inativo'            , sql.Bit            , inativo)
        //executa a procedure  
        .execute('s_Cadastro_Usuario_Retorna_Relatorio_Usuario_NSX')
            .then(async result => {
                try{
                    //faz um map nos itens do recordset
                    const final = result.recordset.map(async item => {
                        //insere o campo comentário                        
                        const arrayWorkspaces  = await retornaWorkspacesUsuario(item.login, res)       
        
                        return {                            
                            ...item,
                            workspaces : arrayWorkspaces,
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

async function retornaWorkspacesUsuario(loginUsuario, res){
    let promise = new Promise(function (resolve, reject){
        global.conn.request()
        //define os parametros
        .input('loginUsuario'   , sql.VarChar(200)  , loginUsuario)
        //executa a procedure  
        .execute('s_WorkMedia_Retorna_Workspaces_Usuario')
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

function exportaUsuario(loginUsuario, pesquisa, res){
    global.conn.request()
    //define os parametros
    .input('loginUsuario'               , sql.VarChar(200)  , loginUsuario)
    .input('pesquisa'                   , sql.VarChar(8000)  , pesquisa)
    .execute('s_Cadastro_Usuario_Retorna_Exportacao_Usuario')
    .then(async result => {
        try{
            //faz um map nos itens do recordset
            const final = result.recordset.map(async item => {
                //insere o campo comentário                        
                const arrayWorkspaces  = await retornaWorkspacesUsuario(item.login, res)
                let result = arrayWorkspaces.map(obj => obj.label);       

                return {                            
                    ...item,
                    workspaces : result.join(',')

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

function insereUsuario(loginUsuario, nome, login, matricula, dataNascimento, dataAdmissao,
    email, telefone, cargo, cPerfil, cResponsavel, cEstrutura, cArea, cStatus, cEscolaridade, urlImagemPerfil, nomeSocial, sobreMim, formacao, res){
    let codigoUsuario = 0;
    global.conn.request()
        //define os parametros
        .input('loginUsuario'               , sql.VarChar(100)  , loginUsuario)
        .input('nome'                       , sql.VarChar(200)  , nome)
        .input('login'                      , sql.VarChar(200)  , login)
        .input('matricula'                  , sql.VarChar(100)  , matricula)
        .input('dataNascimento'             , sql.VarChar(100)  , dataNascimento)
        .input('dataAdmissao'               , sql.VarChar(100)  , dataAdmissao)
        .input('email'                      , sql.VarChar(200)  , email)
        .input('telefone'                   , sql.VarChar(200)  , telefone)
        .input('cargo'                      , sql.VarChar(200)  , cargo)
        .input('cPerfil'                    , sql.Int           , cPerfil)
        .input('cResponsavel'               , sql.Int           , cResponsavel)
        .input('cEstrutura'                   , sql.Int           , cEstrutura)
        .input('cArea'                      , sql.Int           , cArea)
        .input('cStatus'                    , sql.Int           , cStatus)
        .input('cEscolaridade'              , sql.Int           , cEscolaridade)
        .input('urlImagemPerfil'            , sql.VarChar(8000) , urlImagemPerfil)
        .input('nomeSocial'                 , sql.VarChar(200)  , nomeSocial)
        .input('sobreMim'                   , sql.VarChar(8000) , sobreMim)
        .input('formacao'                   , sql.VarChar(200)  , formacao)

        //executa a procedure  
        .execute('s_Cadastro_Usuario_Insere_Usuario_NSX')
            .then(result => {
                codigoUsuario = result.recordset[0].cLogin;
                res.json(result.recordset);

                global.conn.request()
                //define os parametros
                .input('codigoUsuario'               , sql.Int  , codigoUsuario)

                //executa a procedure  
                .execute('s_NeoMessenger_Insere_Conversas_Usuario')
            })
            .catch(err => res.json(err))        
}



async function retornaEscolaridade(loginUsuario, res){

    let promise = new Promise(function (resolve, reject){

        global.conn.request()
        //define os parametros
        .input('loginUsuario'       , sql.VarChar(100) , loginUsuario)
        //executa a procedure  
        .execute('s_Cadastro_Usuario_Retorna_Escolaridades')
        .then(result => {
            // console.log(result.recordset)
            resolve(
                result.recordset
            )
        })
        .catch(err => {
            res.json(err)
            resolve(err)
        });
    })
    return promise 
}

async function importaUsuarios(loginUsuario, nome, login, matricula, dataNascimento, dataAdmissao,
    email, telefone, cargo, perfil, responsavel, estrutura, area, status, escolaridade, urlImagemPerfil, nomeSocial, sobreMim, formacao, res){

    let promise = new Promise(function (resolve, reject){


        global.conn.request()
        //define os parametros
        .input('loginUsuario'               , sql.VarChar(100)  , loginUsuario)
        .input('nome'                       , sql.VarChar(200)  , nome)
        .input('login'                      , sql.VarChar(200)  , login)
        .input('matricula'                  , sql.VarChar(100)  , matricula)
        .input('dataNascimento'             , sql.VarChar(200)  , dataNascimento)
        .input('dataAdmissao'               , sql.VarChar(200)  , dataAdmissao)
        .input('email'                      , sql.VarChar(200)  , email)
        .input('telefone'                   , sql.VarChar(200)  , telefone)
        .input('cargo'                      , sql.VarChar(200)  , cargo)
        .input('perfil'                     , sql.VarChar(200)  , perfil)
        .input('responsavel'                , sql.VarChar(200)  , responsavel)
        .input('estrutura'                    , sql.VarChar(200)  , estrutura)
        .input('area'                       , sql.VarChar(200)  , area)
        .input('status'                     , sql.VarChar(200)  , status)
        .input('escolaridade'               , sql.VarChar(200)  , escolaridade)
        .input('urlImagemPerfil'            , sql.VarChar(8000) , urlImagemPerfil)
        .input('nomeSocial'                 , sql.VarChar(200)  , nomeSocial)
        .input('sobreMim'                   , sql.VarChar(8000) , sobreMim)
        .input('formacao'                   , sql.VarChar(200)  , formacao)

        //executa a procedure  
        .execute('s_Cadastro_Usuario_Importa_Usuario_NSX')
        .then(result => {                     
            resolve(                
                result.recordset
            )
        })
        .catch(err => {
            res.json(err)
            resolve(err)
        });        
    })
    return promise 
            
   
}

function editaUsuario(loginUsuario, cLogin, nome, login, matricula, dataNascimento, dataAdmissao,
    email, telefone, cargo, cPerfil, cResponsavel, cEstrutura, cArea, cStatus, cEscolaridade, urlImagemPerfil, nomeSocial, sobreMim, formacao, res){
    global.conn.request()
        //define os parametros
        .input('loginUsuario'               , sql.VarChar(100)  , loginUsuario)
        .input('cLogin'                     , sql.Int           , cLogin)
        .input('nome'                       , sql.VarChar(200)  , nome)
        .input('login'                      , sql.VarChar(200)  , login)
        .input('matricula'                  , sql.VarChar(100)  , matricula)
        .input('dataNascimento'             , sql.Date          , dataNascimento)
        .input('dataAdmissao'               , sql.Date          , dataAdmissao)
        .input('email'                      , sql.VarChar(200)  , email)
        .input('telefone'                   , sql.VarChar(200)  , telefone)
        .input('cargo'                      , sql.VarChar(200)  , cargo)
        .input('cPerfil'                    , sql.Int           , cPerfil)
        .input('cResponsavel'               , sql.Int           , cResponsavel)
        .input('cEstrutura'                 , sql.Int           , cEstrutura)
        .input('cArea'                      , sql.Int           , cArea)
        .input('cStatus'                    , sql.Int           , cStatus)
        .input('cEscolaridade'              , sql.Int           , cEscolaridade)
        .input('urlImagemPerfil'            , sql.VarChar(8000) , urlImagemPerfil)
        .input('nomeSocial'                 , sql.VarChar(255)  , nomeSocial)
        .input('sobreMim'                   , sql.VarChar(8000) , sobreMim)
        .input('formacao'                   , sql.VarChar(255)  , formacao)

        //executa a procedure  
        .execute('s_Cadastro_Usuario_Edita_Usuario_NSX')
        .then(async result => {
            try{
                //faz um map nos itens do recordset
                const final = result.recordset.map(async item => {
                    //insere o campo comentário                        
                    const arrayWorkspaces  = await retornaWorkspacesUsuario(item.login, res)       
    
                    return {                            
                        ...item,
                        workspaces : arrayWorkspaces,
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

function removeUsuario(loginUsuario, cLoginUsuario, res){
    global.conn.request()
        //define os parametros
        .input('loginUsuario'       , sql.VarChar(100) , loginUsuario)
        .input('cLoginUsuario'      , sql.Int          , cLoginUsuario)
        //executa a procedure  
        .execute('s_Cadastro_Usuario_Remove_Usuario_NSX')
            .then(result =>res.json(result.recordset[0]))
            .catch(err => res.json(err));
}

async function retornaListaInformacoes(loginUsuario, res) {

        //insere os arrays de lista
        const arrayEscolaridade = await retornaEscolaridade(loginUsuario)
        const arrayPerfil = await retornaPerfil(loginUsuario)        
        const arrayArea = await retornaArea(loginUsuario)        
        const arrayResponsavel = await retornaResponsavel(loginUsuario)        
        const arrayEsteira = await retornaEsteira(loginUsuario)      
        const arrayEstrutura = await retornaEstrutura(loginUsuario)
        const arrayStatus = await retornaStatus(loginUsuario)        
        
        const retorno = await {                                        
            escolaridade : arrayEscolaridade,   
            perfil : arrayPerfil,
            area : arrayArea,
            responsavel : arrayResponsavel,
            estrutura: arrayEstrutura, 
            esteira: arrayEsteira,
            status: arrayStatus,           
        }                  

    //retorna o json com os seus requests asincronos               
    
    res.json(retorno)     
}

async function retornaEscolaridade(loginUsuario, res){

    let promise = new Promise(function (resolve, reject){

        global.conn.request()
        //define os parametros
        .input('loginUsuario'       , sql.VarChar(100) , loginUsuario)
        //executa a procedure  
        .execute('s_Cadastro_Usuario_Retorna_Escolaridades')
        .then(result => {
            // console.log(result.recordset)
            resolve(
                result.recordset
            )
        })
        .catch(err => {
            res.json(err)
            resolve(err)
        });
    })
    return promise 
}

async function retornaPerfil(loginUsuario, res){
    let promise = new Promise(function (resolve, reject){

        global.conn.request()
        //define os parametros
        .input('loginUsuario'       , sql.VarChar(100) , loginUsuario)
        //executa a procedure  
        .execute('s_Cadastro_Usuario_Retorna_Perfil')
        .then(result => {

            resolve(
                
                result.recordset
            )
        })
        .catch(err => {
            res.json(err)
            resolve(err)
        });
    })
    return promise 
}

async function retornaEsteira(loginUsuario, res){
    let promise = new Promise(function (resolve, reject){

        global.conn.request()
        //define os parametros
        .input('loginUsuario'       , sql.VarChar(100) , loginUsuario)
        //executa a procedure  
        .execute('s_Cadastro_Usuario_Retorna_Esteira')
        .then(result => {
            resolve(
                result.recordset
            )
        })
        .catch(err => {
            res.json(err)
            resolve(err)
        });
    })
    return promise 
}

async function retornaResponsavel(loginUsuario, res){
    let promise = new Promise(function (resolve, reject){

        global.conn.request()
        //define os parametros
        .input('loginUsuario'       , sql.VarChar(100) , loginUsuario)
        //executa a procedure  
        .execute('s_Cadastro_Usuario_Retorna_Responsavel')
        .then(result => {
            resolve(
                result.recordset
            )
        })
        .catch(err => {
            res.json(err)
            resolve(err)
        });
    })
    return promise 
}

async function retornaStatus(loginUsuario, res){
    let promise = new Promise(function (resolve, reject){

        global.conn.request()
        //define os parametros
        .input('loginUsuario'       , sql.VarChar(100) , loginUsuario)
        //executa a procedure  
        .execute('s_Cadastro_Usuario_Retorna_Status')
        .then(result => {
            resolve(
                result.recordset
            )
        })
        .catch(err => {
            res.json(err)
            resolve(err)
        });
    })
    return promise 
}

async function retornaEstrutura(loginUsuario, res){
    let promise = new Promise(function (resolve, reject){

        global.conn.request()
        //define os parametros
        .input('loginUsuario'       , sql.VarChar(100) , loginUsuario)
        //executa a procedure  
        .execute('s_Cadastro_Usuario_Retorna_Estrutura')
        .then(result => {
            resolve(
                result.recordset
            )
        })
        .catch(err => {
            res.json(err)
            resolve(err)
        });
    })
    return promise 
}

async function retornaArea(loginUsuario, res){
    let promise = new Promise(function (resolve, reject){

        global.conn.request()
        //define os parametros
        .input('loginUsuario'       , sql.VarChar(100) , loginUsuario)
        //executa a procedure  
        .execute('s_Cadastro_Usuario_Retorna_Area')
        .then(result => {
            resolve(
                result.recordset
            )
        })
        .catch(err => {
            res.json(err)
            resolve(err)
        });
    })
    return promise 
}

//exporta o router
module.exports = router;
