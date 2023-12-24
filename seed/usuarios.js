import bcryt from 'bcrypt'

const usuarios = [
    {
        nombre: 'Abdiel',
        email: 'abdiel@cybercoffe.com', 
        confirmado: 1,
        password: bcryt.hashSync('cybercoffe123', 10)
    },{
        nombre: 'Yuli',
        email: 'yulimaday@cybercoffe.com', 
        confirmado: 1,
        password: bcryt.hashSync('cybercoffe123', 10)
    },{
        nombre: 'Esaú',
        email: 'giggs@cybercoffe.com', 
        confirmado: 1,
        password: bcryt.hashSync('cybercoffe123', 10)
    }
]

export default usuarios