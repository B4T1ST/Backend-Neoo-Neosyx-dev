//carregando modulos
const sql = require('mssql');
const express = require('express');
const router = express.Router();
const config = require('../../../config/config.json');
const { get } = require('../../../lib/poolManager')
const connection = require('../../../config/' + config.banco);

router.get('/', async function (req, res) {
    try {
        const { almope } = req.query;

        // Chama a função para obter os dados do colaborador
        const resultColaborador = await retornaDadosUsuario(almope);

        // Mapeia os resultados para o novo formato desejado
        const mergedData = {
            nome: resultColaborador.nome,
            almope: resultColaborador.almope,
            avatar: resultColaborador.avatar,
            isSupervisor: resultColaborador.isSupervisor,
            cargo: resultColaborador.cargo,
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

async function retornaDadosUsuario(almope) {
    try {
        let pool = await get('BDRechamadasGeral', connection)
        let resultColaborador = await pool.request()
            .input('almope', sql.VarChar, almope)
            .execute('s_Gestao_Performance_Retorna_Dados_Colaborador');

        return resultColaborador.recordset[0]; // Assume que há apenas um registro retornado
    } catch (error) {
        throw error;
    }
}

module.exports = router;
