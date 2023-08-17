#///////////////////////////////////////////////////////////////////////////////
# FILE: institutions.py
# AUTHOR: David Ruvolo
# CREATED: 2023-04-19
# MODIFIED: 2023-04-19
# PURPOSE: create example dataset using ROR
# STATUS: in.progress
# PACKAGES: **see below**
# COMMENTS: NA
#///////////////////////////////////////////////////////////////////////////////

from dotenv import load_dotenv
from datatable import dt, f, as_type
from os import path
import numpy as np
import requests
load_dotenv()

def retrieveInstitutionsByCountry(countries: list=[]):
  """Retrieves a all institutions in ROR for one or more countries
  
  :param countries: list containing one or more countries
  :type countries: str
  
  :returns: list of institutions
  """
  base = "https://api.ror.org/organizations"
  data = []

  for country in countries:
    print(f'Pulling data for {country}....')
    url = f"{base}?query.advanced=country.country_name:{country}+AND+(types:Healthcare+OR+types:Education+OR+types:Facility)"
    response = requests.get(url)
    json = response.json()
    print(f"Retrieving: {json['number_of_results']} results")

    # get all pages
    rawdata = []
    pages = list(range(0, int(round(json['number_of_results'] / 20, 0))))

    for pageNum in pages:
      print(f"Retrieving data for page: {pageNum+1}")
      pageUrl = f"{url}&page={pageNum+1}"
      pageResponse = requests.get(pageUrl)
      pageResponse.raise_for_status()
      if pageResponse:
        pageJson = pageResponse.json()
        pageData = pageJson['items']
        rawdata.extend(pageData)

    # extract row level data
    for row in rawdata:
      data.append({
        'id': row['id'],
        'name': row['name'],
        'lat': row['addresses'][0]['lat'],
        'lng': row['addresses'][0]['lng'],
        'city': row['addresses'][0]['city'],
        'country': row['country']['country_name'],
        'organisationType': ','.join(row['types'])
      })
    
  return data


if __name__ == '__main__':
  countries = ['Netherlands', 'Germany', 'Belgium', 'France','Luxembourg']
  data = retrieveInstitutionsByCountry(countries = countries)
  
  # create dataset for table `organisations`
  orgsDT = dt.Frame(data)[:, dt.first(f[:]), dt.by(f.id)]
  
  orgsDT['codesystem'] = 'ROR'
  
  orgsDT['code'] = dt.Frame([
    path.basename(value) for value in orgsDT['id'].to_list()[0]
  ])
  
  del orgsDT['id']
  
  
  # create dataset for table `dataproviders`
  providersDT = orgsDT[:, {'providerIdentifier': f.code, 'organisation': f.name}]
  providersDT['hasSubmittedData'] = dt.Frame(
    np.random.choice([True,False], size=providersDT.nrows, p=[0.35,0.65])
  )
  
  providersDT[:, dt.update(
    hasSubmittedData=as_type(f.hasSubmittedData, dt.Type.str32)
  )]
  
  orgsDT.to_csv('dist/organisations.csv')
  providersDT.to_csv('dist/dataproviders.csv')
