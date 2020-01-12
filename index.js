var axios = require("axios")
var zipcodes = require("zipcodes")
const { token } = require('./api')

const myToken = token

async function getYelp(){
    
    var location = await zipcodes.lookup(77406);
    var latitude = location.latitude
    var longitude = location.longitude
    var myUrl = `https://api.yelp.com/v3/businesses/search?term=food&latitude=${latitude}&longitude=${longitude}&radius=5000&limit=50`


    const response = await axios({
        method: "get",
        url: myUrl,
        headers:{ Authorization: `Bearer ${myToken}`}
    })
    console.log(response)
}


getYelp();