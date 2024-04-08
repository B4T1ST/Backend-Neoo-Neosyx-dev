//carregando modulos
const sql = require('mssql');
const express = require('express');
const router = express.Router();
const config = require('../../../config/config.json');
const { get } = require('../../../lib/poolManager')
const connection = require('../../../config/' + config.banco);

// @dataInicial  datetime,
//   @dataFinal    datetime,
//   @idCliente    varchar(100) = '-1',
//   @idOperacao    varchar(100) = '-1',
//   @idDiretor    varchar(100) = '-1',
//   @idGerente    varchar(100) = '-1',
//   @idCoordenador  varchar(100) = '-1',
//   @idSupervisor  varchar(100) = '-1',
//   @idOperador    varchar(100) = '-1',

router.get('/', function (req, res) {

    const {
        dataInicial,
        dataFinal,
        idCliente,
        idOperacao,
        idDiretor,
        idGerente,
        idCoordenador,
        idSupervisor,
        idOperador
    } = req.query

    if (!dataInicial) {
        res.status(400).json('Parâmetro dataInicial não informado.')
        return
    }

    if (!dataFinal) {
        res.status(400).json('Parâmetro dataFinal não informado.')
        return
    }

    retornaDadosCards(
        dataInicial, 
        dataFinal, 
        idCliente, 
        idOperacao, 
        idDiretor, 
        idGerente, 
        idCoordenador, 
        idSupervisor, 
        idOperador, 
        res
    )
});

async function retornaDadosCards(dataInicial, dataFinal, idCliente, idOperacao, idDiretor, idGerente, idCoordenador, idSupervisor, idOperador, res) {
    try {

        let pool = await get('BDRechamadasGeral', connection)
        // Requisição do banco para os subdados dos cards (semana1, semana2, etc)
        let result = await pool.request()
            //define os parametros
            .input('dataInicial',   sql.DateTime,       dataInicial)
            .input('dataFinal',     sql.DateTime,       dataFinal)
            .input('idCliente',     sql.VarChar(100),   idCliente)
            .input('idOperacao',    sql.VarChar(100),   idOperacao)
            .input('idDiretor',     sql.VarChar(100),   idDiretor)
            .input('idGerente',     sql.VarChar(100),   idGerente)
            .input('idCoordenador', sql.VarChar(100),   idCoordenador)
            .input('idSupervisor',  sql.VarChar(100),   idSupervisor)
            .input('idOperador',    sql.VarChar(100),   idOperador)
            .execute('s_Gestao_Performance_Extrato_Roccoins_Retorna_Dados_Cards')    

        let result2 = await pool.request()
            //define os parametros
            .input('dataInicial',   sql.DateTime,       dataInicial)
            .input('dataFinal',     sql.DateTime,       dataFinal)
            .input('idCliente',     sql.VarChar(100),   idCliente)
            .input('idOperacao',    sql.VarChar(100),   idOperacao)
            .input('idDiretor',     sql.VarChar(100),   idDiretor)
            .input('idGerente',     sql.VarChar(100),   idGerente)
            .input('idCoordenador', sql.VarChar(100),   idCoordenador)
            .input('idSupervisor',  sql.VarChar(100),   idSupervisor)
            .input('idOperador',    sql.VarChar(100),   idOperador)
            .execute('s_Gestao_Performance_Extrato_Roccoins_Retorna_Dados_Cards_Consolidado')   


        let retorno = result.recordset
        let retorno2 = result2.recordset

        // Separa e filtra o retorno pelos indicadores
        function groupByIndicador(dadosRetorno, indicador) {
            const retornoObj = {};

            dadosRetorno.forEach(obj => {
                const indicadorValue = obj[indicador];
                const indicadorFormatado = indicadorValue.replaceAll(' ', '_');
                            
                if (!retornoObj[indicadorFormatado]) {
                    retornoObj[indicadorFormatado] = [];
                }

                retornoObj[indicadorFormatado].push(obj)
            })

            return retornoObj
        }

        const retornoAlt = groupByIndicador(retorno, 'indicador')
        
        const retornoFormatted = {
            cards: retorno2,
            subCards: retornoAlt
        }

        res.json(retornoFormatted)

    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

module.exports = router;
