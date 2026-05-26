const express = require ('express') // importacion de libreria express
const app = express() // funcion para crear servidor

/*
"Cuando alguien haga una petición GET(es) a '/', responde esto"
- app.get() = escuchar peticiones/recibir informacion
- '/' = ruta
- (req, res) = funcion callback que se ejecuta cuando alguien accede a la ruta
(req = peticion, res = respuesta a la peticion)
- send = enviar respuesta
*/

app.use(express.static('public'))

app.listen(10000, () => { // listen = escucha el puerto 10000 (enciende el servidor)
    console.log('Servidor corriendo') // imprime que esta corriendo el servidor
})