<template>
  <div class="file-download-card">
    <div class="file-icon" v-if="fileType === 'pdf'">
      <pdfIcon />
    </div>
    <div class="file-info">
      <a :href="url">
        {{ name }}
        (<span>{{ fileType.toUpperCase() }}</span><span v-if="size">, {{ size }}</span>)
      </a>
      <slot></slot>
    </div>
  </div>
</template>

<script>
import pdfIcon from '@/components/icons/pdfIcon.vue'
const fileTypes = ['txt', 'pdf', 'word']

export default {
  components: {
    pdfIcon
  },
  props: {
    fileType: {
      default: 'pdf',
      validator: (value) => {
        return fileTypes.includes(value)
      }
    },
    url: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    size: {
      type: String
    }
    
  }
}
</script>

<style lang="scss">
.file-download-card {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 1em;
  background-color: $gray-000;
  padding: 1em;
  margin: 1.25em auto;
  border-radius: 6px;
  max-width: 700px;
  box-shadow: $box-shadow;
  border: 1px solid $gray-200;
  
  .file-info {
    p {
      margin: 0;
      margin-top: 4px;
      font-size: 13pt;
    }
  }
}
</style>