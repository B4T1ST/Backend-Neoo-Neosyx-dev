//carregando modulos
const sql = require('mssql');
const express = require('express');
const router = express.Router();
const config = require('../../../config/config.json');
const { get } = require('../../../lib/poolManager')
const connection = require('../../../config/' + config.banco);

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
module.exports = router