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
                    //Agrego el campo id para que sea mucho mas sencillo identificar la valvula en concreto 
                    id : "valve1",
                    name : "valve1",
                    status: true
                },
                {
                    id : "valve2",
                    name : "valve2",
                    status: false
                },
                {
                    id : "valve3",
                    name : "valve3",
                    status: false
                },
                {
                    id : "valve4",
                    name : "valve4",
                    status: true
                },
                {
                    id : "valve5",
                    name : "valve5",
                    status: true
                },
            ]
        },

        {
            name : "grupo2",
            valves : [
                {
                    id : "valve6",
                    name : "valve1",
                    status: true
                },
                {
                    id : "valve7",
                    name : "valve2",
                    status: false
                },
                {
                    id : "valve8",
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
    //Me llega la valvula
    //Recorro la lista con un forof para sacar el valor de cada grupo y poder compararlo adecuadamente
    for (const group of datos.lista) {
        //Si el grupo coincide con el que se esta realizando el evento recorro las valvulas
        if(group.name == newItem.group){
            //recorro las valvulas con un forof para sacar el valor de cada objeto valvula
            for (const valve of group.valves) {
                //Si el id de la valvula coincide con el que se esta realizando el change event modifico el objeto valvula
                //Segun necesite.
                if(valve.id == newItem.id){
                    //cambio su estado para que cuando el usuario recargue la pagina se mantenga el estado de las valvulas
                    valve.status = newItem.state;
                }
            }
        }
    }
});


app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
