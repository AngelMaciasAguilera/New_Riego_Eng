import { Check } from "./check.js";
/* This constant will handle rendering and managing the entire user interface */
export const UI = {
    // This method receives the array returned by the server and handles rendering it for the user
    draw: (array) => {
        // Create the parent container
        let father = document.createElement("div");
        // Add the 'container' class
        father.classList.add("container");
        // Iterate through the array that was passed
        for (const group of array) {
            // Create the element that will contain the list of valves
            let groupList = document.createElement("div");
            // Add the ID received from the server
            groupList.setAttribute("id", group.name);
            // Iterate through the valves array of the group
            for (const valve of group.valves) {
                // Create the 'Check' object and pass the group where its corresponding checks will be attached
                let check = new Check(groupList);
                // Pass the name and state of the check
                check.addCheck(valve);
            }
            // Add the group to the parent container
            father.appendChild(groupList);
        }

        // Append everything to the HTML body
        document.body.appendChild(father);
    }
}
