# VizGeoMercator

## Props

<!-- @vuese:VizGeoMercator:props:start -->
|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|chartId|-|`String`|`true`|-|
|geojson|-|`Object`|`true`|-|
|chartData|-|`Array`|`true`|-|
|rowId|-|`String`|`true`|-|
|latitude|-|`String`|`true`|-|
|longitude|-|`String`|`true`|-|
|groupingVariable|-|`String`|`false`|-|
|groupColorMappings|-|`Object`|`false`|-|
|chartWidth|-|`Number`|`false`|500|
|chartHeight|-|`Number`|`false`|500|
|mapCenter|-|`Object`|`false`|{"latitude":3.55,"longitude":47.55}|
|chartSize|-|`Number`|`false`|700|
|chartScale|-|`Number`|`false`|1.1|
|pointRadius|-|`Number`|`false`|6|
|legendLabels|-|`Array`|`false`|-|
|legendColors|-|`Array`|`false`|-|
|showTooltip|-|`Boolean`|`false`|true|
|tooltipTemplate|-|`Function`|`false`|default(row) {
  return `<p>${row[this.rowId]}: ${row[this.latitude]}, ${row[this.longitude]}</p>`;
}|
|enableZoom|-|`Boolean`|`false`|true|
|mapColors|-|`Object`|`false`|{"land":"#4E5327","border":"#757D3B","water":"#6C85B5"}|

<!-- @vuese:VizGeoMercator:props:end -->


