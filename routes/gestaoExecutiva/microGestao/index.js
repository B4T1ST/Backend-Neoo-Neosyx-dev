//carregando modulos
const sql = require('mssql');
const express = require('express');
const router = express.Router();
const { get } = require('../../../lib/poolManager')
const config = require('../../../config/config.json');
const connection = require('../../../config/' + config.executiva);

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
    } = req.query

    retornaDados(dataInicial, dataFinal, idCliente, idOperacao, idDiretor, idGerente, idCoordenador, idSupervisor, idOperador, res);
});

async function retornaDados(dataInicial, dataFinal, idCliente, idOperacao, idDiretor, idGerente, idCoordenador, idSupervisor, idOperador, res) {
    try {

        let pool = await get('BDRechamadasGeral', connection)

        let resultMicroGestao = await pool.request()
            .input('dataInicial', sql.DateTime, dataInicial)
            .input('dataFinal', sql.DateTime, dataFinal)
            .input('idCliente', sql.VarChar, idCliente)
            .input('idOperacao', sql.VarChar, idOperacao)
            .input('idDiretor', sql.VarChar, idDiretor)
            .input('idGerente', sql.VarChar, idGerente)
            .input('idCoordenador', sql.VarChar, idCoordenador)
            .input('idSupervisor', sql.VarChar, idSupervisor)
            .input('idOperador', sql.VarChar, idOperador)
            .execute('s_Gestao_Executiva_Retorna_Micro_Gestao')

        let retorno = {
            MicroGestao: transformarMicroGestao(resultMicroGestao?.recordset)
        };

        res.json(retorno)

    } catch (error) {
        res.status(500).json(error);
    }
}

function transformarMicroGestao(microGestao) {
    const result = {
        field: ["Operador", "Supervisor", "Operacao", "Atendidas", "TMA", "quartilTmo", "Absenteísmo", "quartilAbsenteismo", "Tempo Logado", "quartilTempologado", "Jackin", "quartilJackin", "Rechamadas 60m", "quartilRecham60m", "Rechamadas 24h", "quartilRecham24h", "Rechamadas 48h", "quartilRecham48h", "Rechamdas 72h", "quartilRecham72h", "Transferidas", "quartilTransferidas", "ShortCall 30s", "quartilShortCall30s", "ShortCall 60s", "quartilShortCall60s", "Desconexão", "quartilDesconexao"],
        value: [],
        colors: []
    };

    //const camposCores = ["Tmo", "Absenteismo", "Tempologado", "Jackin", "Recham60m", "Recham24h", "Recham48h", "Recham72h", "Transferidas", "ShortCall30s", "ShortCall60s", "Desconexao"];

    for (const campo of result.field) {
        // Adiciona os valores ao array value
        const values = microGestao.map(item => ({ [campo]: item[campo] }));
        result.value.push(values);

        // Adiciona as cores ao array colors
        const key = `cor${campo}`;
        const colors = microGestao.map(item => {
            const corCampo = item[key];
            return corCampo !== null && corCampo !== undefined ? { [key]: corCampo } : null;
        }).filter(color => color !== null);

        result.colors.push(colors);
    }

    // Remove arrays vazios
    result.value = result.value.filter(arr => arr.length > 0);
    result.colors = result.colors.filter(arr => arr.length > 0);

    return result;
}






module.exports = router