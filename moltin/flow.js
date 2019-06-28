const exports = module.exports = {}

const { MoltinClient } = require('@moltin/request')

const client = new MoltinClient({
  client_id: process.env.MOLTIN_CLIENT_ID,
  client_secret: process.env.MOLTIN_CLIENT_SECRET,
})

const productFlowID = '829e9379-3673-49b7-a596-64a091da7d50'

exports.createField = async fieldName => new Promise(async (resolve, reject) => {
  try {
    const payload = {
      type: 'field',
      field_type: 'string',
      slug: fieldName.replace(/[^A-Z0-9]/gi, '_'),
      name: fieldName,
      description: fieldName,
      required: false,
      omit_null: false,
      unique: false,
      relationships: {
        flow: {
          data: {
            type: 'flow',
            id: productFlowID,
          },
        },
      },
    }
    await client.post('fields', payload)
    resolve()
  } catch (e) {
    reject(e)
  }
})
