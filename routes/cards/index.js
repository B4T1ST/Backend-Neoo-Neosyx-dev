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


router.get('/usuario', function (req, res) {
    const {
        almope
    } = req.query

    retornaDadosUsuario(almope,  res)
});

async function retornaDadosUsuario(almope, res) {
    try {

        let pool = await get('BDRechamadasGeral', connection)
        let resultColaborador = await pool.request()
            .input('almope', sql.VarChar, almope)
            .execute('s_Gestao_Performance_Retorna_Dados_Colaborador')

        let retorno = {
            cargo: resultColaborador?.recordset
        }

        res.json(retorno)

    } catch (error) {
        res.status(500).json(error)
    }
};

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
        cComparativo,
        cIndicador,
        isFirstRendering
    } = req.query


    const dataInicialParam = dataInicial === " " ? null : dataInicial;
    const dataFinalParam = dataFinal === " " ? null : dataFinal;

    retornaDados(dataInicial, dataFinal, idCliente, idOperacao, idDiretor, idGerente, idCoordenador, idSupervisor, idOperador, cComparativo, cIndicador, isFirstRendering, dataInicialParam, dataFinalParam, res);
});
async function retornaDados(dataInicial, dataFinal, idCliente, idOperacao, idDiretor, idGerente, idCoordenador, idSupervisor, idOperador, cComparativo, cIndicador, isFirstRendering, dataInicialParam, dataFinalParam, res) {
    try {

        let pool = await get('BDRechamadasGeral', connection)
        console.log('procedura retorna cards Primeira request')

        // Requisição do banco
        let resultCards = await pool.request()
            //define os parametros
            .input('dataInicial', sql.DateTime, dataInicial)
            .input('dataFinal', sql.DateTime, dataFinal)
            .input('idCliente', sql.VarChar, idCliente)
            .input('idOperacao', sql.VarChar, idOperacao)
            .input('idDiretor', sql.VarChar, idDiretor)
            .input('idGerente', sql.VarChar, idGerente)
            .input('idCoordenador', sql.VarChar, idCoordenador)
            .input('idSupervisor', sql.VarChar, idSupervisor)
            .input('idOperador', sql.VarChar, idOperador)
            .execute('s_Gestao_Performance_Retorna_Indicador')
            
         let resultFeedBackHistorico = await pool.request()
            .input('idGerente', sql.VarChar, idGerente)  
            .input('idCoordenador', sql.VarChar, idCoordenador)
            .input('idSupervisor', sql.VarChar, idSupervisor)
            .input('idOperador', sql.VarChar, idOperador)
            .input('dataInicial', sql.DateTime, dataInicialParam)
            .input('dataFinal', sql.DateTime, dataFinalParam)
            .execute('s_Gestao_Performace_Retorna_Feedback_Historico')

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


        let resultTermometro = await pool.request()
            .input('dataInicial', sql.DateTime, dataInicial)
            .input('dataFinal', sql.DateTime, dataFinal)
            .input('idCliente', sql.VarChar, idCliente)
            .input('idOperacao', sql.VarChar, idOperacao)
            .input('idDiretor', sql.VarChar, idDiretor)
            .input('idGerente', sql.VarChar, idGerente)
            .input('idCoordenador', sql.VarChar, idCoordenador)
            .input('idSupervisor', sql.VarChar, idSupervisor)
            .input('idOperador', sql.VarChar, idOperador)
            .execute('s_Gestao_Performace_Retorna_KPI_v2')

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


        let resultRocoins = await pool.request()
            .input('idGerente', sql.VarChar, idGerente)
            .input('idCoordenador', sql.VarChar, idCoordenador)
            .input('idSupervisor', sql.VarChar, idSupervisor)
            .input('idOperador', sql.VarChar, idOperador)
            .execute('s_Gestao_Performance_Retorna_Dados_Rocoins')

        let resultDataAtualizacao = await pool.request()
            .input('dataInicial', sql.DateTime, dataInicial)
            .input('dataFinal', sql.DateTime, dataFinal)
            .execute('s_Sup_Digital_Retorna_Data_Atualizacao')


        let retorno = {
            torta: resultCards?.recordset,
            grafico: resultGrafico?.recordset,
            feedbackHistorico: resultFeedBackHistorico.recordset,
            tabela: agruparTabela(resultTabela?.recordset),
            termometro: resultTermometro?.recordset[0],
            rocoins:resultRocoins?.recordset,
            dataAtualizacao: resultDataAtualizacao.recordset,
            tabelaAgrupada: agruparGrafico(resultTabelaAgrup?.recordset),
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
        dataInicial,
        dataFinal,
        idCliente = '-1',
        idOperacao = '-1',
        idDiretor= '-1',
        idGerente= '-1',
        idCoordenador= '-1',
        idSupervisor= '',
        idOperador = '-1',
        cComparativo = 1,
    } = req.query

    retornaDadosPausa(dataInicial, dataFinal, idCliente, idOperacao, idDiretor, idGerente, idCoordenador, idSupervisor, idOperador,  cComparativo, res);
});
async function retornaDadosPausa(dataInicial, dataFinal, idCliente, idOperacao, idDiretor, idGerente, idCoordenador, idSupervisor, idOperador,  cComparativo, res) {
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
            .execute('s_Gestao_Performance_Retorna_Pausas')


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
        dataInicial,
        dataFinal,
        idCliente = '-1',
        idOperacao = '-1',
        idDiretor= '-1',
        idGerente= '-1',
        idCoordenador= '-1',
        idSupervisor= '4714100',
        idOperador = '-1',
        cComparativo = 1,
    } = req.query

    retornaDadosMonitoria(dataInicial, dataFinal, idCliente, idOperacao, idDiretor, idGerente, idCoordenador, idSupervisor, idOperador,  cComparativo, res);
});
async function retornaDadosMonitoria(dataInicial, dataFinal, idCliente, idOperacao, idDiretor, idGerente, idCoordenador, idSupervisor, idOperador,  cComparativo, res) {
    try {

        let pool = await get('BDRechamadasGeral', connection)
        // Requisição do banco
        let result = await pool.request()
            .input('dataInicial', sql.DateTime, dataInicial)
            .input('dataFinal', sql.DateTime, dataFinal)
            .input('idGerente', sql.VarChar, idGerente)
            .input('idCoordenador', sql.VarChar, idCoordenador)
            .input('idSupervisor', sql.VarChar, idSupervisor)
            .input('idOperador', sql.VarChar, idOperador)
            .execute('s_Gestao_Performance_Retorna_Monitoria')


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
            .execute('s_Gestao_Performance_Retorna_Tabela')


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
            .execute('s_Gestao_Performance_Retorna_Tabela_Agrupada')


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