<template>
  <address :class="setClassNames">
    <span><strong>Radboud university medical center</strong></span>
    <span>GENTURIS registry</span>
    <span>Department of Human Genetics</span>
    <span>Geert Grooteplein Zuid 10</span>
    <span>6525 GA Nijmegen</span>
    <span>The Netherlands</span>
    <a href="mailto:genturis-registry@radboudumc.nl" v-if="showEmail">genturis-registry@radboudumc.nl</a>
  </address>
</template>

<script>
export default {
  name: 'ern-address',
  props: {
    centerText: {
      type: Boolean,
      default: false
    },
    showEmail: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    setClassNames () {
      const baseClass = 'address'
      const centeredTextClass = this.centerText ? 'address-text-center' : ''
      return [baseClass, centeredTextClass].join(' ')
    }
  }
}
</script>

<style lang="scss">
.address {
  font-style: normal;
  font-size: 14pt;
  margin-left: 2.25em;
  line-height: 1.3;

  strong {
    color: $gray-900;
  }
  
  span {
    display: block;
  }
  
  &.address-text-center {
    text-align: center;
  }
}
</style>
