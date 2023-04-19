# ChartLegend

Create a legend for a visualisation for use outside the chart element. This component may be useful if you have several charts that display the same groups. 

## Props

<!-- @vuese:ChartLegend:props:start -->
|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|data|One or more key-value pairs|`Object`|`true`|-|
|stackLegend|If true (default), all legend items will be stacked|`Boolean`|`false`|true|
|enableClicks|If `true`, click events will be enabled for all bars. When a bar is clicked, the row-level data for that bar will be emitted. To access the data, use the event `@barClicked=>(value) => ...`|`Boolean`|`false`|`false`|

<!-- @vuese:ChartLegend:props:end -->


## Events

<!-- @vuese:ChartLegend:events:start -->
|Event Name|Description|Parameters|
|---|---|---|
|itemClicked|-|-|

<!-- @vuese:ChartLegend:events:end -->


