# ColumnChart

Create a column chart (vertical bars) where the height of a bar is corresponds to a value of a categorical variable (along the x-axis). If you have many groups, consider using the `<BarChart>` component. You may also want to combine or exclude, groups with smaller values.

## Props

<!-- @vuese:ColumnChart:props:start -->
|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|chartId|a unique ID for the chart|`String`|`true`|-|
|title|A title that describes the chart|`String`|`false`|-|
|xvar|Name of the column that contains the groups to plot along the x-axis|`String`|`true`|-|
|yvar|Name of the column that contains the values to plot along the y-axis|`String`|`true`|-|
|yMax|Specify the max value of the y-axis. If left undefined, max value will be automatically calculated using `d3.max`|`Number`|`false`|-|
|yTickValues|Specify the y-axis ticks|`Array`|`false`|-|
|xAxisLabel|A label that describes the x-axis|`String`|`false`|-|
|yAxisLabel|A label that describes the y-axis|`String`|`false`|-|
|chartData|the dataset the plot|`Array`|`true`|-|
|chartWidth|set the width of the chart|`Number`|`false`|`675`|
|chartHeight|set the height of the chart|`Number`|`false`|`425`|
|chartMargins|adjust the chart margins|`Object`|`false`|`{ top: 15, right: 0, bottom: 60, left: 60 }`|
|chartAnimate|If true, the drawing of the columns will be animated|`Boolean`|`false`|true|
|columnFill|Set the fill of all columns (hex code)|`String`|`false`|`#6C85B5`|
|columnHoverFill|Set the color that is displayed when a column is hovered (hex code)|`String`|`false`|`#163D89`|
|columnPaddingInner|Adjust the amount of blank space inbetween columns between 0 and 1|`Number`|`false`|`0.2`|
|columnPaddingOuter|Adjust the amount of blank space before the first column and after the last column. Value must be between 0 and 1|`Number`|`false`|`0.2`|
|columnAlign|Along with `columnPaddingOuter`, specify how the columns are distributed x-axis. A value of 0 will position the columns closer to the y-axis.|`Number`|`false`|`0.5`|

<!-- @vuese:ColumnChart:props:end -->


