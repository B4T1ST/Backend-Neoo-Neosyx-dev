//carregando modulos
const express = require('express');
const router = express.Router();


//Chamo as subRotas
router.use('/artigos', require('./artigos'));
router.use('/colecoes', require('./colecoes'));
router.use('/hashtags', require('./hashtags'));
router.use('/posts', require('./posts'));
router.use('/recentes', require('./recentes'));
router.use('/workspaces', require('./workspaces'));
router.use('/usuarios', require('./usuarios'));
router.use('/abas', require('./abas'));
router.use('/abasResultado', require('./abasResultado'));

//exporta o router
module.exports = router;  