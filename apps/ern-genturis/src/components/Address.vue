<template>
  <address :class="setClassNames">
    <span><strong>University Medical Centre Groningen</strong></span>
    <span>GENTURIS registry</span>
    <span>Department of Medical Genetics</span>
    <span>Antonius Deusinglaan 1</span>
    <span>9713 AV Groningen</span>
    <span>The Netherlands</span>
    <a href="mailto:genturis-registry@umcg.nl" v-if="showEmail">genturis-registry@umcg.nl</a>
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
