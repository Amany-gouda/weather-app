/* Global Variables */

//const { json } = require("body-parser");
const baseUrl="api.openweathermap.org/data/2.5/weather?zip=" //API call by zip code
const APIkey="&appid=b2d29121fc990e2ec3960959dd05f670"      //api key 
const userZipCode=document.getElementById("zip").value;    //get the user zip cod value
const generateBTN=document.getElementById("generate");     //get the button with the id generate 

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();
/////////////////////////////////////////////////////////////////////////////////
const postData=async(url="/add",data={})=>{
    const response=await fetch(url,{
        method:"post",
        credentials:"same-origin",
        headers:{"content-type":"application/json"},
        body: JSON.stringify(data),

    });
    try{
        const newData=await response.json();
        return newData;
    }
    catch(error){
          console.log("error",error);
    }
    
}
/////////////////////////////////////////////////////////////////////////////////////////
generateBTN.addEventListener("click",(event)=>{       //add event listener to the generate button 
    getzib(baseUrl,userZipCode,APIkey)
});
const getzib=async(baseurl,zip,key)=>{
    const response =await fetch(baseurl+zip+key);
    try {
        const data=await response.json();
        console.log (data);
        return data;
    }
    catch(error){
        console.log("error",error);
    }
}


// postData("/add",{temp:9,date:newDate,userResponse:"feelings"});