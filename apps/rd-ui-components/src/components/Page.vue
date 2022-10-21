<template>
  <main class="app-page">
    <slot></slot>
    <footer class="page-footer">
      <slot name="footer"></slot>
    </footer>
  </main>
</template>

<style lang="scss" scoped>
.app-page {
  font-size: 15pt;
  color: $gray-700;
  min-height: 100vh;
}
</style>