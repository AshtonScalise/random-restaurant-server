const stdin = process.openStdin()
const express = require("express")
var axios = require("axios")
var zipcodes = require("zipcodes")
const { token } = require('./api')

const app = express()
const port = 5000

const myToken = token

async function getYelp(zip){
    
    var chosenZipcode = zip
    var location = await zipcodes.lookup(chosenZipcode);
    var latitude = location.latitude
    var longitude = location.longitude
    var radius = 5000 
    var myUrl = `https://api.yelp.com/v3/businesses/search?term=food&latitude=${latitude}&longitude=${longitude}&radius=${radius}&limit=50`


    const response = await axios({
        method: "get",
        url: myUrl,
        headers:{ Authorization: `Bearer ${myToken}`}
    })

    let restaurants = []

        for(let i = 0; i < response.data.total; i++){
            restaurants.push(response.data.businesses[i].name)    

        }
    let randomInt = getRandomInt(response.data.total-1)

    console.log(restaurants[randomInt])

}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }


//app.listen(port, ()=> console.log(`listening on port${port}...`))

process.stdout.write('enter your zipcode: ')

stdin.addListener('data', text => {
  const consoleZip = text.toString().trim()

  stdin.pause() // stop reading
  getYelp(consoleZip);
})