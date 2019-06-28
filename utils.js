const exports = module.exports = {}
const moltinProduct = require('./moltin/product')
const moltinFlow = require('./moltin/flow')

const parseFlowData = async (json) => {
  const allowed = ['id', 'name', 'sku', 'description', 'manage_stock', 'slug']

  const flowData = Object.keys(json)
    .filter(key => !allowed.includes(key))
    .reduce((obj, key) => {
      obj[key] = json[key]
      return obj
    }, {})

  return flowData
}

const parseCoreData = async (json) => {
  const allowed = ['id', 'name', 'sku', 'description', 'manage_stock', 'slug']

  const coreData = Object.keys(json)
    .filter(key => allowed.includes(key))
    .reduce((obj, key) => {
      obj[key] = json[key]
      return obj
    }, {})

  return coreData
}

buildProductPayload = async (product) => {
  let payload = {}

  for (const attributeSet of product.Values) {
    if (attributeSet.Value === 'moltin_product_id') {
      attributeSet.Attribute = 'id'
    }

    const newfieldValuePair = buildKeyValuePair(attributeSet)
    const newFieldValuePairs = Object.assign(payload, newfieldValuePair)
    payload = newFieldValuePairs
  }

  return payload
}

buildKeyValuePair = (object) => {
  const field = object.Attribute
  const value = object.Value

  return {
    [field]: value,
  }
}

exports.processProducts = async (json) => {
  const attributesArray = await checkProductAttributes()

  for (const product of json) {
    // Find the Moltin product ID
    const IdObject = await product.Values.find(attributeSet => attributeSet.Attribute === 'Moltin Product ID')
    const ID = IdObject.Value

    // Build the update payload
    const payload = await buildProductPayload(product)

    // Seperate the core Moltin fields and any Moltin flow fields
    const coreData = await parseCoreData(payload)
    const flowData = await parseFlowData(payload)

    // Check if any new fields need to be created
    const analyseMoltinFlowDataResult = await analyseMoltinFlowData(flowData, attributesArray)
    const newFieldsCreated = []

    if (analyseMoltinFlowDataResult.length > 0) {
      for (const field of analyseMoltinFlowDataResult) {
        if (!newFieldsCreated.some(el => el === field)) {
          try {
            await moltinFlow.createField(field)
            newFieldsCreated.push(field)
          } catch (e) {
            console.log(e)
          }
        }
      }
    }

    const fullPayload = Object.assign({ id: ID, type: 'product' }, payload)
    await moltinProduct.update(ID, fullPayload)
  }
}

const checkProductAttributes = async () => {
  const attributes = await moltinProduct.getAttributes()
  return attributes.data
}

const analyseMoltinFlowData = async (flowData, attributesArray) => {
  const results = []

  const simplifiedFlowData = Object.keys(flowData)
  const simplifiedAttributesArray = attributesArray.map(attribute => (attribute.label))

  for (const field of simplifiedFlowData) {
    if (!simplifiedAttributesArray.some(el => el === field)) {
      results.push(field)
    }
  }
  return results
}
