

URL=https://browser.ihtsdotools.org/snowstorm/snomed-ct/browser/MAIN/2024-02-01/concepts

concept=$(curl "$URL/288532009" | jq '.')

data=$(echo $concept | jq '{conceptId,pt}')

echo $data

children=$(curl "https://browser.ihtsdotools.org/snowstorm/snomed-ct/browser/MAIN/2019-07-31/concepts/288532009/children?form=inferred&offset=0&limit=50" | jq '.' )

echo $children

echo $children | jq -c '.[]' | while read child; do
  child_data=$(echo $child | jq '. | {conceptId,pt}')
  child_id=$(echo $child | jq -r '.conceptId')
  
  echo $child_id
done