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

    // let funcaoAtual = retornaDados;

    // // Define o temporizador para alternar entre as funções a cada 10 minutos
    // const intervaloDeAlternancia = 10 * 60 * 1000; // 10 minutos em milissegundos
    // setInterval(() => {
    //     // Alterna entre as funções
    //     funcaoAtual = funcaoAtual === retornaDados ? retornaDadosFeedback : retornaDados;
    //     console.log(`Alternando para ${funcaoAtual.name}`);
    // }, intervaloDeAlternancia);
    // Chama a função atual
    // funcaoAtual(almope, dataInicial, dataFinal, cComparativo, almopeResponsavel, isFirstRendering, res);
    retornaDados(almope, dataInicial, dataFinal, cComparativo, cIndicador, almopeResponsavel, isFirstRendering, res);
});


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


async function retornaDados(almope, dataInicial, dataFinal, cComparativo, cIndicador, almopeResponsavel, isFirstRendering, res) {
    try {

        let pool = await get('BDRechamadasGeral', connection)
        console.log('procedura retorna cards orimeira request')


        // Requisição do banco
        let resultCards = await pool.request()
            //define os parametros
            .input('almope', sql.VarChar, almope)
            .input('dataInicial', sql.DateTime, dataInicial)
            .input('dataFinal', sql.DateTime, dataFinal)
            .input('cComparativo', sql.Int, cComparativo)
            .execute('s_Sup_Digital_Retorna_Cards')
        // .execute('s_Sup_Digital_Retorna_Cards')

        console.log(resultCards)

        let resultTabelaAgrup = await pool.request()
            //define os parametros
            .input('almope', sql.VarChar, almope)
            .input('dataInicial', sql.DateTime, dataInicial)
            .input('dataFinal', sql.DateTime, dataFinal)
            .input('cComparativo', sql.Int, cComparativo)
            .execute('s_Sup_Digital_Retorna_Tabela_Agrupada')

        let resultTorta = await pool.request()
            //define os parametros
            .input('almope', sql.VarChar, almope)
            .input('dataInicial', sql.DateTime, dataInicial)
            .input('dataFinal', sql.DateTime, dataFinal)
            .input('cComparativo', sql.Int, cComparativo)
            .execute('s_Sup_Digital_Retorna_Grafico_Torta')

        console.log('procedura retorna cards')


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
            cards: agruparPorCategoriaTabelaAgrupada(resultCards?.recordset),
            tabelaAgrupada: agruparPorCategoriaCards(resultTabelaAgrup?.recordset),
            torta: resultTorta?.recordset,
            grafico: resultGrafico?.recordset,
            termometro: resultTermometro?.recordset[0],
            usuario: resultUsuario?.recordset[0],
            dataAtualizacao: resultDataAtualizacao.recordset
        };

        res.json(retorno);

    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

function agruparPorCategoriaCards(tabelaAgrupada) {
    const indicadoresMapping = {
        absenteismo: 'Absenteísmo',
        aderencia: 'Aderência',
        almope: 'Almope',
        atendidas: 'Atendidas',
        csat: 'CSAT',
        desconexao: 'Desconexão',
        desvioPausa: 'Desvio de Pausa',
        id: 'ID',
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
        // const fieldname = item.fieldname || '';  // Garante que fieldname seja uma string
        const indicadorKey = Object.keys(indicadoresMapping)


        return {
            field: indicadorKey,
            ...item
        };
    });
}

function agruparPorCategoriaTabelaAgrupada(tabelaAgrupada) {
    return tabelaAgrupada.map(item => {
        if (item.cindicador === 99) {
            return {
                categoria: 'Indicadores de Qualidade',
                ...item
            };
        } else {
            return {
                categoria: 'Indicadores de Desempenho',
                ...item
            };
        }
    });
}

async function retornaDadosFeedback(almope, dataInicial, dataFinal, cComparativo, almopeResponsavel, isFirstRendering, res) {
    try {

        let pool = await get('BDRechamadasGeral', connection)
        console.log('procedura retorna cards orimeira request')


        // Requisição do banco
        let resultCards = await pool.request()
            //define os parametros
            .input('almope', sql.VarChar, almope)
            .input('dataInicial', sql.DateTime, dataInicial)
            .input('dataFinal', sql.DateTime, dataFinal)
            .input('cComparativo', sql.Int, cComparativo)
            .execute('s_Sup_Digital_Retorna_Cards_Feedback')

        console.log(resultCards)


        let resultTorta = await pool.request()
            //define os parametros
            .input('almope', sql.VarChar, almope)
            .input('dataInicial', sql.DateTime, dataInicial)
            .input('dataFinal', sql.DateTime, dataFinal)
            .input('cComparativo', sql.Int, cComparativo)
            .execute('s_Monitoramento_Agentes_Retorna_Grafico_Torta')

        console.log('procedura retorna cards')


        let resultTermometro = await pool.request()
            //define os parametros
            .input('almope', sql.VarChar, almope)
            .input('dataInicial', sql.DateTime, dataInicial)
            .input('dataFinal', sql.DateTime, dataFinal)
            .input('cComparativo', sql.Int, cComparativo)
            .execute('s_Monitoramento_Agentes_Retorna_Termometro')

        let resultUsuario = await pool.request()
            //define os parametros
            .input('almope', sql.VarChar, almope)
            .execute('s_Monitoramento_Agentes_Retorna_Dados_Colaborador')

        let resultDataAtualizacao = await pool.request()
            .input('dataInicial', sql.DateTime, dataInicial)
            .input('dataFinal', sql.DateTime, dataFinal)
            .execute('s_Monitoramento_Agentes_Retorna_Data_Atualizacao_V2')


        const indicadoresNaoAtingidos = resultCards?.recordset.filter(card => card.frase === 'Você não atingiu a meta no indicador ATENDIDAS' ||
            card.frase === 'Você não atingiu a meta no indicador TMA' ||
            card.frase === 'Você não atingiu a meta no indicador TEMPOLOGADO' ||
            card.frase === 'Poxa sua nota de qualidade foi');

        if (indicadoresNaoAtingidos.length > 0) {
            // Se algum indicador não atingiu a meta, chama a rota de motivo
            const motivo = await retornaMotivo(); // Chama a função que retorna o motivo
            res.json({ motivo });
            return;
        }

        function agruparPorCategoria(tabelaAgrupada) {
            return tabelaAgrupada.map(item => {
                if (item.cindicador === 99) {
                    return {
                        categoria: 'Indicadores de Qualidade',
                        ...item
                    };
                } else {
                    return {
                        categoria: 'Indicadores de Desempenho',
                        ...item
                    };
                }
            });
        }

        let retorno = {
            cards: agruparPorCategoria(resultCards?.recordset),
            torta: resultTorta?.recordset,
            termometro: resultTermometro?.recordset[0],
            usuario: resultUsuario?.recordset[0],
            dataAtualizacao: resultDataAtualizacao.recordset
        }

        res.json(retorno)

    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

async function retornaMotivo() {
    try {
        let pool = await get('BDRechamadasGeral', connection);

        // Requisição do banco
        let resultMotivoNormal = await pool.request().execute('s_Sup_Digital_Retorna_Feedback_Motivo_Normal');
        console.log('Procedura retorna motivo normal');

        let resultMotivoQualidade = await pool.request().execute('s_Sup_Digital_Retorna_Feedback_Motivo_Qualidade');
        console.log('Procedura retorna motivo qualidade');

        let retorno = {
            motivoNormal: resultMotivoNormal?.recordset,
            motivoQualidade: resultMotivoQualidade?.recordset,
        };

        return retorno;

    } catch (error) {
        console.log(error);
        throw new Error('Erro ao obter motivo.');
    }
}

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