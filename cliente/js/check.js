import { ServiceClient } from "./ServiceClient.js";
//Esta clase crea el check en el padre especifico
export class Check {
    constructor(groupList, client) {
        //Le pasamos el grupo donde tiene que estar anexado en su adicion (addCheck)
        this.groupList = groupList;
        //this.client = client;

        this.states = [];
    }

    changeValue(id, status) {
        //Busca dentro del array states de check una valvula cuyo id sea el de la valvula sobre el que se esta realizando
        //Ahora bien me tienen que pasar el id del objeto para poder buscarlo y ademas el status que tiene ahora mismo.
        /*¿Porque se va a modificar solo el objeto obtenido y no el objeto dentro del array this.states?
            La logica es ganar eficiencia; this.states es un array que se esta cambiando cada vez que se recarga la pagina,
            entonces imaginemos que tenemos un array this.states con unas 700 valvulas ¿Vas a recorrerlas 
            todas hasta encontrar la que es por su id y luego cambiar su estado? No, eso tiene un grave problema de rendimiento
            ya que si el usuario es el tipico "graciosillo" y le da 30 veces por segundo a la valvula estarias haciendo mas de
            2000 operaciones por segundo en el array sin parar lo cual baja mucho el rendimiento. En lugar de eso lo
            que hacemos es que encontramos el objeto y una vez tenemos dicho objeto modificamos su estado y lo enviamos al servidor
            en lugar de tener que estar recorriendo un array y modificarlo y luego enviarlo.
        */

        const data = this.states.find((item) => item.id == id);
        data.state = status;
        //le agrego la propiedad group que contiene el id del grupo donde se encuentra la valvula
        data.group = this.groupList.id;
        ServiceClient.sendCheckStatus(data);
    }

    //Añade los check-buttons al grupo
    //Cambio el parametro para que me metan directamente el objeto valvula en vez de sus propiedades una por una
    addCheck(valve) {
        //Le paso el status que va a tener el check, este status lo traigo del servidor
        //Creo una variable que va a contener el nombre y el estado del chbutton
        this.states.push({
            id : valve.id,
            name: valve.name,
            state: valve.status
        })
        //Creo el elemento label y le agrego la clase form-switch; se lo anexo al padre.
        const check = document.createElement("label");
        check.classList.add("form-switch");
        this.groupList.appendChild(check);

        //Creo el input le meto un tipo checkbox y se lo anexo al padre
        const input = document.createElement("input");
        input.setAttribute("id", valve.id);
        input.setAttribute('type', 'checkbox');
        //Cambio su estado segun el estado mandado por el servidor
        input.checked = valve.status;
        check.appendChild(input);

        //Le agrego la etiqueta i ademas
        check.appendChild(document.createElement("i"));

        /*Creo el objeto span y guardo su referencia 
        Ahora bien el ejercicio nos pide que modifiquemos el texto que esta en el span,
        como ya tenemos la referencia de ese objeto span podemos usar esa misma referencia
        en el change listener para que cada vez que cambie se compruebe el estado y en base 
        a ese estado utilizaremos la referencia que ya tenemos para cambiar el texto segun este encendido
        o apagado. */

        const span = document.createElement('span');
        //cambio su texto del span dependiendo de su estado inicial
        valve.status ? span.innerHTML = "ON" : span.innerHTML = "OFF";
        check.appendChild(span);
        input.addEventListener('change', (event) => {

            //Utilizamos la sintaxis ternaria para ahorrar codigo con if else etc.
            /*¿Como funciona la sintaxis ternaria?
                La sintaxis ternaria funciona mas o menos asi:
                boolean ? primerValorAModificar : segundoValorAModificar

                Que significa esta sintaxis?

                la ? es como decir que tienen un valor variable entre dos casos
                el primerValorAModificar es lo que queremos en caso de que salga TRUE
                y el segundo es lo que queremos hacer en caso de que salga FALSE.
            */
            event.target.checked ? span.innerHTML = "ON" : span.innerHTML ="OFF";   
            //Cambio el estado de la valvula sobre la que se ha aplicado el evento
            //Le paso el id de la valvula 
            this.changeValue(event.target.id, event.target.checked);
        })
    }
}