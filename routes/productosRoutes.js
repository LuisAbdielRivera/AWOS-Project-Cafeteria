import express from "express"
import { body } from 'express-validator'
import { admin, crear, guardar, agregarImagen, almacenarImagen, editar, guardarCambios, eliminar, mostrarProducto } from "../controllers/productosController.js"
import protegerRuta from "../middleware/protegerRuta.js"
import upload from '../middleware/subirImagen.js'

const router = express.Router()

router.get('/cybercoffe', protegerRuta, admin)
router.get('/cybercoffe/crear', protegerRuta, crear)

router.post('/cybercoffe/crear', protegerRuta,
    body('nombre').notEmpty().withMessage('El Nombre del Producto es Obligatorio'),
    body('descripcion').notEmpty().withMessage('La Descripción, no puede ir vacía').isLength({max: 200}).withMessage('La descricón es muy larga'),
    body('categoria').isNumeric().withMessage('Selecciona Categoria'),
    body('precio').isNumeric().withMessage('Selecciona un rango de Precio'),
    body('lat').notEmpty().withMessage('Ubica la propiedad en el Mapa'),
    guardar
)

router.get('/cybercoffe/agregar-imagen/:id', protegerRuta, agregarImagen)

router.post('/cybercoffe/agregar-imagen/:id', 
    protegerRuta,
    upload.single('imagen'), 
    almacenarImagen
    )

router.get('/cybercoffe/editar/:id', protegerRuta, editar)

router.post('/cybercoffe/editar/:id', protegerRuta,
    body('nombre').notEmpty().withMessage('El Nombre del Producto es Obligatorio'),
    body('descripcion').notEmpty().withMessage('La Descripción, no puede ir vacía').isLength({max: 200}).withMessage('La descricón es muy larga'),
    body('categoria').isNumeric().withMessage('Selecciona Categoria'),
    body('precio').isNumeric().withMessage('Selecciona un rango de Precio'),
    body('lat').notEmpty().withMessage('Ubica la propiedad en el Mapa'),
    guardarCambios
)

router.post('/cybercoffe/eliminar/:id', protegerRuta, eliminar)

// Area Publica
router.get('/cybercoffe/:id', mostrarProducto)

export default router