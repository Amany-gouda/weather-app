# Weather-Journal App Project
##introduction
this weather journal app used to give the user data about the current temprature ,the date and the feelings of the user.
##Instructions
###server side
* first i build the server by installing the  **node** and **Express** then the **cors** and **body-parser** packages then include these packages in server.js file.
 * then running the server using app.listen 
 * after that i creat a get route with a callback function to return the javascript object **projectData**.
 * then i creat a post rout receiving three pieces of data from the request body coming from the client side (temprature, date and the user response).
 ### API credentials
 Acquire API credentials from **[openweathermap](https://openweathermap.org/)**
 ### client side
 * i created a sync function using fetch to make aget request to the **OpenWeatherMap API**.
 * adding an event listener to the button with the id "generate"
 if the button clicked the callback function will execute and inside this callback function calling the async get function "getTemp()" with the parameters base url, api key and the user zip code.
* i created another async function to make a POST request to add the API data and data entered by the user
* after that i created another async function to update the UI with received data and adding some icons to these elements.
* i added some icons from **[fontawesome.com](https://fontawesome.com/v4.7/icons/)**.



