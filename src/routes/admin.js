const express = require('express');
// const {check} = require('express-validator');
const Admin = require('../controllers/admin');
const validate = require('../middlewares/validate');

const router = express.Router();

router.get("/report", [], validate, Admin.report);

module.exports = router;
