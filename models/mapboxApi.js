
const axios = require("axios")
const sessionToken = "sk.eyJ1Ijoia2luZ3Jpdjk4IiwiYSI6ImNsdDBkOTJkMTBtZWoybG1uMWM5eW5iYnEifQ.r3-4bEttlTBGJ1H1QFotuQ";
const accessToken = "pk.eyJ1Ijoia2luZ3Jpdjk4IiwiYSI6ImNsdDBkNDh5ZjB3amEyaW53MTZ4Z3d0bDIifQ.-3ym1_SfVbmLxWQCDgbobg";

class MapboxApi{

    static async getSuggestions(search){
        const res = await axios.get(`https://api.mapbox.com/search/searchbox/v1/suggest?q=${search}&language=en&types=place&limit=4&access_token=${accessToken}&session_token=${sessionToken}`)
        const suggestedLocations = res.data.suggestions
        return suggestedLocations
    }

    static async getCoordinates(locationID){
        const res = await axios.get(`https://api.mapbox.com/search/searchbox/v1/retrieve/${locationID}?session_token=${sessionToken}&access_token=${accessToken}`)
        const coordinates = res.data.features[0].geometry.coordinates
        return coordinates
    }
}

module.exports=MapboxApi