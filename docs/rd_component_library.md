# RD Component Library

Version: 0.1.0
Date Last Modified:

## Components

### Accordion

Renders a collapsible element that can be used to hide and show content.

| Property         | Description                                       | Default        | Required        | Type          |
|------------------|---------------------------------------------------|----------------|-----------------|---------------|
| id               | a unique identifier                               | ---            | true            | string        |
| title            | a title that describes the hidden content         | ---            | true            | string        |

Each accordion should have a unique identifier. All hidden content can be placed inbetween the opening and closing `<Accordion>` tag. All HTML markup is injected into a generic slot (`<slot>...</slot>`).

```js
import { Accordion } from 'rd-components'

<template>
  <Accordion id="faq-page-install" title="How do install the components library?">
    <p>The <code>rd-components</code> can be installed using....</p>
  </Accordion>
<template>
```

### ButtonSearch

Render a search button for a form. This components includes a magnifying glass icon that is rendered by default.

| Property           | Description                             | Default            | Required          | Type            |
|--------------------|-----------------------------------------|--------------------|-------------------|-----------------|
| id                 | a unique identifier                     | ---                | true              | string          |
| label              | optional label for the button           | 'Search'           | false             | string          |

By default, the label for the button is "Search". The label can be changed to anything that you would like.

```js
import { ButtonSearch } from 'rd-components'

<template>
  <form>
    ...
    <ButtonSearch id="search" label="Search database">
  </form>
</template>
```

### InputLabel

A component for rendering labels and descriptions for inputs.

| Property    | Description                                                                 | Default | Required | Type   |
|-------------|-----------------------------------------------------------------------------|---------|----------|--------|
| id          | an identifier that ties the label to the input element                      | ---     | true     | string |
| label       | a label that describes the input                                            | ---     | true     | string |
| description | optional text that describes the input (input format, example values, etc.) | ---     | false    | string |

This component is used in other input components, but it is useful if you are created custom forms, and you would like to standardize the layouts and styling. The identifier of the input label must match the identifier of the input element.

```js
import { InputLabel } from 'rd-components'

<template>
  <form>
    ...
    <InputLabel
      id="ageFilter"
      label="Filter by age"
      description=""
    />
    <input type="number" id="ageFilter" />
  </form>
</template>
```

### InputSearch

### LinkCard

### LoadingScreen

### MessageBox

### MolgenisLogo

### Page

### PageFooter

### PageFooterMeta

### PageFooterMolgenisCitation

### PageForm

### PageFormSection

### PageHeader

### PageSection

### UnorderedList

### VizColumnChart

### VizDataTable

### VizDataValueHighlights

### VizGeoMercator

### VizLegend

### VizPieChart
