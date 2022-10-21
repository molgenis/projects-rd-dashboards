<template>
  <section class="page-section">
    <div :class="classNames">
      <slot></slot>
    </div>
  </section>
</template>

<script>
const widthOptions = ['small','medium', 'large', 'full']

export default {
  name: 'page-section',
  props: {
    width: {
      type: String,
      default: 'medium',
      validator: (value) => {
        return widthOptions.includes(value)
      }
    },
    horizontalPadding: {
      type: Number,
      default: 1,
      validator: (value) => {
        return value >= 0 && value <= 5;
      }
    },
    verticalPadding: {
      type: Number,
      default: 1,
      validator: (value) => {
        return value >= 0 && value <= 5;
      }
    }
  },
  computed: {
    classNames () {
      const base = 'page-section-content'
      const width = `width-${this.width}`
      const hPadding = `padding-h-${this.horizontalPadding}`
      const vPadding = `padding-v-${this.verticalPadding}`
      return [base, width, hPadding, vPadding].join(' ')
    }
  }
}
</script>

<style lang="scss">
.page-section {
  box-sizing: content-box;

  .page-section-content {
    margin: 0 auto;

    h1,h2,h3,h4,h5,h6 {
      font-weight: 600;
      line-height: 1.3;
      margin: 0;
      margin-bottom: 16px;
      text-align: center;
      color: $gray-900;
    }
    
    p {
      line-height: 1.5;
    }
  }
}
</style>
