<template>
  <div class="solve-rd-logo-icon">
    <img :src="SolveRdIcon" class="solve-rd-logo-icon" alt="" />
  </div>
</template>

<script>
import SolveRdIcon from "@/assets/solve-rd-logo-icon.png"

export default {
  name: 'solve-rd-icon',
  data () {
    return {
      SolveRdIcon: SolveRdIcon
    }
  }
}
</script>

<style lang="scss">
.solve-rd-logo-icon {
  display: block;
  margin: auto;
  margin-bottom: 16px;
  width: 75px;
  border-radius: 50%; 
}
</style>