<template>
  <div class="flex-column">
    <div class="flex-row align-items-center">
      <ColorBox v-for="n of 16" :color="color" :borderColor="[17 * (n - 1),17 * (n - 1),17 * (n - 1)]"></colorBox>
    </div>
    <div class="flex-row align-items-center">
      <ColorBox v-for="n of 16" :borderColor="color" :color="[17 * (n - 1),17 * (n - 1),17 * (n - 1)]"></colorBox>
    </div>
  </div>
</template>

<script>
import ColorBox from '@/components/ColorBox.vue'

export default {
  components: {
    ColorBox
  },
  props: {
    color: {
      type:Array,
      'default': () => [0,0,0]
    },
  }
}
</script>
