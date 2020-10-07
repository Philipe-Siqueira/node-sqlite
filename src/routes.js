const express = require('express');
const router = express.Router();
const multer = require('multer');
const multerConfig = require('./config/multer');
const upload = multer(multerConfig);

const authController = require('./controllers/auth');
const peopleController = require('./controllers/people');
const productController = require('./controllers/products');
const checkToken = require('./middleware/auth');

router.post('/files', upload.single('file'), (request,response) => {
  return response.json({ok: true});
});
router.get('/auth', authController.accountRefresh);

router.post('/signup', authController.accountSignUp);
router.post('/signin', authController.accountSignIn);
router.use(checkToken);
router.post('/people', peopleController.create);
router.get('/people', peopleController.read);
router.get('/people/:id', peopleController.findOne);
router.put('/people/:id', peopleController.update);
router.delete('/people/:id', peopleController.delete);
router.post('/product/:id', productController.create);
router.get('/product/', productController.read);
module.exports = router;
