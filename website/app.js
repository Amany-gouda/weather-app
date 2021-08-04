
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();

/////////////////////////////////////////////////////////////////////////////////////////
const baseUrl="https://api.openweathermap.org/data/2.5/weather?units=metric&zip=" //API call by zip code
const APIkey="&appid=b2d29121fc990e2ec3960959dd05f670"      //api key 
const userZipCode=document.getElementById("zip");    //to get the user zip code 
const userResponse=document.getElementById("feelings"); //get the text area element 
const generateBTN=document.getElementById("generate");     //get the button with the id generate 

generateBTN.addEventListener("click",()=>{       //add event listener to the generate button 
    getTemp(baseUrl,userZipCode.value,APIkey)        //calling the getTemp function
    
    
    .then(data=>{ 
                   //if the data successfully received
        if (userZipCode.value===""){alert("pleaze enter your zip code first!")}; //alert if the user didn't enter the zip code
         postData("/addData",{temp:data.main.temp,date:newDate,feelings:userResponse.value}); /*calling the postData function the first
                                                                                             parameter is the url to make post to,
                                                                                             the seconde parameter is the object holding 
                                                                                              the data to post*/
         updateUI() //calling the updateUI function 
         console.log(data);  
    })
    
    
});
/////////////////////////////// Asynchronous get function ////////////////////////////////////////
const getTemp=async(baseUrl,zip,key)=>{       //Async get request to make a get request to the OpenWeatherMap API.
    const res =await fetch(baseUrl+zip+key); //build the url in the fetch call 
    try {                                 
        const data=await res.json();   //convert the response from json to javascript object
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
        console.log(newData);
        return newData;
    }
    catch(error){
          console.log("error",error);
    }
    
}
////////////////////////////////// update the UI dynamically ///////////////////////////////////
const dateElement=document.getElementById("date");  //get the div it's id is date which contains the new data about date
const tempElement=document.getElementById("temp");  //get the div it's id is temp which contains the new data about temp
const contentElement=document.getElementById("content"); //get the div it's id is content which contains the new data about the user feeling

const updateUI=async ()=>{    //async function to update the UI with the new data coming from the weather API and the data entered by the user
    const req=await fetch("/all")  //fetch the data 
    try{
        const comingData=await req.json();
        dateElement.innerHTML=`<i class="fas fa-calendar-day"></i>${comingData.date}`; //update the element by the new date and adding an icon to this element
        tempElement.innerHTML= `<i class="fas fa-temperature-high"></i> ${comingData.temp}°C`;//update the element by the temp coming from the weather API and adding an icon to this element
        contentElement.innerHTML=`<i class="fas fa-comment-dots"></i>${comingData.feelings}`;//update the element by the user feelings  and adding an icon to this element

    }
    catch(error){  //in case if any error occured
        console.log("error",error);
        
    }
}