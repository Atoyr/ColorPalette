<template>
  <div class="main">
    <div class="color-circle">
      <ColorCircle></ColorCircle>
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
         class="slider"
         type="range" value="1" min="0" max="1" step="0.01" v-model="valueBrightness"></input>
      <p class="slider-text">{{vvalueBrightness}}</p>
    </div>
    <div>
      <p>HSV : {{selectColor[0]}} {{selectColor[1]}} {{selectColor[2]}}</p>
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
      }
    },
    valueBrightness: {
      get() {
        return this.$store.state.valueBrightness;
      },
      set(value) {
        this.$store.commit('updateValueBrightness', value);
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
</style>
