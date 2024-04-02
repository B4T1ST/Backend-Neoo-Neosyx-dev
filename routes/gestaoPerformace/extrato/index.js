const express = require('express');
const router = express.Router();

router.use('/cards',    require('./cards'));
router.use('/tabela',   require('./tabela'));

module.exports = router;