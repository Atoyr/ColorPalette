<template>
  <div class="main">
    <div class="color-circle">
      <ColorCircle ref="colorCircle"></ColorCircle>
    </div>
    <div class="color-slider">
      <div>
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
             class="slider"
             type="range" value="1" min="0" max="1" step="0.01" v-model="valueBrightness"></input>
          <p class="slider-text">{{vvalueBrightness}}</p>
        </div>
      </div>
    </div>
    <div>
      <p>HSV : {{selectColor[0]}} {{selectColor[1] * 100}} {{selectColor[2] * 100}}</p>
      <p>RGB : {{selectRGBColor[0]}} {{selectRGBColor[1]}} {{selectRGBColor[2]}}</p>
    </div>
    <div class="color-div">
      <colorBox v-for="n of 8" :color="selectRGBColor" :borderColor="[32 * (n - 1),32 * (n - 1),32 * (n - 1)]"></colorBox>
    </div>
    <div class="color-div">
      <colorBox v-for="n of 8" :borderColor="selectRGBColor" :color="[32 * (n - 1),32 * (n - 1),32 * (n - 1)]"></colorBox>
    </div>
  </div>
</template>

<script>
import ColorCircle from '@/components/ColorCircle.vue'
import colorBox from '@/components/box.vue'

function toPaddedHexString(num, len) {
    let str = num.toString(16);
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
    vsaturation: function(){
      return parseInt(this.saturation * 100)
    },
    vvalueBrightness : function(){
      return parseInt(this.valueBrightness * 100)
    },
    selectColorSytle() {
      return {
        '--bg': `#${toPaddedHexString(this.selectRGBColor[0],2)}${toPaddedHexString(this.selectRGBColor[1],2)}${toPaddedHexString(this.selectRGBColor[2],2)}`
      }
    }

  },
  data() {
    return{
    }
  }
}
</script>

<style>
.main {
  display: flex;
  flex-direction: column; 
  align-items: center;
}
.color-circle {
  padding: 12px;
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
  padding: 4px;
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
  {
    --bg: #FFFFFF;
  }
  background-color: var(--bg);
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
