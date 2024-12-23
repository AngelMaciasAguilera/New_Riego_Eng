/* This constant will be a singleton object to handle the connection with the server.
   It will also be responsible for sending and receiving data, processing it, and 
   "serving" the client with what it requests or needs.
*/
export const ServiceClient = {
    url: "",
    // In this method, I pass the server's URL and the function I want to execute when everything goes well.
    getChecksServed: (url, callback) => {
        // I do this to save the server URL for future use.
        // This way, I avoid requiring the user to repeatedly input the URL.
        // Simply capture the server URL the first time it is called and reuse it in future needs.
        ServiceClient.url = url;
        fetch(url).then(
            async (array) => {
                let myarray = await array.json();
                // Pass the array with the valves to the callback function.
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
