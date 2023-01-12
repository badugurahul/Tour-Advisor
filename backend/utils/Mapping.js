const node_geocoder = require( "node-geocoder" )
const opitions = {
   provider: "mapquest",
   httpAdapter: "https",
   apiKey: "7RczKgXvfwrQ2rGPiaoU7YDaunTbfkmY",
   formatter: null
}

const geocoder = node_geocoder( opitions )

module.exports = geocoder;