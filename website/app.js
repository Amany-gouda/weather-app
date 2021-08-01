/* Global Variables */

//const { json } = require("body-parser");


// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

/////////////////////////////////////////////////////////////////////////////////////////
const baseUrl="https://api.openweathermap.org/data/2.5/weather?zip=" //API call by zip code
const APIkey="&appid=b2d29121fc990e2ec3960959dd05f670"      //api key 
const userZipCode=document.getElementById("zip");    //get the user zip cod value
const userResponse=document.getElementById("feelings");
const generateBTN=document.getElementById("generate");     //get the button with the id generate 

generateBTN.addEventListener("click",(event)=>{       //add event listener to the generate button 
    getzib(baseUrl,userZipCode.value,APIkey)
    .then(data=>{
        console.log(data.main.temp);
        console.log(newDate);
        console.log(userResponse.value);
        postData("/addData",{temp:data.main.temp,date:newDate,feelings:userResponse.value});
    })
    
});
const getzib=async(baseUrl,zip,key)=>{       //Async get request to make a get request to the OpenWeatherMap API.
    const res =await fetch(baseUrl+zip+key); //build the url in the fetch call 
    try {
        const data=await res.json();
        return data;
        
    }
    catch(error){
        console.log("error",error);
    }
}
/////////////////////////////////////////////////////////////////////////////////
const postData=async(url="",data={})=>{
    const res=await fetch(url,{
        method:"post",
        credentials:"same-origin",
        headers:{"content-type":"application/json"},
        body:JSON.stringify(data),

    });
    try{
        const newData=await res.json();
        return newData;
    }
    catch(error){
          console.log("error",error);
    }
    
}