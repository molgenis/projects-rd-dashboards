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

// Remove Null Object Keys
// Remove all null keys from an object. This is the first step in preparing
// filters for a Molgenis DataExplorer URL
//
// @param data an object containing one or more Null keys
//
// @examples
// const filters = {
//   gender: 'female',
//   age: null,
//   country: 'Netherlands'
//   group: null
// }
// removeNullObjectKeys(filters)
// > { gender: 'female', country: 'Netherlands' }
//
// @return object
export function removeNullObjectKeys (data) {
  const filters = data
  Object.keys(filters).forEach(key => {
    if (filters[key] === null || filters[key] === '') {
      delete filters[key]
    }
  })
  return filters
}

// Object To Url Filter Array
// Object containing  to an array of strings (in Molgenis format). Any value
// that is a comma-separated string, will be formatted accordingly
//
// @param object an object containing one more valid keys
//
// @examples
// const filters = {
//   gender: 'female',
//   age: null,
//   country: 'Australia, New Zealand'
//   group: null
// }
// const f = removeNullObjectKeys(filters)
// objectToUrlFilterArray(f)
// > ['gender==female', 'country=in=(Australia,New Zealand)']
//
// @return array of strings
export function objectToUrlFilterArray (object) {
  const urlFilter = []
  Object.keys(object).forEach(key => {
    let filter = null
    let value = object[key].trim().replaceAll(', ', ',')
    if (value[value.length - 1] === ',') {
      value = value.slice(0, value.length - 1)
    }
    if (key.includes('.')) {
      if (value.includes(',')) {
        const indexFilters = value.split(',').map(val => `${key}=q=${val}`)
        filter = `(${indexFilters})`
      } else {
        filter = `${key}=q=${value}`
      }
    } else {
      if (value.includes(',')) {
        filter = `${key}=in=(${value})`
      } else {
        filter = `${key}==${value}`
      }
    }
    urlFilter.push(filter)
  })
  return urlFilter
}

// setDataExplorerUrl
// Create full URL with filters
//
// @param entity EMX table location as <package>_<entity>
// @param array an array of filters (i.e., output of objectToUrlFilterArray)
//
// @examples
// const userInputs = {
//   gender: 'female',
//   age: null,
//   country: 'Australia, New Zealand'
//   group: null
// }
// const filters = removeNullObjectKeys(userInputs)
// const filterArray = objectToUrlFilterArray(filters)
// setDataExplorerUrl('database_table', filterArray)

export function setDataExplorerUrl(entity, array) {
  const filters = array.join(';')
  const filtersEncoded = encodeURIComponent(filters)
  const baseUrl = `/menu/plugins/dataexplorer?entity=${entity}&mod=data&hideselect=true`
  const url = baseUrl + '&filter=' + filtersEncoded
  return url
}