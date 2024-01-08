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

//Rota que retorna os artigos
router.get('/', function(req, res) {
    const {loginUsuario,cColecao, cArtigo} = req.query 
    console.log(loginUsuario,cColecao, cArtigo,res)

    if (!loginUsuario) {
        res.status(400).json('loginUsuario não informado.')
        return
    }

    retornaArtigo(loginUsuario,cColecao, cArtigo,res)
});

async function retornaArtigo(loginUsuario,cColecao, cArtigo,res){
    try {
            // Requisição do banco
            let result = await global.conn.request()
                //define os parametros
                .input('loginUsuario'   , sql.VarChar(100) , loginUsuario ? loginUsuario : '')
                .input('cArtigo'        , sql.Int          , cArtigo)
                .input('cColecao'        , sql.Int          , cColecao)
                
                //executa a procedure  
                .execute('s_Wiki_Retorna_Artigo_Aberto')
            
            if (!result.recordset[0]) {
                res.status(500).json('Não foi possível retornar o artigo.')
                return
            }

            //Puxando array com as informações do Artigo  
            let artigo = {
                codigo: result.recordset[0]?.codigo,
                nome: result.recordset[0]?.nome,
                nomeCriador: result.recordset[0]?.nomeCriador,
                urlImagem: result.recordset[0]?.urlImagem,
                conteudo: result.recordset[0]?.conteudo,
                anonimo: result.recordset[0]?.anonimo,
                dataAtualizacao: result.recordset[0]?.dataAtualizacao,
                nomeColecao: result.recordset[0]?.nomeColecao
            }                

            //Criando variável de retorno com as informações finais do artigo.
            res.json(artigo)

        } catch (error) {
         res.status(500).json(error)
    }
}

//exporta o router
module.exports = router;  