<template>
  <div>
    <div class="flex-row select-color-view py-1">
      <div class="select-color" :style="firstColorSytle"></div>
      <P>{{firstColorCode}}</p>
      <div class="select-color" :style="secondColorSytle"></div>
      <P>{{secondColorCode}}</p>
    </div>
    <div class="flex-row align-items-center py-1">
      <ColorBox v-for="n of 8" :color="firstColor" :borderColor="[32 * (n - 1),32 * (n - 1),32 * (n - 1)]"></colorBox>
    </div>
    <div class="flex-row py-1">
      <ColorBox v-for="n of 8" :borderColor="firstColor" :color="[32 * (n - 1),32 * (n - 1),32 * (n - 1)]"></colorBox>
    </div>
    <div class="flex-row align-items-center py-1">
      <ColorBox v-for="n of 8" :color="secondColor" :borderColor="[32 * (n - 1),32 * (n - 1),32 * (n - 1)]"></colorBox>
    </div>
    <div class="flex-row py-1">
      <ColorBox v-for="n of 8" :borderColor="secondColor" :color="[32 * (n - 1),32 * (n - 1),32 * (n - 1)]"></colorBox>
    </div>
    <div class="flex-row py-1">
        <div v-for="cs in circleStyles" class="circle mx-2" :style="cs"></div>
    </div>
  </div>
</template>

<script>
import ColorBox from '@/components/ColorBox.vue'

export default {
  components : {
    ColorBox
  },
  props: {
    firstColor: {
      type:Array,
      'default': () => [0,0,0]
    },
    secondColor: {
      type:Array,
      'default': () => [0,0,0]
    },
  },
  computed: {
    firstColorCode: {
      get() {
        return this.$toColorCode(this.firstColor)
      }
    },
    secondColorCode: {
      get() {
        return this.$toColorCode(this.secondColor)
      }
    },
    firstColorSytle() {
      return {
        '--bg': this.firstColorCode
      }
    },
    secondColorSytle() {
      return {
        '--bg': this.secondColorCode
      }
    },
    circleStyles() {
      return [
        {
          '--bg-first': this.firstColorCode,
          '--bg-second': "#FFFFFF"
        },
        {
          '--bg-first': this.firstColorCode,
          '--bg-second': "#000000"
        },
        {
          '--bg-first': this.secondColorCode,
          '--bg-second': "#FFFFFF"
        },
        {
          '--bg-first': this.secondColorCode,
          '--bg-second': "#000000"
        }
      ]
    }
  }
}
</script>

<style lang="scss">
.circle {
  --width: 4rem;
  --height: 4rem;
  --bg-first: #FFFFFF;
  --bg-second: #000000;
  --bg-gradient: linear-gradient(var(--bg-first),var(--bg-second));
  background-image: var(--bg-gradient);
  width: var(--width);
  height: var(--height);
  border-radius: 50%;
}
.select-color {
  --bg: #FFFFFF;
  background-color: var(--bg);
  width: 90px;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
