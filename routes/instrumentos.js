var express = require('express');
var router = express.Router();
var instrumentoController = require('../controllers/instrumentosController')

/* GET users listing. */
router.get('/:nombre', instrumentoController.getOne);
router.get('/', instrumentoController.getAll);

router.post('/', instrumentoController.register);
router.put('/:id', instrumentoController.update)
router.delete('/:id', instrumentoController.delete);


module.exports = router;