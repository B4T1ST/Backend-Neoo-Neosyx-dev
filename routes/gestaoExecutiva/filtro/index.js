//carregando modulos
const sql = require('mssql');
const express = require('express');
const router = express.Router();
const config = require('../../../config/config.json');
const { get } = require('../../../lib/poolManager')
const connection = require('../../../config/' + config.executiva);

//Rota para exibição das campanhas no filtro
router.get('/campanha', function (req, res){

    retornaCampanha(res);

})
async function retornaCampanha(res){
    try {

        let pool = await get('BDRechamadasGeral', connection)
        let result = await pool.request()
            .execute('s_Gestao_Executiva_Retorna_Dados_Campanha')

        if (!result?.recordset) {
            res.status(500).json('Não foi possível retornar os dados.')
            return;
        }

        let campanha = result.recordset

        res.json(campanha)

    } catch (error) {
        res.status(500).json(error)
    }
}
//Rota para exibição dos gerentes no filtro
router.get('/gerente', function (req, res){

    const {idCampanha} = req.query

    retornaGerente(idCampanha, res);

})
async function retornaGerente(idCampanha, res){
    try {

        let pool = await get('BDRechamadasGeral', connection)
        let resultGerente = await pool.request()
            .input('idCampanha', sql.Int, idCampanha)
            .execute('s_Gestao_Executiva_Retorna_Dados_Gerente')

        let resultCoordenador = await pool.request()
            .input('idCampanha', sql.Int, idCampanha)
            .execute('s_Gestao_Executiva_Retorna_Dados_Coordenador')

        let resultSupervisor = await pool.request()
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

    const {idCampanha, idGerente} = req.query

    retornaCoordenador(idCampanha, idGerente, res);

})
async function retornaCoordenador(idCampanha, idGerente, res){
    try {

        let pool = await get('BDRechamadasGeral', connection)
        let resultCoordenador = await pool.request()
            .input('idCampanha', sql.Int, idCampanha)
            .input('idGerente', sql.Int, idGerente)
            .execute('s_Gestao_Executiva_Retorna_Dados_Coordenador')

        let resultSupervisor = await pool.request()
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

    const {idCampanha, idGerente, idCoordenador} = req.query

    retornaSupervisor(idCampanha, idGerente, idCoordenador, res);

})
async function retornaSupervisor(idCampanha, idGerente, idCoordenador, res){
    try {

        let pool = await get('BDRechamadasGeral', connection)
        let resultSupervisor = await pool.request()
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