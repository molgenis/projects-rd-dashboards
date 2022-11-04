<template>
  <button :id="id" class="button-search">
    <MagnifyingGlassCircle class="button-icon" />
    <span class="button-label">{{ label }}</span>
  </button>
</template>

<script>
import MagnifyingGlassCircle from './icons/MagnifyingGlassCircle.vue';
export default {
  name: 'search-button',
  props: {
    id: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: false,
      default: 'Search'
    }
  },
  components: { MagnifyingGlassCircle }
}

</script>

<style lang="scss">
.button-search {
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  background: none;
  border: none;
  padding: 6px 12px;
  background-color: $molgenis-blue-050;
  border: 1px solid $molgenis-blue-800;
  color: $molgenis-blue-800;
  border-radius: 6px;
  font-size: 13pt;
  cursor: pointer;
  
  .button-icon {
    margin-right: 6px;
  }
  
  &:hover, &:focus {
    outline: 1px solid;
  }
}
</style>
