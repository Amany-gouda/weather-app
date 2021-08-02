
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();

/////////////////////////////////////////////////////////////////////////////////////////
const baseUrl="https://api.openweathermap.org/data/2.5/weather?zip=" //API call by zip code
const APIkey="&appid=b2d29121fc990e2ec3960959dd05f670"      //api key 
const userZipCode=document.getElementById("zip");    //to get the user zip code 
const userResponse=document.getElementById("feelings"); //get the text area element 
const generateBTN=document.getElementById("generate");     //get the button with the id generate 

generateBTN.addEventListener("click",(event)=>{       //add event listener to the generate button 
    getTemp(baseUrl,userZipCode.value,APIkey)        //calling the getTemp function 
    .then(data=>{            //if the data successfully received 
        postData("/addData",{temp:data.main.temp,date:newDate,feelings:userResponse.value}); /*calling the postData function the first
                                                                                              parameter is the url to make post to
                                                                                              the seconde parameter is the object holding 
                                                                                              the data to post*/
    })
    .then(
        updateUI()
    )
    
});
/////////////////////////////// Asynchronous get function ////////////////////////////////////////
const getTemp=async(baseUrl,zip,key)=>{       //Async get request to make a get request to the OpenWeatherMap API.
    const res =await fetch(baseUrl+zip+key); //build the url in the fetch call 
    try {
        const data=await res.json();   
        return data;
        
    }
    catch(error){                 //catch if any error occured
        console.log("error",error);
    }
}
/////////////////////////////////  Asynchronous post function ////////////////////////////////////////////////
const postData=async(url="",data={})=>{  // a POST request to add the API data and the data entered by the user
    const res=await fetch(url,{
        method:"post",
        credentials:"same-origin",
        headers:{"content-type":"application/json"},
        body:JSON.stringify(data), //to convert the data from json to string 

    });
    try{
        const newData=await res.json();
        return newData;
    }
    catch(error){
          console.log("error",error);
    }
    
}
////////////////////////////////// update the UI dynamically ///////////////////////////////////
const dateElement=document.getElementById("date");
const tempElement=document.getElementById("temp");
const contentElement=document.getElementById("content");

const updateUI=async ()=>{
    const req=await fetch("/all")
    try{
        const comingData=await req.json();
        dateElement.innerHTML=comingData.date;
        tempElement.innerHTML=comingData.temp;
        contentElement.innerHTML=comingData.feelings;

    }
    catch(error){
        console.log("error",error);
    }
}