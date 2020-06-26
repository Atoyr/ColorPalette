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
  </div>
</template>

<script>
import ColorCircle from '@/components/ColorCircle.vue'
export default {
  components : {
    ColorCircle
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
    baseColor: {
      get() {
        return this.$store.state.baseColor;
      },
      set(value) {
        this.$store.commit('updateBaseColor', value);
        this.draw();
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
</style>
