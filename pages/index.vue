<template>
  <div class="flex-column align-items-center">
    <div class="my-3">
      <ColorCircle ref="colorCircle"></ColorCircle>
    </div>
    <div class="flex-row align-items-center">
      <p class="slider-text">S</p>
      <input 
         class="slider"
         type="range" value="1" min="0" max="1" step="0.01" v-model="saturation"></input>
      <p class="slider-text">{{vsaturation}}</p>
    </div>
    <div class="flex-row align-items-center">
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
    <ColorView :firstColor="selectRGBColor" :secondColor="[255,255,255]"></ColorView>
  </div>
</template>

<script>
import ColorCircle from '@/components/ColorCircle.vue'
import ColorView from '@/components/ColorView.vue'

export default {
  components : {
    ColorCircle,
    ColorView
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
        return this.$toColorCode(this.selectRGBColor);
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
    circleStyles() {
      return [
        {
          '--bg-first': this.selectColorHex,
          '--bg-second': "#FFFFFF"
        },
        {
          '--bg-first': this.selectColorHex,
          '--bg-second': "#000000"
        }
      ]
    }

  },
  data() {
    return{
    }
  }
}
</script>

<style lang="scss">
.slider {
  width: 200px;
}
.slider-text {
  width: 32px;
}
.select-color-view {
  --width: 360px;
  width: var(--width);
}
</style>
