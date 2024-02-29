// Importando módulos
const sql = require('mssql');
const express = require('express');
const router = express.Router();
const config = require('../../../config/config.json');
const { get } = require('../../../lib/poolManager');
const connection = require('../../../config/' + config.banco);

// Função para transformar o formato do objeto
function transformarFormato(objetoOriginal) {
  const novoFormato = {
    "cargo": []
  };

  for (const chave in objetoOriginal) {
    if (objetoOriginal.hasOwnProperty(chave)) {
      const novoArray = [];

      for (const propriedade in objetoOriginal[chave]) {
        if (objetoOriginal[chave].hasOwnProperty(propriedade)) {
          const novoItem = {
            label: propriedade,
            value: objetoOriginal[chave][propriedade]
          };

          novoArray.push({ [propriedade]: novoItem });
        }
      }

      novoFormato["cargo"].push(...novoArray);
    }
  }

  return novoFormato;
}

// Rota
router.get('/', async function (req, res) {
    const { almope } = req.query;

    try {
        let pool = await get('BDRechamadasGeral', connection);
        let resultColaborador = await pool.request()
            .input('almope', sql.VarChar, almope)
            .execute('s_Gestao_Performance_Retorna_Dados_Colaborador');

        let retorno = {
            cargo: transformarFormato(resultColaborador?.recordset)
        };

        res.json(retorno);
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;
