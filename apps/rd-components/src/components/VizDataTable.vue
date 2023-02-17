<template>
  <table :id="tableId" :class="tableClassNames">
    <caption v-if="caption">{{ caption }}</caption>
  </table>
</template>

<script>
import { select, selectAll } from 'd3'
const d3 = { select, selectAll }

// @displayName Datatable
// The datatable component is a D3 component that renders a dataset into a responsive, interactive table. By default, all tables are rendered with interactive features enabled (i.e., row highlighting and row clicks), but these can be disabled as needed. Column selection and order can be defined using the `columnOrder` property. This allows you to customise the layout of the table rather than processing the data beforehand.
//
export default {
  name: 'DataTable',
  props: {
    // A unique identifier for the table
    tableId: {
      type: String,
      required: true
    },
    // dataset to render (array of objects)
    data: {
      type: Array,
      required: true
    },
    // an array of column names that define the selection and order of columns
    columnOrder: {
      type: Array,
      required: true
    },
    // optional text that describes the table 
    caption: {
      type: String,
      default: null
    },
    // If true, rows will be highlighted on mouse events
    enableRowHighlighting: {
      type: Boolean,
      default: true
    },
    // If true, row clicks will return the selected row (as an object)
    enableRowClicks: {
      type: Boolean,
      default: true
    }
  },
  emits: ['row-selection'],
  computed: {
    tableClassNames () {
      const base = 'd3-viz d3-table'
      const highlighting = this.enableRowHighlighting ? 'table-row-highlighting' : ''
      return [base, highlighting].join(' ')
    }
  },
  methods: {
    dataTypeToCssClass (cell) {
      let css = `column-${cell.column} data-value`
      const type = typeof cell.value
      css += ` value-${type}`
      if (type === 'number') {
        if (cell.value > 0) {
          css += ' value-positive'
        } else if (cell.value < 0) {
          css += ' value-negative'
        } else {
          css += ' value-zero'
        }
      }
      return css
    },
    onClick (event, data) {
      const clickedRow = event.target.closest('tr')
      const selection = {
        rowIndex: parseInt(clickedRow.getAttribute('data-row-index')),
        data: data
      }
      // When a row is clicked, the data is returned
      this.$emit('row-selection', selection)
    },
    renderTable () {
      const table = d3.select(`#${this.tableId}`)
      table.selectAll('*:not(caption)').remove()
      
      const tableHeader = table.append('thead')
        .append('tr')
        .selectAll('th')
        .data(this.columnOrder)
        .enter()
        .append('th')
        .attr('role', 'columnheader')
        .attr('scope', 'col')
        .attr('data-column-index', (column, index) => index)
        .attr('data-column-name', column => column)
        .text(column => column)

      const tableBody = table.append('tbody')
        .attr('role', 'presentation')

      const tableRows = tableBody.selectAll('tr')
        .data(this.data)
        .enter()
        .append('tr')
        .attr('role', 'row')
        .attr('data-row-index', (row, index) => index)

      const tableCells = tableRows.selectAll('tr')
        .data(row => {
          return this.columnOrder.map(column => {
            return { column: column, value: row[column] }
          })
        })
        .enter()
        .append('td')
        .attr('role', 'gridcell')
        .attr('data-value', cell => cell.value)
      
      tableCells.append('span')
        .attr('class', 'cell-colname')
        .attr('aria-hidden', 'true')
        .text(cell => cell.column)
        
      tableCells.append('span')
        .attr('class', 'cell-value')
        .text(cell => cell.value)

      const numericColumns = []
      tableCells.attr('class', (cell) => {
        const css = this.dataTypeToCssClass(cell)
        if (css.includes('value-number')) {
          if (!numericColumns.includes(cell.column)) {
            numericColumns.push(cell.column)
          }
          return css
        }
      })
      
      tableHeader.attr('class', (column) => {
        if (numericColumns.includes(column)) {
          return 'column-numeric'
        }
      })
      
      if (this.enableRowClicks) {
        tableRows.on('click', (event, row) => this.onClick(event, row))
      }
    }
  },
  mounted () {
    this.renderTable()
  },
  updated () {
    this.renderTable()
  }
}
</script>

<style lang="scss">

@mixin visuallyHidden {
  position: absolute;
  clip: rect(1px 1px 1px 1px);
  clip: rect(1px, 1px, 1px, 1px);
  width: 1px;
  height: 1px;
  overflow: hidden;
  white-space: nowrap;
}

@mixin revealHiddenContent {
  position: static;
  display: block;
  clip: auto;
  height: auto;
  width: auto;
  overflow: visible;
  white-space: normal;
}

@mixin columnHeader {
  font-size: 11pt;
  font-weight: 600;
  padding: 4px 12px;
  text-transform: uppercase;
  letter-spacing: 2px;
}

.d3-table {
  border-spacing: 0;
  text-align: left;
  color: $gray-700;
  width: 100%;
  position: relative;
    
  caption {
    caption-side: top;
    text-align: left;
    font-size: inherit;
    margin-bottom: 16px;
    color: $gray-900;
  }
    
  thead {
    tr {
      th {
        @include columnHeader;
        border-bottom: 1px solid $gray-900;
        color: $gray-900;
        
        &.column-numeric {
          text-align: right;
        }
      }
    }
  }
    
  tbody {
    tr {
      td {
        font-size: 13pt;
        padding: 16px 12px;
        
        &.value-number {
          text-align: right;
        }
        
        .cell-colname {
          @include visuallyHidden;
        }
      }

      &:nth-child(even) {
        background-color: $gray-050;
      }

      &:last-child {
        td {
          border-bottom: 1px solid $gray-900;
        }
      }
    }
  }
  &.table-row-highlighting {
    tbody {
      tr {
        &:hover {
          background-color: $blue-100;
        }
      }
    }
  }
  
  @media (max-width: 892px) {
		thead {
			@include visuallyHidden;
		}

    tbody {
      tr {
        td {
          display: grid;
          grid-template-columns: 1fr 2fr;
          justify-content: flex-start;
          align-items: center;
          padding: 6px 0;
          
          .cell-colname {
            @include revealHiddenContent;
            padding: 4px 12px;
            text-transform: capitalize;
          }
          
          &.value-number {
            text-align: left;
          }
        }
        &:last-child {
          td {
            border-bottom: none;
          }
        }
      }
    }
  }
}
</style>
