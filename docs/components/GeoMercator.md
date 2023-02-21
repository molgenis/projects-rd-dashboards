# GeoMercator

Create a point location visualation using a geomercator map from the D3 library. Each point represents a unique location in the dataset. 

## Props

<!-- @vuese:GeoMercator:props:start -->
|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|chartId|a unique identifier for the map|`String`|`true`|-|
|geojson|reference dataset for the base layer|`Object`|`true`|-|
|chartData|the dataset containing all locations and coordinates|`Array`|`true`|-|
|rowId|the column containing the identifiers of each location|`String`|`true`|-|
|latitude|the name of the column containing the latitudes|`String`|`true`|-|
|longitude|the name of the column containing the longitude|`String`|`true`|-|
|groupingVariable|the name of the column containing grouping information (i.e., how locations are related, categorised, etc.)|`String`|`false`|-|
|groupColorMappings|if grouping variable is supplied, color mappings can also be added here. Input must be an object that maps each unique group to a colour.|`Object`|`false`|-|
|chartWidth|set the width of a chart|`Number`|`false`|`500`|
|chartHeight|set the height of the chart|`Number`|`false`|`500`|
|mapCenter|the point (lat, long) to the center map|`Object`|`false`|`{latitude: 3.55, longitude: 47.55 }`|
|chartSize|control the size of the chart|`Number`|`false`|`700`|
|chartScale|set the scale of the chart|`Number`|`false`|`1.1`|
|pointRadius|set the radius of the points|`Number`|`false`|`6`|
|legendLabels|set the labels in the chart legend|`Array`|`false`|-|
|legendColors|set the color of the labels in the chart legend|`Array`|`false`|-|
|showTooltip|If true (default), a tool will be displayed when hovering over a point|`Boolean`|`false`|`true`|
|tooltipTemplate|A function that controls the HTML content in the tooltip. The name of the point is always displayed. However, you may specify the content in the body of the tooltip. The default text is: `<row-id>: <latitude>, <longitude>`. To modify the content, pass define a new function. Row-level data can be accessed by supplying `row` in the function. E.g., `(row) { return ...}`.|`Function`|`false`|`<p>${row[this.rowId]}: ${row[this.latitude]}, ${row[this.longitude]}</p>`|
|enableZoom|If true (default), the map can be zoomed in and out|`Boolean`|`false`|true|
|mapColors|Set the colors of the land, borders, and water|`Object`|`false`|`{land: '#4E5327', border: '#757D3B', water: '#6C85B5'}`|

<!-- @vuese:GeoMercator:props:end -->


