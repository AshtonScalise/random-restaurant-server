const stdin = process.openStdin();
const express = require("express");
const axios = require("axios");
const cors = require("cors");
const zipcodes = require("zipcodes");
const bodyParser = require("body-parser");
const { token } = require("./api");

const app = express();
const port = 5000;

var result;

async function getYelp(zip) {
  var location = await zipcodes.lookup(zip);
  var latitude = location.latitude;
  var longitude = location.longitude;
  var radius = 5000;
  var myUrl = `https://api.yelp.com/v3/businesses/search?term=food&latitude=${latitude}&longitude=${longitude}&radius=${radius}&limit=50`;

  const response = await axios({
    method: "get",
    url: myUrl,
    headers: { Authorization: `Bearer ${token}` }
  });
  let restaurants = [];

  try {
    for (let i = 0; i < response.data.total; i++) {
      restaurants.push(response.data.businesses[i].name);
    }
  } catch (e) {}
  let randomInt = getRandomInt(response.data.total - 1);

  try {
    result = restaurants[randomInt];
  } catch (e) {}
}

function getRandomInt(max) {
  max > 50 ? (max = 50) : (max = max);
  return Math.floor(Math.random() * Math.floor(max));
}

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post("/send", async (req, res) => {
  await getYelp(req.body.zip);
  res.send(result);
});

app.listen(port, () => console.log(`listening on port${port}...`));

/*process.stdout.write('enter your zipcode: ')

stdin.addListener('data', text => {
  const consoleZip = text.toString().trim()

  stdin.pause() // stop reading
  getYelp(consoleZip);
})*/
