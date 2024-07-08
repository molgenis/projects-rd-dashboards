"""Generate lookup table for tags"""

from os.path import basename
import requests
from datatable import dt, f
from tqdm import tqdm

session = requests.Session()

response = session.get(
    'https://raw.githubusercontent.com/terms4fairskills/FAIRterminology/master/t4fs-community.json')


data = response.json()

# extract and compile metadata per term
nodes = []
for node in tqdm(data['graphs'][0]['nodes']):
    if node['type'] == 'CLASS' and 'T4FS' in node['id']:
        node_data = {
            'name': node['lbl'],
            'ontologyTermURI': node['id'],
            'code': basename(node['id']),
            'codesystem': basename(node['id']).split('_')[0],
            'definition': node.get('meta', {}).get('definition', {}).get('val')
        }
        nodes.append(node_data)

nodes_dt = dt.Frame(nodes)

# extract and compile edges
edges_dt = dt.Frame(data['graphs'][0]['edges'])[f.pred == 'is_a', :]


node_codes = nodes_dt[:, ['code', 'name']].to_tuples()
for row in node_codes:
    code = row[0]
    name = row[1]

    children = edges_dt[dt.re.match(f.obj, f".*{code}.*"), :]
    if children.nrows > 0:
        for child in children['sub'].to_list()[0]:
            nodes_dt[f.ontologyTermURI == child, 'parent'] = name

# edges_dt[dt.re.match(f.obj, '.*T4FS_0000012.*'), :]
# edges_dt[dt.re.match(f.obj, '.*T4FS_0000021.*'), :]
nodes_dt[f.parent == 'data stewardship activity', :]
