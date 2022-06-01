const express = require('express');
const router = express.Router();
const {getMuseumData} = require('../controller/index')
/* GET museum listing. */
router.get('/visitors', getMuseumData);
module.exports = router;
