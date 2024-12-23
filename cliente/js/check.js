import { ServiceClient } from "./ServiceClient.js";
// This class creates the check in the specific parent
export class Check {
    constructor(groupList, client) {
        // Pass the group where it should be attached upon addition (addCheck)
        this.groupList = groupList;
        // this.client = client;

        this.states = [];
    }

    changeValue(id, status) {
        // Searches within the 'states' array of Check for a valve whose ID matches the valve being processed
        // Now, the method needs to be passed the ID of the object to find it, as well as its current status.
        /* Why is only the obtained object modified and not the object within the 'this.states' array?
           The logic is to improve efficiency; 'this.states' is an array that changes every time the page is reloaded.
           Imagine having a 'this.states' array with about 700 valves. Would you iterate through all of them 
           to find the one by its ID and then change its status? No, this approach has severe performance issues 
           because if the user is the typical "troublemaker" and presses the valve 30 times per second, 
           you would be performing over 2000 operations per second in the array nonstop, severely reducing performance. 
           Instead, the object is located, and once found, its state is modified and sent to the server 
           rather than iterating through the array to modify it and then send it.
        */

        const data = this.states.find((item) => item.id == id);
        data.state = status;
        // Add the 'group' property containing the ID of the group where the valve is located
        data.group = this.groupList.id;
        ServiceClient.sendCheckStatus(data);
    }

    // Adds the check-buttons to the group
    // Change the parameter to directly receive the valve object instead of its properties one by one
    addCheck(valve) {
        // Pass the status that the check should have; this status is fetched from the server
        // Create a variable containing the name and state of the check-button
        this.states.push({
            id: valve.id,
            name: valve.name,
            state: valve.status
        });
        // Create the label element, add the 'form-switch' class to it, and append it to the parent
        const check = document.createElement("label");
        check.classList.add("form-switch");
        this.groupList.appendChild(check);

        // Create the input, set its type to 'checkbox,' and append it to the parent
        const input = document.createElement("input");
        input.setAttribute("id", valve.id);
        input.setAttribute('type', 'checkbox');
        // Change its state according to the state sent by the server
        input.checked = valve.status;
        check.appendChild(input);

        // Add the 'i' tag as well
        check.appendChild(document.createElement("i"));

        /* Create the 'span' object and store its reference.
           The exercise requires modifying the text in the 'span.' 
           Since we already have the reference to the 'span' object, we can use this reference 
           in the change listener to check the state every time it changes and, based on the state, 
           use the reference to update the text depending on whether it is on or off.
        */

        const span = document.createElement('span');
        // Change the text of the span depending on its initial state
        valve.status ? span.innerHTML = "ON" : span.innerHTML = "OFF";
        check.appendChild(span);
        input.addEventListener('change', (event) => {

            // Use ternary syntax to save code compared to if-else, etc.
            /* How does ternary syntax work?
               Ternary syntax works roughly as follows:
               boolean ? firstValueToModify : secondValueToModify

               What does this syntax mean?

               The '?' represents a variable value between two cases.
               'firstValueToModify' is what we want in case of TRUE.
               'secondValueToModify' is what we want in case of FALSE.
            */
            event.target.checked ? span.innerHTML = "ON" : span.innerHTML = "OFF";   
            // Change the state of the valve on which the event was applied
            // Pass the ID of the valve
            this.changeValue(event.target.id, event.target.checked);
        });
    }
}
