<template>
  <div>
    <div class="flex-row select-color-view py-1">
      <div v-for="cc in colorCodes" class="flex-column select-color" :style="{'--bg': cc}">
        <p>{{cc}}</p>
      </div>
    </div>
    <ColorBrightness v-for="c in colors" class="py-1" :color="c"></ColorBrightness>
    <div class="flex-row py-1">
        <div v-for="cs in circleStyles" class="circle mx-2" :style="cs"></div>
    </div>
  </div>
</template>

<script>
import ColorBrightness from '@/components/ColorBrightness.vue'

export default {
  components : {
    ColorBrightness
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
    thirdColor: {
      type:Array,
      'default': () => [0,0,0]
    },
    fourthColor: {
      type:Array,
      'default': () => [0,0,0]
    },
  },
  computed: {
    colors() {
      return [
        this.firstColor,
        this.secondColor,
        this.thirdColor,
        this.fourthColor
      ]
    },
    firstColorCode() {
        return this.$toColorCode(this.firstColor)
    },
    secondColorCode() {
        return this.$toColorCode(this.secondColor)
    },
    thirdColorCode() {
        return this.$toColorCode(this.thirdColor)
    },
    fourthColorCode() {
        return this.$toColorCode(this.fourthColor)
    },
    firstColorStyle() {
      return {
        '--bg': this.firstColorCode
      }
    },
    secondColorStyle() {
      return {
        '--bg': this.secondColorCode
      }
    },
    thirdColorStyle() {
      return {
        '--bg': this.thirdColorCode
      }
    },
    fourthColorStyle() {
      return {
        '--bg': this.fourthColorCode
      }
    },
    colorCodes() {
      return[
        this.firstColorCode,
        this.secondColorCode,
        this.thirdColorCode,
        this.fourthColorCode
        ];
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
  width: 6rem;
  height: 8rem;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
