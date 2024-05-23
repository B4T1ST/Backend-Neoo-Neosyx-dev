//carregando modulos
const sql = require('mssql');
const express = require('express');
const router = express.Router();
const { get } = require('../../../lib/poolManager')
const config = require('../../../config/config.json');
const connection = require('../../../config/' + config.executiva);

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
        cIndicador,
        cComparativo = 1,
    } = req.query

    retornaDados(dataInicial, dataFinal, idCliente, idOperacao, idDiretor, idGerente, idCoordenador, idSupervisor, idOperador, cIndicador, cComparativo, res);
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
async function retornaDados(dataInicial, dataFinal, idCliente, idOperacao, idDiretor, idGerente, idCoordenador, idSupervisor, idOperador, cIndicador, cComparativo, res) {
    try {
        let pool = await get('BDRechamadasGeral', connection)

        // Formata as datas antes de passá-las para a função de banco de dados
        const dataInicialFormatada = formatarData(dataInicial);
        const dataFinalFormatada = formatarData(dataFinal);

        let resultDispersao = await pool.request()
            .input('dataInicial', sql.DateTime, dataInicialFormatada)
            .input('dataFinal', sql.DateTime, dataFinalFormatada)
            .input('idCliente', sql.VarChar, idCliente)
            .input('idOperacao', sql.VarChar, idOperacao)
            .input('idDiretor', sql.VarChar, idDiretor)
            .input('idGerente', sql.VarChar, idGerente)
            .input('idCoordenador', sql.VarChar, idCoordenador)
            .input('idSupervisor', sql.VarChar, idSupervisor)
            .input('idOperador', sql.VarChar, idOperador)
            .input('cIndicador', sql.VarChar, cIndicador)
            .input('cComparativo', sql.Bit, cComparativo)
            .execute('s_Gestao_Executiva_Retorna_Dispersao_Indicadores_v2')

// Filtra os resultados para remover aqueles que contêm '-'
let resultadosFiltrados = resultDispersao.recordset.filter(item => {
    // Verifica se algum dos valores do objeto contém '-'
    return Object.values(item).every(value => value !== '-' && value !== null);
});

let retorno = {
    DispersaoOperador: resultadosFiltrados,
};

res.json(retorno)
} catch (error) {
res.status(500).json(error);
}
}
module.exports = router