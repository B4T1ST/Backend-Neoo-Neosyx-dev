const sql = require('mssql');
const express = require('express');
const router = express.Router();
const config = require('../../../config/config.json');
const { get } = require('../../../lib/poolManager');
const connection = require ('../../../config/' + config.monitoriaAgentes)

router.use('/agrupamento',  require('./agrupamento'))
router.use('/clientes',     require('./clientes'))
router.use('/grupo',        require('./grupo'))
router.use('/graficoBarra', require('./graficoBarra'))
router.use('/indicadores',  require('./indicadores'))
router.use('/operacoes',    require('./operacoes'))

router.get('/', function (req, res){

    const{
        almope,
        dataInicial,
        dataFinal,
        cAgrupamento,
        cGrupo,
        cIndicador,
        cCliente,
        cOperacao
    } = req.query

    if(!almope) {
        res.status(400).json('Almope não informado')
        return
    }

    retornaDados(almope, dataInicial, dataFinal, cAgrupamento, cGrupo, cIndicador, cCliente, cOperacao, res)
});

async function retornaDados(almope, dataInicial, dataFinal, cAgrupamento, cGrupo, cIndicador, cCliente, cOperacao, res){
    try {
        let pool = await get('BDRechamadasGeral', connection)

        let resultDadosUsuario = await pool.request()
            .input('almope',        sql.VarChar,      almope)
            .execute('s_Monitoramento_Lideranca_Retorna_Dados_Colaborador')
        
        let resultTabela = await pool.request()
            .input('almope',        sql.VarChar(30),  almope)
            .input('dataInicial',   sql.DateTime,     dataInicial)
            .input('dataFinal',     sql.DateTime,     dataFinal)
            .input('cAgrupamento',  sql.Int,          cAgrupamento)
            .input('cGrupo',        sql.Int,          cGrupo)
            .input('cIndicador',    sql.Int,        cIndicador)
            .input('cCliente',      sql.Int,      cCliente)
            .input('cOperacao',     sql.Int,      cOperacao)
            .execute('s_Monitoramento_Lideranca_Retorna_Dados_HML')

        let subRowTeste = {
            subRows: [
                { 
                    id: 1, 
                    nomeAgente: 'LUCAS SILVEIRA DE LIMA', 

                    realAtendidas: 4,
                    prevAtendidas: 0,
                    thrPrevAtendidas: "#ffd35b",
                    saAtendidas: 0,
                    thrSaAtendidas: "#ffd35b",
                    maAtendidas: 0,
                    thrMaAtendidas: "#ffd35b",
                    realTMA: 280,
                    prevTMA: 350,
                    thrPrevTma: "#07ae76",
                    saTMA: 0,
                    thrSaTma: "#07ae76",
                    maTMA: 0,
                    thrMaTma: "#07ae76",
                    realTempoLogado: "01:24:40",
                    prevTempoLogado: "06:18:00",
                    thrPrevTempoLogado: "#c72c2b",
                    saTempoLogado: "00:00:00",
                    thrSaTempoLogado: "#c72c2b",
                    maTempoLogado: "00:00:00",
                    thrMaTempoLogado: "#c72c2b",
                    realTempoFalado: 0,
                    prevTempoFalado: 0,
                    thrPrevTempoFalado: "#ffd35b",
                    saTempoFalado: 0,
                    thrSaTempoFalado: "#ffd35b",
                    maTempoFalado: 0,
                    thrMaTempoFalado: "#ffd35b",
                    realJackin: "00:00:00",
                    prevJackIn: "05:30:00",
                    thrPrevJackIn: "#c72c2b",
                    saJackIn: "00:00:00",
                    thrSaJackIn: "#c72c2b",
                    maJackIn: "00:00:00",
                    thrMaJackIn: "#c72c2b",
                    realAbsenteismo: 0,
                    prevAbsenteismo: 1,
                    thrPrevAbsenteismo: "#07ae76",
                    saAbsenteismo: 0,
                    thrSaAbsenteismo: "#c72c2b",
                    maAbsenteismo: 0,
                    thrMaAbsenteismo: "#c72c2b",
                    realAderencia: 0,
                    prevAderencia: 95,
                    thrPrevAderencia: "#c72c2b",
                    saAderencia: 0,
                    thrSaAderencia: "#c72c2b",
                    maAderencia: 0,
                    thrMaAderencia: "#c72c2b",
                    realRechamada60min: 0,
                    prevRechamada60min: 12,
                    thrPrevRechamada60min: "#c72c2b",
                    saRechamada60min: 0,
                    thrSaRechamada60min: "#c72c2b",
                    maRechamada60min: 0,
                    thrMaRechamada60min: "#c72c2b",
                    realRechamada24h: "0%",
                    prevRechamada24h: "18%",
                    thrPrevRechamada24h: "#c72c2b",
                    saRechamada24h: "0%",
                    thrSaRechamada24h: "#c72c2b",
                    maRechamada24h: "0%",
                    thrMaQtdRechamadas24h: "#c72c2b",
                    realRechamada48h: "0%",
                    prevRechamada48h: "22%",
                    thrPrevRechamada48h: "#c72c2b",
                    saRechamada48h: "0%",
                    thrSaRechamada48h: "#c72c2b",
                    maRechamada48h: "0%",
                    thrMaRechamada48h: "#c72c2b",
                    realRechamada72h: "0%",
                    prevRechamada72h: "28%",
                    thrPrevRechamada72h: "#c72c2b",
                    saRechamada72h: "0%",
                    thrSaRechamada72h: "#c72c2b",
                    maRechamada72h: "0%",
                    thrMaRechamada72h: "#c72c2b",
                    realTransferencia: 0,
                    prevTransferencia: 12,
                    thrPrevQtdTransferidas: "#c72c2b",
                    saTransferencia: 0,
                    thrSaQtdTransferidas: "#c72c2b",
                    maTransferencia: 0,
                    thrMaQtdTransferidas: "#c72c2b",
                    realShortcall30s: "0%",
                    prevShortcall30s: "2%",
                    thrprevQtdShortCallCliente30s: "#c72c2b",
                    saShortcall30s: "0%",
                    thrSaQtdShortCallCliente30s: "#c72c2b",
                    maShortcall30s: "0%",
                    thrMaQtdShortCallCliente30s: "#c72c2b",
                    realShortcall60s: "0%",
                    prevShortcall60s: "4%",
                    thrPrevQtdShortCallCliente60s: "#c72c2b",
                    saShortcall60s: "0%",
                    thrSaQtdShortCallCliente60s: "#c72c2b",
                    maShortcall60s: "0%",
                    thrMaQtdShortCallCliente60s: "#c72c2b",
                    realDesconexao: 0,
                    prevDesconexao: 1,
                    thrPrevQtdDesconexao: "#c72c2b",
                    saDesconexao: 0,
                    thrSaQtdDesconexao: "#c72c2b",
                    maDesconexao: 0,
                    thrMaQtdDesconexao: "#c72c2b",
                    realPausaGeral: "00:00:00",
                    prevPausaGeral: "00:00:00",
                    thrPrevPausaGeral: "#c72c2b",
                    saPausaGeral: "00:00:00",
                    thrSaPausaGeral: "#c72c2b",
                    maPausaGeral: "00:00:00",
                    thrMaPausaGeral: "#c72c2b",
                }
            ]
        }

        resultTabela?.recordset.map((dado) => {
            if (dado.id === 1) {
                console.log(dado)
                Object.assign(dado, subRowTeste)
            }
        })

        // console.log(resultTabela?.recordset)
        // console.log(resultTabela?.recordsets[0])

        let retorno = {
            dadosTabela: resultTabela?.recordset,
            dadosUsuario: resultDadosUsuario?.recordset
        }
        
        res.json(retorno)

    } catch (error) {
        res.status(500).json(error)
    }

}

module.exports = router