/* Global Variables */

const { json } = require("body-parser");

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

const postData=async(url="",data={})=>{
    const response=await fetch(url,{
        method:"post",
        credentials:"same-origin",
        headers:{"content-type":"application/json"},
        body:json.stringify(data),

    });
    try{
        const newData=await response.json();
        return newData;
    }
    catch(error){
          console.log("error",error);
    }
    
}
postData("/add",{temp:9,date:newDate,userResponse:"feelings"});