var express = require('express');
var router = express.Router();
var instrumentoController = require('../controllers/instrumentosController')

/* GET users listing. */
router.get('/:nombre', instrumentoController.getOne);
router.get('/', instrumentoController.getAll);

router.post('/', instrumentoController.register);
router.put('/:nombre', instrumentoController.update)
router.delete('/:nombre', instrumentoController.delete);


module.exports = router;