const express = require('express');
const router = express.Router();
const authControler = require('./controllers/auth');


router.get('/auth', authControler.findAll);
router.get('/signup', authControler.add);

module.exports = router;
