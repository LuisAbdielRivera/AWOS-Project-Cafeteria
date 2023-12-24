import { unlink } from 'node:fs/promises'
import { validationResult } from 'express-validator'
import {Precio, Categoria, Producto} from '../models/index.js'

const admin = async (req, res) => {
    const {id} = req.usuario

    const productos = await Producto.findAll({
        where: {
            usuarioId : id
        },
        include: [
            {
                model: Categoria, as: 'categoria' 
            },
            {
                model: Precio, as: 'precio'
            }
        ]
    })

    res.render('productos/admin',{
        pagina: 'Productos',
        csrfToken: req.csrfToken(),
        productos
    })
}

//  Formulario para crear una nuevo producto
const crear = async (req, res) =>{
    // Consultar Modelo de Precio y Categorias
    const [categorias, precios] = await Promise.all([
        Categoria.findAll(),
        Precio.findAll()
    ])

    res.render('productos/crear',{
        pagina: 'Crea un Producto',
        csrfToken: req.csrfToken(),
        categorias,
        precios,
        datos: {}
    })
}

const guardar = async (req, res) => {
    // Validacion
    let resultado = validationResult(req)

    if(!resultado.isEmpty()){
        // Consultar Modelo de Precio y Categorias
        const [categorias, precios] = await Promise.all([
            Categoria.findAll(),
            Precio.findAll()
        ])

        return res.render('productos/crear',{
            pagina: 'Crear Producto',
            csrfToken: req.csrfToken(),
            categorias,
            precios,
            errores: resultado.array(),
            datos: req.body
    })
    }
    // Crear un registro
    const { nombre, descripcion, precio: precioId, categoria: categoriaId } = req.body

    const { id: usuarioId } = req.usuario
    try{
        const productoGuardado = await Producto.create({
            nombre,
            descripcion, 
            precioId,
            categoriaId,
            usuarioId,
            imagen: ''
        })

        const { id } = productoGuardado
        res.redirect(`/cybercoffe/agregar-imagen/${id}`)
    }catch(error){
        console.log(error)
    }
}

const agregarImagen = async(req, res) => {
    const {id} = req.params
    // Validar que el producto exista
    const producto = await Producto.findByPk(id)
    if(!producto){
        return res.redirect('/cybercoffe')
    }
    
    // Validar que el producto no este publicada
    if(producto.publicado){
        return res.redirect('/cybercoffe')
    }
    
    // Validar que no puedan acceder a la información del producto
    if(req.usuario.id.toString() !== producto.usuarioId.toString()){
        return res.redirect('/cybercoffe')
    }

    res.render('productos/agregar-imagen', {
        pagina: `Agregar Imagen: ${producto.nombre}`,
        csrfToken: req.csrfToken(),
        producto
    })
}

const almacenarImagen = async (req, res, next) => {
    const {id} = req.params
    // Validar que el producto exista
    const producto = await Producto.findByPk(id)
    if(!producto){
        return res.redirect('/cybercoffe')
    }
    
    // Validar que el producto no este publicada
    if(producto.publicado){
        return res.redirect('/cybercoffe')
    }
    
    // Validar que no puedan acceder a la información del producto
    if(req.usuario.id.toString() !== producto.usuarioId.toString()){
        return res.redirect('/cybercoffe')
    }

    try{
    console.log(req.file)

    //Almacenar la imagen y publicar producto
    producto.imagen = req.file.filename
    producto.publicado = 1

    await producto.save()

    next()

    }catch(error){
        console.log(error)
    }
}

const editar = async (req, res) => {
     // Consultar Modelo de Precio y Categorias
    const {id} = req.params

    // Validar que el producto existe
    const producto = await Producto.findByPk(id)

    if(!producto){
        return res.redirect('/cybercoffe')
    }

    // Revisar que quien visita la URL, es quien creo el producto
    if(producto.usuarioId.toString() !== req.usuario.id.toString()){
        return res.redirect('/cybercoffe')
    }
    
    // Consultar Modelo de Precio y Categorias
     const [categorias, precios] = await Promise.all([
        Categoria.findAll(),
        Precio.findAll()
    ])

    return res.render('productos/editar',{
        pagina: `Editar el Producto: ${producto.nombre}`,
        csrfToken: req.csrfToken(),
        categorias,
        precios,
        datos: req.body
    })
}

const guardarCambios = async (req, res) =>{
    // Verificar la validación
    // Validacion
    let resultado = validationResult(req)

    if(!resultado.isEmpty()){
        // Consultar Modelo de Precio y Categorias
        const [categorias, precios] = await Promise.all([
            Categoria.findAll(),
            Precio.findAll()
        ])
        
            res.render('productos/editar',{
            pagina: `Edita el Producto`,
            csrfToken: req.csrfToken(),
            categorias,
            precios,
            errores: resultado.array(),
            datos: producto
    })
    }

    const {id} = req.params

    // Validar que el producto existe
    const producto = await Producto.findByPk(id)

    if(!producto){
        return res.redirect('/cybercoffe')
    }

    // Revisar que quien visita la URL, es quien creo el producto
    if(producto.usuarioId.toString() !== req.usuario.id.toString()){
        return res.redirect('/cybercoffe')
    }

    // Reescribir el objeto y actualizarlo
    try{
        const { nombre, descripcion, precio: precioId, categoria: categoriaId } = req.body

        producto.set({
            nombre,
            descripcion, 
            precioId,
            categoriaId,
        })
        
        await producto.save();
        res.redirect('/cybercoffe')

    }catch(error){
        console.log(error)
    }
}

const eliminar = async (req, res) => {
    const {id} = req.params

    // Validar que el producto existe
    const producto = await Producto.findByPk(id)

    if(!producto){
        return res.redirect('/cybercoffe')
    }

    // Revisar que quien visita la URL, es quien creo el producto
    if(producto.usuarioId.toString() !== req.usuario.id.toString()){
        return res.redirect('/cybercoffe')
    }

    // Eliminar Imagen
    await unlink (`public/uploads/${producto.imagen}`)
    console.log(`Se elimino la imagen ${producto.imagen}`)

    // Eliminar el Producto
    await producto.destroy()
    res.redirect('/cybercoffe')
}

const mostrarProducto = async (req, res) =>{
    
    const { id } = req.params
    
    // Comprobar que el producto exista
    const producto = await Producto.findByPk(id,{
        include: [
            { model : Precio, as : 'precio' },
            { model : Categoria, as : 'categoria' },
        ]
    })

    if(!producto){
        return res.redirect('/404')
    }

    res.render('productos/mostrar', {
        producto,
        pagina: producto.nombre

    })
}

export{
    admin,
    crear,
    guardar,
    agregarImagen,
    almacenarImagen,
    editar,
    guardarCambios,
    eliminar,
    mostrarProducto
}