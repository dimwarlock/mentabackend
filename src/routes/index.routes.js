const express = require ('express')
const router = express.Router()
const controller = require('../controllers/index.controller')

//get dispositivos firebase

router.get('/dispositivos', (req, res) => {
    controller.getDispositivos(req, res);
});
  

//añadir dispositivo 
router.post('/addDispositivo', (req, res) => {
    controller.addDispositivo(req, res);
});


// Definimos la ruta para eliminar un dispositivo por su ID
router.delete('/dispositivos/:id', (req, res) => {
    controller.Dispositivos(req, res);
});


//subir imagen indicando el id del dispositivo y pasando una imagen 
router.put('/upload/dispositivo/:nombre', (req, res) => {
    controller.putdispositivo(req, res);
});

router.put('/edit/dispositivo/:id', (req, res) => {
    console.log("ruta")
    controller.editDispositivos(req, res);
});



//Export para que se puedan utilizar en cualquier archivo las Rutas
module.exports = router