const express = require('express');

const Data = require('./DataRoutes')



const router = express.Router();

/**
 * Example Route
 */
router.use('/Note', Data);

module.exports = router;