const express=require("express");
const app=express();
const https =require("https");
const bodyParser=require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function (req , res) {
    res.sendFile(__dirname+"/index.html");
})

app.post("/",function(req, res) {
    const que=req.body.CityName;
const apikey="???";
const uni="metric";
const url="https://api.openweathermap.org/data/2.5/weather?q="+que+"&appid="+apikey+"&units="+uni;

https.get(url,function (resp) {
   console.log(resp.statusCode);
   resp.on("data",function(data) {
    const wheatherd=JSON.parse(data);
    const temperature=wheatherd.main.temp;
    const wdscp=wheatherd.weather[0].description;
    const icn=wheatherd.weather[0].icon;
    const imgurl="https://openweathermap.org/img/wn/"+icn+"@2x.png";
    res.write("<h1>The tempreature in "+que+" is "+ temperature+ " degree Celcius</h1>");
    res.write("<p>The weather in "+que+" is "+wdscp+".</p>");
    res.write("<img src="+imgurl+">");
    res.send();
   })
})
    
})









app.listen(3000, function() {
    console.log("activated");
})