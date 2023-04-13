
import requests
import pandas as pd

url = "https://api.ror.org/organizations?query.advanced=country.country_name:Netherlands+AND+types:Healthcare"

response = requests.get(url)
json = response.json()
data = json['items']

df = pd.DataFrame(data)

keepColumns = [
  'id',
  'name',
  'addresses'
]

for column in df.columns:
  if column not in keepColumns:
    del df[column]
    
df['lat'] = df['addresses'].apply(lambda x: x[0]['lat'])

df['lng'] = df['addresses'].apply(lambda x: x[0]['lng'])

df['city'] = df['addresses'].apply(
  lambda x: x[0]['city']
)


del df['addresses']

df.to_csv('data/institutions.csv',index=False)