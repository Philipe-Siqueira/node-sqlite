const express = require('express');
const router = express.Router();
const authController = require('./controllers/auth');
const peopleController = require('./controllers/people');
const checkToken = require('./middleware/auth');

router.get('/auth', authController.findAll);

router.post('/signup', authController.accountSignUp);
router.post('/signin', authController.accountSignIn);
router.use(checkToken);
router.post('/people', peopleController.create);
router.get('/people', peopleController.read);
router.get('/people/:id', peopleController.findOne);
router.put('/people/:id', peopleController.update);
router.delete('/people/:id', peopleController.delete);

module.exports = router;
