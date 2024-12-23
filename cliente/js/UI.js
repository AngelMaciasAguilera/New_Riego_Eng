import { Check } from "./check.js";
/*Esta constante se va a encargar de pintar y gestionar toda la interfaz del usuario */
export const UI = {
    //A este metodo le paso el array que me devuelve servidor y el se encargar de pintarlo a gusto de consumidor
    draw : (array) => {
        //Creo el contenedor padre
        let father = document.createElement("div");
        //Le agrego la clase container
        father.classList.add("container");
        //Recorro el array que me han pasado
        for (const group of array) {
            //Creo el elemento que va a tener la lista de valvulas
            let groupList = document.createElement("div");
            //le agrego el id que me llega desde el servidor
            groupList.setAttribute("id", group.name);
            //Recorro el array de valvulas de dicho grupo
            for (const valve of group.valves) {
                //Creo el objeto check y le paso el grupo donde va a ser anexado sus checks correspondientes
                let check = new Check(groupList);
                //Le paso el nombre y el estado del check 
                check.addCheck(valve);
            }
            //Agrego al contenedor padre el grupo
            father.appendChild(groupList)
        }

        //Agrego al body del html todo
        document.body.appendChild(father);
    }
}