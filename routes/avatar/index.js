const sql = require('mssql');
const express = require('express');
const router = express.Router();
const config = require('../../config/config.json');
const { get } = require('../../lib/poolManager')
const connection = require('../../config/' + config.banco);

router.get('/', async (req, res) => {
    try {
        const almope = req.query.almope; // Obtém o valor do query parameter 'almope'
        if (!almope) {
            return res.status(400).json('almope não informado.')
        }

        let pool = await get('BDRechamadasGeral', connection)
        let result = await pool.request()
            .input('almope', sql.VarChar(255), almope)
            .execute('s_Sup_Digital_Retorna_Avatar');
        res.json(result.recordset[0]);
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro interno do servidor');
    }
});

// Rota PUT para atualizar o avatar por almope
router.put('/', async (req, res) => {
    try {
        const almope = req.query.almope; // Obtém o valor do query parameter 'almope'
        if (!almope) {
            return res.status(400).json('almope não informado.')
        }

        let pool = await get('BDRechamadasGeral', connection)
        let result = await pool.request()
            .input('almope', sql.VarChar(255), almope)
            .execute('s_Sup_Digital_Troca_Avatar');
        res.send(result.recordset[0]);
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro interno do servidor');
    }
});

module.exports = router;