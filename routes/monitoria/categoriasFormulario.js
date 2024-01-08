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

//Rota que retorna categorias
router.get('/', function(req, res) {
    const {loginUsuario,codigo} = req.query 
    console.log(loginUsuario,codigo)

    if (!loginUsuario) {
        res.status(400).json('loginUsuario não informado.')
    }

    retornaCategorias (loginUsuario,codigo,res)
});

async function retornaCategorias(loginUsuario,codigo,res){
    try {
        // Requisição do banco
        let result = await global.conn.request()
            //define os parametros
            .input('loginUsuario'        , sql.VarChar(100) , loginUsuario ? loginUsuario : '')
            .input('codigo'        , sql.Int          , codigo ? codigo : -1)

            //executa a procedure  
            .execute('s_Retorna_Categorias_Formulario_Monitoria')
        
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

//rota responsável por inserir nova categoria
router.post('/', function(req, res) {
    //req.body
    let loginUsuario = req.body.loginUsuario
    let nome = req.body.nome

    insereCategoria(loginUsuario, nome, res)
}); 

// função responsável por inserir nova categoria
function insereCategoria(loginUsuario, nome, res){
    global.conn.request()
        //define os parametros
        .input('loginUsuario'        , sql.VarChar(200), loginUsuario )
        .input('nome'                , sql.VarChar(200), nome )
        //executa a procedure  
        .execute('s_Insere_Categoria_Formulario_Monitoria')
        
        .then(result => {
            const retorno = {
                resultado : result.recordset
            }
            res.json(retorno)
        }).catch(err => res.json(err))       
}

module.exports = router