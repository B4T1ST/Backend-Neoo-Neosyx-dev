//carregando modulos
// const express = require('express');
// const session = require('express-session');
// const cors = require('cors');
// const path = require('path');
// const https = require('https');
// const fs = require('fs');
// const tls = require('tls')
// const authJWT = require('./lib/authJWT.js');
const express           = require('express');
const session           = require('express-session');
const cors              = require('cors');
const path              = require('path');
const https             = require('https');
const fs                = require('fs');
const tls               = require('tls')
const authJWT           = require('./lib/authJWT.js');
const helmet            = require("helmet");

//carregando as rotas
const loginRouter = require('./routes/login');
const uploaderRouter = require('./routes/uploader');
const colecoesRouter = require('./routes/wiki/colecoes');
const iconesRouter = require('./routes/wiki/icones');
const artigosRouter = require('./routes/wiki/artigos');
const categoriasRouter = require('./routes/wiki/categorias');
const perfisRouter = require('./routes/wiki/perfis');
const artigoAbertoRouter = require('./routes/wiki/artigoAberto');
const avaliacoesRouter = require('./routes/wiki/avaliacoes');
const artigosRelacionadosRouter = require('./routes/wiki/artigosRelacionados');
const categoriasArtigoRouter = require('./routes/wiki/categoriasArtigo');
// const linkRouter            = require('./routes/monitoria/retornaLinks');
// const categoriasFormRouter  = require('./routes/monitoria/categoriasFormulario');
// const listFormRouter        = require('./routes/monitoria/retornaFormsVisaoGeral');
const consultasRouter       = require('./routes/consultas');
const administracaoRouter   = require('./routes/administracao');
const relatoriosRouter      = require('./routes/relatorios');
const sidebarRouter         = require('./routes/sidebar');
const MVPRouter      = require('./routes/MVP');

const feedbackHistoricoRouter = require('./routes/gestaoPerformace/feedbackHistorico/');
const feedbackRouter = require('./routes/gestaoPerformace/feedback/');
const tortaRouter = require('./routes/gestaoPerformace/torta');
const graficoBarraRouter = require('./routes/gestaoPerformace/graficoBarra/');
const tabelasRouter = require('./routes/gestaoPerformace/tabelas/');
const filtroRouter = require('./routes/gestaoPerformace/filtro/');
const dataAtualizacaoRouter = require('./routes/gestaoPerformace/dataAtualizacao/');
const feedbackPainelRouter = require('./routes/gestaoPerformace/feedbackPainel/');
const monitoriasGestaoPerformaceRouter = require('./routes/gestaoPerformace/monitorias/');
const pausasGestaoPerformaceRouter = require('./routes/gestaoPerformace/pausas/');
const rocoinsRouter = require('./routes/gestaoPerformace/rocoins/');
const usuarioRouter = require('./routes/gestaoPerformace/usuario/');
const kpiRouter = require('./routes/gestaoPerformace/KPI/');
const fileView = require('./routes/fileView/index.js');
const avatarRouter           = require('./routes/gestaoPerformace/avatar/index.js');
// const sancoesRouter         = require('./routes/sancoes');

//gestao executiva
const executivaIndicadoresRouter = require('./routes/gestaoExecutiva/indicador/');
const executivaTortaRouter = require ('./routes/gestaoExecutiva/torta/');
const executivaUniversoRouter = require ('./routes/gestaoExecutiva/universo/');
const executivaVisaoGeralRouter = require ('./routes/gestaoExecutiva/visaoGeral/');
const executivaHierarquiaRouter = require ('./routes/gestaoExecutiva/hierarquia/');
const executivaCorrelacaoRouter = require ('./routes/gestaoExecutiva/correlacao/');
const executivaGraficoIndicadoresRouter = require ('./routes/gestaoExecutiva/graficoIndicadores/');
const executivaUsuarioRouter = require ('./routes/gestaoExecutiva/usuario/');
const executivaDispersaoRouter = require ('./routes/gestaoExecutiva/dispersao/');
const executivaFiltroRouter = require ('./routes/gestaoExecutiva/filtro/');
const executivaMicroGestaoRouter = require ('./routes/gestaoExecutiva/microGestao/');
const executivaExtracaoRouter = require ('./routes/gestaoExecutiva/extracao/');
const executivaExtracaoMicroGestaoRouter = require ('./routes/gestaoExecutiva/extracaoMicroGestao/');
// const port = 4000;
// const port = 8443;

const nginsxTag = '/api'

const app = express();
const port = 3001;

//carrega os demais middlewares
app.use(cors(
  { credentials: true, origin: '*' }));

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb' }));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.text());



//desabilitar o poweredby
app.disable('x-powered-by');
app.use(helmet())

//define as configurações da sessão. (máximo 30 min)
app.use(session({
  secret: "neosyx",
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 30 * 60 * 1000 },
}));

app.use(`${nginsxTag}/fileView`, fileView);

//rota para avatar
app.use(`${nginsxTag}/avatar`, avatarRouter);

//rota home
app.use(`${nginsxTag}/gestaoPerformace/torta`, tortaRouter);

//rota de dataAtualizacao
app.use(`${nginsxTag}/gestaoPerformace/dataAtualizacao`, dataAtualizacaoRouter);

//rota de historicoFeedback
app.use(`${nginsxTag}/gestaoPerformace/feedbackPainel`, feedbackPainelRouter);

//rota de monitorias gestao performace
app.use(`${nginsxTag}/gestaoPerformace/monitorias`, monitoriasGestaoPerformaceRouter);

//rota de pausas gestao performace
app.use(`${nginsxTag}/gestaoPerformace/pausas`, pausasGestaoPerformaceRouter);

//rota de rocoins
app.use(`${nginsxTag}/gestaoPerformace/rocoins`, rocoinsRouter);

//rota de usuario
app.use(`${nginsxTag}/gestaoPerformace/usuario`, usuarioRouter);

//rota do grafico barra
app.use(`${nginsxTag}/gestaoPerformace/graficoBarra`, graficoBarraRouter);


app.use(`${nginsxTag}/gestaoPerformace/filtro`, filtroRouter);

//rota para tabelas dos graficos + extracao
app.use(`${nginsxTag}/gestaoPerformace/tabela`, tabelasRouter);

//rota para KPI
app.use(`${nginsxTag}/gestaoPerformace/kpi`, kpiRouter);

//rota para feedbackHistorico
app.use(`${nginsxTag}/gestaoPerformace/feedbackHistorico`, feedbackHistoricoRouter)

//rota para pop-up feedbackHistorico
app.use(`${nginsxTag}/gestaoPerformace/feedback`, feedbackRouter)


//rota para indicadores gestao executiva
app.use(`${nginsxTag}/gestaoExecutiva/indicadores`, executivaIndicadoresRouter)

//rota para torta gestao executiva
app.use(`${nginsxTag}/gestaoExecutiva/torta`, executivaTortaRouter)

//rota para universo gestao executiva
app.use(`${nginsxTag}/gestaoExecutiva/universo`, executivaUniversoRouter)

//rota para Visao Geral gestao executiva
app.use(`${nginsxTag}/gestaoExecutiva/visaoGeral`, executivaVisaoGeralRouter)

//rota para Hierarquia gestao executiva
app.use(`${nginsxTag}/gestaoExecutiva/hierarquia`, executivaHierarquiaRouter)

//rota para Correlacao gestao executiva
app.use(`${nginsxTag}/gestaoExecutiva/correlacao`, executivaCorrelacaoRouter)

//rota para Grafico Indicadores gestao executiva
app.use(`${nginsxTag}/gestaoExecutiva/graficoIndicadores`, executivaGraficoIndicadoresRouter)

//rota para dados Colaborador gestao executiva
app.use(`${nginsxTag}/gestaoExecutiva/usuario`, executivaUsuarioRouter)

//rota para Dispersao Indicadores gestao executiva
app.use(`${nginsxTag}/gestaoExecutiva/dispersao`, executivaDispersaoRouter)

//rota para filtro gestao executiva
app.use(`${nginsxTag}/gestaoExecutiva/filtro`, executivaFiltroRouter)

//rota para micro gestao executiva
app.use(`${nginsxTag}/gestaoExecutiva/microGestao`, executivaMicroGestaoRouter)

//rota para extracao executiva
app.use(`${nginsxTag}/gestaoExecutiva/extracao`, executivaExtracaoRouter)

//rota para extracao executiva micro gestao
app.use(`${nginsxTag}/gestaoExecutiva/extracaoMicroGestao`, executivaExtracaoMicroGestaoRouter)


//carrega as rotas
// app.get(`${nginsxTag}/lagin`, (req, res) => res.send('Hallo World!'));
app.get(`${nginsxTag}/basicStatus`, (req, res) => res.status(200).send({ status: 'Online' }));
app.use(`${nginsxTag}/login`, loginRouter);
// app.use(`${nginsxTag}/wiki/colecoes`, colecoesRouter);
// app.use(`${nginsxTag}/wiki/icones`, iconesRouter);
// app.use(`${nginsxTag}/wiki/artigos`, artigosRouter);
// app.use(`${nginsxTag}/wiki/categorias`, categoriasRouter);
// app.use(`${nginsxTag}/wiki/perfis`, perfisRouter);
// app.use(`${nginsxTag}/wiki/artigoAberto`, artigoAbertoRouter);
// app.use(`${nginsxTag}/wiki/avaliacoes`, avaliacoesRouter);
// app.use(`${nginsxTag}/wiki/artigosRelacionados`, artigosRelacionadosRouter);
// app.use(`${nginsxTag}/monitoria/retornaLinks`, linkRouter);
// app.use(`${nginsxTag}/monitoria/categoriasFormulario`, categoriasFormRouter);
// app.use(`${nginsxTag}/monitoria/retornaFormsVisaoGeral`, listFormRouter);
// app.use(`${nginsxTag}/sancoes`, sancoesRouter)
// app.use(`${nginsxTag}/relatorios`, relatoriosRouter);
// app.use(`${nginsxTag}/relatorios`, authJWT.verificaToken, relatoriosRouter);

// Ativar futuramente verificação do token
// app.use('/uploader'     , authJWT.verificaToken, uploaderRouter); 
// app.use(`${nginsxTag}/uploader`, authJWT.verificaToken, uploaderRouter);
// app.use(`${nginsxTag}/administracao`, authJWT.verificaToken, administracaoRouter);
app.use(`${nginsxTag}/sidebar`, authJWT.verificaToken, sidebarRouter);
// app.use(`${nginsxTag}/`, authJWT.verificaToken, consultasRouter);
// app.get(`${nginsxTag}/basicStatus`, (req, res)  =>  res.status(200).send({status: 'Online'}));
// app.use(`${nginsxTag}/login`                                    , loginRouter); 
// app.use(`${nginsxTag}/wiki/colecoes`                            , colecoesRouter); 
// app.use(`${nginsxTag}/wiki/icones`                              , iconesRouter);
// app.use(`${nginsxTag}/wiki/artigos`                             , artigosRouter);
// app.use(`${nginsxTag}/wiki/categorias`                          , categoriasRouter);
// app.use(`${nginsxTag}/wiki/perfis`                              , perfisRouter);
// app.use(`${nginsxTag}/wiki/artigoAberto`                        , artigoAbertoRouter);
// app.use(`${nginsxTag}/wiki/avaliacoes`                          , avaliacoesRouter);
// app.use(`${nginsxTag}/wiki/artigosRelacionados`                 , artigosRelacionadosRouter);

// app.use(`${nginsxTag}/monitoria/retornaLinks`                   , linkRouter);
// app.use(`${nginsxTag}/monitoria/categoriasFormulario`           , categoriasFormRouter);
// app.use(`${nginsxTag}/monitoria/retornaFormsVisaoGeral`         , listFormRouter);
// app.use(`${nginsxTag}/sancoes`                                  , sancoesRouter)

// Ativar futuramente verificação do token
app.use(`${nginsxTag}/MVP`                               , (req, res, next) => {  
  if(req.originalUrl.startsWith('/api/MVP')){
    next();
  } 
  // else{
  //   authJWT.verificaToken(req,res,next) 
  // } 
}, MVPRouter);

app.use(`${nginsxTag}/relatorios`                               , (req, res, next) => {  
  if(req.originalUrl.startsWith('/api/relatorios/monitoriaAgentes')){
    next();
  } else if (req.originalUrl.startsWith('/api/relatorios/monitoriaLideranca')){
    next(); 
  }else if (req.originalUrl.startsWith('/api/relatorios/acompanhamentoDeAcessos')){
    next(); 
  }else if (req.originalUrl.startsWith('/api/relatorios/auditoriaDeInteracoes')) {
    next();
  }else if (req.originalUrl.startsWith('/api/relatorios/')) {
    next();
  }
  // else{
  //   authJWT.verificaToken(req,res,next) 
  // } 
}, relatoriosRouter);

// app.use(`${nginsxTag}/uploader`                                 , authJWT.verificaToken, uploaderRouter); 
// app.use(`${nginsxTag}/administracao`                            , authJWT.verificaToken, administracaoRouter); 
// app.use(`${nginsxTag}/sidebar`                                  , authJWT.verificaToken, sidebarRouter); 
// app.use(`${nginsxTag}/`                                         , authJWT.verificaToken, consultasRouter);

// app.get(`${nginsxTag}/download`, authJWT.verificaToken, (req, res) => {

//   let urlArquivo = req.query.urlArquivo
//   let nomeArquivo = req.query.nomeArquivo

//   if (!urlArquivo) {
//     res.status(400).send('Essa requisição precisa da urlArquivo para funcionar')
//     return
//   }

//   if (!nomeArquivo) {
//     res.status(400).send('Essa requisição precisa do nome do Arquivo para funcionar')
//     return
//   }

//   // https://webservice.neosyx.com
//   // https://dashboardmobile.atento.com.br
//   // urlArquivo = urlArquivo.replace('https://webservice.neosyx.com', 'C:/inetpub/wwwroot');
//   // https://neoo-web.almavivadobrasil.com.br
//   // https://dashboardmobile.atento.com.br
//   urlArquivo = urlArquivo.replace('https://neoo-web.almavivadobrasil.com.br', 'C:/inetpub/wwwroot');
//   const ext = path.extname(urlArquivo);
//   console.log(urlArquivo)
//   res.download(urlArquivo, nomeArquivo, (err) => {
//     if (err) {
//       if (res.headersSent) {
//         console.log(err)
//         return res.status(500).send('Erro ao no header da requisição do arquivo');
//       } else {
//         console.log('ERRO DOWNLOAD >', err)
//         return res.status(500).send('Erro ao baixar o arquivo');
//       }
//     }
  
//     if(!nomeArquivo){
//       res.status(400).send('Essa requisição precisa do nome do Arquivo para funcionar')
//       return
//     }
  
//     // https://webservice.neosyx.com
//     // https://dashboardmobile.atento.com.br
//     // urlArquivo = urlArquivo.replace('https://webservice.neosyx.com', 'C:/inetpub/wwwroot');
//     // https://nsx.almavivadobrasil.com.br
//     // https://dashboardmobile.atento.com.br

//     urlArquivo = urlArquivo.replace('https://nsx.almavivadobrasil.com.br', 'C:/inetpub/wwwroot');
//     const ext = path.extname(urlArquivo);    
//     console.log(urlArquivo)
//     res.download(urlArquivo, nomeArquivo, (err)=>{    
//       if(err) {      
//         if(res.headersSent) {        
//           console.log(err)
//           return res.status(500).send('Erro ao no header da requisição do arquivo'); 
//         } else {
//           console.log('ERRO DOWNLOAD >',err)
//           return res.status(500).send('Erro ao baixar o arquivo'); 
//         }
//       }    
//     });  
//   });
// });

// app.use(`/login`                                    , loginRouter); 
// app.use('/pesquisaGlobal'                           , pesquisaGlobalRouter);
// app.use('/uploader'                                 , authJWT.verificaToken, uploaderRouter); 
// app.use('/administracao'                            , authJWT.verificaToken, administracaoRouter); 
// app.use('/relatorios'                               , authJWT.verificaToken, relatoriosRouter);
// app.use('/sidebar'                                  , authJWT.verificaToken, sidebarRouter); 
// app.use(`/`                                         , authJWT.verificaToken, consultasRouter);
// app.use('/wiki/colecoes'                            , colecoesRouter); 
// app.use('/wiki/icones'                              , iconesRouter);
// app.use('/wiki/artigos'                             , artigosRouter);
// app.use('/wiki/categorias'                          , categoriasRouter);
// app.use('/wiki/perfis'                              , perfisRouter);
// app.use('/wiki/artigoAberto'                        , artigoAbertoRouter);
// app.use('/wiki/artigosRelacionados'                 , artigosRelacionadosRouter);
// app.use('/wiki/avaliacoes'                          , avaliacoesRouter);
// app.use('/wiki/categoriasArtigo'                    , categoriasArtigoRouter);
// app.use('/monitoria/retornaLinks'                   , linkRouter);
// app.use('/monitoria/categoriasFormulario'           , categoriasFormRouter);
// app.use('/monitoria/retornaFormsVisaoGeral'         , listFormRouter);


//rota de teste
// app.set("views", path.join(__dirname, "/out"));

// app.use("/out", express.static("out"));

// var privateKey  = fs.readFileSync('./certificates/server.key', 'utf8');
// var certificate = fs.readFileSync('./certificates/server.crt', 'utf8');

// var credentials = {key: privateKey, cert: certificate};

// var httpsServer = https.createServer(credentials, app);

// var privateKey  = fs.readFileSync('./certificates/server.key', 'utf8');
// var certificate = fs.readFileSync('./certificates/server.crt', 'utf8');
const context = tls.createSecureContext({
  pfx :  fs.readFileSync(path.join(__dirname, 'certificates', 'cert_alm_22.pfx')),
  passphrase: "JKSL23#OIL%",
});

//configura os certificados
// var options =   {
//   ca: fs.readFileSync(path.join(__dirname, 'certificates', 'CEPO220929444255.cer')),    
//   // pfx :  fs.readFileSync(path.join(__dirname, 'certs', 'cert_alm_22.pfx')),
//   SNICallback: function (domain, cb) {        
//       if ((domain === 'neoo-web.almavivadobrasil.com.br')) {
//           cb(null, context);
//       }
//   },    
//   secureProtocol: "TLSv1_2_method",
//   ciphers: [        
//       "ECDHE-RSA-AES256-SHA384",
//       "DHE-RSA-AES256-SHA384",
//       "ECDHE-RSA-AES256-SHA256",
//       "DHE-RSA-AES256-SHA256",
//       "ECDHE-RSA-AES128-SHA256",
//       "DHE-RSA-AES128-SHA256",
//       "HIGH",
//       "!AES128",
//       "!ARIA128",
//       "!aNULL",
//       "!eNULL",
//       "!EXPORT",
//       "!DES",
//       "!RC4",
//       "!MD5",
//       "!PSK",
//       "!SRP",
//       "!CAMELLIA"
//   ].join(':'),
// }
var options =   {
  ca: fs.readFileSync(path.join(__dirname, 'certificates', 'CEPO220929444255.cer')),    
  // pfx :  fs.readFileSync(path.join(__dirname, 'certs', 'cert_alm_22.pfx')),
  SNICallback: function (domain, cb) {        
      if ((domain === 'monitoramento.almavivadobrasil.com.br')) {
          cb(null, context);
      }
  },    
  secureProtocol: "TLSv1_2_method",
  ciphers: [        
      "ECDHE-RSA-AES256-SHA384",
      "DHE-RSA-AES256-SHA384",
      "ECDHE-RSA-AES256-SHA256",
      "DHE-RSA-AES256-SHA256",
      "ECDHE-RSA-AES128-SHA256",
      "DHE-RSA-AES128-SHA256",
      "HIGH",
      "!AES128",
      "!ARIA128",
      "!aNULL",
      "!eNULL",
      "!EXPORT",
      "!DES",
      "!RC4",
      "!MD5",
      "!PSK",
      "!SRP",
      "!CAMELLIA"
  ].join(':'),
}

var httpsServer = https.createServer(options, app);

// var httpsServer = https.createServer(app);
// ativa a escuta na porta
httpsServer.listen(port);
// app.listen(port);

//exibe memsangem
console.log('Servidor iniciado.');
console.log('Escutando na porta: ' + port);


