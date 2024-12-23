import { ServiceClient } from './ServiceClient.js';
import { UI } from './UI.js';

// Call the method from my constant ServiceClient and pass the function to execute when everything goes well
ServiceClient.getChecksServed("http://localhost:3000/api/items", UI.draw);
