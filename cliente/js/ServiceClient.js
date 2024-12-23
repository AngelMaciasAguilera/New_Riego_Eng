/*Esta constante va a ser un objeto singgleton para poder realizar la conexion con el servidor.
    Ademas se va a encargar de enviar y recibir los datos y procesarlos tambien, y es el que se va a encargar de 
    "servirle" al cliente lo que este solicite o necesite
*/
export const ServiceClient = {
    url : "",
    //En este metodo le paso la url del servidor alojado y la funcion que quiero que se ejecute cuando todo salga correcto.
    getChecksServed: (url, callback) => {
        //Hago esto para guardarme la url del servidor para futuros usos
        //De esta manera evito que el usuario tenga que poner de manera repetitiva la url,
        //Simplemente la primera vez que se llama capturo la url del servidor y la reutilizo en futuras necesidades.
        ServiceClient.url = url;
        fetch(url).then(
            async (array) => {
                let myarray = await array.json();
                //A esa funcion le paso el array con las valvulas
                callback(myarray);
            }
        )
    },

    sendCheckStatus: (data) => {
        console.log(ServiceClient.url);
        fetch(ServiceClient.url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
    }
}