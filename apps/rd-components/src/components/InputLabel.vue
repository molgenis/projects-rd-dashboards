<template>
  <label :for="id" class="input-label">
    <span>{{ label }}</span>
    <span class="input-description">{{ description }}</span>
  </label>
</template>

<script>
export default {
  name: 'input-label',
  props: {
    id: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: false
    }
  }
}
</script>

<style lang="scss">
.input-label {
  display: block;
  color: $gray-900;
  font-size: 13pt;
  
  .input-description {
    display: block;
    margin-top: 6px;
    font-size: 11pt;
    color: $gray-400;
  }
}
</style>
