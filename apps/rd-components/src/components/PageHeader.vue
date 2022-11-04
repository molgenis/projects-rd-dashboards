<template>
  <header
    :class="headerClassNames"
    :style="imageSrc ? `background-image: url(${imageSrc})` : ''"
  >
    <div class="header-content">
      <h1 class="header-title">{{ title }}</h1>
      <h2 class="header-subtitle">{{ subtitle }}</h2>
    </div>
    <div class="background-image-filter" v-if="imageSrc" aria-hidden="true"></div>
  </header>
</template>

<script>
const heightOptions = ['small', 'medium', 'large', 'full']
const yPositions = ['top', 'center', 'bottom']
const xPositions = ['left', 'center', 'right']

export default {
  name: 'page-header',
  props: {
    title: {
      type: String,
      required: true
    },
    subtitle: {
      type: String,
      required: true
    },
    imageSrc: {
      type: String,
      default: null
    },
    height: {
      type: String,
      default: 'small',
      validator: (value) => {
        return heightOptions.includes(value)
      }
    },
    titlePositionX: {
      type: String,
      default: 'left',
      validator: (value) => {
        return xPositions.includes(value)
      }
    },
    titlePositionY: {
      type: String,
      default: 'center',
      validator: (value) => {
        return yPositions.includes(value)
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
    headerClassNames () {
      const baseclass = 'page-header'
      const heightclass = `height-${this.height}`
      const textPosition = `text-position-x-${this.titlePositionX} text-position-y-${this.titlePositionY}`
      const padding = `padding-h-${this.horizontalPadding} padding-v-${this.verticalPadding}`
      const css = [baseclass, heightclass, textPosition, padding]
      if (this.imageSrc) {
        css.push('header-image-background')
      }
      return css.join(' ')
    }
  }
}
</script>

<style lang="scss">
.page-header {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  
  .header-content {
    width: 90%;
    margin: 0 auto;
    z-index: 1;

    h1, h2 {
      margin: 0;
      line-height: 1.3;
      color: currentColor;
    }

    .header-title {
      font-size: 13pt;
      text-transform: uppercase;
      letter-spacing: 4px;
      font-weight: bold;
    }

    .header-subtitle {
      font-size: 32pt;
      font-weight: 200;
    }
  }

  &.header-image-background {
    background-size: cover;
    background-position: 0 44%;
    
    .header-content {
      .header-title {
        color: $gray-050;
      }
      .header-subtitle {
        color: $gray-050;
      }
    }

    .background-image-filter {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: $gray-transparent-500;
    }
  }
}
</style>
