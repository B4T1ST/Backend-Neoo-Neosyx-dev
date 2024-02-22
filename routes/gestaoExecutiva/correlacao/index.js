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
        cIndicador,
    } = req.query

    retornaDados(dataInicial, dataFinal, idCliente, idOperacao, idDiretor, idGerente, idCoordenador, idSupervisor, idOperador, cIndicador,  res);
});
async function retornaDados(dataInicial, dataFinal, idCliente, idOperacao, idDiretor, idGerente, idCoordenador, idSupervisor, idOperador, cIndicador, res) {
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
            .execute('s_Gestao_Executiva_Retorna_Correlacao_Indicadores')
        

            let retorno = {
                field: resultCorrelacao?.recordset
            };
    

            const transformarResposta = (retorno) => {
                const grafico = {
                    field: [...new Set(retorno.field.map(item => ({ nome: item.nome, color: item.corThr })))],
            
                    valores: retorno.field.reduce((acc, item) => {
                        const data = item.periodo;
                        if (!acc[data]) {
                            acc[data] = {};
                        }
            
                        // Certifique-se de que 'valor' está definido e manipule porcentagens corretamente
                        const valor = item.valor ? parseFloat(item.valor.replace('%', '')) : 0;
                        acc[data][item.nome] = valor;
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