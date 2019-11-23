var express = require('express');
var router = express.Router();
var instrumentoController = require('../controllers/instrumentosController')

/* GET users listing. */
router.get('/:search', instrumentoController.getOne);
router.get('/', instrumentoController.getAll);

router.post('/', instrumentoController.register);
router.put('/:index', instrumentoController.update)
router.delete('/:index', instrumentoController.delete);


module.exports = router;