<template>
  <div class="checkbox__group">
    <slot></slot>
  </div>
</template>

<style lang="scss" >
.checkbox__group {
  margin: 1em 0;
  div {
    display: flex;
    flex-direction: row;
    align-items: center;
    input[type="checkbox"] {
      margin-top: -3px;
      margin-right: 6px;
    }
    label {
      line-height: 1.4;
    }
  }
}
</style>
