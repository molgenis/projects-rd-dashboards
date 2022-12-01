// fetchData
// retrive data from a given endpoint
//
// @param url string to an API endoint
//
// @return json
export async function fetchData (url) {
  const response = await fetch(url)
  if (response.status / 100 !== 2) {
    const error = JSON.stringify({
      message: response.statusText,
      status: response.status,
      url: response.url
    })
    throw new Error(error)
  }
  return response.json()
}

// asDataObject
// Transform a dataset (i.e., array of objects) to an key-value object
// This is useful for preparing data for d3 visualisations such as pie charts
//
// @param data an array of objects
// @param key the property that contains an ID which values will be mapped to
// @param value property that will be mapped to the ID
//
// @examples
// data = [{'id': 'A1234', 'value': 123}, {'id': 'B1234', 'value': 634}]
// asDataObject(data, 'id', 'value')
// // {'A1234': 1234, 'B1234': 634}
//
// @return object
export function asDataObject (data, key, value) {
  const newDataObject = {}
  data.forEach(row => { newDataObject[row[key]] = row[value] })
  return newDataObject
}

// renameKey
// Rename a property in a dataset (i.e., array of objects)
//
// @param data an array of objects
// @param oldKey name of the property to rename
// @param newKey name to substitute
//
// @param an array of objects
export function renameKey (data, oldKey, newKey) {
  data.forEach(row => delete Object.assign(row, { [newKey]: row[oldKey] })[oldKey])
}

// Sort Data
// Sort an dataset (array of objects) by a specific property
//
// @param data an array of objects
// @param column column to sort by
export function sortData (data, column) {
  return data.sort((current, next) => {
    return current[column] < next[column] ? -1 : 1
  })
}

// subset data
// Select rows in dataset by value
//
// @param data an array of objects
// @param column column to search in
// @param value value to select rows by
//
// @return an array of objects
export function subsetData (data, column, value) {
  return data.filter(row => row[column] === value)
}