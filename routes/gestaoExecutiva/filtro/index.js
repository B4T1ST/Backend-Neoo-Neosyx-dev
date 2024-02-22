//carregando modulos
const sql = require('mssql');
const express = require('express');
const router = express.Router();
const config = require('../../../config/config.json');
const { get } = require('../../../lib/poolManager')
const connection = require('../../../config/' + config.executiva);

router.get('/cliente', function (req, res){

    retornaCliente(res);

})
async function retornaCliente(res){
    try {

        let pool = await get('BDRechamadasGeral', connection)
        let result = await pool.request()
            .execute('s_Gestao_Executiva_Retorna_Dados_Cliente')

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

//Rota para exibição das campanhas no filtro
router.get('/campanha', function (req, res){

    const {idCliente} = req.query

    retornaCampanha(idCliente, res);

})
async function retornaCampanha(idCliente, res){
    try {

        let pool = await get('BDRechamadasGeral', connection)
        let resultCampanha = await pool.request()
            .input('idCliente', sql.Int, idCliente)
            .execute('s_Gestao_Executiva_Retorna_Dados_Campanha')

        let resultGerente = await pool.request()
            .input('idCliente', sql.Int, idCliente)
            .execute('s_Gestao_Executiva_Retorna_Dados_Gerente')

        let resultCoordenador = await pool.request()
            .input('idCliente', sql.Int, idCliente)
            .execute('s_Gestao_Executiva_Retorna_Dados_Coordenador')

        let resultSupervisor = await pool.request()
            .input('idCliente', sql.Int, idCliente)
            .execute('s_Gestao_Executiva_Retorna_Dados_Supervisor')   


        let retorno = {
            campanha: resultCampanha?.recordset,
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

    const {idCliente, idCampanha} = req.query

    retornaGerente(idCliente, idCampanha, res);

})
async function retornaGerente(idCliente, idCampanha, res){
    try {

        let pool = await get('BDRechamadasGeral', connection)
        let resultGerente = await pool.request()
            .input('idCliente', sql.Int, idCliente)
            .input('idCampanha', sql.Int, idCampanha)
            .execute('s_Gestao_Executiva_Retorna_Dados_Gerente')

        let resultCoordenador = await pool.request()
            .input('idCliente', sql.Int, idCliente)
            .input('idCampanha', sql.Int, idCampanha)
            .execute('s_Gestao_Executiva_Retorna_Dados_Coordenador')

        let resultSupervisor = await pool.request()
            .input('idCliente', sql.Int, idCliente)
            .input('idCampanha', sql.Int, idCampanha)
            .execute('s_Gestao_Executiva_Retorna_Dados_Supervisor')      

        
        let retorno = {
            gerente: resultGerente?.recordset,
            coordenador: resultCoordenador?.recordset,
            supervisor: resultSupervisor?.recordset
        }
        res.json(retorno)

    } catch (error) {
        res.status(500).json(error)
    }
}
//Rota para exibição dos diretores no filtro
router.get('/coordenador', function (req, res){

    const {idCliente, idCampanha, idGerente} = req.query

    retornaCoordenador(idCliente, idCampanha, idGerente, res);

})
async function retornaCoordenador(idCliente, idCampanha, idGerente, res){
    try {

        let pool = await get('BDRechamadasGeral', connection)
        let resultCoordenador = await pool.request()
            .input('idCliente', sql.Int, idCliente)
            .input('idCampanha', sql.Int, idCampanha)
            .input('idGerente', sql.Int, idGerente)
            .execute('s_Gestao_Executiva_Retorna_Dados_Coordenador')

        let resultSupervisor = await pool.request()
            .input('idCliente', sql.Int, idCliente)
            .input('idCampanha', sql.Int, idCampanha)
            .input('idGerente', sql.Int, idGerente)
            .execute('s_Gestao_Executiva_Retorna_Dados_Supervisor')


        let retorno = {
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

    const {idCliente, idCampanha, idGerente, idCoordenador} = req.query

    retornaSupervisor(idCliente, idCampanha, idGerente, idCoordenador, res);

})
async function retornaSupervisor(idCliente, idCampanha, idGerente, idCoordenador, res){
    try {

        let pool = await get('BDRechamadasGeral', connection)
        let resultSupervisor = await pool.request()
            .input('idCliente', sql.Int, idCliente)
            .input('idCampanha', sql.Int, idCampanha)
            .input('idGerente', sql.Int, idGerente)
            .input('idCoordenador', sql.Int, idCoordenador)
            .execute('s_Gestao_Executiva_Retorna_Dados_Supervisor')

        let retorno = {
            supervisor: resultSupervisor?.recordset
        }

        res.json(retorno)

    } catch (error) {
        res.status(500).json(error)
    }
}
module.exports = router