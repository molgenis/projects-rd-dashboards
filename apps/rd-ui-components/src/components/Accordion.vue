<template>
  <div :id="`accordion-${id}`" :class="visible ? 'accordion visible' : 'accordion'">
    <h3 class="accordion-heading">
      <button
        type="button"
        :id="`accordion-toggle-${id}`"
        class="accordion-toggle"
        :aria-controls="`accordion-content-${id}`"
        :aria-expanded="visible"
        v-on:click="onclick"
      >
        <span class="toggle-label">{{ title }}</span>
        <svg
          :class="visible ? 'toggle-icon rotated' : 'toggle-icon'"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
    </h3>
    <section
      :id="`accordion-content-${id}`"
      class="accordion-content"
      :aria-labelledby="`accordion-toggle-${id}`"
      role="region"
      v-show="visible"
    >
      <slot></slot>
    </section>
  </div>
</template>

<script>
export default {
  name: 'accordion',
  props: {
    id: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      visible: false
    }
  },
  methods: {
    onclick () {
      this.visible = !this.visible
    }
  }
}
</script>

<style lang="scss">
$border-radius: 6px;

.accordion {
  font-family: inherit;
  box-sizing: border-box;
  margin: 24px 0;
  border: 1px solid $gray-200;
  border-radius: $border-radius;
  
  .accordion-heading {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin: 0;
    padding: 16px 12px;
    font-size: 14pt;
    background-color: $gray-050;
    border-radius: $border-radius;
    
    .accordion-toggle {
      border: none;
      position: relative;
      background: none;
      background-color: none;
      margin: 0;
      padding: 0;
      cursor: pointer;
      font-size: inherit;
      text-align: left;
      color: currentColor;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      width: 100%;

      $icon-size: 24px;
      .toggle-label {
        display: inline-block;
        width: calc(100% - $icon-size);
        word-break: break-word;
      }

      .toggle-icon {
        width: $icon-size;
        height: $icon-size;
        transform: rotate(0);
        transform-origin: center;
        transition: transform 0.4s ease-in-out;

        &.rotated {
          transform: rotate(180deg);
        }
      }
    }
  }
  
  .accordion-content {
    margin: 0;
    box-sizing: content-box;
  }
  
  &.visible {
    .accordion-heading {
      border-radius: $border-radius $border-radius 0 0;
    }
    .accordion-content {
      padding: 0 12px;
    }
  }
}
</style>
