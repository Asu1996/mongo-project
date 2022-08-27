const axios = require('axios').default

const baseUrl = `https://data.mongodb-api.com/app/data-qmasp/endpoint/data/v1`
const dbParams = {
  dataSource: 'Cluster0',
  database: 'Shop'
}

const reqHeaders = {
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Request-Headers': '*',
        'api-key': '5xws7R6JkpRuoInYvwDVLcp1KFm9HH55sSbgj1DZgOr2Y1AewgKgiNAkcg6FZhpn'
    }
}

const addItem = async (collection, data) => {
  const insertUrl = `${baseUrl}/action/insertOne`
  const reqData = { ...dbParams, collection, document: data }
  await axios.post(insertUrl, reqData, reqHeaders)
}

const findMany = async (collection, condition) => {
  const findUrl = `${baseUrl}/action/find`
  const reqData = { ...dbParams, collection, filter: condition }
  const { data: { documents } } = await axios.post(findUrl, reqData, reqHeaders)
  return documents;
}

const findItem = async (collection, condition) => {
  const findUrl = `${baseUrl}/action/findOne`
  const reqData = { ...dbParams, collection, filter: condition }
  const { data: { document } } = await axios.post(findUrl, reqData, reqHeaders)
  return document;
}

const updateItem = async (collection, condition, update) => {
  const updateUrl = `${baseUrl}/action/updateOne`
  const reqData = { ...dbParams, collection, filter: condition, update: { '$set': update } }
  await axios.post(updateUrl, reqData, reqHeaders)
}

module.exports = { addItem, findItem, updateItem, findMany }
