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


//Rota para exibição dos clientes no filtro
router.get('/cliente', function (req, res){

    retornaCliente(res);

})
async function retornaCliente(res){
    try {

        let pool = await get('BDRechamadasGeral', connection)
        let result = await pool.request()
            .execute('s_Gestao_Performance_Retorna_Dados_Cliente')

        if (!result?.recordset) {
            res.status(500).json('Não foi possível retornar os dados.')
            return;
        }

        let cliente = result.recordset

        res.json(cliente)

    } catch (error) {
        res.status(500).json(error)
    }
}
//Rota para exibição das operações no filtro
router.get('/operacao', function (req, res){

    const {idCliente} = req.query

    retornaOperacao(idCliente, res);

})
async function retornaOperacao(idCliente, res){
    try {

        let pool = await get('BDRechamadasGeral', connection)
        let resultOperacao = await pool.request()
            .input('idCliente', sql.Int, idCliente)
            .execute('s_Gestao_Performance_Retorna_Dados_Operacao')

        let resultDiretor = await pool.request()
            .input('idCliente', sql.Int, idCliente)
            .execute('s_Gestao_Performance_Retorna_Dados_Diretor')

        let resultGerente = await pool.request()
            .input('idCliente', sql.Int, idCliente)
            .execute('s_Gestao_Performance_Retorna_Dados_Gerente')
        
        let resultCoordenador = await pool.request()
            .input('idCliente', sql.Int, idCliente)
            .execute('s_Gestao_Performance_Retorna_Dados_Coordenador')

        let resultSupervisor = await pool.request()
            .input('idCliente', sql.Int, idCliente)
            .execute('s_Gestao_Performance_Retorna_Dados_Supervisor')

        let resultOperador = await pool.request()
            .input('idCliente', sql.Int, idCliente)
            .execute('s_Gestao_Performance_Retorna_Dados_Operador')

        
        let retorno = {
            operacao: resultOperacao?.recordset,
            diretor: resultDiretor?.recordset,
            gerente: resultGerente?.recordset,
            coordenador: resultCoordenador?.recordset,
            supervisor: resultSupervisor?.recordset,
            operador: resultOperador?.recordset
        }
        res.json(retorno)

    } catch (error) {
        res.status(500).json(error)
    }
}
//Rota para exibição dos diretores no filtro
router.get('/diretor', function (req, res){

    const {idCliente, idOperacao} = req.query

    retornaDiretor(idCliente, idOperacao, res);

})
async function retornaDiretor(idCliente, idOperacao, res){
    try {

        let pool = await get('BDRechamadasGeral', connection)
        let resultDiretor = await pool.request()
            .input('idCliente', sql.Int, idCliente)
            .input('idOperacao', sql.Int, idOperacao)
            .execute('s_Gestao_Performance_Retorna_Dados_Diretor')

        let resultGerente = await pool.request()
            .input('idCliente', sql.Int, idCliente)
            .input('idOperacao', sql.Int, idOperacao)
            .execute('s_Gestao_Performance_Retorna_Dados_Gerente')

        let resultCoordenador = await pool.request()
            .input('idCliente', sql.Int, idCliente)
            .input('idOperacao', sql.Int, idOperacao)
            .execute('s_Gestao_Performance_Retorna_Dados_Coordenador')

        let resultSupervisor = await pool.request()
            .input('idCliente', sql.Int, idCliente)
            .input('idOperacao', sql.Int, idOperacao)
            .execute('s_Gestao_Performance_Retorna_Dados_Supervisor')

        let resultOperador = await pool.request()
            .input('idCliente', sql.Int, idCliente)
            .input('idOperacao', sql.Int, idOperacao)
            .execute('s_Gestao_Performance_Retorna_Dados_Operador')

        let retorno = {
            diretor: resultDiretor?.recordset,
            gerente: resultGerente?.recordset,
            coordenador: resultCoordenador?.recordset,
            supervisor: resultSupervisor?.recordset,
            operador: resultOperador?.recordset
        }
        res.json(retorno)

    } catch (error) {
        res.status(500).json(error)
    }
}
//Rota para exibição dos superintendente no filtro
router.get('/superintendente', function (req, res){

    retornaSuperintendente(res);

})
async function retornaSuperintendente(res){
    try {

        let pool = await get('BDRechamadasGeral', connection)
        let result = await pool.request()
            .execute('s_Gestao_Performance_Retorna_Dados_Superintendente')

        if (!result?.recordset) {
            res.status(500).json('Não foi possível retornar os dados.')
            return;
        }

        let superintendente = result.recordset

        res.json(superintendente)

    } catch (error) {
        res.status(500).json(error)
    }
}
//Rota para exibição dos gerentes no filtro
router.get('/gerente', function (req, res){

    const {idCliente, idOperacao, idDiretor} = req.query

    retornaGerente(idCliente, idOperacao, idDiretor, res);

})
async function retornaGerente(idCliente, idOperacao, idDiretor, res){
    try {

        let pool = await get('BDRechamadasGeral', connection)
        let resultGerente = await pool.request()
            .input('idCliente', sql.Int, idCliente)
            .input('idOperacao', sql.Int, idOperacao)
            .input('idDiretor', sql.Int, idDiretor)
            .execute('s_Gestao_Performance_Retorna_Dados_Gerente')

        let resultCoordenador = await pool.request()
            .input('idCliente', sql.Int, idCliente)
            .input('idOperacao', sql.Int, idOperacao)
            .input('idDiretor', sql.Int, idDiretor)
            .execute('s_Gestao_Performance_Retorna_Dados_Coordenador')

        let resultSupervisor = await pool.request()
            .input('idCliente', sql.Int, idCliente)
            .input('idOperacao', sql.Int, idOperacao)
            .input('idDiretor', sql.Int, idDiretor)
            .execute('s_Gestao_Performance_Retorna_Dados_Supervisor')

        let resultOperador = await pool.request()
            .input('idCliente', sql.Int, idCliente)
            .input('idOperacao', sql.Int, idOperacao)
            .input('idDiretor', sql.Int, idDiretor)
            .execute('s_Gestao_Performance_Retorna_Dados_Operador')

        let retorno = {
            gerente: resultGerente?.recordset,
            coordenador: resultCoordenador?.recordset,
            supervisor: resultSupervisor?.recordset,
            operador: resultOperador?.recordset
        }
        res.json(retorno)

    } catch (error) {
        res.status(500).json(error)
    }
}
//Rota para exibição dos coordenadores no filtro
router.get('/coordenador', function (req, res){

    const {idCliente, idOperacao, idDiretor, idGerente} = req.query

    retornaCoordenador(idCliente, idOperacao, idDiretor, idGerente, res);

})
async function retornaCoordenador(idCliente, idOperacao, idDiretor, idGerente, res){
    try {

        let pool = await get('BDRechamadasGeral', connection)
        let resultCoordenador = await pool.request()
            .input('idCliente', sql.Int, idCliente)
            .input('idOperacao', sql.Int, idOperacao)
            .input('idDiretor', sql.Int, idDiretor)
            .input('idGerente', sql.Int, idGerente)
            .execute('s_Gestao_Performance_Retorna_Dados_Coordenador')


        let resultSupervisor = await pool.request()
            .input('idCliente', sql.Int, idCliente)
            .input('idOperacao', sql.Int, idOperacao)
            .input('idDiretor', sql.Int, idDiretor)
            .input('idGerente', sql.Int, idGerente)
            .execute('s_Gestao_Performance_Retorna_Dados_Supervisor')
        

        let resultOperador = await pool.request()
            .input('idCliente', sql.Int, idCliente)
            .input('idOperacao', sql.Int, idOperacao)
            .input('idDiretor', sql.Int, idDiretor)
            .input('idGerente', sql.Int, idGerente)
            .execute('s_Gestao_Performance_Retorna_Dados_Operador')
    

        let retorno = {
            coordenador: resultCoordenador?.recordset,
            supervisor: resultSupervisor?.recordset,
            operador: resultOperador?.recordset
        }

        res.json(retorno)

    } catch (error) {
        res.status(500).json(error)
    }
}
//Rota para exibição dos supervisores no filtro
router.get('/supervisor', function (req, res){

    const {idCliente, idOperacao, idDiretor, idGerente, idCoordenador} = req.query

    retornaSupervisor(idCliente, idOperacao, idDiretor, idGerente, idCoordenador, res);

})
async function retornaSupervisor(idCliente, idOperacao, idDiretor, idGerente, idCoordenador, res){
    try {

        let pool = await get('BDRechamadasGeral', connection)
        let resultSupervisor = await pool.request()
            .input('idCliente', sql.Int, idCliente)
            .input('idOperacao', sql.Int, idOperacao)
            .input('idDiretor', sql.Int, idDiretor)
            .input('idGerente', sql.Int, idGerente)
            .input('idCoordenador', sql.Int, idCoordenador)
            .execute('s_Gestao_Performance_Retorna_Dados_Supervisor')

        let resultOperador = await pool.request()
            .input('idCliente', sql.Int, idCliente)
            .input('idOperacao', sql.Int, idOperacao)
            .input('idDiretor', sql.Int, idDiretor)
            .input('idGerente', sql.Int, idGerente)
            .input('idCoordenador', sql.Int, idCoordenador)
            .execute('s_Gestao_Performance_Retorna_Dados_Operador')
    

        let retorno = {
            supervisor: resultSupervisor?.recordset,
            operador: resultOperador?.recordset
        }

        res.json(retorno)

    } catch (error) {
        res.status(500).json(error)
    }
}
//Rota para exibição de operadores no filtro
router.get('/operador', function (req, res){

    const {idCliente, idOperacao, idDiretor, idGerente, idCoordenador, idSupervisor} = req.query

    retornaOperador(idCliente, idOperacao, idDiretor, idGerente, idCoordenador, idSupervisor, res);

})
async function retornaOperador(idCliente, idOperacao, idDiretor, idGerente, idCoordenador, idSupervisor, res){
    try {

        let pool = await get('BDRechamadasGeral', connection)
        let resultOperador = await pool.request()
            .input('idCliente', sql.Int, idCliente)
            .input('idOperacao', sql.Int, idOperacao)
            .input('idDiretor', sql.Int, idDiretor)
            .input('idGerente', sql.Int, idGerente)
            .input('idCoordenador', sql.Int, idCoordenador)
            .input('idSupervisor', sql.Int, idSupervisor)
            .execute('s_Gestao_Performance_Retorna_Dados_Operador')
    

        let retorno = {
            operador: resultOperador?.recordset
        }

        res.json(retorno)

    } catch (error) {
        res.status(500).json(error)
    }
}

router.get('/dadosFiltro', function (req, res){

    const {idCliente, idOperacao, idDiretor, idSuperintendente, idGerente, idCoordenador, idSupervisor, idOperador, dataInicial, dataFinal} = req.query

    retornaDadosFiltro(idCliente, idOperacao, idDiretor, idSuperintendente, idGerente, idCoordenador, idSupervisor, idOperador, dataInicial, dataFinal, res);

})
async function retornaDadosFiltro(idCliente, idOperacao, idDiretor,idSuperintendente, idGerente, idCoordenador, idSupervisor, idOperador, dataInicial, dataFinal, res){
    try {

        let pool = await get('BDRechamadasGeral', connection)
        let resultFiltro = await pool.request()
            .input('codigocliente', sql.Int, idCliente)
            .input('codigooperacao', sql.Int, idOperacao)
            .input('codigodiretor', sql.Int, idDiretor)
            .input('codigosuperintendente', sql.Int, idSuperintendente)
            .input('codigogerente', sql.Int, idGerente)
            .input('codigocoordenador', sql.Int, idCoordenador)
            .input('codigosupervisor', sql.Int, idSupervisor)
            .input('codigooperador', sql.Int, idOperador)
            .input('datainicio', sql.DateTime, dataInicial)
            .input('datafim', sql.DateTime, dataFinal)
            .execute('s_Gestao_Performance_Retorna_Dados_Equipe')

        let retorno = {
            filtro: resultFiltro?.recordset
        }

        res.json(retorno)

    } catch (error) {
        res.status(500).json(error)
    }
}



//Rota principal
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

    const dataInicialParam = dataInicial === " " ? null : dataInicial;
    const dataFinalParam = dataFinal === " " ? null : dataFinal;

    retornaDados(almope, dataInicial, dataFinal, cComparativo, cIndicador, almopeResponsavel, isFirstRendering, dataInicialParam, dataFinalParam, res);
});
async function retornaDados(almope,dataInicial, dataFinal, cComparativo, cIndicador, dataInicialParam, dataFinalParam, almopeResponsavel, isFirstRendering, res) {
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
            .execute('s_Sup_Digital_Retorna_Indicador_V2')


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

        let resultFeedBackHistorico = await pool.request()
            // Define os parâmetros
            .input('idOperador', sql.VarChar, almope)
            .input('dataInicial', sql.DateTime, dataInicialParam)
            .input('dataFinal', sql.DateTime, dataFinalParam)
            .execute('s_Gestao_Performace_Retorna_Feedback_Historico')

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

        let resultRocoins = await pool.request()
            //define os parametros
            .input('almope', sql.VarChar, almope)
            .execute('s_Gestao_Performance_Retorna_Dados_Rocoins')

        let resultDataAtualizacao = await pool.request()
            .input('dataInicial', sql.DateTime, dataInicial)
            .input('dataFinal', sql.DateTime, dataFinal)
            .execute('s_Sup_Digital_Retorna_Data_Atualizacao')


        let retorno = {
            torta: resultCards?.recordset,
            rocoins:resultRocoins?.recordset,
            feedbackHistorico: resultFeedBackHistorico.recordset,
            dias: resultDia?.recordset,
            tabela: agruparTabela(resultTabela?.recordset),
            tabelaAgrupada: agruparGrafico(resultTabelaAgrup?.recordset),
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