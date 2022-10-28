<template>
  <div :class="`message-box message-${type}`">
    <div class="message-icon">
      <CheckCircle v-if="type==='success'" />
      <ExclaimationTriangle v-else-if="type==='warning'" />
      <ExclaimationCircle v-else-if="type==='error'" />
      <ChatBubble v-else />
    </div>
    <div class="message-text">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import CheckCircle from './icons/CheckCircle.vue'
import ExclaimationCircle from './icons/ExclaimationCircle.vue'
import ExclaimationTriangle from './icons/ExclaimationTriangle.vue'
import ChatBubble from './icons/ChatBubble.vue'

export default {
  name: 'error-box',
  props: {
    type: {
      type: String,
      default: 'default',
      validator: (value) => {
        return ['default', 'error', 'success', 'warning'].includes(value)
      }
    }
  },
  components: {
    CheckCircle,
    ExclaimationCircle,
    ExclaimationTriangle,
    ChatBubble
  }
}
</script>

<style lang="scss">
.message-box {
  box-sizing: border-box;
  display: flex;
  border-radius: 6px;
  justify-content: flex-start;
  align-items: stretch;
  margin: 12px 0;
  
  $size: 32px;
  .message-icon {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 12px;
    border-radius: 6px 0 0 6px;
    svg {
      height: $size;
      width: $size;
      stroke-width: 2px;
    }
  }
  
  .message-text {
    padding: 0 12px;

    * {
      color: inherit;
    }
  }
  
  &.message-default {
    background-color: $gray-050;
    .message-icon {
      background-color: $gray-800;
      color: $gray-050;
    }
  }
  
  &.message-success {
    background-color: $green-100;
    color: $green-800;
    
    .message-icon {
      background-color: $green-800;
      color: $green-050;
    }
  }
  
  &.message-warning {
    background-color: $yellow-050;
    .message-icon {
      background-color: $yellow-400;
    }
  }
  
  &.message-error {
    background-color: $red-100;
    color: $red-900;
    
    .message-icon {
      background-color: $red-900;
      color: $red-050;
    }
  }
}
</style>