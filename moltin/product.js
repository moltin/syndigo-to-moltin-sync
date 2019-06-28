const exports = module.exports = {}

const { MoltinClient } = require('@moltin/request')

const client = new MoltinClient({
  client_id: process.env.MOLTIN_CLIENT_ID,
  client_secret: process.env.MOLTIN_CLIENT_SECRET,
})

exports.update = async (id, payload) => new Promise(async (resolve, reject) => {
  try {
    await client.put(`products/${id}`, payload)
    resolve()
  } catch (e) {
    reject(e)
  }
})

exports.getAttributes = async () => new Promise(async (resolve, reject) => {
  try {
    const attributes = await client.get('products/attributes')
    resolve(attributes)
  } catch (e) {
    reject(e)
  }
})
