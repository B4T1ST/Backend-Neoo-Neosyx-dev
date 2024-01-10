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
const loginRouter = require('./routes/login.js');
const uploaderRouter = require('./routes/uploader.js');
const colecoesRouter = require('./routes/wiki/colecoes.js');
const iconesRouter = require('./routes/wiki/icones.js');
const artigosRouter = require('./routes/wiki/artigos.js');
const categoriasRouter = require('./routes/wiki/categorias.js');
const perfisRouter = require('./routes/wiki/perfis.js');
const artigoAbertoRouter = require('./routes/wiki/artigoAberto.js');
const avaliacoesRouter = require('./routes/wiki/avaliacoes.js');
const artigosRelacionadosRouter = require('./routes/wiki/artigosRelacionados.js');
const categoriasArtigoRouter = require('./routes/wiki/categoriasArtigo.js');
// const linkRouter            = require('./routes/monitoria/retornaLinks');
// const categoriasFormRouter  = require('./routes/monitoria/categoriasFormulario');
// const listFormRouter        = require('./routes/monitoria/retornaFormsVisaoGeral');
const consultasRouter       = require('./routes/consultas.js');
const administracaoRouter   = require('./routes/administracao.js');
const relatoriosRouter      = require('./routes/relatorios/index.js');
const MVPRouter      = require('./routes/MVP/index.js');
const sidebarRouter         = require('./routes/sidebar.js');
// const sancoesRouter         = require('./routes/sancoes');

const feedbackHistoricoRouter = require('./routes/feedbackHistorico/index');
const feedbackRouter = require('./routes/feedback/index');
const cardsRouter = require('./routes/cards/index.js');
const graficoBarraRouter = require('./routes/cards/graficoBarra.js');
const fileView = require('./routes/fileView/index.js');
const avatarRouter           = require('./routes/avatar/index.js');

// const port = 4000;
// const port = 8443;

const nginsxTag = '/api'

const app = express();
const port = 2500;

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

app.use(`${nginsxTag}/avatar`, avatarRouter);

//rota de cards
app.use(`${nginsxTag}/gestaoPerformace`, cardsRouter);

//rota do grafico torta
// app.use('/graficoTorta', tortaRouter );

//app.use(`${nginsxTag}/gestaoPerformace/feedbackHistorico`, feedbackHistoricoRouter)

app.use(`${nginsxTag}/gestaoPerformace/feedback`, feedbackRouter)

//carrega as rotas
// app.get(`${nginsxTag}/lagin`, (req, res) => res.send('Hallo World!'));
app.get(`${nginsxTag}/basicStatus`, (req, res) => res.status(200).send({ status: 'Online' }));
app.use(`${nginsxTag}/login`, loginRouter);
app.use(`${nginsxTag}/MVP`                               , (req, res, next) => {  
  if(req.originalUrl.startsWith('/api/MVP')){
    next();
  } 
  // else{
  //   authJWT.verificaToken(req,res,next) 
  // } 
}, MVPRouter);
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
app.use(`${nginsxTag}/relatorios`                               , (req, res, next) => {  
  if(req.originalUrl.startsWith('/api/relatorios/monitoriaAgentes')){
    next();
  } else if (req.originalUrl.startsWith('/api/relatorios/monitoriaLideranca')){
    next(); 
  } else if (req.originalUrl.startsWith('/api/relatorios/auditoriaDeInteracoes')) {
    next();
  }else if (req.originalUrl.startsWith('/api/relatorios/')) {
    next();
  }
  // else if(req.originalUrl.startsWith('/api/relatorios/acompanhamentoDeAcessos')) {
  //   next();
  // }
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

// var httpsServer = https.createServer(options, app);

// var httpsServer = https.createServer(app);
// ativa a escuta na porta
//httpsServer.listen(port);
app.listen(port);

//exibe memsangem
console.log('Servidor iniciado.');
console.log('Escutando na porta: ' + port);


