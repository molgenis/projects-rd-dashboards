<template>
  <h3 :class="setTitleClassNames">{{ title }}</h3>
  <ul class="data-highlights">
    <li v-for="(value, index) in values" key="value" class="data-highlight">
      <data :value="value" class="data-value">
        <span class="data-label">{{ labels[index] }}</span>
      </data>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'viz-data-highlights',
  props: {
    title: {
      type: String,
    },
    showTitle: {
      type: Boolean,
      default: false
    },
    values: {
      type: Array,
      required: true
    },
    labels: {
      type: Array,
      required: true
    }
  },
  computed: {
    setTitleClassNames () {
      const base = 'data-highlights-title'
      const visibility = !this.showTitle ? 'visually-hidden' : ''
      return [base, visibility].join(' ')
    }
  }
}
</script>

<style lang="scss" scoped>
.data-highlights {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 1em;
  list-style: none;
  padding: 0;
  margin: 0;
  
  .data-highlight {
    box-sizing: border-box;
    padding: 1em;
    background-color: $blue-800;
    border-radius: 6px;
    flex-grow: 1;
    box-shadow: 0 0 4px 3px $gray-transparent-200;
    
    .data-value {
      .data-label {
        display: block;
        margin-bottom: 21px;
        font-size: 11pt;
        text-transform: uppercase;
        font-weight: bold;
        color: $blue-100;
        letter-spacing: 0.08em;
      }
      
      &::after {
        content: attr(value);
        display: block;
        font-size: 36pt;
        text-align: center;
        color: $blue-050;
      }
    }
  }
}

.data-highlights-title {
  font-weight: bold;
}
</style>