<template>
  <ul class="legend">
    <li class="legend-item" data-legend-item="item" v-for="(label, index) in labels" :key="label">
      <svg class="item-marker" width="16" height="16" viewBox="0 0 16 16" preserveXminYmin="true">
        <circle cx="8" cy="8" r="8" :fill="colors[index]" stroke-width="none"></circle>
      </svg>
      <span class="item-label">{{ label }}</span>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    labels: {
      type: Array,
      required: true
    },
    colors: {
      type: Array,
      required: true
    }
  }
}
</script>

<style lang="scss">
.legend {
  list-style: none;
  padding: 0;
  margin: 0;
  .legend-item {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: row;
    flex-wrap: nowrap;
    column-gap: 4px;
    margin-bottom: 5px;
    
    &:last-child {
      margin: 0;
    }
    
    .item-marker {
      width: 16px;
    }
    .item-label {
      flex-grow: 1;
    }
  }
}
</style>
