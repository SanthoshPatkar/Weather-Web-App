const { response, urlencoded } = require('express');
const express=require('express');
const bodayParser=require('body-parser');

const https = require('https');

const app=express();
app.use(bodayParser.urlencoded({extended: true}));
app.use('/style.css',express.static(__dirname + "/style.css"))

app.get('/',function(req,res) {

     res.sendFile(__dirname + "/index.html");   
});

app.post("/",function(req,res){
    const city=req.body.cityName;
    url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=68fa01478489e0586e45b1f1710ef904&units=metric";
    https.get(url, function (response) {
        response.on("data", function (data) {
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp
            const des = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageurl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
            res.write("<h1 style='text-align:center; margin-top:7%;'>The weather is " + des + "</h1>")
            res.write("<h3 style='text-align:center;' >The tempearture in " + city + " is "+temp+" degrees celcius</h3>");
            res.write("<img style='display: block; margin-left: auto; margin-right: auto' src= " + imageurl + " height='500'px width='400px' >");
            res.send();
        })
    })
})


app.listen(3000,function() {
    console.log('app is running in port 3000');
});
