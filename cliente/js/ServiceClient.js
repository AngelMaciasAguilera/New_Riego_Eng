/*Esta constante va a ser un objeto singgleton para poder realizar la conexion con el servidor.
    Ademas se va a encargar de enviar y recibir los datos y procesarlos tambien, y es el que se va a encargar de 
    "servirle" al cliente lo que este solicite o necesite
*/
export const ServiceClient = {
    //En este metodo le paso la url del servidor alojado y la funcion que quiero que se ejecute cuando todo salga correcto.
    getChecksServed : (url,callback) => {
        fetch(url).then(
            async (array)  => {
                let myarray = await array.json();
                //A esa funcion le paso el array con las valvulas
                callback(myarray);
            }
        )
    }
}