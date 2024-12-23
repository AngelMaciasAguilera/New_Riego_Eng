import { ServiceClient } from './ServiceClient.js';
import { UI } from './UI.js';

//Llamo al metodo de mi constante ServiceClient y le paso la funcion que quiero ejecutar cuando todo salga correctamente
ServiceClient.getChecksServed("http://localhost:3000/api/items", UI.draw);