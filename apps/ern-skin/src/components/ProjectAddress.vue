<template>
  <address :class="setClassNames">
    <span><strong>Coordinating Center</strong></span>
    <span>Hôpital Necker Enfants Malades</span>
    <span>Department of Dermatology</span>
    <span>149 rue de Sèvres</span>
    <span>75015 Paris</span>
    <a href="mailto:registry@ern-skin.eu" v-if="showEmail">registry@ern-skin.eu</a>
  </address>
</template>

<script>
export default {
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
