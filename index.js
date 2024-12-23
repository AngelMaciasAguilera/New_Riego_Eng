import express from 'express';
import cors from 'cors';

// Create the Express application
const app = express();
const PORT = 3000;

// Middleware to handle JSON
app.use(cors());
app.use(express.json());

// Object 'datos' that contains a property called 'lista', which is an array with the group of valves that exist
// Within that group, there are valves belonging to that specific group with a name and a state.

const datos = {
    lista: [
        {
            name: "grupo1",
            valves: [
                {
                    // Added the 'id' field to make it much easier to identify the specific valve
                    id: "valve1",
                    name: "valve1",
                    status: true
                },
                {
                    id: "valve2",
                    name: "valve2",
                    status: false
                },
                {
                    id: "valve3",
                    name: "valve3",
                    status: false
                },
                {
                    id: "valve4",
                    name: "valve4",
                    status: true
                },
                {
                    id: "valve5",
                    name: "valve5",
                    status: true
                },
            ]
        },

        {
            name: "grupo2",
            valves: [
                {
                    id: "valve6",
                    name: "valve1",
                    status: true
                },
                {
                    id: "valve7",
                    name: "valve2",
                    status: false
                },
                {
                    id: "valve8",
                    name: "valve3",
                    status: false
                },
            ]
        }
    ]
}

// Routes
app.get('/', (req, res) => {
    res.send('Welcome to the REST API with Node.js and import!');
});

app.get('/api/items', (req, res) => {    
    res.json(datos.lista);
});

app.post('/api/items', (req, res) => {
    const newItem = req.body;
    // The valve is received
    // Iterate through the list using a 'for...of' loop to extract the value of each group and compare it properly
    for (const group of datos.lista) {
        // If the group matches the one being used in the event, iterate through the valves
        if(group.name == newItem.group){
            // Iterate through the valves using a 'for...of' loop to extract the value of each valve object
            for (const valve of group.valves) {
                // If the valve ID matches the one being used in the change event, modify the valve object
                // as needed.
                if(valve.id == newItem.id){
                    // Change its state so that when the user reloads the page, the state of the valves is preserved
                    valve.status = newItem.state;
                }
            }
        }
    }
});


app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
