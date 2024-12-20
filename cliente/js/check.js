//Esta clase crea el check en el padre especifico
export class Check {
    constructor(groupList, client) {
        //Le pasamos el grupo donde tiene que estar anexado en su adicion (addCheck)
        this.groupList = groupList;
        //this.client = client;

        this.states = [];
    }

    changeValue(name, value) {
        const data = this.states.find((item) => item.name == name);
        // hacer algo más.
    }

    //Añade los check-buttons al grupo
    addCheck(name, status) {
        //Le paso el status que va a tener el check, este status lo traigo del servidor
        //Creo una variable que va a contener el nombre y el estado del chbutton
        this.states.push({
            name: name,
            state: status
        })
        //Creo el elemento label y le agrego la clase form-switch; se lo anexo al padre.
        const check = document.createElement("label");
        check.classList.add("form-switch");
        this.groupList.appendChild(check);

        //Creo el input le meto un tipo checkbox y se lo anexo al padre
        const input = document.createElement("input");
        input.setAttribute('type', 'checkbox');
        //Cambio su estado segun el estado mandado por el servidor
        input.checked = status;
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
        status ? span.innerHTML = "ON" : span.innerHTML = "OFF";
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
            this.changeValue(name, event.target.checked);
        })
    }
}