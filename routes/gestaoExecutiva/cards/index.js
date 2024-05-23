//carregando modulos
const sql = require('mssql');
const express = require('express');
const router = express.Router();
const config = require('../../../config/config.json');
const { get } = require('../../../lib/poolManager')
const connection = require('../../../config/' + config.monitoriaAgentes);

//Rota principal
router.get('/', function (req, res) {

    const {
        dataInicial,
        dataFinal,
        idCliente= "-1",
        idOperacao= "-1",
        idDiretor= "-1",
        idGerente= "-1",
        idCoordenador= "-1",
        idSupervisor= "-1",
        idOperador = "-1",
        cIndicador = '|-1|',
        cCategoria = '-1'
    } = req.query

    retornaDados(dataInicial, dataFinal, idCliente, idOperacao, idDiretor, idGerente, idCoordenador, idSupervisor, idOperador, cIndicador, cCategoria, res);
});

    // Função auxiliar para formatar a data
function formatarData(data) {
    if (data.includes(' ')) {
        // Extrai a data e a hora da string
        const [datePart, timePart] = data.split(' ');
        // Formata a data e a hora no formato desejado
        return `${datePart}T${timePart}.000Z`;
    }
    return data;
}
async function retornaDados(dataInicial, dataFinal, idCliente, idOperacao, idDiretor, idGerente, idCoordenador, idSupervisor, idOperador, cIndicador, cCategoria, res) {
    try {

        let pool = await get('BDRechamadasGeral', connection)
        const dataInicialFormatada = formatarData(dataInicial);
        const dataFinalFormatada = formatarData(dataFinal);

        let resultCards = await pool.request()
            .input('dataInicial', sql.DateTime, dataInicialFormatada)
            .input('dataFinal', sql.DateTime, dataFinalFormatada)
            .input('idCliente', sql.VarChar, idCliente)
            .input('idOperacao', sql.VarChar, idOperacao)
            .input('idDiretor', sql.VarChar, idDiretor)
            .input('idGerente', sql.VarChar, idGerente)
            .input('idCoordenador', sql.VarChar, idCoordenador)
            .input('idSupervisor', sql.VarChar, idSupervisor)
            .input('idOperador', sql.VarChar, idOperador)
            .input('indicadorCategoria', sql.VarChar, cCategoria)
            .input('codigoIndicador', sql.VarChar, cIndicador)
            .execute('s_Gestao_Executiva_Retorna_Indicador')
        

        let retorno = {
            cards: resultCards?.recordset

        };

        res.json(retorno);

    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};

module.exports = router