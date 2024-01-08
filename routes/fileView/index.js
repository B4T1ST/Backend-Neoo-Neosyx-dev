//carregando modulos
const fs = require('fs');
const express = require('express');
const path = require('path');
const router = express.Router();

//Acessa os arquivos da pasta de chat do neoo
router.get('/imagens/:file', function (req, res) {
    const { file } = req.params

    const caminho = 'C:\\inetpub\\wwwroot\\imageFiles\\'

    res.sendFile(path.resolve(caminho, file));
});

//exporta o router
module.exports = router;