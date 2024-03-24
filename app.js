const express = require ("express")
const cors = require("cors");
const app = express()
const MapboxApi = require("./models/mapboxApi")
const TomorrowApi = require("./models/tomorrowApi")

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}))


app.get("/map/suggestions", async function (req,res,next){
    //get a list of locations around the world that matches search 
    try{
        const {search} = req.query
        const suggestions = await MapboxApi.getSuggestions(search)
        return res.json({suggestions})
    }catch(e){
        return next(e)
    }
})

app.get("/map/:locationID", async function (req,res,next){
    // get coordinates by location id  
    try{
        const locationID = req.params.locationID
        const coordinates = await MapboxApi.getCoordinates(locationID)
        return res.json({coordinates})
    }catch(e){
        return next(e)
    }
})

app.get("/weather/forecast", async function (req,res,next){
    // get weather forecast for specified coordinates
    try{
        const {lat,lng} = req.query
        const forecast= await TomorrowApi.getWeatherForecast(lat,lng)
        return res.json({forecast})
    }catch(e){
        return next(e)
    }
})

app.get("/weather/codes/:code", function (req,res){
    // get weather condition by weather code
    try{
        const code = Number(req.params.code)
        if (code <10){
            const precipitation =TomorrowApi.convertPrecipitationCode(code)
            return res.send(precipitation)
        }
        const weatherCondition=TomorrowApi.convertWeatherCode(code)
        return res.send(weatherCondition)
    }catch(e){
        return next(e)
    }
})


app.use(function (err, req, res, next) {
    if (process.env.NODE_ENV !== "test") console.error(err.stack);
    const status = err.status || 500;
    const message = err.message;
  
    return res.status(status).json({
      error: { message, status },
    });
  });

module.exports = app;