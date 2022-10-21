<template>
  <div class="d3-viz d3-table">
    <table :id="tableId">
      <caption v-if="caption">{{caption}}</caption>
    </table>
  </div>
</template>

<script>
import { select, selectAll } from 'd3'
const d3 = { select, selectAll }

export default {
  name: 'DataTable',
  props: {
    tableId: {
      type: String,
      required: true
    },
    data: {
      type: Array,
      required: true
    },
    columnOrder: {
      type: Array,
      required: true
    },
    caption: {
      type: String,
      required: false,
      default: null
    },
    firstColumnIsRowHeader: {
      type: Boolean,
      default: false
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
    renderTable () {
      const table = d3.select(`#${this.tableId}`)
      
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

      const tableCells = tableRows.selectAll('tr')
        .data(row => {
          return this.columnOrder.map(column => {
            return { column: column, value: row[column] }
          })
        })
        .enter()
        .append('td')
        .attr('role', (column, index) => {
          if (index == 0 && this.firstColumnIsRowHeader) {
            return 'rowheader'
          } else {
            return 'gridcell'
          }
        })
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
      
    }
  },
  mounted () {
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

.d3-table {
  width: 100%;
  text-align: left;
  color: $gray-700;

  table {
    border-spacing: 0;
    width: 100%;
    position: relative;
    
    caption {
      caption-side: top;
      font-size: 13pt;
      margin-bottom: 12px;
      font-weight: 600;
      color: $gray-900;
    }
    
    thead {
      tr {
        th {
          font-size: 11pt;
          font-weight: 600;
          padding: 4px 12px;
          text-transform: uppercase;
          letter-spacing: 2px;
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
  }
  
  @media (max-width: 892px) {
		thead {
			@include visuallyHidden;
		}

		tbody {
			tr {
				td {
					display: flex;
					justify-content: flex-start;
					align-items: center;
					padding: 4px 0;
					padding-left: 12px;

					.cell-colname {
						display: block;
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
