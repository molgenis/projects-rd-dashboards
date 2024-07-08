"""Build instititutions dataset
# FILE: institutions.py
# AUTHOR: David Ruvolo
# CREATED: 2023-04-19
# MODIFIED: 2024-02-08
# PURPOSE: create example dataset using ROR
# STATUS: stable
# PACKAGES: **see below**
# COMMENTS: NA
"""

from os import path
import csv
import requests
import numpy as np
from datatable import dt, f, as_type


def get_institutions_by_country(countries: list = None):
    """Retrieves a all institutions in ROR for one or more countries

    :param countries: list containing one or more countries
    :type countries: str

    :returns: list of institutions
    """
    base = "https://api.ror.org/organizations"
    output = []

    session = requests.Session()

    for country in countries:
        print(f'Pulling data for {country}....')
        url = f"{base}?query.advanced=country.country_name:{country}+AND+(types:Healthcare+OR+types:Education+OR+types:Facility)"
        response = session.get(url)
        json = response.json()
        print(f"Retrieving: {json['number_of_results']} results")

        # get all pages
        rawdata = []
        pages = list(range(0, int(round(json['number_of_results'] / 20, 0))))

        for pageNum in pages:
            print(f"Retrieving data for page: {pageNum+1}")
            page_url = f"{url}&page={pageNum+1}"
            page_response = session.get(page_url)
            page_response.raise_for_status()
            if page_response:
                page_json = page_response.json()
                page_data = page_json['items']
                rawdata.extend(page_data)

        # extract row level data
        for row in rawdata:
            output.append({
                'id': row['id'],
                'name': row['name'],
                'latitude': row['addresses'][0]['lat'],
                'longitude': row['addresses'][0]['lng'],
                'city': row['addresses'][0]['city'],
                'country': row['country']['country_name'],
                'organisationType': ','.join(row['types'])
            })

    return output


if __name__ == '__main__':
    data = get_institutions_by_country(
        countries=[
            'Netherlands',
            'Germany',
            'Belgium',
            'France',
            'Luxembourg'
        ]
    )

    # create dataset for table `organisations`
    orgsDT = dt.Frame(data)[:, dt.first(f[:]), dt.by(
        f.name)][:, :, dt.sort(f.country, f.name)]

    orgsDT['codesystem'] = 'ROR'

    orgsDT['code'] = dt.Frame([
        path.basename(value) for value in orgsDT['id'].to_list()[0]
    ])

    orgsDT.names = {'id': 'ontologyTermURI'}

    # create dataset for table `dataproviders`
    providersDT = orgsDT[:, {
        'providerIdentifier': f.code, 'organisation': f.name}]

    providersDT['hasSubmittedData'] = dt.Frame(
        np.random.choice([True, False], size=providersDT.nrows, p=[0.35, 0.65])
    )

    providersDT['hasSubmittedData'] = providersDT[
        :, as_type(f.hasSubmittedData, dt.Type.str32)
    ]

    orgsDT.to_pandas() \
        .to_csv(
        'dist/organisations.csv',
        quoting=csv.QUOTE_NONNUMERIC,
        encoding='utf-8'
    )

    providersDT.to_pandas() \
        .to_csv(
        'dist/dataproviders.csv',
        quoting=csv.QUOTE_NONNUMERIC,
        encoding='utf-8'
    )
