//carregando modulos
const sql = require('mssql');
const express = require('express');
const router = express.Router();
const config = require('../../../config/config.json');
const { get } = require('../../../lib/poolManager')
const connection = require('../../../config/' + config.executiva);

router.get('/', async function (req, res) {
    try {
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

        // Chama a função para obter os dados do colaborador
        const resultColaborador = await retornaDadosUsuario(dataInicial, dataFinal, idCliente, idOperacao, idDiretor, idGerente, idCoordenador, idSupervisor, idOperador);

        // Mapeia os resultados para o novo formato desejado
        const mergedData = {
            dataInicial: {
                label: resultColaborador.dataInicio,
                value: resultColaborador.dataInicial,
            },
            dataFinal: {
                label: resultColaborador.dataFim,
                value: resultColaborador.dataFinal,
            },
            cliente: {
                label: resultColaborador.cliente,
                value: resultColaborador.idCliente,
            },
            operacao: {
                label: resultColaborador.campanha,
                value: resultColaborador.idCampanha,
            },
            diretor: {
                label: resultColaborador.diretor,
                value: resultColaborador.idDiretor,
            },
            gerente: {
                label: resultColaborador.gerente,
                value: resultColaborador.idGerente,
            },
            coordenador: {
                label: resultColaborador.coordenador,
                value: resultColaborador.idCoordenador,
            },
            supervisor: {
                label: resultColaborador.supervisor,
                value: resultColaborador.idSupervisor,
            },
            operador: {
                label: resultColaborador.operador,
                value: resultColaborador.idOperador,
            },

        };

        res.json(mergedData);

    } catch (error) {
        console.error('Erro ao consultar o banco de dados:', error.message);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

async function retornaDadosUsuario(dataInicial, dataFinal, idCliente, idOperacao, idDiretor, idGerente, idCoordenador, idSupervisor, idOperador) {
    try {
        let pool = await get('BDRechamadasGeral', connection)
        let resultColaborador = await pool.request()
            .input('dataInicial', sql.DateTime, dataInicial)
            .input('dataFinal', sql.DateTime, dataFinal)
            .input('idCliente', sql.VarChar, idCliente)
            .input('idOperacao', sql.VarChar, idOperacao)
            .input('idDiretor', sql.VarChar, idDiretor)
            .input('idGerente', sql.VarChar, idGerente)
            .input('idCoordenador', sql.VarChar, idCoordenador)
            .input('idSupervisor', sql.VarChar, idSupervisor)
            .input('idOperador', sql.VarChar, idOperador)
            .execute('s_Gestao_Executiva_Retorna_Dados_Colaborador_Dados_Filtro');

        return resultColaborador.recordset[0]; // Assume que há apenas um registro retornado
    } catch (error) {
        throw error;
    }
}

module.exports = router;
