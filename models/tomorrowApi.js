const axios = require("axios")
const {weatherCodes, precipitationCodes}= require("../apiWeatherCodes")
const apiKey = "aXeKJvefRTKgKe2Zg2J2ROD3GAEnsTVH"
const fields = ["temperature","windSpeed","precipitationProbability","precipitationType","weatherCode"]

class TomorrowApi {
    static async getWeatherForecast(lat,lng){
        const res = await axios.get(`https://api.tomorrow.io/v4/timelines?location=${lat},${lng}&fields=${fields}&timesteps=1d&units=imperial&apikey=${apiKey}`)
        const forcast = res.data.data.timelines[0].intervals
        return forcast
    }

    static convertWeatherCode(code){
        const weatherCondition= weatherCodes[code]
        return weatherCondition
    }
    static convertPrecipitationCode(code){
        const precipitation= precipitationCodes[code]
        return precipitation
    }
}

module.exports = TomorrowApi