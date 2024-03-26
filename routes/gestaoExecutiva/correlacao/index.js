//carregando modulos
const sql = require('mssql');
const express = require('express');
const router = express.Router();
const config = require('../../../config/config.json');
const { get } = require('../../../lib/poolManager')
const connection = require('../../../config/' + config.executiva);

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
        cIndicador = "-1",
        cCategoria = "-1",
    } = req.query

    retornaDados(dataInicial, dataFinal, idCliente, idOperacao, idDiretor, idGerente, idCoordenador, idSupervisor, idOperador, cIndicador, cCategoria,  res);
});
async function retornaDados(dataInicial, dataFinal, idCliente, idOperacao, idDiretor, idGerente, idCoordenador, idSupervisor, idOperador, cIndicador, cCategoria, res) {
    try {

        let pool = await get('BDRechamadasGeral', connection)
        let resultCorrelacao = await pool.request()
            .input('dataInicial', sql.DateTime, dataInicial)
            .input('dataFinal', sql.DateTime, dataFinal)
            .input('idCliente', sql.VarChar, idCliente)
            .input('idOperacao', sql.VarChar, idOperacao)
            .input('idDiretor', sql.VarChar, idDiretor)
            .input('idGerente', sql.VarChar, idGerente)
            .input('idCoordenador', sql.VarChar, idCoordenador)
            .input('idSupervisor', sql.VarChar, idSupervisor)
            .input('idOperador', sql.VarChar, idOperador)
            .input('indicadorCategoria', sql.VarChar, cCategoria)
            .input('codigoIndicador', sql.VarChar, cIndicador)
            .execute('s_Gestao_Executiva_Retorna_Correlacao_Indicadores_v2')
        

            let retorno = {
                field: resultCorrelacao?.recordset
            };
    
            const transformarResposta = (retorno) => {
                const grafico = {
                    field: [...new Set(retorno.field.map(item => JSON.stringify({ nome: item.nome, color: item.corThr })))].map(JSON.parse),
            
                    valores: retorno.field.reduce((acc, item) => {
                        const data = item.periodo;
                        if (!acc[data]) {
                            acc[data] = {};
                        }
                        acc[data][item.nome] = parseFloat(item.valor.replace('%', ''));
                        return acc;
                    }, {}),
            
                    periodo: [...new Set(retorno.field.map(item => item.periodo))] // Obter datas únicas
                };
            
                // Transformar valores em um array de objetos
                grafico.valores = grafico.periodo.map(data => {
                    const valoresPorData = grafico.valores[data];
                    const objetoValores = {};
                    grafico.field.forEach(indicador => {
                        const nome = indicador.nome;
                        objetoValores[nome] = valoresPorData ? valoresPorData[nome] || 0 : 0;
                    });
                    return objetoValores;
                });
            
                return grafico;
            };
    
        
            const respostaTransformada = transformarResposta(retorno);
            res.json(respostaTransformada);

    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};

module.exports = router