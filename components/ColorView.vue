<template>
  <div>
    <div class="flex-row select-color-view py-1">
      <div v-for="cc in colorCodes" class="flex-column select-color" :style="{'--bg': cc}">
        <p>{{cc}}</p>
      </div>
    </div>
    <ColorBrightness v-for="c in colors" class="py-1" :color="c"></ColorBrightness>
    <div class="flex-row py-1" v-for="cs in circleStyles">
      <div v-for="c in cs" class="circle px-1 py-1" :style="c"></div>
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
        [{
          '--bg-first': this.firstColorCode,
          '--bg-second': "#FFFFFF"
        },
        {
          '--bg-first': this.firstColorCode,
          '--bg-second': "#000000"
        },
        {
          '--bg-first': this.firstColorCode,
          '--bg-second': this.secondColorCode
        },
        {
          '--bg-first': this.firstColorCode,
          '--bg-second': this.thirdColorCode
        },  
        {
          '--bg-first': this.firstColorCode,
          '--bg-second': this.fourthColorCode
        }],
        [{
          '--bg-first': this.secondColorCode,
          '--bg-second': "#FFFFFF"
        },
        {
          '--bg-first': this.secondColorCode,
          '--bg-second': "#000000"
        },
        {
          '--bg-first': this.secondColorCode,
          '--bg-second': this.firstColorCode
        },
        {
          '--bg-first': this.secondColorCode,
          '--bg-second': this.thirdColorCode
        },  
        {
          '--bg-first': this.secondColorCode,
          '--bg-second': this.fourthColorCode
        }],
        [{
          '--bg-first': this.thirdColorCode,
          '--bg-second': "#FFFFFF"
        },
        {
          '--bg-first': this.thirdColorCode,
          '--bg-second': "#000000"
        },
        {
          '--bg-first': this.thirdColorCode,
          '--bg-second': this.firstColorCode
        },  
        {
          '--bg-first': this.thirdColorCode,
          '--bg-second': this.secondColorCode
        },
        {
          '--bg-first': this.thirdColorCode,
          '--bg-second': this.fourthColorCode
        }],
        [{
          '--bg-first': this.fourthColorCode,
          '--bg-second': "#FFFFFF"
        },
        {
          '--bg-first': this.fourthColorCode,
          '--bg-second': "#000000"
        },
        {
          '--bg-first': this.fourthColorCode,
          '--bg-second': this.firstColorCode
        },
        {
          '--bg-first': this.fourthColorCode,
          '--bg-second': this.secondColorCode
        },
        {
          '--bg-first': this.fourthColorCode,
          '--bg-second': this.thirdColorCode
        }],  
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
  background-clip:content-box;
}
.select-color {
  --bg: #FFFFFF;
  background-color: var(--bg);
  width: 5rem;
  height: 8rem;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
