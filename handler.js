const utils = require('./utils')

const responseBuilder = (code, message) => ({
  statusCode: code,
  body: JSON.stringify(message),
})

module.exports.updateCatalogue = async (json) => {
  try {
    json = require('./payloads/syndigo-example-payload.json')
    await utils.processProducts(json)
    return responseBuilder(200, 'OK')
  } catch (e) {
    return responseBuilder(500, e)
  }
}
