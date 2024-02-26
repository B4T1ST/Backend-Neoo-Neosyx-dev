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
    } = req.query

    retornaDados(dataInicial, dataFinal, idCliente, idOperacao, idDiretor, idGerente, idCoordenador, idSupervisor, idOperador, res);
});

async function retornaDados(dataInicial, dataFinal, idCliente, idOperacao, idDiretor, idGerente, idCoordenador, idSupervisor, idOperador,  res) {
    try {

        let pool = await get('BDRechamadasGeral', connection)

        let resultMicroGestao = await pool.request()
            .input('dataInicial', sql.DateTime, dataInicial)
            .input('dataFinal', sql.DateTime, dataFinal)
            .input('idCliente', sql.VarChar, idCliente)
            .input('idOperacao', sql.VarChar, idOperacao)
            .input('idDiretor', sql.VarChar, idDiretor)
            .input('idGerente', sql.VarChar, idGerente)
            .input('idCoordenador', sql.VarChar, idCoordenador)
            .input('idSupervisor', sql.VarChar, idSupervisor)
            .input('idOperador', sql.VarChar, idOperador)
            .execute('s_Gestao_Executiva_Retorna_Micro_Gestao')


        let retorno = {
            MicroGestao: agruparMicroGestao(resultMicroGestao?.recordset),
        };

        function agruparMicroGestao(MicroGestao) {
            const indicadoresMapping = {
                "operador": 'operador',
                "supervisor": 'supervisor',
                "operacao": 'operacao',
                "indicadorAtendidas": 'indicadorAtendidas',
                "valorAtendidas": 'valorAtendidas',
                "indicadorTmo": 'indicadorTmo',
                "valorTmo": 'valorTmo',
                "quartilTmo": 'quartilTmo',
                "corThrTmo": 'corThrTmo',
                "indicadorAbsenteismo": 'indicadorAbsenteismo',
                "valorAbsenteismo": 'valorAbsenteismo',
                "quartilAbsenteismo": 'quartilAbsenteismo',
                "corThrAbsenteismo": 'corThrAbsenteismo',
                "indicadorTempologado": 'indicadorTempologado',
                "valorTempologado": 'valorTempologado',
                "quartilTempologado": 'quartilTempologado',
                "corThrTempologado": 'corThrTempologado',
                "indicadorJackin": 'indicadorJackin',
                "valorJackin": 'valorJackin',
                "quartilJackin": 'quartilJackin',
                "corThrJackin": 'corThrJackin',
                "indicadorRecham60m": 'indicadorRecham60m',
                "valorRecham60m": 'valorRecham60m',
                "quartilRecham60m": 'quartilRecham60m',
                "corThrRecham60m": 'corThrRecham60m',
                "indicadorRecham24h": 'indicadorRecham24h',
                "valorRecham24h": 'valorRecham24h',
                "quartilRecham24h": 'quartilRecham24h',
                "corThrRecham24h": 'corThrRecham24h',
                "indicadorRecham48h": 'indicadorRecham48h',
                "valorRecham48h": 'valorRecham48h',
                "quartilRecham48h": 'quartilRecham48h',
                "corThrRecham48h": 'corThrRecham48h',
                "indicadorRecham72h": 'indicadorRecham72h',
                "valorRecham72h": 'valorRecham72h',
                "quartilRecham72h": 'quartilRecham72h',
                "corThrRecham72h": 'corThrRecham72h',
                "indicadorTransferidas": 'indicadorTransferidas',
                "valorTransferidas": 'valorTransferidas',
                "quartilTransferidas": 'quartilTransferidas',
                "corThrTransferidas": 'corThrTransferidas',
                "indicadorShortCall30s": 'indicadorShortCall30s',
                "valorShortCall30s": 'valorShortCall30s',
                "quartilShortCall30s": 'quartilShortCall30s',
                "corThrShortCall30s": 'corThrShortCall30s',
                "indicadorShortCall60s": 'indicadorShortCall60s',
                "valorShortCall60s": 'valorShortCall60s',
                "quartilShortCall60s": 'quartilShortCall60s',
                "corThrShortCall60s": 'corThrShortCall60s',
                "indicadorDesconexao": 'indicadorDesconexao',
                "valorDesconexao": 'valorDesconexao',
                "quartilDesconexao": 'quartilDesconexao',
                "corThrDesconexao": 'corThrDesconexao'  

            };
        
            return MicroGestao.map(item => {
                const indicadorKey = Object.keys(indicadoresMapping);
                
                const filteredIndicators = indicadorKey.filter(key => {
                    const valorDoIndicador = item[key];
                    // Verifica se o valor do indicador existe e não é nulo
                    return valorDoIndicador !== undefined && valorDoIndicador !== null && valorDoIndicador !== "-";
                });
                const mappedValues = filteredIndicators.map(key => indicadoresMapping[key]);
                return {
                    field: mappedValues,
                    ...item
                };
            });
        }

        res.json(retorno)

    } catch (error) {
        res.status(500).json(error);
    }
}
module.exports = router