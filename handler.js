const utils = require('./utils')

const responseBuilder = (code, message) => ({
  statusCode: code,
  body: JSON.stringify(message),
})

module.exports.updateCatalogue = async (event) => {
  try {
    let json

    if(event.body === null) {
      json = require('./payloads/syndigo-example-payload.json')
    } else {
      json = event.body
    }
    
    await utils.processProducts(json)
    return responseBuilder(200, 'OK')
  } catch (e) {
    return responseBuilder(500, e)
  }
}
