//carregando modulos
const sql = require('mssql');
const express = require('express');
const router = express.Router();
const { get } = require('../../lib/poolManager')
const config = require('../../config/config.json');
const connection = require('../../config/' + config.banco);

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

        let resultGrafico = await pool.request()
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
            .execute('s_Gestao_Performance_Retorna_Grafico_Barra')

        // let resultTabelaAgrup = await pool.request()
        //     .input('idOperador', sql.VarChar, idSupervisor)
        //     .input('dataInicial', sql.DateTime, dataInicial)
        //     .input('dataFinal', sql.DateTime, dataFinal)
        //     .execute('s_Gestao_Performance_Retorna_Tabela_Agrupada') 
            
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
            grafico: resultGrafico?.recordset,
            tabela: agruparTabela(resultTabela?.recordset)
            // tabelaAgrupada: agruparGrafico(resultTabelaAgrup?.recordset)
        };

        // function agruparGrafico(tabelaAgrupada) {
        //     const indicadoresMapping = {
        //         almope: 'Almope',
        //         operador: 'Operador',
        //         atendidas: 'Atendidas',
        //         absenteismo: 'Absenteísmo',
        //         aderencia: 'Aderência',
        //         csat: 'CSAT',
        //         desconexao: 'Desconexão',
        //         desvioPausa: 'Desvio de Pausa',
        //         jackin: 'Jackin',
        //         notaQualidade: 'Nota de Qualidade',
        //         nps: 'NPS',
        //         operador: 'Operador',
        //         pausa: 'Pausa',
        //         qtdMonitoria: 'Quantidade de Monitoria',
        //         qtdTransferidas: 'Quantidade Transferidas',
        //         recham24m: 'Recham 24m',
        //         recham48m: 'Recham 48m',
        //         recham60m: 'Recham 60m',
        //         recham72m: 'Recham 72m',
        //         recham128m: 'Recham 128m',
        //         shortcall30s: 'Shortcall 30s',
        //         shortcall60s: 'Shortcall 60s',
        //         tempoSilencio: 'Tempo de Silêncio',
        //         tempologado: 'Tempo Logado',
        //         tma: 'TMA',
        //         tmt: 'TMT',
        //         vendas: 'Vendas',
        //         vendasPerc: 'Vendas Percentual',
        //     };
        
        //     return tabelaAgrupada.map(item => {
        //         const indicadorKey = Object.keys(indicadoresMapping);
                
        //         const filteredIndicators = indicadorKey.filter(key => {
        //             const valorDoIndicador = item[key];
        //             // Verifica se o valor do indicador existe e não é nulo
        //             return valorDoIndicador !== undefined && valorDoIndicador !== null && valorDoIndicador !== "-";
        //         });
        
        //         return {
        //             field: filteredIndicators,
        //             ...item
        //         };
        //     });
        // }

        // function agruparTabela(tabela) {
        //     const indicadoresMapping = {
        //         periodo: 'Periodo',
        //         absenteismo: 'Absenteísmo',
        //         aderencia: 'Aderência',
        //         atendidas: 'Atendidas',
        //         csat: 'CSAT',
        //         desconexao: 'Desconexão',
        //         desvioPausa: 'Desvio de Pausa',
        //         jackin: 'Jackin',
        //         notaQualidade: 'Nota de Qualidade',
        //         nps: 'NPS',
        //         operador: 'Operador',
        //         pausa: 'Pausa',
        //         qtdMonitoria: 'Quantidade de Monitoria',
        //         qtdTransferidas: 'Quantidade Transferidas',
        //         recham24m: 'Recham 24m',
        //         recham48m: 'Recham 48m',
        //         recham60m: 'Recham 60m',
        //         recham72m: 'Recham 72m',
        //         recham128m: 'Recham 128m',
        //         shortcall30s: 'Shortcall 30s',
        //         shortcall60s: 'Shortcall 60s',
        //         tempoSilencio: 'Tempo de Silêncio',
        //         tempologado: 'Tempo Logado',
        //         tma: 'TMA',
        //         tmt: 'TMT',
        //         vendas: 'Vendas',
        //         vendasPerc: 'Vendas Percentual',
        //     };
        
        //     return tabela.map(item => {
        //         const indicadorKey = Object.keys(indicadoresMapping);
                
        //         const filteredIndicators = indicadorKey.filter(key => {
        //             const valorDoIndicador = item[key];
        //             // Verifica se o valor do indicador existe e não é nulo
        //             return valorDoIndicador !== undefined && valorDoIndicador !== null && valorDoIndicador !== "-";
        //         });
        
        //         return {
        //             field: filteredIndicators,
        //             ...item
        //         };
        //     });
        // }

        res.json(retorno);

    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports = router