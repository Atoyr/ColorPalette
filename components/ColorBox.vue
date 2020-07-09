<template>
  <div class="color-box" :style="styleValiables">
  </div>
</template>

<script>
export default {
  props: {
    color: {
      type:Array,
      'default': () => [0,0,0]
    },
    borderColor: {
      type:Array,
      'default': () => [0,0,0]
    },
  },
  computed: {
    styleValiables() {
      return {
        '--colorbox-background': this.$toColorCode(this.color),
        '--colorbox-borderColor': this.$toColorCode(this.borderColor)
      }
    }
  }
}
</script>
