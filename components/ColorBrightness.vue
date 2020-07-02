<template>
  <div class="flex-column">
    <div class="flex-row align-items-center">
      <ColorBox v-for="n of 6" :color="color" :borderColor="[51 * (n - 1),51 * (n - 1),51 * (n - 1)]"></colorBox>
      <ColorBox v-for="n of 6" :borderColor="color" :color="[51 * (n - 1),51 * (n - 1),51 * (n - 1)]"></colorBox>
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
