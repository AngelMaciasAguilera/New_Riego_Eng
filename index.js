import express from 'express';
import cors from 'cors';

// Crear la aplicación de Express
const app = express();
const PORT = 3000;

// Middleware para manejar JSON
app.use(cors());
app.use(express.json());

//Objeto datos que contiene una propiedad llamada lista que es un array con el grupo de valvulas que existen
//Dentro de ese grupo hay unas valvulas pertenecientes a ese grupo en concreto con un nombre y un estado.

const datos = {
    lista: [
        {
            name : "grupo1",
            valves : [
                {
                    name : "valve1",
                    status: true
                },
                {
                    name : "valve2",
                    status: false
                },
                {
                    name : "valve3",
                    status: false
                },
                {
                    name : "valve4",
                    status: true
                },
                {
                    name : "valve5",
                    status: true
                },
            ]
        },

        {
            name : "grupo2",
            valves : [
                {
                    name : "valve1",
                    status: true
                },
                {
                    name : "valve2",
                    status: false
                },
                {
                    name : "valve3",
                    status: false
                },
            ]
        }


    ]
}

// Rutas
app.get('/', (req, res) => {
    res.send('Bienvenido a la REST API con Node.js y import!');
});

app.get('/api/items', (req, res) => {    
    res.json(datos.lista);
});

app.post('/api/items', (req, res) => {
    const newItem = req.body;
    console.log(`Llega ${newItem.name}`);
    newItem.id = Date.now();
    datos.lista.push(newItem);
    res.status(201).json(newItem);
});


app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
