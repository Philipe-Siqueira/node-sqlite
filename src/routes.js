const express = require('express');
const router = express.Router();
const authControler = require('./controllers/auth');


router.get('/auth', authControler.findAll);
router.post('/signup', authControler.accountSignUp);
router.post('/signin', authControler.accountSignIn);

module.exports = router;
