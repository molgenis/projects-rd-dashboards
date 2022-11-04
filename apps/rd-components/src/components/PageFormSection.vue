<template>
  <div class="form-section">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'form-section'
}
</script>

<style lang="scss">
.form-section {
  box-sizing: border-box;
  padding-top: 6px;
}
</style>
