<template>
  <div class="main">
    <div class="py-12">
      <ColorCircle ref="colorCircle"></ColorCircle>
    </div>
    <div class="slider-wrapper">
      <p class="slider-text">S</p>
      <input 
         class="slider"
         type="range" value="1" min="0" max="1" step="0.01" v-model="saturation"></input>
      <p class="slider-text">{{vsaturation}}</p>
    </div>
    <div class="slider-wrapper">
      <p class="slider-text">V</p>
      <input 
         class="slider py-4"
         type="range" value="1" min="0" max="1" step="0.01" v-model="valueBrightness"></input>
      <p class="slider-text">{{vvalueBrightness}}</p>
    </div>
    <div>
      <p>HSV : {{selectColor[0]}} {{selectColor[1] * 100}} {{selectColor[2] * 100}}</p>
      <p>RGB : {{selectRGBColor[0]}} {{selectRGBColor[1]}} {{selectRGBColor[2]}}</p>
    </div>
    <div class="slider-wrapper select-color-view py-2">
      <div class="select-color" :style="selectColorSytle"></div>
      <P>{{selectColorHex}}</p>
    </div>
    <div class="color-div py-2">
      <colorBox v-for="n of 8" :color="selectRGBColor" :borderColor="[32 * (n - 1),32 * (n - 1),32 * (n - 1)]"></colorBox>
    </div>
    <div class="color-div py-2">
      <colorBox v-for="n of 8" :borderColor="selectRGBColor" :color="[32 * (n - 1),32 * (n - 1),32 * (n - 1)]"></colorBox>
    </div>
    <div class="circle" :style="circleStyle"></div>
  </div>
</template>

<script>
import ColorCircle from '@/components/ColorCircle.vue'
import colorBox from '@/components/box.vue'

function toPaddedHexString(num, len) {
    let str = num.toString(16).toUpperCase();
    return "0".repeat(len - str.length) + str;
}

export default {
  components : {
    ColorCircle,
    colorBox
  },
  computed: {
    size: function() {
      return this.mag * basesize;
    },
    saturation: {
      get() {
        return this.$store.state.saturation;
      },
      set(value) {
        this.$store.commit('updateSaturation', value);
        this.$refs.colorCircle.draw();
      }
    },
    valueBrightness: {
      get() {
        return this.$store.state.valueBrightness;
      },
      set(value) {
        this.$store.commit('updateValueBrightness', value);
        this.$refs.colorCircle.draw();
      }
    },
    selectColor: {
      get() {
        return this.$store.state.selectColor;
      },
      set(value) {
        this.$store.commit('updateSelectColor', value);
      }
    },
    selectRGBColor: {
      get() {
        return this.$hsv2rgb(this.selectColor);
      }
    },
    selectColorHex: {
      get() {
        return `#${toPaddedHexString(this.selectRGBColor[0],2)}${toPaddedHexString(this.selectRGBColor[1],2)}${toPaddedHexString(this.selectRGBColor[2],2)}`
      }
    },
    vsaturation: function(){
      return parseInt(this.saturation * 100)
    },
    vvalueBrightness : function(){
      return parseInt(this.valueBrightness * 100)
    },
    selectColorSytle() {
      return {
        '--bg': this.selectColorHex
      }
    },
    circleStyle() {
      return {
        '--bg-first': this.selectColorHex,
        '--bg-second': "#FFFFFF"
      }
    }

  },
  data() {
    return{
    }
  }
}
</script>

<style lang="scss">
.main {
  display: flex;
  flex-direction: column; 
  align-items: center;
}
.color-slider {
  display: flex;
  align-items: center;
  flex-direction: row; 
}
.slider-wrapper {
  display: flex;
  align-items: center;
  flex-direction: row; 
}
.slider {
  width: 200px;
}
.slider-text {
  width: 32px;
}
.color-div {
  display: flex;
  flex-direction: row; 
  align-items: center;
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
.circle {
  --width: 32px;
  --height: 32px;
  --bg-first: #FFFFFF;
  --bg-second: #000000;
  --bg-gradient: linear-gradient(var(--bg-first),var(--bg-second));
  background-image: var(--bg-gradient);
  width: var(--width);
  height: var(--height);
  border-radius: 50%;
}
.select-color-view {
  --width: 360px;
  --height: 32px;
  width: var(--width);
  height: var(--height);
}
</style>
