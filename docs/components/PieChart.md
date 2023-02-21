# PieChart

Create a pie chart to visually display subelements of your data in relation to the entire dataset. The data should contain no more than 7 elements and all group-values pairs that are less than 1% must be combined into an "other" category. Colors should be used to highlight interesting findings rather than emphasizing groups. However, if you require a group-based color scheme, make sure colors are accessible and use a *muted* color palette. Please note that group differences can be emphasized by using on hover styling. 

## Props

<!-- @vuese:PieChart:props:start -->
|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|chartId|A unique ID for the chart|`String`|`true`|-|
|chartData|An object containing 7 or fewer group-value pairs|`Object`|`true`|-|
|chartHeight|set the height of the chart|`Number`|`false`|`300`|
|chartWidth|set the width of the chart|`Number`|`false`|`400`|
|chartMargins|set all chart margins|`Number`|`false`|`20`|
|chartColors|An object containing one-to-one mappings of groups to colors. If colors are not defined, a default palette will be chosen for you.|`Object`|`false`|null|
|animate|If True (default), the chart will render with interactive elements|`Boolean`|`false`|true|

<!-- @vuese:PieChart:props:end -->


