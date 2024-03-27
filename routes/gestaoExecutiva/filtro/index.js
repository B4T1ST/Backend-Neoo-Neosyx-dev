//carregando modulos
const sql = require('mssql');
const express = require('express');
const router = express.Router();
const config = require('../../../config/config.json');
const { get } = require('../../../lib/poolManager')
const connection = require('../../../config/' + config.executiva);

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
        cCategoria = '-1',
        cIndicador = '-1'
    } = req.query

    retornaCliente(dataInicial, dataFinal, idCliente, idOperacao, idDiretor, idGerente, idCoordenador, idSupervisor, idOperador, cCategoria, cIndicador, res);

})
async function retornaCliente(dataInicial, dataFinal, idCliente, idOperacao, idDiretor, idGerente, idCoordenador, idSupervisor, idOperador, cCategoria, cIndicador, res){
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
            .execute('s_Gestao_Executiva_Retorna_Dados_Cliente')

        let resultCategoria = await pool.request()
            .input('dataInicial', sql.DateTime, dataInicial)
            .input('dataFinal', sql.DateTime, dataFinal)
            .input('idCliente', sql.Int, idCliente)
            .input('idOperacao', sql.Int, idOperacao)
            .input('idDiretor', sql.Int, idDiretor)
            .input('idGerente', sql.Int, idGerente)
            .input('idCoordenador', sql.Int, idCoordenador)
            .input('idSupervisor', sql.Int, idSupervisor)
            .input('idOperador', sql.Int, idOperador)
            .execute('s_Gestao_Executiva_Retorna_Categoria')

        let resultIndicadores = await pool.request()
            .input('dataInicial', sql.DateTime, dataInicial)
            .input('dataFinal', sql.DateTime, dataFinal)
            .input('idCliente', sql.Int, idCliente)
            .input('idOperacao', sql.Int, idOperacao)
            .input('idDiretor', sql.Int, idDiretor)
            .input('idGerente', sql.Int, idGerente)
            .input('idCoordenador', sql.Int, idCoordenador)
            .input('idSupervisor', sql.Int, idSupervisor)
            .input('idOperador', sql.Int, idOperador)
            .input('indicadorCategoria', sql.Int, cCategoria)
            .execute('s_Gestao_Executiva_Retorna_Indicador_Filtro')
        

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
            .execute('s_Gestao_Executiva_Retorna_Dados_Campanha')


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
            .execute('s_Gestao_Executiva_Retorna_Dados_Gerente')

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
            .execute('s_Gestao_Executiva_Retorna_Dados_Coordenador')

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
            .execute('s_Gestao_Executiva_Retorna_Dados_Supervisor')

            
        let retorno = {
                cliente: resultCliente?.recordset,
                categoria: resultCategoria?.recordset,
                indicadores: resultIndicadores?.recordset,
                operacao: resultOperacao?.recordset,
                gerente: resultGerente?.recordset,
                coordenador: resultCoordenador?.recordset,
                supervisor: resultSupervisor?.recordset,
        }

        res.json(retorno)

    } catch (error) {
        res.status(500).json(error)
    }
}
//Rota para exibição das categorias no filtro
router.get('/categoria', function (req, res){

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
        cCategoria = '-1',
        cIndicador = '-1'
    } = req.query

    retornaCategoria(dataInicial, dataFinal, idCliente, idOperacao, idDiretor, idGerente, idCoordenador, idSupervisor, idOperador, cCategoria, cIndicador, res);

})
async function retornaCategoria(dataInicial, dataFinal, idCliente, idOperacao, idDiretor, idGerente, idCoordenador, idSupervisor, idOperador, cCategoria, cIndicador, res){
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
            .execute('s_Gestao_Executiva_Retorna_Dados_Cliente')

        let resultCategoria = await pool.request()
            .input('dataInicial', sql.DateTime, dataInicial)
            .input('dataFinal', sql.DateTime, dataFinal)
            .input('idCliente', sql.Int, idCliente)
            .input('idOperacao', sql.Int, idOperacao)
            .input('idDiretor', sql.Int, idDiretor)
            .input('idGerente', sql.Int, idGerente)
            .input('idCoordenador', sql.Int, idCoordenador)
            .input('idSupervisor', sql.Int, idSupervisor)
            .input('idOperador', sql.Int, idOperador)
            .input('codigoIndicador', sql.VarChar, cIndicador)
            .execute('s_Gestao_Executiva_Retorna_Categoria')

        let resultIndicadores = await pool.request()
            .input('dataInicial', sql.DateTime, dataInicial)
            .input('dataFinal', sql.DateTime, dataFinal)
            .input('idCliente', sql.Int, idCliente)
            .input('idOperacao', sql.Int, idOperacao)
            .input('idDiretor', sql.Int, idDiretor)
            .input('idGerente', sql.Int, idGerente)
            .input('idCoordenador', sql.Int, idCoordenador)
            .input('idSupervisor', sql.Int, idSupervisor)
            .input('idOperador', sql.Int, idOperador)
            .input('indicadorCategoria', sql.VarChar, cCategoria)
            .execute('s_Gestao_Executiva_Retorna_Indicador_Filtro')
        

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
            .execute('s_Gestao_Executiva_Retorna_Dados_Campanha')


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
            .execute('s_Gestao_Executiva_Retorna_Dados_Gerente')

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
            .execute('s_Gestao_Executiva_Retorna_Dados_Coordenador')

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
            .execute('s_Gestao_Executiva_Retorna_Dados_Supervisor')

            
        let retorno = {
                cliente: resultCliente?.recordset,
                categoria: resultCategoria?.recordset,
                indicadores: resultIndicadores?.recordset,
                operacao: resultOperacao?.recordset,
                gerente: resultGerente?.recordset,
                coordenador: resultCoordenador?.recordset,
                supervisor: resultSupervisor?.recordset,
        }

        res.json(retorno)

    } catch (error) {
        res.status(500).json(error)
    }
}
//Rota para exibição dos indicadores no filtro
router.get('/indicadores', function (req, res){

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
        cCategoria = '-1',
        cIndicador = '-1'
    } = req.query

    retornaIndicadores(dataInicial, dataFinal, idCliente, idOperacao, idDiretor, idGerente, idCoordenador, idSupervisor, idOperador, cCategoria, cIndicador, res);

})
async function retornaIndicadores(dataInicial, dataFinal, idCliente, idOperacao, idDiretor, idGerente, idCoordenador, idSupervisor, idOperador, cCategoria, cIndicador, res){
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
            .execute('s_Gestao_Executiva_Retorna_Dados_Cliente')

        let resultCategoria = await pool.request()
            .input('dataInicial', sql.DateTime, dataInicial)
            .input('dataFinal', sql.DateTime, dataFinal)
            .input('idCliente', sql.Int, idCliente)
            .input('idOperacao', sql.Int, idOperacao)
            .input('idDiretor', sql.Int, idDiretor)
            .input('idGerente', sql.Int, idGerente)
            .input('idCoordenador', sql.Int, idCoordenador)
            .input('idSupervisor', sql.Int, idSupervisor)
            .input('idOperador', sql.Int, idOperador)
            .input('codigoIndicador', sql.VarChar, cIndicador)
            .execute('s_Gestao_Executiva_Retorna_Categoria')

        let resultIndicadores = await pool.request()
            .input('dataInicial', sql.DateTime, dataInicial)
            .input('dataFinal', sql.DateTime, dataFinal)
            .input('idCliente', sql.Int, idCliente)
            .input('idOperacao', sql.Int, idOperacao)
            .input('idDiretor', sql.Int, idDiretor)
            .input('idGerente', sql.Int, idGerente)
            .input('idCoordenador', sql.Int, idCoordenador)
            .input('idSupervisor', sql.Int, idSupervisor)
            .input('idOperador', sql.Int, idOperador)
            .input('indicadorCategoria', sql.VarChar, cCategoria)
            .execute('s_Gestao_Executiva_Retorna_Indicador_Filtro')
        

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
            .execute('s_Gestao_Executiva_Retorna_Dados_Campanha')


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
            .execute('s_Gestao_Executiva_Retorna_Dados_Gerente')

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
            .execute('s_Gestao_Executiva_Retorna_Dados_Coordenador')

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
            .execute('s_Gestao_Executiva_Retorna_Dados_Supervisor')

            
        let retorno = {
                cliente: resultCliente?.recordset,
                categoria: resultCategoria?.recordset,
                indicadores: resultIndicadores?.recordset,
                operacao: resultOperacao?.recordset,
                gerente: resultGerente?.recordset,
                coordenador: resultCoordenador?.recordset,
                supervisor: resultSupervisor?.recordset,
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
        cCategoria = '-1',
        cIndicador = '-1'
    } = req.query

    retornaOperacao(dataInicial, dataFinal, idCliente, idOperacao, idDiretor, idGerente, idCoordenador, idSupervisor, idOperador, cCategoria, cIndicador, res);

})
async function retornaOperacao(dataInicial, dataFinal, idCliente, idOperacao, idDiretor, idGerente, idCoordenador, idSupervisor, idOperador, cCategoria, cIndicador, res){
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
            .execute('s_Gestao_Executiva_Retorna_Dados_Cliente')

        let resultCategoria = await pool.request()
            .input('dataInicial', sql.DateTime, dataInicial)
            .input('dataFinal', sql.DateTime, dataFinal)
            .input('idCliente', sql.Int, idCliente)
            .input('idOperacao', sql.Int, idOperacao)
            .input('idDiretor', sql.Int, idDiretor)
            .input('idGerente', sql.Int, idGerente)
            .input('idCoordenador', sql.Int, idCoordenador)
            .input('idSupervisor', sql.Int, idSupervisor)
            .input('idOperador', sql.Int, idOperador)
            .input('codigoIndicador', sql.VarChar, cIndicador)
            .execute('s_Gestao_Executiva_Retorna_Categoria')

        let resultIndicadores = await pool.request()
            .input('dataInicial', sql.DateTime, dataInicial)
            .input('dataFinal', sql.DateTime, dataFinal)
            .input('idCliente', sql.Int, idCliente)
            .input('idOperacao', sql.Int, idOperacao)
            .input('idDiretor', sql.Int, idDiretor)
            .input('idGerente', sql.Int, idGerente)
            .input('idCoordenador', sql.Int, idCoordenador)
            .input('idSupervisor', sql.Int, idSupervisor)
            .input('idOperador', sql.Int, idOperador)
            .input('indicadorCategoria', sql.Int, cCategoria)
            .execute('s_Gestao_Executiva_Retorna_Indicador_Filtro')

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
            .execute('s_Gestao_Executiva_Retorna_Dados_Campanha')

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
            .execute('s_Gestao_Executiva_Retorna_Dados_Gerente')

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
            .execute('s_Gestao_Executiva_Retorna_Dados_Coordenador')

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
            .execute('s_Gestao_Executiva_Retorna_Dados_Supervisor')
        
            
        let retorno = {
                cliente: resultCliente?.recordset,
                categoria: resultCategoria?.recordset,
                indicadores: resultIndicadores?.recordset,
                operacao: resultOperacao?.recordset,
                gerente: resultGerente?.recordset,
                coordenador: resultCoordenador?.recordset,
                supervisor: resultSupervisor?.recordset
        }

        res.json(retorno)

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
        cCategoria ='-1',
        cIndicador = '-1'
    } = req.query

    retornaGerente(dataInicial, dataFinal, idCliente, idOperacao, idDiretor, idGerente, idCoordenador, idSupervisor, idOperador, cCategoria, cIndicador, res);

})
async function retornaGerente(dataInicial, dataFinal, idCliente, idOperacao, idDiretor, idGerente, idCoordenador, idSupervisor, idOperador, cCategoria, cIndicador,res){
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
            .execute('s_Gestao_Executiva_Retorna_Dados_Cliente')

        let resultCategoria = await pool.request()
            .input('dataInicial', sql.DateTime, dataInicial)
            .input('dataFinal', sql.DateTime, dataFinal)
            .input('idCliente', sql.Int, idCliente)
            .input('idOperacao', sql.Int, idOperacao)
            .input('idDiretor', sql.Int, idDiretor)
            .input('idGerente', sql.Int, idGerente)
            .input('idCoordenador', sql.Int, idCoordenador)
            .input('idSupervisor', sql.Int, idSupervisor)
            .input('idOperador', sql.Int, idOperador)
            .input('codigoIndicador', sql.VarChar, cIndicador)
            .execute('s_Gestao_Executiva_Retorna_Categoria')

        let resultIndicadores = await pool.request()
            .input('dataInicial', sql.DateTime, dataInicial)
            .input('dataFinal', sql.DateTime, dataFinal)
            .input('idCliente', sql.Int, idCliente)
            .input('idOperacao', sql.Int, idOperacao)
            .input('idDiretor', sql.Int, idDiretor)
            .input('idGerente', sql.Int, idGerente)
            .input('idCoordenador', sql.Int, idCoordenador)
            .input('idSupervisor', sql.Int, idSupervisor)
            .input('idOperador', sql.Int, idOperador)
            .input('indicadorCategoria', sql.Int, cCategoria)
            .execute('s_Gestao_Executiva_Retorna_Indicador_Filtro')


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
            .execute('s_Gestao_Executiva_Retorna_Dados_Campanha')

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
            .execute('s_Gestao_Executiva_Retorna_Dados_Gerente')

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
            .execute('s_Gestao_Executiva_Retorna_Dados_Coordenador')

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
            .execute('s_Gestao_Executiva_Retorna_Dados_Supervisor')
        
            
        let retorno = {
                cliente: resultCliente?.recordset,
                categoria: resultCategoria?.recordset,
                indicadores: resultIndicadores?.recordset,
                operacao: resultOperacao?.recordset,
                gerente: resultGerente?.recordset,
                coordenador: resultCoordenador?.recordset,
                supervisor: resultSupervisor?.recordset
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
        cCategoria = '-1',
        cIndicador = '-1'
    } = req.query

    retornaCoordenador(dataInicial, dataFinal, idCliente, idOperacao, idDiretor, idGerente, idCoordenador, idSupervisor, idOperador, cCategoria, cIndicador, res);

})
async function retornaCoordenador(dataInicial, dataFinal, idCliente, idOperacao, idDiretor, idGerente, idCoordenador, idSupervisor, idOperador, cCategoria, cIndicador, res){
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
            .execute('s_Gestao_Executiva_Retorna_Dados_Cliente')


        let resultCategoria = await pool.request()
            .input('dataInicial', sql.DateTime, dataInicial)
            .input('dataFinal', sql.DateTime, dataFinal)
            .input('idCliente', sql.Int, idCliente)
            .input('idOperacao', sql.Int, idOperacao)
            .input('idDiretor', sql.Int, idDiretor)
            .input('idGerente', sql.Int, idGerente)
            .input('idCoordenador', sql.Int, idCoordenador)
            .input('idSupervisor', sql.Int, idSupervisor)
            .input('idOperador', sql.Int, idOperador)
            .input('codigoIndicador', sql.VarChar, cIndicador)
            .execute('s_Gestao_Executiva_Retorna_Categoria')

        let resultIndicadores = await pool.request()
            .input('dataInicial', sql.DateTime, dataInicial)
            .input('dataFinal', sql.DateTime, dataFinal)
            .input('idCliente', sql.Int, idCliente)
            .input('idOperacao', sql.Int, idOperacao)
            .input('idDiretor', sql.Int, idDiretor)
            .input('idGerente', sql.Int, idGerente)
            .input('idCoordenador', sql.Int, idCoordenador)
            .input('idSupervisor', sql.Int, idSupervisor)
            .input('idOperador', sql.Int, idOperador)
            .input('indicadorCategoria', sql.Int, cCategoria)
            .execute('s_Gestao_Executiva_Retorna_Indicador_Filtro')

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
            .execute('s_Gestao_Executiva_Retorna_Dados_Campanha')

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
            .execute('s_Gestao_Executiva_Retorna_Dados_Gerente')

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
            .execute('s_Gestao_Executiva_Retorna_Dados_Coordenador')

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
            .execute('s_Gestao_Executiva_Retorna_Dados_Supervisor')
            
            
        let retorno = {
                cliente: resultCliente?.recordset,
                categoria: resultCategoria?.recordset,
                indicadores: resultIndicadores?.recordset,
                operacao: resultOperacao?.recordset,
                gerente: resultGerente?.recordset,
                coordenador: resultCoordenador?.recordset,
                supervisor: resultSupervisor?.recordset
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
        cCategoria = '-1',
        cIndicador = '-1'
    } = req.query

    retornaSupervisor(dataInicial, dataFinal, idCliente, idOperacao, idDiretor, idGerente, idCoordenador, idSupervisor, idOperador, cCategoria, cIndicador, res);

})
async function retornaSupervisor(dataInicial, dataFinal, idCliente, idOperacao, idDiretor, idGerente, idCoordenador, idSupervisor, idOperador, cCategoria, cIndicador, res){
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
            .execute('s_Gestao_Executiva_Retorna_Dados_Cliente')

        let resultCategoria = await pool.request()
            .input('dataInicial', sql.DateTime, dataInicial)
            .input('dataFinal', sql.DateTime, dataFinal)
            .input('idCliente', sql.Int, idCliente)
            .input('idOperacao', sql.Int, idOperacao)
            .input('idDiretor', sql.Int, idDiretor)
            .input('idGerente', sql.Int, idGerente)
            .input('idCoordenador', sql.Int, idCoordenador)
            .input('idSupervisor', sql.Int, idSupervisor)
            .input('idOperador', sql.Int, idOperador)
            .input('codigoIndicador', sql.VarChar, cIndicador)
            .execute('s_Gestao_Executiva_Retorna_Categoria')

        let resultIndicadores = await pool.request()
            .input('dataInicial', sql.DateTime, dataInicial)
            .input('dataFinal', sql.DateTime, dataFinal)
            .input('idCliente', sql.Int, idCliente)
            .input('idOperacao', sql.Int, idOperacao)
            .input('idDiretor', sql.Int, idDiretor)
            .input('idGerente', sql.Int, idGerente)
            .input('idCoordenador', sql.Int, idCoordenador)
            .input('idSupervisor', sql.Int, idSupervisor)
            .input('idOperador', sql.Int, idOperador)
            .input('indicadorCategoria', sql.Int, cCategoria)
            .execute('s_Gestao_Executiva_Retorna_Indicador_Filtro')

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
            .execute('s_Gestao_Executiva_Retorna_Dados_Campanha')

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
            .execute('s_Gestao_Executiva_Retorna_Dados_Gerente')

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
            .execute('s_Gestao_Executiva_Retorna_Dados_Coordenador')

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
            .execute('s_Gestao_Executiva_Retorna_Dados_Supervisor')
    
            
            let retorno = {
                cliente: resultCliente?.recordset,
                categoria: resultCategoria?.recordset,
                indicadores: resultIndicadores?.recordset,
                operacao: resultOperacao?.recordset,
                gerente: resultGerente?.recordset,
                coordenador: resultCoordenador?.recordset,
                supervisor: resultSupervisor?.recordset
        }

        res.json(retorno)

    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports = router