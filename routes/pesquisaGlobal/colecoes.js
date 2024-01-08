//carregando modulos
const sql = require("mssql");
const express = require("express");
const router = express.Router();
const config = require("../../config/config.json");
const connection = require("../../config/" + config.banco);

//fazendo a conexão global
sql
  .connect(connection)
  .then((conn) => (global.conn = conn))
  .catch((err) => console.log(err));

//Rota que retorna as coleções
router.get("/", function (req, res) {
  //const loginUsuario = req.query.loginUsuario
  const { loginUsuario, pesquisa } = req.query;

  if (!loginUsuario) {
    res.status(400).json("loginUsuario não informado.");
  }

  retornaColecoes(loginUsuario, pesquisa, res);
});

async function retornaColecoes(loginUsuario, pesquisa, res) {
  try {
    // Requisição do banco
    let result = await global.conn
      .request()
      //define os parametros
      .input("loginUsuario", sql.VarChar(100), loginUsuario ? loginUsuario : "")
      .input("pesquisa", sql.NVarChar, pesquisa ? pesquisa : "")
      //executa a procedure
      .execute("s_Pesquisa_Global_Retorna_Colecoes");

    if (!result.recordsets) {
      res.json(result);
    }

    //Puxando array com as informações das coleções
    let colecoes = result.recordsets[0];
    //Puxando array com as informações dos usuarios que tem artigos criados dentro das coleções
    let usuariosArtigos = result.recordsets[1];

    //Criando variável de retorno com as informações finais das coleções
    let retorno = colecoes.map((colecao) => {
      //Filtrando usuários que estão na coleção
      let usuariosFilter = usuariosArtigos.filter(
        (usuario) => usuario.cColecao === colecao.codigo
      );
      return {
        codigo: colecao.codigo,
        nome: colecao.nome,
        descricao: colecao.descricao,
        urlImagem: colecao.urlImagem,
        qtdArtigos: colecao.qtdArtigos,
        usuarioArtigo: usuariosFilter
      };
    });
    res.json(retorno);
  } catch (error) {
    res.status(500).json(err);
  }
}

module.exports = router;
