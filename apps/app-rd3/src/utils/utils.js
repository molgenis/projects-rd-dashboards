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
      message: response.status,
      status: response.status,
      url: response.url
    })
    throw new Error(error)
  }
  return response.json()
}