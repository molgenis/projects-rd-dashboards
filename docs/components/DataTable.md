# DataTable

The datatable component is a D3 component that renders a dataset into a responsive, interactive table. By default, all tables are rendered with interactive features enabled (i.e., row highlighting and row clicks), but these can be disabled as needed. Column selection and order can be defined using the `columnOrder` property. This allows you to customise the layout of the table rather than processing the data beforehand. 

## Props

<!-- @vuese:DataTable:props:start -->
|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|tableId|A unique identifier for the table|`String`|`true`|-|
|data|dataset to render (array of objects)|`Array`|`true`|-|
|columnOrder|an array of column names that define the selection and order of columns|`Array`|`true`|-|
|caption|optional text that describes the table|`String`|`false`|null|
|enableRowHighlighting|If true, rows will be highlighted on mouse events|`Boolean`|`false`|true|
|enableRowClicks|If true, row clicks will return the selected row (as an object)|`Boolean`|`false`|true|

<!-- @vuese:DataTable:props:end -->


## Events

<!-- @vuese:DataTable:events:start -->
|Event Name|Description|Parameters|
|---|---|---|
|row-selection|When a row is clicked, the data is returned|-|

<!-- @vuese:DataTable:events:end -->

