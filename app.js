

const express = require("express");

const https = require("https");

const bodyParser = require("body-parser")

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
})    

app.post("/", function(req, res){
    
    const quary = req.body.cityName;
    const apiKey = "2e5c865a07c6d43bc3c8c0b953053539";
    const unit = "metric"

    const url = "https://api.openweathermap.org/data/2.5/weather?q="+ quary +"&units=" + unit + "&appid=" + apiKey;

    https.get(url, function(response){
        console.log(response.statusCode);

        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const description = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imgURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png"
            res.write("<p>The weather is currently "+ description + "</p>");
            res.write("<h1>The temperature in " + quary + " is " + temp + "degrees Celcius.</h1>");
            res.write("<img src = " + imgURL + ">");
            res.send()
        })
    })
})
app.listen(3000, function(){
    console.log("Server is running on port no: 3000.");
});
