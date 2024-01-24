//carregando modulos
const sql = require('mssql');
const express = require('express');
const router = express.Router();
const { get } = require('../../../lib/poolManager')
const config = require('../../../config/config.json');
const connection = require('../../../config/' + config.banco);

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
            let resultTabelaAgrup = await pool.request()
                .input('dataInicial', sql.DateTime, dataInicial)
                .input('dataFinal', sql.DateTime, dataFinal)
                .input('idCliente', sql.VarChar, idCliente)
                .input('idOperacao', sql.VarChar, idOperacao)
                .input('idDiretor', sql.VarChar, idDiretor)
                .input('idGerente', sql.VarChar, idGerente)
                .input('idCoordenador', sql.VarChar, idCoordenador)
                .input('idSupervisor', sql.VarChar, idSupervisor)
                .input('idOperador', sql.VarChar, idOperador)
                .execute('s_Gestao_Performance_Retorna_Tabela_Agrupada') 
            
            let resultTabela = await pool.request()
                .input('dataInicial', sql.DateTime, dataInicial)
                .input('dataFinal', sql.DateTime, dataFinal)
                .input('idCliente', sql.VarChar, idCliente)
                .input('idOperacao', sql.VarChar, idOperacao)
                .input('idDiretor', sql.VarChar, idDiretor)
                .input('idGerente', sql.VarChar, idGerente)
                .input('idCoordenador', sql.VarChar, idCoordenador)
                .input('idSupervisor', sql.VarChar, idSupervisor)
                .input('idOperador', sql.VarChar, idOperador)
                .execute('s_Gestao_Performance_Retorna_Tabela')

        let retorno = {
            tabela: agruparTabela(resultTabela?.recordset),
            tabelaAgrupada: agruparGrafico(resultTabelaAgrup?.recordset)
        };

        function agruparGrafico(tabelaAgrupada) {
            const indicadoresMapping = {
                "Almope": 'Almope',
                "Operador": 'Operador',
                "Atendidas": 'Atendidas',
                "TMA:": 'TMA',
                "TMT": 'TMT',
                "Absenteísmo": 'Absenteísmo',
                "Aderência": 'Aderência',
                "Tempo Logado": 'Tempo Logado',
                "Jackin": 'Jackin',
                "Rechamadas 60m": 'Rechamadas 60m',
                "Rechamadas 24h": 'Rechamadas 24h',
                "Rechamadas 48h": 'Rechamadas 48h',
                "Rechamadas 72h": 'Rechamadas 72h',
                "Rechamadas 168h": 'Rechamadas 168h',
                "Transferidas": 'Transferidas',
                "Shortcall 30s": 'Shortcall 30s',
                "Shortcall 60s": 'Shortcall 60s',
                "Desconexão": 'Desconexão',
                "Desvio de Pausa": 'Desvio de Pausa',
                "Nota de Qualidade": 'Nota de Qualidade',
                "Monitorias": 'Monitorias',
                "Tempo Silêncio": 'Tempo Silêncio',
                "Pausa": 'Pausa',
                "NPS": 'NPS',
                "CSAT": 'NPS',
                "Vendas": 'Vendas',
                "Vendas Percentual": 'Vendas Percentual',
            };
        
            return tabelaAgrupada.map(item => {
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

        function agruparTabela(tabela) {
            const indicadoresMappingg = {
                "Período": 'Período',
                "Atendidas": 'Atendidas',
                "TMA:": 'TMA',
                "TMT": 'TMT',
                "Absenteísmo": 'Absenteísmo',
                "Aderência": 'Aderência',
                "Tempo Logado": 'Tempo Logado',
                "Jackin": 'Jackin',
                "Rechamadas 60m": 'Rechamadas 60m',
                "Rechamadas 24h": 'Rechamadas 24h',
                "Rechamadas 48h": 'Rechamadas 48h',
                "Rechamadas 72h": 'Rechamadas 72h',
                "Rechamadas 168h": 'Rechamadas 168h',
                "Transferidas": 'Transferidas',
                "Shortcall 30s": 'Shortcall 30s',
                "Shortcall 60s": 'Shortcall 60s',
                "Desconexão": 'Desconexão',
                "Desvio de Pausa": 'Desvio de Pausa',
                "Nota de Qualidade": 'Nota de Qualidade',
                "Monitorias": 'Monitorias',
                "Tempo Silêncio": 'Tempo Silêncio',
                "Pausa": 'Pausa',
                "NPS": 'NPS',
                "CSAT": 'NPS',
                "Vendas": 'Vendas',
                "Vendas Percentual": 'Vendas Percentual',
            };
        
            return tabela.map(item => {
                const indicadorKey = Object.keys(indicadoresMappingg);
        
                const filteredIndicators = indicadorKey.filter(key => {
                    const valorDoIndicador = item[key];
                    // Verifica se o valor do indicador existe e não é nulo
                    return valorDoIndicador !== undefined && valorDoIndicador !== null && valorDoIndicador !== "-";
                });
        
                // Adiciona aspas aos valores mapeados
                const mappedValues = filteredIndicators.map(key => indicadoresMappingg[key]);
        
                return {
                    field: mappedValues,
                    ...item
                };
            });
        }

        res.json(retorno);

    } catch (error) {
        res.status(500).json(error)
    }
}
router.get('/extracaoXlsx', function (req, res) {

    const {
        idCliente = '-1',
        idOperacao= '-1',
        idDiretor= '-1',
        idGerente= '-1',
        idCoordenador= '-1',
        idSupervisor= '-1',
        idOperador= '-1',
        dataInicial,
        dataFinal
    } = req.query

    retornaDadosExtracao(dataInicial, dataFinal,idCliente, idOperacao, idDiretor, idGerente, idCoordenador, idSupervisor, idOperador, res)
});
async function retornaDadosExtracao(dataInicial, dataFinal,idCliente, idOperacao, idDiretor, idGerente, idCoordenador, idSupervisor, idOperador, res) {
    try {

        let pool = await get('BDRechamadasGeral', connection)
        // Requisição do banco
        let result = await pool.request()
            .input('dataInicial', sql.DateTime, dataInicial)
            .input('dataFinal', sql.DateTime, dataFinal)
            .input('idCliente', sql.VarChar, idCliente)
            .input('idOperacao', sql.VarChar, idOperacao)
            .input('idDiretor', sql.VarChar, idDiretor)
            .input('idGerente', sql.VarChar, idGerente)
            .input('idCoordenador', sql.VarChar, idCoordenador)
            .input('idSupervisor', sql.VarChar, idSupervisor)
            .input('idOperador', sql.VarChar, idOperador)   
            .execute('s_Gestao_Performance_Retorna_Extracao_Tabela_Xlsx')


        let retorno = result.recordset

        res.json(retorno)

    } catch (error) {
        res.status(500).json(error)
    }
}
router.get('/extracaoXlsx/agrupados', function (req, res) {

    const {
        idCliente= '-1',
        idOperacao= '-1',
        idDiretor= '-1',
        idGerente= '-1',
        idCoordenador= '-1',
        idSupervisor= '-1',
        idOperador= '-1',
        dataInicial,
        dataFinal
    } = req.query

        retornaDadosExtracaoAgrupados(dataInicial, dataFinal,idCliente, idOperacao, idDiretor, idGerente, idCoordenador, idSupervisor, idOperador, res)
});
async function  retornaDadosExtracaoAgrupados(dataInicial, dataFinal,idCliente, idOperacao, idDiretor, idGerente, idCoordenador, idSupervisor, idOperador, res){
    try {

        let pool = await get('BDRechamadasGeral', connection)
        let result = await pool.request()
            .input('dataInicial', sql.DateTime, dataInicial)
            .input('dataFinal', sql.DateTime, dataFinal)
            .input('idCliente', sql.VarChar, idCliente)
            .input('idOperacao', sql.VarChar, idOperacao)
            .input('idDiretor', sql.VarChar, idDiretor)
            .input('idGerente', sql.VarChar, idGerente)
            .input('idCoordenador', sql.VarChar, idCoordenador)
            .input('idSupervisor', sql.VarChar, idSupervisor)
            .input('idOperador', sql.VarChar, idOperador)
            .execute('s_Gestao_Performance_Retorna_Extracao_Tabela_Xlsx_Agrupadas')


        if (!result?.recordset) {
            res.status(500).json('Não foi possível retornar os dados.')
            return;
        }

        let retorno = result.recordset

        res.json(retorno)

    } catch (error) {
        res.status(500).json(error)
    }
}
module.exports = router