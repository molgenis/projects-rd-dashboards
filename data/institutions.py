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

from data.molgenis2 import Molgenis
from dotenv import load_dotenv
from datatable import dt, f
from os import environ
import requests
load_dotenv()

# get response and page numbers
base = "https://api.ror.org/organizations"
url = f"{base}?query.advanced=country.country_name:Netherlands+AND+(types:Healthcare+OR+types:Education+OR+types:Facility)"
response = requests.get(url)
json = response.json()
json['number_of_results']

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
data = []
for row in rawdata:
  data.append({
    'id': row['id'],
    'name': row['name'],
    'lat': row['addresses'][0]['lat'],
    'lng': row['addresses'][0]['lng'],
    'city': row['addresses'][0]['city'],
    'province': row['addresses'][0]['geonames_city']['nuts_level2']['name'],
    'type': ','.join(row['types'])
  })

# prep and import
locationsDT = dt.Frame(data)
locationsDT['province'] = dt.Frame([
  value.replace('(NL)','').strip() if value else value
  for value in locationsDT['province'].to_list()[0]
])


db = Molgenis(environ['MOLGENIS_PROD_HOST'])
db.login(environ['MOLGENIS_PROD_USR'], environ['MOLGENIS_PROD_PWD'])

db.importDatatableAsCsv(
  pkg_entity='rdcomponents_institutions',
  data=locationsDT
)
