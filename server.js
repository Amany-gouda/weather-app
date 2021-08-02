// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express=require("express");

// Start up an instance of app
const app=express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser=require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors=require("cors");
app.use(cors());
// Initialize the main project folder
app.use(express.static('website')); //to connect the 

// Setup Server
const port= 3000;    //the server is running on port 3000
const server=app.listen(port,()=>{                  // to make the server running 
    console.log(`server running on localhost:${port}`); //feedback that the server is running 
}
);

app.get(("/all"),(req,res)=>{       //getting all the data from the server
    res.send(projectData);
    console.log(projectData);
});

app.post(("/addData"),(req,res)=>{    //post the data comming from the client side to the server
    newData={                  //new data coming from the apps
        temp:req.body.temp,    //the temp we get from the api of OpenWeatherMap.com  
        date:req.body.date,   
        feelings:req.body.feelings // the feelings of the user 
    }
    projectData=newData;    //put all of these data into the projectData object
});