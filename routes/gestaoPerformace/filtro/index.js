//carregando modulos
const sql = require('mssql');
const express = require('express');
const router = express.Router();
const config = require('../../../config/config.json');
const { get } = require('../../../lib/poolManager')
const connection = require('../../../config/' + config.banco);

//Rota para exibição dos clientes no filtro
router.get('/cliente', function (req, res){

    const {
        dataInicial, 
        dataFinal, 
        idCliente = '-1', 
        idOperacao= '-1', 
        idDiretor= '-1', 
        idGerente= '-1', 
        idCoordenador= '-1', 
        idSupervisor= '-1',
        idOperador= '-1',
    } = req.query

    retornaCliente(dataInicial, dataFinal, idCliente, idOperacao, idDiretor, idGerente, idCoordenador, idSupervisor, idOperador, res);

})
async function retornaCliente(dataInicial, dataFinal, idCliente, idOperacao, idDiretor, idGerente, idCoordenador, idSupervisor, idOperador, res){
    try {

        let pool = await get('BDRechamadasGeral', connection)
        let resultCliente = await pool.request()
            .input('dataInicial', sql.DateTime, dataInicial)
            .input('dataFinal', sql.DateTime, dataFinal)
            .input('idCliente', sql.Int, idCliente)
            .input('idOperacao', sql.Int, idOperacao)
            .input('idDiretor', sql.Int, idDiretor)
            .input('idGerente', sql.Int, idGerente)
            .input('idCoordenador', sql.Int, idCoordenador)
            .input('idSupervisor', sql.Int, idSupervisor)
            .input('idOperador', sql.Int, idOperador)
            .execute('s_Gestao_Performance_Retorna_Dados_Cliente_Hierarquia_Nova')

        let resultOperacao = await pool.request()
            .input('dataInicial', sql.DateTime, dataInicial)
            .input('dataFinal', sql.DateTime, dataFinal)
            .input('idCliente', sql.Int, idCliente)
            .input('idOperacao', sql.Int, idOperacao)
            .input('idDiretor', sql.Int, idDiretor)
            .input('idGerente', sql.Int, idGerente)
            .input('idCoordenador', sql.Int, idCoordenador)
            .input('idSupervisor', sql.Int, idSupervisor)
            .input('idOperador', sql.Int, idOperador)
            .execute('s_Gestao_Performance_Retorna_Dados_Operacao_Hierarquia_Nova')

        let resultDiretor = await pool.request()
            .input('dataInicial', sql.DateTime, dataInicial)
            .input('dataFinal', sql.DateTime, dataFinal)
            .input('idCliente', sql.Int, idCliente)
            .input('idOperacao', sql.Int, idOperacao)
            .input('idDiretor', sql.Int, idDiretor)
            .input('idGerente', sql.Int, idGerente)
            .input('idCoordenador', sql.Int, idCoordenador)
            .input('idSupervisor', sql.Int, idSupervisor)
            .input('idOperador', sql.Int, idOperador)
            .execute('s_Gestao_Performance_Retorna_Dados_Diretor_Hierarquia_Nova')

        let resultGerente= await pool.request()
            .input('dataInicial', sql.DateTime, dataInicial)
            .input('dataFinal', sql.DateTime, dataFinal)
            .input('idCliente', sql.Int, idCliente)
            .input('idOperacao', sql.Int, idOperacao)
            .input('idDiretor', sql.Int, idDiretor)
            .input('idGerente', sql.Int, idGerente)
            .input('idCoordenador', sql.Int, idCoordenador)
            .input('idSupervisor', sql.Int, idSupervisor)
            .input('idOperador', sql.Int, idOperador)
            .execute('s_Gestao_Performance_Retorna_Dados_Gerente_Hierarquia_Nova')

        let resultCoordenador= await pool.request()
            .input('dataInicial', sql.DateTime, dataInicial)
            .input('dataFinal', sql.DateTime, dataFinal)
            .input('idCliente', sql.Int, idCliente)
            .input('idOperacao', sql.Int, idOperacao)
            .input('idDiretor', sql.Int, idDiretor)
            .input('idGerente', sql.Int, idGerente)
            .input('idCoordenador', sql.Int, idCoordenador)
            .input('idSupervisor', sql.Int, idSupervisor)
            .input('idOperador', sql.Int, idOperador)
            .execute('s_Gestao_Performance_Retorna_Dados_Coordenador_Hierarquia_Nova')

        let resultSupervisor= await pool.request()
            .input('dataInicial', sql.DateTime, dataInicial)
            .input('dataFinal', sql.DateTime, dataFinal)
            .input('idCliente', sql.Int, idCliente)
            .input('idOperacao', sql.Int, idOperacao)
            .input('idDiretor', sql.Int, idDiretor)
            .input('idGerente', sql.Int, idGerente)
            .input('idCoordenador', sql.Int, idCoordenador)
            .input('idSupervisor', sql.Int, idSupervisor)
            .input('idOperador', sql.Int, idOperador)
            .execute('s_Gestao_Performance_Retorna_Dados_Supervisor_Hierarquia_Nova')

        let resultOperador= await pool.request()
            .input('dataInicial', sql.DateTime, dataInicial)
            .input('dataFinal', sql.DateTime, dataFinal)
            .input('idCliente', sql.Int, idCliente)
            .input('idOperacao', sql.Int, idOperacao)
            .input('idDiretor', sql.Int, idDiretor)
            .input('idGerente', sql.Int, idGerente)
            .input('idCoordenador', sql.Int, idCoordenador)
            .input('idSupervisor', sql.Int, idSupervisor)
            .input('idOperador', sql.Int, idOperador)
            .execute('s_Gestao_Performance_Retorna_Dados_Operador_Hierarquia_Nova')
    
            
            
        let retorno = {
                cliente: resultCliente?.recordset,
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
//Rota para exibição das operações no filtro
router.get('/operacao', function (req, res){

    const {
        dataInicial, 
        dataFinal, 
        idCliente = '-1', 
        idOperacao= '-1', 
        idDiretor= '-1', 
        idGerente= '-1', 
        idCoordenador= '-1', 
        idSupervisor= '-1',
        idOperador= '-1',
    } = req.query

    retornaOperacao(dataInicial, dataFinal, idCliente, idOperacao, idDiretor, idGerente, idCoordenador, idSupervisor, idOperador, res);

})
async function retornaOperacao(dataInicial, dataFinal, idCliente, idOperacao, idDiretor, idGerente, idCoordenador, idSupervisor, idOperador, res){
    try {

        let pool = await get('BDRechamadasGeral', connection)
        let resultCliente = await pool.request()
            .input('dataInicial', sql.DateTime, dataInicial)
            .input('dataFinal', sql.DateTime, dataFinal)
            .input('idCliente', sql.Int, idCliente)
            .input('idOperacao', sql.Int, idOperacao)
            .input('idDiretor', sql.Int, idDiretor)
            .input('idGerente', sql.Int, idGerente)
            .input('idCoordenador', sql.Int, idCoordenador)
            .input('idSupervisor', sql.Int, idSupervisor)
            .input('idOperador', sql.Int, idOperador)
            .execute('s_Gestao_Performance_Retorna_Dados_Cliente_Hierarquia_Nova')

        let resultOperacao = await pool.request()
            .input('dataInicial', sql.DateTime, dataInicial)
            .input('dataFinal', sql.DateTime, dataFinal)
            .input('idCliente', sql.Int, idCliente)
            .input('idOperacao', sql.Int, idOperacao)
            .input('idDiretor', sql.Int, idDiretor)
            .input('idGerente', sql.Int, idGerente)
            .input('idCoordenador', sql.Int, idCoordenador)
            .input('idSupervisor', sql.Int, idSupervisor)
            .input('idOperador', sql.Int, idOperador)
            .execute('s_Gestao_Performance_Retorna_Dados_Operacao_Hierarquia_Nova')

        let resultDiretor = await pool.request()
            .input('dataInicial', sql.DateTime, dataInicial)
            .input('dataFinal', sql.DateTime, dataFinal)
            .input('idCliente', sql.Int, idCliente)
            .input('idOperacao', sql.Int, idOperacao)
            .input('idDiretor', sql.Int, idDiretor)
            .input('idGerente', sql.Int, idGerente)
            .input('idCoordenador', sql.Int, idCoordenador)
            .input('idSupervisor', sql.Int, idSupervisor)
            .input('idOperador', sql.Int, idOperador)
            .execute('s_Gestao_Performance_Retorna_Dados_Diretor_Hierarquia_Nova')

        let resultGerente= await pool.request()
            .input('dataInicial', sql.DateTime, dataInicial)
            .input('dataFinal', sql.DateTime, dataFinal)
            .input('idCliente', sql.Int, idCliente)
            .input('idOperacao', sql.Int, idOperacao)
            .input('idDiretor', sql.Int, idDiretor)
            .input('idGerente', sql.Int, idGerente)
            .input('idCoordenador', sql.Int, idCoordenador)
            .input('idSupervisor', sql.Int, idSupervisor)
            .input('idOperador', sql.Int, idOperador)
            .execute('s_Gestao_Performance_Retorna_Dados_Gerente_Hierarquia_Nova')

        let resultCoordenador= await pool.request()
            .input('dataInicial', sql.DateTime, dataInicial)
            .input('dataFinal', sql.DateTime, dataFinal)
            .input('idCliente', sql.Int, idCliente)
            .input('idOperacao', sql.Int, idOperacao)
            .input('idDiretor', sql.Int, idDiretor)
            .input('idGerente', sql.Int, idGerente)
            .input('idCoordenador', sql.Int, idCoordenador)
            .input('idSupervisor', sql.Int, idSupervisor)
            .input('idOperador', sql.Int, idOperador)
            .execute('s_Gestao_Performance_Retorna_Dados_Coordenador_Hierarquia_Nova')

        let resultSupervisor= await pool.request()
            .input('dataInicial', sql.DateTime, dataInicial)
            .input('dataFinal', sql.DateTime, dataFinal)
            .input('idCliente', sql.Int, idCliente)
            .input('idOperacao', sql.Int, idOperacao)
            .input('idDiretor', sql.Int, idDiretor)
            .input('idGerente', sql.Int, idGerente)
            .input('idCoordenador', sql.Int, idCoordenador)
            .input('idSupervisor', sql.Int, idSupervisor)
            .input('idOperador', sql.Int, idOperador)
            .execute('s_Gestao_Performance_Retorna_Dados_Supervisor_Hierarquia_Nova')

        let resultOperador= await pool.request()
            .input('dataInicial', sql.DateTime, dataInicial)
            .input('dataFinal', sql.DateTime, dataFinal)
            .input('idCliente', sql.Int, idCliente)
            .input('idOperacao', sql.Int, idOperacao)
            .input('idDiretor', sql.Int, idDiretor)
            .input('idGerente', sql.Int, idGerente)
            .input('idCoordenador', sql.Int, idCoordenador)
            .input('idSupervisor', sql.Int, idSupervisor)
            .input('idOperador', sql.Int, idOperador)
            .execute('s_Gestao_Performance_Retorna_Dados_Operador_Hierarquia_Nova')
    
            
            
        let retorno = {
                cliente: resultCliente?.recordset,
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

    const {
        dataInicial, 
        dataFinal, 
        idCliente = '-1', 
        idOperacao= '-1', 
        idDiretor= '-1', 
        idGerente= '-1', 
        idCoordenador= '-1', 
        idSupervisor= '-1',
        idOperador= '-1',
    } = req.query

    retornaDiretor(dataInicial, dataFinal, idCliente, idOperacao, idDiretor, idGerente, idCoordenador, idSupervisor, idOperador, res);

})
async function retornaDiretor(dataInicial, dataFinal, idCliente, idOperacao, idDiretor, idGerente, idCoordenador, idSupervisor, idOperador, res){
    try {

        let pool = await get('BDRechamadasGeral', connection)
        let resultCliente = await pool.request()
            .input('dataInicial', sql.DateTime, dataInicial)
            .input('dataFinal', sql.DateTime, dataFinal)
            .input('idCliente', sql.Int, idCliente)
            .input('idOperacao', sql.Int, idOperacao)
            .input('idDiretor', sql.Int, idDiretor)
            .input('idGerente', sql.Int, idGerente)
            .input('idCoordenador', sql.Int, idCoordenador)
            .input('idSupervisor', sql.Int, idSupervisor)
            .input('idOperador', sql.Int, idOperador)
            .execute('s_Gestao_Performance_Retorna_Dados_Cliente_Hierarquia_Nova')

        let resultOperacao = await pool.request()
            .input('dataInicial', sql.DateTime, dataInicial)
            .input('dataFinal', sql.DateTime, dataFinal)
            .input('idCliente', sql.Int, idCliente)
            .input('idOperacao', sql.Int, idOperacao)
            .input('idDiretor', sql.Int, idDiretor)
            .input('idGerente', sql.Int, idGerente)
            .input('idCoordenador', sql.Int, idCoordenador)
            .input('idSupervisor', sql.Int, idSupervisor)
            .input('idOperador', sql.Int, idOperador)
            .execute('s_Gestao_Performance_Retorna_Dados_Operacao_Hierarquia_Nova')

        let resultDiretor = await pool.request()
            .input('dataInicial', sql.DateTime, dataInicial)
            .input('dataFinal', sql.DateTime, dataFinal)
            .input('idCliente', sql.Int, idCliente)
            .input('idOperacao', sql.Int, idOperacao)
            .input('idDiretor', sql.Int, idDiretor)
            .input('idGerente', sql.Int, idGerente)
            .input('idCoordenador', sql.Int, idCoordenador)
            .input('idSupervisor', sql.Int, idSupervisor)
            .input('idOperador', sql.Int, idOperador)
            .execute('s_Gestao_Performance_Retorna_Dados_Diretor_Hierarquia_Nova')

        let resultGerente= await pool.request()
            .input('dataInicial', sql.DateTime, dataInicial)
            .input('dataFinal', sql.DateTime, dataFinal)
            .input('idCliente', sql.Int, idCliente)
            .input('idOperacao', sql.Int, idOperacao)
            .input('idDiretor', sql.Int, idDiretor)
            .input('idGerente', sql.Int, idGerente)
            .input('idCoordenador', sql.Int, idCoordenador)
            .input('idSupervisor', sql.Int, idSupervisor)
            .input('idOperador', sql.Int, idOperador)
            .execute('s_Gestao_Performance_Retorna_Dados_Gerente_Hierarquia_Nova')

        let resultCoordenador= await pool.request()
            .input('dataInicial', sql.DateTime, dataInicial)
            .input('dataFinal', sql.DateTime, dataFinal)
            .input('idCliente', sql.Int, idCliente)
            .input('idOperacao', sql.Int, idOperacao)
            .input('idDiretor', sql.Int, idDiretor)
            .input('idGerente', sql.Int, idGerente)
            .input('idCoordenador', sql.Int, idCoordenador)
            .input('idSupervisor', sql.Int, idSupervisor)
            .input('idOperador', sql.Int, idOperador)
            .execute('s_Gestao_Performance_Retorna_Dados_Coordenador_Hierarquia_Nova')

        let resultSupervisor= await pool.request()
            .input('dataInicial', sql.DateTime, dataInicial)
            .input('dataFinal', sql.DateTime, dataFinal)
            .input('idCliente', sql.Int, idCliente)
            .input('idOperacao', sql.Int, idOperacao)
            .input('idDiretor', sql.Int, idDiretor)
            .input('idGerente', sql.Int, idGerente)
            .input('idCoordenador', sql.Int, idCoordenador)
            .input('idSupervisor', sql.Int, idSupervisor)
            .input('idOperador', sql.Int, idOperador)
            .execute('s_Gestao_Performance_Retorna_Dados_Supervisor_Hierarquia_Nova')

        let resultOperador= await pool.request()
            .input('dataInicial', sql.DateTime, dataInicial)
            .input('dataFinal', sql.DateTime, dataFinal)
            .input('idCliente', sql.Int, idCliente)
            .input('idOperacao', sql.Int, idOperacao)
            .input('idDiretor', sql.Int, idDiretor)
            .input('idGerente', sql.Int, idGerente)
            .input('idCoordenador', sql.Int, idCoordenador)
            .input('idSupervisor', sql.Int, idSupervisor)
            .input('idOperador', sql.Int, idOperador)
            .execute('s_Gestao_Performance_Retorna_Dados_Operador_Hierarquia_Nova')
    
            
            
        let retorno = {
                cliente: resultCliente?.recordset,
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

    const {
        dataInicial, 
        dataFinal, 
        idCliente = '-1', 
        idOperacao= '-1', 
        idDiretor= '-1', 
        idGerente= '-1', 
        idCoordenador= '-1', 
        idSupervisor= '-1',
        idOperador= '-1',
    } = req.query

    retornaGerente(dataInicial, dataFinal, idCliente, idOperacao, idDiretor, idGerente, idCoordenador, idSupervisor, idOperador, res);

})
async function retornaGerente(dataInicial, dataFinal, idCliente, idOperacao, idDiretor, idGerente, idCoordenador, idSupervisor, idOperador, res){
    try {

        let pool = await get('BDRechamadasGeral', connection)
        let resultCliente = await pool.request()
            .input('dataInicial', sql.DateTime, dataInicial)
            .input('dataFinal', sql.DateTime, dataFinal)
            .input('idCliente', sql.Int, idCliente)
            .input('idOperacao', sql.Int, idOperacao)
            .input('idDiretor', sql.Int, idDiretor)
            .input('idGerente', sql.Int, idGerente)
            .input('idCoordenador', sql.Int, idCoordenador)
            .input('idSupervisor', sql.Int, idSupervisor)
            .input('idOperador', sql.Int, idOperador)
            .execute('s_Gestao_Performance_Retorna_Dados_Cliente_Hierarquia_Nova')

        let resultOperacao = await pool.request()
            .input('dataInicial', sql.DateTime, dataInicial)
            .input('dataFinal', sql.DateTime, dataFinal)
            .input('idCliente', sql.Int, idCliente)
            .input('idOperacao', sql.Int, idOperacao)
            .input('idDiretor', sql.Int, idDiretor)
            .input('idGerente', sql.Int, idGerente)
            .input('idCoordenador', sql.Int, idCoordenador)
            .input('idSupervisor', sql.Int, idSupervisor)
            .input('idOperador', sql.Int, idOperador)
            .execute('s_Gestao_Performance_Retorna_Dados_Operacao_Hierarquia_Nova')

        let resultDiretor = await pool.request()
            .input('dataInicial', sql.DateTime, dataInicial)
            .input('dataFinal', sql.DateTime, dataFinal)
            .input('idCliente', sql.Int, idCliente)
            .input('idOperacao', sql.Int, idOperacao)
            .input('idDiretor', sql.Int, idDiretor)
            .input('idGerente', sql.Int, idGerente)
            .input('idCoordenador', sql.Int, idCoordenador)
            .input('idSupervisor', sql.Int, idSupervisor)
            .input('idOperador', sql.Int, idOperador)
            .execute('s_Gestao_Performance_Retorna_Dados_Diretor_Hierarquia_Nova')

        let resultGerente= await pool.request()
            .input('dataInicial', sql.DateTime, dataInicial)
            .input('dataFinal', sql.DateTime, dataFinal)
            .input('idCliente', sql.Int, idCliente)
            .input('idOperacao', sql.Int, idOperacao)
            .input('idDiretor', sql.Int, idDiretor)
            .input('idGerente', sql.Int, idGerente)
            .input('idCoordenador', sql.Int, idCoordenador)
            .input('idSupervisor', sql.Int, idSupervisor)
            .input('idOperador', sql.Int, idOperador)
            .execute('s_Gestao_Performance_Retorna_Dados_Gerente_Hierarquia_Nova')

        let resultCoordenador= await pool.request()
            .input('dataInicial', sql.DateTime, dataInicial)
            .input('dataFinal', sql.DateTime, dataFinal)
            .input('idCliente', sql.Int, idCliente)
            .input('idOperacao', sql.Int, idOperacao)
            .input('idDiretor', sql.Int, idDiretor)
            .input('idGerente', sql.Int, idGerente)
            .input('idCoordenador', sql.Int, idCoordenador)
            .input('idSupervisor', sql.Int, idSupervisor)
            .input('idOperador', sql.Int, idOperador)
            .execute('s_Gestao_Performance_Retorna_Dados_Coordenador_Hierarquia_Nova')

        let resultSupervisor= await pool.request()
            .input('dataInicial', sql.DateTime, dataInicial)
            .input('dataFinal', sql.DateTime, dataFinal)
            .input('idCliente', sql.Int, idCliente)
            .input('idOperacao', sql.Int, idOperacao)
            .input('idDiretor', sql.Int, idDiretor)
            .input('idGerente', sql.Int, idGerente)
            .input('idCoordenador', sql.Int, idCoordenador)
            .input('idSupervisor', sql.Int, idSupervisor)
            .input('idOperador', sql.Int, idOperador)
            .execute('s_Gestao_Performance_Retorna_Dados_Supervisor_Hierarquia_Nova')

        let resultOperador= await pool.request()
            .input('dataInicial', sql.DateTime, dataInicial)
            .input('dataFinal', sql.DateTime, dataFinal)
            .input('idCliente', sql.Int, idCliente)
            .input('idOperacao', sql.Int, idOperacao)
            .input('idDiretor', sql.Int, idDiretor)
            .input('idGerente', sql.Int, idGerente)
            .input('idCoordenador', sql.Int, idCoordenador)
            .input('idSupervisor', sql.Int, idSupervisor)
            .input('idOperador', sql.Int, idOperador)
            .execute('s_Gestao_Performance_Retorna_Dados_Operador_Hierarquia_Nova')
    
            
            
        let retorno = {
                cliente: resultCliente?.recordset,
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
//Rota para exibição dos coordenadores no filtro
router.get('/coordenador', function (req, res){

    const {
        dataInicial, 
        dataFinal, 
        idCliente = '-1', 
        idOperacao= '-1', 
        idDiretor= '-1', 
        idGerente= '-1', 
        idCoordenador= '-1', 
        idSupervisor= '-1',
        idOperador= '-1',
    } = req.query

    retornaCoordenador(dataInicial, dataFinal, idCliente, idOperacao, idDiretor, idGerente, idCoordenador, idSupervisor, idOperador, res);

})
async function retornaCoordenador(dataInicial, dataFinal, idCliente, idOperacao, idDiretor, idGerente, idCoordenador, idSupervisor, idOperador, res){
    try {

        let pool = await get('BDRechamadasGeral', connection)
        let resultCliente = await pool.request()
            .input('dataInicial', sql.DateTime, dataInicial)
            .input('dataFinal', sql.DateTime, dataFinal)
            .input('idCliente', sql.Int, idCliente)
            .input('idOperacao', sql.Int, idOperacao)
            .input('idDiretor', sql.Int, idDiretor)
            .input('idGerente', sql.Int, idGerente)
            .input('idCoordenador', sql.Int, idCoordenador)
            .input('idSupervisor', sql.Int, idSupervisor)
            .input('idOperador', sql.Int, idOperador)
            .execute('s_Gestao_Performance_Retorna_Dados_Cliente_Hierarquia_Nova')

        let resultOperacao = await pool.request()
            .input('dataInicial', sql.DateTime, dataInicial)
            .input('dataFinal', sql.DateTime, dataFinal)
            .input('idCliente', sql.Int, idCliente)
            .input('idOperacao', sql.Int, idOperacao)
            .input('idDiretor', sql.Int, idDiretor)
            .input('idGerente', sql.Int, idGerente)
            .input('idCoordenador', sql.Int, idCoordenador)
            .input('idSupervisor', sql.Int, idSupervisor)
            .input('idOperador', sql.Int, idOperador)
            .execute('s_Gestao_Performance_Retorna_Dados_Operacao_Hierarquia_Nova')

        let resultDiretor = await pool.request()
            .input('dataInicial', sql.DateTime, dataInicial)
            .input('dataFinal', sql.DateTime, dataFinal)
            .input('idCliente', sql.Int, idCliente)
            .input('idOperacao', sql.Int, idOperacao)
            .input('idDiretor', sql.Int, idDiretor)
            .input('idGerente', sql.Int, idGerente)
            .input('idCoordenador', sql.Int, idCoordenador)
            .input('idSupervisor', sql.Int, idSupervisor)
            .input('idOperador', sql.Int, idOperador)
            .execute('s_Gestao_Performance_Retorna_Dados_Diretor_Hierarquia_Nova')

        let resultGerente= await pool.request()
            .input('dataInicial', sql.DateTime, dataInicial)
            .input('dataFinal', sql.DateTime, dataFinal)
            .input('idCliente', sql.Int, idCliente)
            .input('idOperacao', sql.Int, idOperacao)
            .input('idDiretor', sql.Int, idDiretor)
            .input('idGerente', sql.Int, idGerente)
            .input('idCoordenador', sql.Int, idCoordenador)
            .input('idSupervisor', sql.Int, idSupervisor)
            .input('idOperador', sql.Int, idOperador)
            .execute('s_Gestao_Performance_Retorna_Dados_Gerente_Hierarquia_Nova')

        let resultCoordenador= await pool.request()
            .input('dataInicial', sql.DateTime, dataInicial)
            .input('dataFinal', sql.DateTime, dataFinal)
            .input('idCliente', sql.Int, idCliente)
            .input('idOperacao', sql.Int, idOperacao)
            .input('idDiretor', sql.Int, idDiretor)
            .input('idGerente', sql.Int, idGerente)
            .input('idCoordenador', sql.Int, idCoordenador)
            .input('idSupervisor', sql.Int, idSupervisor)
            .input('idOperador', sql.Int, idOperador)
            .execute('s_Gestao_Performance_Retorna_Dados_Coordenador_Hierarquia_Nova')

        let resultSupervisor= await pool.request()
            .input('dataInicial', sql.DateTime, dataInicial)
            .input('dataFinal', sql.DateTime, dataFinal)
            .input('idCliente', sql.Int, idCliente)
            .input('idOperacao', sql.Int, idOperacao)
            .input('idDiretor', sql.Int, idDiretor)
            .input('idGerente', sql.Int, idGerente)
            .input('idCoordenador', sql.Int, idCoordenador)
            .input('idSupervisor', sql.Int, idSupervisor)
            .input('idOperador', sql.Int, idOperador)
            .execute('s_Gestao_Performance_Retorna_Dados_Supervisor_Hierarquia_Nova')

        let resultOperador= await pool.request()
            .input('dataInicial', sql.DateTime, dataInicial)
            .input('dataFinal', sql.DateTime, dataFinal)
            .input('idCliente', sql.Int, idCliente)
            .input('idOperacao', sql.Int, idOperacao)
            .input('idDiretor', sql.Int, idDiretor)
            .input('idGerente', sql.Int, idGerente)
            .input('idCoordenador', sql.Int, idCoordenador)
            .input('idSupervisor', sql.Int, idSupervisor)
            .input('idOperador', sql.Int, idOperador)
            .execute('s_Gestao_Performance_Retorna_Dados_Operador_Hierarquia_Nova')
    
            
            
        let retorno = {
                cliente: resultCliente?.recordset,
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
//Rota para exibição dos supervisores no filtro
router.get('/supervisor', function (req, res){

    const {
        dataInicial, 
        dataFinal, 
        idCliente = '-1', 
        idOperacao= '-1', 
        idDiretor= '-1', 
        idGerente= '-1', 
        idCoordenador= '-1', 
        idSupervisor= '-1',
        idOperador= '-1',
    } = req.query

    retornaSupervisor(dataInicial, dataFinal, idCliente, idOperacao, idDiretor, idGerente, idCoordenador, idSupervisor, idOperador, res);

})
async function retornaSupervisor(dataInicial, dataFinal, idCliente, idOperacao, idDiretor, idGerente, idCoordenador, idSupervisor, idOperador, res){
    try {

        let pool = await get('BDRechamadasGeral', connection)
        let resultCliente = await pool.request()
            .input('dataInicial', sql.DateTime, dataInicial)
            .input('dataFinal', sql.DateTime, dataFinal)
            .input('idCliente', sql.Int, idCliente)
            .input('idOperacao', sql.Int, idOperacao)
            .input('idDiretor', sql.Int, idDiretor)
            .input('idGerente', sql.Int, idGerente)
            .input('idCoordenador', sql.Int, idCoordenador)
            .input('idSupervisor', sql.Int, idSupervisor)
            .input('idOperador', sql.Int, idOperador)
            .execute('s_Gestao_Performance_Retorna_Dados_Cliente_Hierarquia_Nova')

        let resultOperacao = await pool.request()
            .input('dataInicial', sql.DateTime, dataInicial)
            .input('dataFinal', sql.DateTime, dataFinal)
            .input('idCliente', sql.Int, idCliente)
            .input('idOperacao', sql.Int, idOperacao)
            .input('idDiretor', sql.Int, idDiretor)
            .input('idGerente', sql.Int, idGerente)
            .input('idCoordenador', sql.Int, idCoordenador)
            .input('idSupervisor', sql.Int, idSupervisor)
            .input('idOperador', sql.Int, idOperador)
            .execute('s_Gestao_Performance_Retorna_Dados_Operacao_Hierarquia_Nova')

        let resultDiretor = await pool.request()
            .input('dataInicial', sql.DateTime, dataInicial)
            .input('dataFinal', sql.DateTime, dataFinal)
            .input('idCliente', sql.Int, idCliente)
            .input('idOperacao', sql.Int, idOperacao)
            .input('idDiretor', sql.Int, idDiretor)
            .input('idGerente', sql.Int, idGerente)
            .input('idCoordenador', sql.Int, idCoordenador)
            .input('idSupervisor', sql.Int, idSupervisor)
            .input('idOperador', sql.Int, idOperador)
            .execute('s_Gestao_Performance_Retorna_Dados_Diretor_Hierarquia_Nova')

        let resultGerente= await pool.request()
            .input('dataInicial', sql.DateTime, dataInicial)
            .input('dataFinal', sql.DateTime, dataFinal)
            .input('idCliente', sql.Int, idCliente)
            .input('idOperacao', sql.Int, idOperacao)
            .input('idDiretor', sql.Int, idDiretor)
            .input('idGerente', sql.Int, idGerente)
            .input('idCoordenador', sql.Int, idCoordenador)
            .input('idSupervisor', sql.Int, idSupervisor)
            .input('idOperador', sql.Int, idOperador)
            .execute('s_Gestao_Performance_Retorna_Dados_Gerente_Hierarquia_Nova')

        let resultCoordenador= await pool.request()
            .input('dataInicial', sql.DateTime, dataInicial)
            .input('dataFinal', sql.DateTime, dataFinal)
            .input('idCliente', sql.Int, idCliente)
            .input('idOperacao', sql.Int, idOperacao)
            .input('idDiretor', sql.Int, idDiretor)
            .input('idGerente', sql.Int, idGerente)
            .input('idCoordenador', sql.Int, idCoordenador)
            .input('idSupervisor', sql.Int, idSupervisor)
            .input('idOperador', sql.Int, idOperador)
            .execute('s_Gestao_Performance_Retorna_Dados_Coordenador_Hierarquia_Nova')

        let resultSupervisor= await pool.request()
            .input('dataInicial', sql.DateTime, dataInicial)
            .input('dataFinal', sql.DateTime, dataFinal)
            .input('idCliente', sql.Int, idCliente)
            .input('idOperacao', sql.Int, idOperacao)
            .input('idDiretor', sql.Int, idDiretor)
            .input('idGerente', sql.Int, idGerente)
            .input('idCoordenador', sql.Int, idCoordenador)
            .input('idSupervisor', sql.Int, idSupervisor)
            .input('idOperador', sql.Int, idOperador)
            .execute('s_Gestao_Performance_Retorna_Dados_Supervisor_Hierarquia_Nova')

        let resultOperador= await pool.request()
            .input('dataInicial', sql.DateTime, dataInicial)
            .input('dataFinal', sql.DateTime, dataFinal)
            .input('idCliente', sql.Int, idCliente)
            .input('idOperacao', sql.Int, idOperacao)
            .input('idDiretor', sql.Int, idDiretor)
            .input('idGerente', sql.Int, idGerente)
            .input('idCoordenador', sql.Int, idCoordenador)
            .input('idSupervisor', sql.Int, idSupervisor)
            .input('idOperador', sql.Int, idOperador)
            .execute('s_Gestao_Performance_Retorna_Dados_Operador_Hierarquia_Nova')
    
            
        let retorno = {
                cliente: resultCliente?.recordset,
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
//Rota para exibição de operadores no filtro
router.get('/operador', function (req, res){

    const {
        dataInicial, 
        dataFinal, 
        idCliente = '-1', 
        idOperacao= '-1', 
        idDiretor= '-1', 
        idGerente= '-1', 
        idCoordenador= '-1', 
        idSupervisor= '-1',
        idOperador= '-1',
    } = req.query

    retornaOperador(dataInicial, dataFinal, idCliente, idOperacao, idDiretor, idGerente, idCoordenador, idSupervisor, idOperador, res);

})
async function retornaOperador(dataInicial, dataFinal, idCliente, idOperacao, idDiretor, idGerente, idCoordenador, idSupervisor, idOperador, res){
    try {

        let pool = await get('BDRechamadasGeral', connection)
        let resultCliente = await pool.request()
            .input('dataInicial', sql.DateTime, dataInicial)
            .input('dataFinal', sql.DateTime, dataFinal)
            .input('idCliente', sql.Int, idCliente)
            .input('idOperacao', sql.Int, idOperacao)
            .input('idDiretor', sql.Int, idDiretor)
            .input('idGerente', sql.Int, idGerente)
            .input('idCoordenador', sql.Int, idCoordenador)
            .input('idSupervisor', sql.Int, idSupervisor)
            .input('idOperador', sql.Int, idOperador)
            .execute('s_Gestao_Performance_Retorna_Dados_Cliente_Hierarquia_Nova')

        let resultOperacao = await pool.request()
            .input('dataInicial', sql.DateTime, dataInicial)
            .input('dataFinal', sql.DateTime, dataFinal)
            .input('idCliente', sql.Int, idCliente)
            .input('idOperacao', sql.Int, idOperacao)
            .input('idDiretor', sql.Int, idDiretor)
            .input('idGerente', sql.Int, idGerente)
            .input('idCoordenador', sql.Int, idCoordenador)
            .input('idSupervisor', sql.Int, idSupervisor)
            .input('idOperador', sql.Int, idOperador)
            .execute('s_Gestao_Performance_Retorna_Dados_Operacao_Hierarquia_Nova')

        let resultDiretor = await pool.request()
            .input('dataInicial', sql.DateTime, dataInicial)
            .input('dataFinal', sql.DateTime, dataFinal)
            .input('idCliente', sql.Int, idCliente)
            .input('idOperacao', sql.Int, idOperacao)
            .input('idDiretor', sql.Int, idDiretor)
            .input('idGerente', sql.Int, idGerente)
            .input('idCoordenador', sql.Int, idCoordenador)
            .input('idSupervisor', sql.Int, idSupervisor)
            .input('idOperador', sql.Int, idOperador)
            .execute('s_Gestao_Performance_Retorna_Dados_Diretor_Hierarquia_Nova')

        let resultGerente= await pool.request()
            .input('dataInicial', sql.DateTime, dataInicial)
            .input('dataFinal', sql.DateTime, dataFinal)
            .input('idCliente', sql.Int, idCliente)
            .input('idOperacao', sql.Int, idOperacao)
            .input('idDiretor', sql.Int, idDiretor)
            .input('idGerente', sql.Int, idGerente)
            .input('idCoordenador', sql.Int, idCoordenador)
            .input('idSupervisor', sql.Int, idSupervisor)
            .input('idOperador', sql.Int, idOperador)
            .execute('s_Gestao_Performance_Retorna_Dados_Gerente_Hierarquia_Nova')

        let resultCoordenador= await pool.request()
            .input('dataInicial', sql.DateTime, dataInicial)
            .input('dataFinal', sql.DateTime, dataFinal)
            .input('idCliente', sql.Int, idCliente)
            .input('idOperacao', sql.Int, idOperacao)
            .input('idDiretor', sql.Int, idDiretor)
            .input('idGerente', sql.Int, idGerente)
            .input('idCoordenador', sql.Int, idCoordenador)
            .input('idSupervisor', sql.Int, idSupervisor)
            .input('idOperador', sql.Int, idOperador)
            .execute('s_Gestao_Performance_Retorna_Dados_Coordenador_Hierarquia_Nova')

        let resultSupervisor= await pool.request()
            .input('dataInicial', sql.DateTime, dataInicial)
            .input('dataFinal', sql.DateTime, dataFinal)
            .input('idCliente', sql.Int, idCliente)
            .input('idOperacao', sql.Int, idOperacao)
            .input('idDiretor', sql.Int, idDiretor)
            .input('idGerente', sql.Int, idGerente)
            .input('idCoordenador', sql.Int, idCoordenador)
            .input('idSupervisor', sql.Int, idSupervisor)
            .input('idOperador', sql.Int, idOperador)
            .execute('s_Gestao_Performance_Retorna_Dados_Supervisor_Hierarquia_Nova')

        let resultOperador= await pool.request()
            .input('dataInicial', sql.DateTime, dataInicial)
            .input('dataFinal', sql.DateTime, dataFinal)
            .input('idCliente', sql.Int, idCliente)
            .input('idOperacao', sql.Int, idOperacao)
            .input('idDiretor', sql.Int, idDiretor)
            .input('idGerente', sql.Int, idGerente)
            .input('idCoordenador', sql.Int, idCoordenador)
            .input('idSupervisor', sql.Int, idSupervisor)
            .input('idOperador', sql.Int, idOperador)
            .execute('s_Gestao_Performance_Retorna_Dados_Operador_Hierarquia_Nova')
    
            
            
        let retorno = {
                cliente: resultCliente?.recordset,
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
module.exports = router