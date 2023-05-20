//Base de datos
const express = require('express');
const app = require('../index');
const { db, admin } = require('../firebase');

//Añadir las funciones al Controlador para que se puedan invocar en Rutas
const controller = {}


//edit Dispositivos
controller.editDispositivos = async (req, res) => {
  try {
    const body=req.body
    const id = req.params.id;
    console.log(body)
    console.log(id)
    // Creamos una referencia a la colección de Dispositivos en Firestore
    const DispositivosRef = admin.firestore().collection('Dispositivos');
    
    // Creamos una referencia al documento del Dispositivo que deseamos eliminar
    const DispositivoRef = DispositivosRef.doc(id);

    // Obtenemos el documento actual
    const doc = await DispositivoRef.get();

    // Si el documento no existe, retornamos un error 404
    if (!doc.exists) {
      res.status(404).send('No se encontró el Dispositivo');
    } else {
      
      await DispositivoRef.update(body);
      res.send('Dispositivo actualizado');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Ocurrió un error al acutalizar el Dispositivo');
  }
};

//Get Dispositivos.
controller.getDispositivos = async (req, res) => {
  try {
    const snapshot = await db.collection('Dispositivos').get();
    const documentos = snapshot.docs.map(doc => {
      return {
        id: doc.id,
        ...doc.data()
      };
    });
    res.send(documentos);
    console.log(documentos);
  } catch (error) {
    console.log('Error obteniendo los documentos:', error);
    res.status(500).send('Error obteniendo los documentos');
  }
};

//Add Dispositivo.
controller.addDispositivo = async (req, res) => {
    const data = req.body;
    console.log(data)
    const docRef = await db.collection('Dispositivos').add(data);
    res.send(`Documento agregado con ID ${docRef.id}.`);
};

//Delete Dispositivo
controller.Dispositivos = async (req, res) => {
    try {
      const id = req.params.id;
      // Creamos una referencia a la colección de Dispositivos en Firestore
      const DispositivosRef = admin.firestore().collection('Dispositivos');
      
      // Creamos una referencia al documento del Dispositivo que deseamos eliminar
      const DispositivoRef = DispositivosRef.doc(id);
  
      // Obtenemos el documento actual
      const doc = await DispositivoRef.get();
  
      // Si el documento no existe, retornamos un error 404
      if (!doc.exists) {
        res.status(404).send('No se encontró el Dispositivo');
      } else {
        // Si el documento existe, lo eliminamos
        await DispositivoRef.delete();
        res.send('Dispositivo eliminado');
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Ocurrió un error al eliminar el Dispositivo');
    }
};


//Proceso de actualizar Dispositivo, subir imagen.
controller.putDispositivo = async (req,res)=>{
    let nombre = req.params.nombre;  
    if(!req.files){
        return res.status(400).json({
            ok:false,
            mensaje: 'no selecciono nada',
            errors: {message: 'debe de selccionar una imagen'}
        });
    }
    

    //obtener nombre del archivo

    let archivo = req.files.imagen;

    let nombreCortado = archivo.name.split('.');

    let extensionArchivo = nombreCortado[nombreCortado.length - 1]

    //extenciones que se aceptan
    let extencionesValidas = ['png','jpg','gif','jpeg'];

    if(extencionesValidas.indexOf(extensionArchivo)< 0){
        return res.status (400).json({
            ok:false,
            mensaje: 'Extencion no valida',
            errors: {message: 'las extenciones validas son:'+ extencionesValidas.join(', ')}

        });
    }

    let nombreArchivo = `${nombre}.${extensionArchivo}`;
    let path= `./uploads/${nombreArchivo}` ;
    console.log(path);
    

    archivo.mv(path, err=>{
        if (err){
            return res.status(500).json({
                ok:false,
                mensaje: 'Error al mover archivo',
                errors: err
            });
        }

        return res.status(200).json({
            ok:true,
            mensaje:'peticion realizada correctamente'
        });
    })

    // Creamos una referencia a la colección de Dispositivos en Firestore
    const DispositivosRef = admin.firestore().collection('Dispositivos');
    // Filtrar documentos donde el campo "nombre" sea igual al nombre proporcionado
    const query = DispositivosRef.where('nombre', '==', nombre);
    // Obtener los documentos que cumplen con el filtro
    query.get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        // Establecer el nuevo dato en cada documento
        const docRef = DispositivosRef.doc(doc.id);
        docRef.update({ imagen: nombreArchivo })
        .then(() => {
            console.log("Dato actualizado en el documento:", doc.id);
        })
        .catch((error) => {
            console.log("Error al actualizar el dato en el documento:", doc.id, error);
        });
    });
    }).catch((error) => {
    console.log("Error al obtener los documentos:", error);
    });
    
};






//Get Agregados.
controller.getAgregados = async (req, res) => {
  try {
    const snapshot = await db.collection('agregados').get();
    const documentos = snapshot.docs.map(doc => {
      return {
        id: doc.id,
        ...doc.data()
      };
    });
    res.send(documentos);
    console.log(documentos);
  } catch (error) {
    console.log('Error obteniendo los documentos:', error);
    res.status(500).send('Error obteniendo los documentos');
  }
};

//Add agregado.
controller.addAgregado = async (req, res) => {
    const data = req.body;
    console.log(data)
    const docRef = await db.collection('agregados').add(data);
    res.send(`Documento agregado con ID ${docRef.id}.`);
};

//Delete agregado
controller.agregados = async (req, res) => {
    try {
      const id = req.params.id;
      // Creamos una referencia a la colección de agregados en Firestore
      const agregadosRef = admin.firestore().collection('agregados');
      
      // Creamos una referencia al documento del agregado que deseamos eliminar
      const agregadoRef = agregadosRef.doc(id);
  
      // Obtenemos el documento actual
      const doc = await agregadoRef.get();
  
      // Si el documento no existe, retornamos un error 404
      if (!doc.exists) {
        res.status(404).send('No se encontró el agregado');
      } else {
        // Si el documento existe, lo eliminamos
        await agregadoRef.delete();
        res.send('agregado eliminado');
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Ocurrió un error al eliminar el agregado');
    }
};

//Proceso de actualizar Agregado, subir imagen.
controller.putAgregados = async (req,res)=>{
    let nombre = req.params.nombre;  
    if(!req.files){
        return res.status(400).json({
            ok:false,
            mensaje: 'no selecciono nada',
            errors: {message: 'debe de selccionar una imagen'}
        });
    }
    

    //obtener nombre del archivo

    let archivo = req.files.imagen;

    let nombreCortado = archivo.name.split('.');

    let extensionArchivo = nombreCortado[nombreCortado.length - 1]

    //extenciones que se aceptan
    let extencionesValidas = ['png','jpg','gif','jpeg'];

    if(extencionesValidas.indexOf(extensionArchivo)< 0){
        return res.status (400).json({
            ok:false,
            mensaje: 'Extencion no valida',
            errors: {message: 'las extenciones validas son:'+ extencionesValidas.join(', ')}

        });
    }

    let nombreArchivo = `${nombre}.${extensionArchivo}`;
    let path= `./uploads/${nombreArchivo}` ;
    console.log(path);
    

    archivo.mv(path, err=>{
        if (err){
            return res.status(500).json({
                ok:false,
                mensaje: 'Error al mover archivo',
                errors: err
            });
        }

        return res.status(200).json({
            ok:true,
            mensaje:'peticion realizada correctamente'
        });
    })

    // Creamos una referencia a la colección de agregados en Firestore
    const agregadosRef = admin.firestore().collection('agregados');
    // Filtrar documentos donde el campo "nombre" sea igual al nombre proporcionado
    const query = agregadosRef.where('nombre', '==', nombre);
    // Obtener los documentos que cumplen con el filtro
    query.get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        // Establecer el nuevo dato en cada documento
        const docRef = agregadosRef.doc(doc.id);
        docRef.update({ imagen: nombreArchivo })
        .then(() => {
            console.log("Dato actualizado en el documento:", doc.id);
        })
        .catch((error) => {
            console.log("Error al actualizar el dato en el documento:", doc.id, error);
        });
    });
    }).catch((error) => {
    console.log("Error al obtener los documentos:", error);
    });
    
};




module.exports = controller;