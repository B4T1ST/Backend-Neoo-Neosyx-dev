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
    } = req.query

    retornaDados(dataInicial, dataFinal, idCliente, idOperacao, idDiretor, idGerente, idCoordenador, idSupervisor, idOperador, cIndicador, res);
});

async function retornaDados(dataInicial, dataFinal, idCliente, idOperacao, idDiretor, idGerente, idCoordenador, idSupervisor, idOperador, cIndicador,  res) {
    try {

        let pool = await get('BDRechamadasGeral', connection)

        let resultDispersao = await pool.request()
            .input('dataInicial', sql.DateTime, dataInicial)
            .input('dataFinal', sql.DateTime, dataFinal)
            .input('idCliente', sql.VarChar, idCliente)
            .input('idOperacao', sql.VarChar, idOperacao)
            .input('idDiretor', sql.VarChar, idDiretor)
            .input('idGerente', sql.VarChar, idGerente)
            .input('idCoordenador', sql.VarChar, idCoordenador)
            .input('idSupervisor', sql.VarChar, idSupervisor)
            .input('idOperador', sql.VarChar, idOperador)
            .input('cIndicador', sql.VarChar, cIndicador)
            .execute('s_Gestao_Executiva_Retorna_Dispersao_Indicadores')

 

        let retorno = {
            Dispersao: resultDispersao?.recordset,
        };

        res.json(retorno)

        // const transformarResposta = (retorno) => {
        //     const primeiroItem = retorno.Dispersao[0];
        //     const grafico = {
        //         indicador: {
        //             nome: primeiroItem.indicador
        //         },
        //         field: retorno.Dispersao.map(item => ({
        //             operador: item.operador,
        //             Y: item.Y,
        //             ValorX: item.ValorX,
        //             LegendaX: item.LegendaX,
        //             legendaQuartil: item.legendaQuartil,
        //             corThr: item.corThr
        //         }))
        //     };

        //     return grafico;
        // };

        // // Utiliza a função transformarResposta
        // const respostaTransformada = transformarResposta(retorno);
        // res.json(respostaTransformada);

    } catch (error) {
        res.status(500).json(error);
    }
}
module.exports = router