"""Compile lookup table from SNOMED
Adapted from https://github.com/IHTSDO/SNOMED-in-5-minutes/blob/master/python3-examples/examples.py
"""

from urllib.request import urlopen, Request
from urllib.parse import quote
import json

BASE_URL = 'https://browser.ihtsdotools.org/snowstorm/snomed-ct'
EDITION = 'MAIN'
VERSION = '2019-07-31'


def urlopen_with_header(url: str = None):
    """adds User-Agent header otherwise urlopen on its own gets an IP blocked response"""
    req = Request(url)
    req.add_header('User-Agent', 'Python3')
    return urlopen(req)


def get_concept_by_id(_id: str = None):
    """Prints fsn of a concept"""
    url = BASE_URL + '/browser/' + EDITION + '/' + VERSION + '/concepts/' + _id
    response = urlopen_with_header(url).read()
    data = json.loads(response.decode('utf-8'))

    print(data['fsn']['term'])


def get_description_by_id(_id: str = None):
    """Prints description by id"""
    url = BASE_URL + '/' + EDITION + '/' + VERSION + '/descriptions/' + _id
    response = urlopen_with_header(url).read()
    data = json.loads(response.decode('utf-8'))
    print(data['term'])


def get_concepts_by_string(search_term: str = None):
    """Prints number of concepts with descriptions containing the search term"""
    url = BASE_URL + '/browser/' + EDITION + '/' + VERSION + '/concepts?term=' + \
        quote(search_term) + '&activeFilter=true&offset=0&limit=50'
    response = urlopen_with_header(url).read()
    data = json.loads(response.decode('utf-8'))
    print(data['total'])


def get_descriptions_by_string_from_procedure(search_term: str = None, semantic_tag: str = None):
    """Prints number of descriptions containing the search term with a specific semantic tag"""
    url = BASE_URL + '/browser/' + EDITION + '/' + VERSION + '/descriptions?term=' + \
        quote(search_term) + '&conceptActive=true&semanticTag=' + quote(semantic_tag) + \
        '&groupByConcept=false&searchMode=STANDARD&offset=0&limit=50'
    response = urlopen_with_header(url).read()
    data = json.loads(response.decode('utf-8'))

    print(data['totalElements'])


def get_snomed_code_similar(search_term: str = None):
    """Prints snomed code for searched disease or symptom"""
    url = BASE_URL + '/browser/' + EDITION + '/' + VERSION + '/descriptions?term=' + \
        quote(search_term) + \
        '&conceptActive=true&groupByConcept=false&searchMode=STANDARD&offset=0&limit=50'
    response = urlopen_with_header(url).read()
    data = json.loads(response.decode('utf-8'))

    for term in data['items']:
        if search_term in term['term']:
            print(f"{term['term']} : {term['concept']['conceptId']}")


def get_snomed_code(search_term: str = None):
    """Prints...."""
    url = BASE_URL + '/browser/' + EDITION + '/' + VERSION + '/descriptions?term=' + \
        quote(search_term) + \
        '&conceptActive=true&groupByConcept=false&searchMode=STANDARD&offset=0&limit=50'
    response = urlopen_with_header(url).read()
    data = json.loads(response.decode('utf-8'))

    for term in data['items']:
        if search_term == term['term']:
            print(f"{term['term']} : {term['concept']['conceptId']}")


if __name__ == '__main__':
    get_concept_by_id('288532009')
    get_description_by_id('679406011')
    get_concepts_by_string('heart attack')
    get_descriptions_by_string_from_procedure('heart', 'procedure')
    get_snomed_code_similar('Headache')
    get_snomed_code('Bleeding from nose')
