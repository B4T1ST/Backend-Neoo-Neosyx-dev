//carregando modulos
const sql = require('mssql');
const express = require('express');
const router = express.Router();
const config = require('../../config/config.json');
const { get } = require('../../lib/poolManager')
const connection = require('../../config/' + config.banco);

router.use('/graficoBarra', require('./graficoBarra'))
router.use('/agentes', require('./agentes'))
router.use('/comparativos', require('./comparativos'))


router.get('/', function (req, res) {

    const {
        almope,
        dataInicial,
        dataFinal,
        cComparativo = 1,
        cIndicador,
        almopeResponsavel,
        isFirstRendering
    } = req.query


    if (!almope) {
        res.status(400).json('almope não informado.')
        return
    }

    if (!cComparativo) {
        res.status(400).json('cComparativo não informado.')
        return
    }

    retornaDados(almope, dataInicial, dataFinal, cComparativo, cIndicador, almopeResponsavel, isFirstRendering, res);
});
async function retornaDados(almope, dataInicial, dataFinal, cComparativo, cIndicador, almopeResponsavel, isFirstRendering, res) {
    try {

        let pool = await get('BDRechamadasGeral', connection)
        console.log('procedura retorna cards orimeira request')

        // Requisição do banco
        // let resultCards = await pool.request()
        //     //define os parametros
        //     .input('almope', sql.VarChar, almope)
        //     .input('dataInicial', sql.DateTime, dataInicial)
        //     .input('dataFinal', sql.DateTime, dataFinal)
        //     .input('cComparativo', sql.Int, cComparativo)
        //     .execute('s_Sup_Digital_Retorna_Cards')

        console.log(resultCards)

        let resultDia = await pool.request()
            //define os parametros
            .input('almope', sql.VarChar, almope)
            .execute('s_Sup_Digital_Retorna_Dia_Logado')

        let resultTabelaAgrup = await pool.request()
            //define os parametros
            .input('almope', sql.VarChar, almope)
            .input('dataInicial', sql.DateTime, dataInicial)
            .input('dataFinal', sql.DateTime, dataFinal)
            .input('cComparativo', sql.Int, cComparativo)
            .execute('s_Sup_Digital_Retorna_Tabela_Agrupada')

        let resultTabela = await pool.request()
            //define os parametros
            .input('almope', sql.VarChar, almope)
            .input('dataInicial', sql.DateTime, dataInicial)
            .input('dataFinal', sql.DateTime, dataFinal)
            .input('cComparativo', sql.Int, cComparativo)
            .execute('s_Sup_Digital_Retorna_Tabela')

        let resultTorta = await pool.request()
            //define os parametros
            .input('almope', sql.VarChar, almope)
            .input('dataInicial', sql.DateTime, dataInicial)
            .input('dataFinal', sql.DateTime, dataFinal)
            .input('cComparativo', sql.Int, cComparativo)
            .execute('s_Sup_Digital_Retorna_Grafico_Torta')

        let resultTermometro = await pool.request()
            //define os parametros
            .input('almope', sql.VarChar, almope)
            .input('dataInicial', sql.DateTime, dataInicial)
            .input('dataFinal', sql.DateTime, dataFinal)
            .input('cComparativo', sql.Int, cComparativo)
            .execute('s_Sup_Digital_Retorna_KPI')

        let resultGrafico = await pool.request()
            //define os parametros
            .input('almope', sql.VarChar, almope)
            .input('dataInicial', sql.DateTime, dataInicial)
            .input('dataFinal', sql.DateTime, dataFinal)
            .input('cComparativo', sql.Int, cComparativo)
            .input('cIndicador', sql.Int, cIndicador)
            .execute('s_Sup_Digital_Retorna_Grafico_Barra')


        let resultUsuario = await pool.request()
            //define os parametros
            .input('almope', sql.VarChar, almope)
            .execute('s_Sup_Digital_Retorna_Dados_Colaborador')

        let resultDataAtualizacao = await pool.request()
            .input('dataInicial', sql.DateTime, dataInicial)
            .input('dataFinal', sql.DateTime, dataFinal)
            .execute('s_Sup_Digital_Retorna_Data_Atualizacao')


        let retorno = {
            //cards: resultCards?.recordset,
            dias: resultDia?.recordset,
            tabela: agruparTabela(resultTabela?.recordset),
            tabelaAgrupada: agruparGrafico(resultTabelaAgrup?.recordset),
            torta: resultTorta?.recordset,
            grafico: resultGrafico?.recordset,
            termometro: resultTermometro?.recordset[0],
            usuario: resultUsuario?.recordset[0],
            dataAtualizacao: resultDataAtualizacao.recordset
        };

        function agruparGrafico(tabelaAgrupada) {
            const indicadoresMapping = {
                almope: 'Almope',
                operador: 'Operador',
                atendidas: 'Atendidas',
                absenteismo: 'Absenteísmo',
                aderencia: 'Aderência',
                csat: 'CSAT',
                desconexao: 'Desconexão',
                desvioPausa: 'Desvio de Pausa',
                jackin: 'Jackin',
                notaQualidade: 'Nota de Qualidade',
                nps: 'NPS',
                operador: 'Operador',
                pausa: 'Pausa',
                qtdMonitoria: 'Quantidade de Monitoria',
                qtdTransferidas: 'Quantidade Transferidas',
                recham24m: 'Recham 24m',
                recham48m: 'Recham 48m',
                recham60m: 'Recham 60m',
                recham72m: 'Recham 72m',
                recham128m: 'Recham 128m',
                shortcall30s: 'Shortcall 30s',
                shortcall60s: 'Shortcall 60s',
                tempoSilencio: 'Tempo de Silêncio',
                tempologado: 'Tempo Logado',
                tma: 'TMA',
                tmt: 'TMT',
                vendas: 'Vendas',
                vendasPerc: 'Vendas Percentual',
            };
        
            return tabelaAgrupada.map(item => {
                const indicadorKey = Object.keys(indicadoresMapping);
                
                const filteredIndicators = indicadorKey.filter(key => {
                    const valorDoIndicador = item[key];
                    // Verifica se o valor do indicador existe e não é nulo
                    return valorDoIndicador !== undefined && valorDoIndicador !== null && valorDoIndicador !== "-";
                });
        
                return {
                    field: filteredIndicators,
                    ...item
                };
            });
        }

        function agruparTabela(tabela) {
            const indicadoresMapping = {
                periodo: 'Periodo',
                absenteismo: 'Absenteísmo',
                aderencia: 'Aderência',
                atendidas: 'Atendidas',
                csat: 'CSAT',
                desconexao: 'Desconexão',
                desvioPausa: 'Desvio de Pausa',
                jackin: 'Jackin',
                notaQualidade: 'Nota de Qualidade',
                nps: 'NPS',
                operador: 'Operador',
                pausa: 'Pausa',
                qtdMonitoria: 'Quantidade de Monitoria',
                qtdTransferidas: 'Quantidade Transferidas',
                recham24m: 'Recham 24m',
                recham48m: 'Recham 48m',
                recham60m: 'Recham 60m',
                recham72m: 'Recham 72m',
                recham128m: 'Recham 128m',
                shortcall30s: 'Shortcall 30s',
                shortcall60s: 'Shortcall 60s',
                tempoSilencio: 'Tempo de Silêncio',
                tempologado: 'Tempo Logado',
                tma: 'TMA',
                tmt: 'TMT',
                vendas: 'Vendas',
                vendasPerc: 'Vendas Percentual',
            };
        
            return tabela.map(item => {
                const indicadorKey = Object.keys(indicadoresMapping);
                
                const filteredIndicators = indicadorKey.filter(key => {
                    const valorDoIndicador = item[key];
                    // Verifica se o valor do indicador existe e não é nulo
                    return valorDoIndicador !== undefined && valorDoIndicador !== null && valorDoIndicador !== "-";
                });
        
                return {
                    field: filteredIndicators,
                    ...item
                };
            });
        }

        res.json(retorno);

    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

router.get('/pausas', function (req, res) {

    const {
        almope,
        dataInicial,
        dataFinal,
        cComparativo
    } = req.query

    if (!almope) {
        res.status(400).json('almope não informado.')
        return
    }

    if (!cComparativo) {
        res.status(400).json('cComparativo não informado.')
        return
    }

    retornaDadosPausa(almope, dataInicial, dataFinal, cComparativo, res)
});
async function retornaDadosPausa(almope, dataInicial, dataFinal, cComparativo, res) {
    try {

        let pool = await get('BDRechamadasGeral', connection)
        // Requisição do banco
        let result = await pool.request()
            //define os parametros
            .input('almope', sql.VarChar, almope)
            .input('dataInicial', sql.DateTime, dataInicial)
            .input('dataFinal', sql.DateTime, dataFinal)
            .input('cComparativo', sql.Int, cComparativo)
            .execute('s_Sup_Digital_Retorna_Pausas_v2')


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

router.get('/monitorias', function (req, res) {

    const {
        almope,
        dataInicial,
        dataFinal,
        cComparativo
    } = req.query

    if (!almope) {
        res.status(400).json('almope não informado.')
        return
    }

    if (!cComparativo) {
        res.status(400).json('cComparativo não informado.')
        return
    }

    retornaDadosMonitoria(almope, dataInicial, dataFinal, cComparativo, res)
});
async function retornaDadosMonitoria(almope, dataInicial, dataFinal, cComparativo, res) {
    try {

        let pool = await get('BDRechamadasGeral', connection)
        // Requisição do banco
        let result = await pool.request()
            //define os parametros
            .input('almope', sql.VarChar, almope)
            .input('dataInicial', sql.DateTime, dataInicial)
            .input('dataFinal', sql.DateTime, dataFinal)
            .input('cComparativo', sql.Int, cComparativo)
            .execute('s_Monitoramento_Agentes_Retorna_Monitorias')


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

router.get('/extracaoXlsx', function (req, res) {

    const {
        almope,
        dataInicial,
        dataFinal,
        cComparativo
    } = req.query

    if (!almope) {
        res.status(400).json('almope não informado.')
        return
    }

    if (!cComparativo) {
        res.status(400).json('cComparativo não informado.')
        return
    }

    retornaDadosExtracao(almope, dataInicial, dataFinal, cComparativo, res)
});
async function retornaDadosExtracao(almope, dataInicial, dataFinal, cComparativo, res) {
    try {

        let pool = await get('BDRechamadasGeral', connection)
        // Requisição do banco
        let result = await pool.request()
            //define os parametros
            .input('almope', sql.VarChar, almope)
            .input('dataInicial', sql.DateTime, dataInicial)
            .input('dataFinal', sql.DateTime, dataFinal)
            .input('cComparativo', sql.Int, cComparativo)
            .execute('s_Sup_Digital_Retorna_Extracao_Tabela_Xlsxs')


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

router.get('/extracaoXlsx/agrupados', function (req, res) {

    const {
        almope,
        dataInicial,
        dataFinal,
        cComparativo
    } = req.query

    if (!almope) {
        res.status(400).json('almope não informado.')
        return
    }

    if (!cComparativo) {
        res.status(400).json('cComparativo não informado.')
        return
    }

    retornaDadosExtracaoAgrupados(almope, dataInicial, dataFinal, cComparativo, res)
});
async function retornaDadosExtracaoAgrupados(almope, dataInicial, dataFinal, cComparativo, res) {
    try {

        let pool = await get('BDRechamadasGeral', connection)
        // Requisição do banco
        let result = await pool.request()
            //define os parametros
            .input('almope', sql.VarChar, almope)
            .input('dataInicial', sql.DateTime, dataInicial)
            .input('dataFinal', sql.DateTime, dataFinal)
            .input('cComparativo', sql.Int, cComparativo)
            .execute('s_Sup_Digital_Retorna_Extracao_Tabela_Xlsx_Agrupada')


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